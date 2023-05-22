//SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

import {ICharityStreamV2} from "./interfaces/ICharityStreamV2.sol";

/**
 * @title CharityStreamV2 is a contract that allows to create charity campaigns.
 * @author devorsmth.eth
 */
contract CharityStreamV2 is ICharityStreamV2 {
    // 100% == 1000;
    uint256 public fee;
    address public owner;
    address private pendingOwner;
    uint256 feeAmount;
    // start from 1
    uint256 public idCampaign = 1;
    uint256 public streamedAmount;

    Campaign[] campaigns;
    Stream[] streams;
    LatestProposition latestProposition;

    // Campaign's backers
    mapping (uint256 => address[]) idToBackers;
    // backer => idCampaign => amount
    mapping (address => mapping(uint256 => uint256)) public donations;
    mapping (address => uint256) refunds;
    // backer => all supported campaigns
    mapping (address => uint256[]) backedCampaigns;
    // idCampaign => propositions
    mapping (uint256 => Proposition[]) public idToProposition;
    // backer => idCampaign => idProposition => bool 
    mapping (address => mapping(uint256 => mapping(uint256 => bool))) hasVoted;

    constructor() payable {
        owner = 0xc8ED1BFD9c71dC422BEA203BD8d869b55Bf252dd;
    }

    modifier onlyCampaignOwner(uint256 _idCampaign) {
        if (msg.sender != campaigns[_idCampaign-1].owner) revert NotOwner();
        _;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    function createCampaign(
        string memory _name, 
        uint128 _amount, 
        uint256 _duration
    ) external {
        if (0 == _duration) revert DurationIsZero();
        if (0 == _amount) revert AmountIsZero();

        uint32 endTime = uint32(block.timestamp + _duration);
        campaigns.push(Campaign(
            Status.Active,
            endTime,
            0,
            msg.sender,
            _amount,
            0,
            0,
            1,
            _name
        ));

        emit campaignCreatedEvent(
            msg.sender, 
            idCampaign, 
            endTime, 
            _amount, 
            _name
        );
        ++idCampaign;        
    }

    function donate(uint256 _idCampaign) external payable {
        Campaign storage campaign = campaigns[_idCampaign-1];
        if (campaign.status != Status.Active) revert CampaignIsNotActive();
        if (campaign.endTime < block.timestamp) revert CampaignEnded();

        campaign.amountReceived = campaign.amountReceived + uint128(msg.value);
        // if it's the first donation
        if (0 == donations[msg.sender][_idCampaign]) {
            backedCampaigns[msg.sender].push(_idCampaign);
            idToBackers[_idCampaign].push(msg.sender);
        }
        donations[msg.sender][_idCampaign] += msg.value;        

        emit donationEvent(msg.sender, _idCampaign, msg.value); 
    }

    function stopAndRefundCampaign(uint256 _idCampaign) external {
        Campaign storage campaign = campaigns[_idCampaign-1];
        if (msg.sender != campaign.owner && msg.sender != owner) revert NotOwner();
        if (Status.Active != campaign.status) revert CampaignIsNotActive();
        campaign.status = Status.Refunded;

        address[] memory backers = idToBackers[_idCampaign];
        uint256 length = backers.length;
        address backer;
        for (uint256 i; i < length; ) {
            backer = backers[i];
            refunds[backer] += donations[backer][_idCampaign];
            delete donations[backer][_idCampaign];
            unchecked {++i;}
        }
        delete idToBackers[_idCampaign];

        emit stopAndRefundCampaignEvent(msg.sender, _idCampaign);
    }

    function withdrawRefunds() external {
        uint256 refund = refunds[msg.sender];
        if(0 == refund) revert NoRefund();
        delete refunds[msg.sender];
        (bool sent,) = msg.sender.call{value: refund}("");
        if(!sent) revert NoRefund();
        emit refundEvent(msg.sender, refund);
    }

    function finishCampaign(uint256 _idCampaign) external onlyCampaignOwner(_idCampaign) {
        Campaign storage campaign = campaigns[_idCampaign-1];
        if (Status.Active != campaign.status) revert CampaignIsNotActive();
        if (block.timestamp <= campaign.endTime) revert CampaignIsActive();
        campaign.status = Status.Finished;

        uint256 amount = campaign.amountReceived;
        uint256 fee_ = fee;
        if (0 != fee_) {
            fee_ = amount*fee_/1000;
            feeAmount = feeAmount + fee_;
            amount -= fee_;
        }
        campaign.amountLeft = uint128(amount);

        // 30% quorum + 1
        campaign.quorum = uint64(idToBackers[_idCampaign].length*300/1000 + 1);
        emit finishCampaignEvent(_idCampaign, amount);
    }

    function newProposition(
        uint256 _idCampaign,
        string memory _description,
        uint128 _amount,
        uint32 _paymentDuration,
        uint32 _voteDuration
    ) external onlyCampaignOwner(_idCampaign) {
        Campaign storage campaign = campaigns[_idCampaign-1];
        if (Status.Finished != campaign.status) revert CampaignIsNotFinished();
        if (_amount > campaign.amountLeft) revert NotEnoughFunds();
        if (0 == _paymentDuration) revert DurationIsZero();
        if (0 == _voteDuration) revert DurationIsZero();

        uint256 idProposition_ = campaign.idProposition;
        uint32 voteEndTime = uint32(block.timestamp) + _voteDuration;

        idToProposition[_idCampaign].push(Proposition({
            status: Status.Active,
            paymentDuration: _paymentDuration,
            voteEndTime: voteEndTime,
            numberOfVoters: 0,
            amount: _amount,
            ayes: 0,
            nays: 0,
            description: _description
        }));
        // already checked
        unchecked {campaign.amountLeft = campaign.amountLeft - _amount;}
        latestProposition = LatestProposition(uint128(_idCampaign),uint128(idProposition_));
        ++campaign.idProposition;

        emit newPropositionEvent(
            msg.sender, 
            _idCampaign, 
            idProposition_, 
            _description, 
            _amount, 
            _paymentDuration, 
            voteEndTime
        );
    }

    function vote(
        uint256 _idCampaign, 
        uint256 _idProposition, 
        bool _decision
    ) external {
        uint256 donation = donations[msg.sender][_idCampaign];
        if (0 == donation) revert NotBacker();

        Proposition storage proposition = idToProposition[_idCampaign][_idProposition-1];
        if (block.timestamp > proposition.voteEndTime) revert VotingEnded();
        if (true == hasVoted[msg.sender][_idCampaign][_idProposition]) revert AlreadyVoted();
        hasVoted[msg.sender][_idCampaign][_idProposition] = true;
        ++proposition.numberOfVoters;

        uint128 votePower = uint128(sqrt(donation));
        if (_decision) proposition.ayes += votePower;
        else proposition.nays += votePower;

        emit voteEvent(msg.sender, _idCampaign, _idProposition, _decision, votePower);
    }

    /**
     * @dev If voting is successful (qurorum met) and 
     * ayes are (50% + 1), create a stream
     */
    function endProposition(uint256 _idCampaign, uint256 _idProposition) external onlyCampaignOwner(_idCampaign) {
        Proposition storage proposition = idToProposition[_idCampaign][_idProposition-1];
        if (Status.Active != proposition.status) revert PropositionIsNotActive();
        if (block.timestamp < proposition.voteEndTime) revert VotingIsActive();
        proposition.status = Status.Finished;

        Campaign storage campaign = campaigns[_idCampaign-1];
        if (proposition.numberOfVoters < campaign.quorum) { 
            campaign.amountLeft = campaign.amountLeft + proposition.amount;
            emit quorumIsNotMetEvent(_idCampaign, _idProposition);
        } else {
            if (proposition.ayes > proposition.nays) { 
                uint128 amount = proposition.amount;                               
                createStream(
                    amount, 
                    proposition.paymentDuration
                );
                emit propositionIsApprovedEvent(_idCampaign, _idProposition);
            } else {
                campaign.amountLeft = campaign.amountLeft + proposition.amount;
                emit propositionIsNotApprovedEvent(_idCampaign, _idProposition);
            }
        }
    }

    function createStream(uint128 _amount, uint32 _paymentDuration) internal {
        uint128 flow = _amount/_paymentDuration;
        streams.push(Stream(
            uint32(block.timestamp),
            uint32(block.timestamp) + _paymentDuration,
            uint32(block.timestamp),
            msg.sender,
            flow,
            _amount
        ));
        emit createStreamEvent(msg.sender, streams.length, flow, _amount);
    }

    function withdrawFunds(uint256 idStream) external {
        Stream storage stream = streams[idStream - 1];
        address receiver = stream.receiver;
        if (msg.sender != receiver) revert NotReceiver();
        uint128 payment = getPayment(stream);
        if (0 != payment) {
            unchecked{stream.leftAmount -= payment;}
            (bool sent,) = receiver.call{value: payment}("");
            if (!sent) revert NoWithdraw();
            streamedAmount = streamedAmount + payment;
            emit fundsWithrawnEvent(msg.sender, idStream, payment);
        } else {
            revert NotEnoughFunds();
        }
    }

    function getPayment(Stream storage _stream) internal returns (uint128){
        uint256 delta;
        uint32 endTime = _stream.endTime;
        if (block.timestamp < endTime) {
            delta = block.timestamp - _stream.lastWithdrawTime;
            _stream.lastWithdrawTime = uint32(block.timestamp);
        } else {
            delta = endTime - _stream.lastWithdrawTime;
            _stream.lastWithdrawTime = endTime;
        }
        return uint128(delta*_stream.flow);
    }

    function setFee(uint256 _newFee) external payable onlyOwner() {
        if (1000 < _newFee) revert FeeTooHigh();
        emit newFeeEvent(fee, _newFee);
        fee = _newFee;
    }

    function withdrawFee() external payable onlyOwner() {
        uint256 feeAmount_ = feeAmount;
        if (0 == feeAmount_) revert NoWithdraw();
        delete feeAmount;
        (bool sent,) = msg.sender.call{value: feeAmount_}("");
        if (!sent) revert NoWithdraw();
        emit withdrawEvent(msg.sender, feeAmount_);
    }

    function transferOwnership(address _newOwner) external payable onlyOwner() {
        pendingOwner = _newOwner;
        emit transferOwnershipEvent(msg.sender, _newOwner);
    }

    function acceptOwnership() external payable {
        if (msg.sender != pendingOwner) revert NotOwner();
        owner = msg.sender;
        delete pendingOwner;
        emit acceptOwnershipEvent(msg.sender);
    }

    function getNumberOfStreams() external view returns (uint256) {
        return streams.length;
    }

    function getRefunds(address _addr) external view returns (uint256) {
        return refunds[_addr];
    }

    function getCampaign(uint256 _idCampaign) external view returns (Campaign memory) {
        return campaigns[_idCampaign-1];
    }

    function getBackedCampaigns(address _backer) external view returns (uint256[] memory) {
        return backedCampaigns[_backer];
    }

    function getProposition(
        uint256 _idCampaign, 
        uint256 _idProposition
    ) external view returns (Proposition memory) {
        return idToProposition[_idCampaign][_idProposition-1];
    }

    function getLatestProposition() external view returns (LatestProposition memory) {
        return latestProposition;
    }

    function getStream(uint256 _idStream) external view returns (Stream memory) {
        return streams[_idStream-1];
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1)>>1;
        y = x;
        while (z < y) {
            y = z;
            z = (x/z + z)>>1;
        }
    }    

    receive() external payable {}
}
