//SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

/**
 * @title CharityStream is a contract that allows to create charity campaigns.
 * @author devorsmth.eth
 */
contract CharityStream {
    address public owner;
    uint256 public idCampaign;
    uint256 public fee;

    enum Status {Zero, Active, Finished}

    struct Campaign {
        Status status;
        uint32 endTime; 
        uint32 quorum;
        address owner;
        uint128 amountGoal;
        uint128 amountReceived;
        string name;
    }

    struct Proposition {
        Status status;
        uint32 paymentDuration;
        uint32 voteEndTime;
        uint32 numberOfVoters;
        uint128 amount;
        uint128 ayes;
        uint128 nays;
        string description;
        mapping (address => bool) hasVoted;
    }

    /**
     * @dev no mapping
     */
    struct PropositionShort {
        Status status;
        uint32 paymentDuration;
        uint32 voteEndTime;
        uint32 numberOfVoters;
        uint128 amount;
        uint128 ayes;
        uint128 nays;
        string description;
    }

    struct Stream {
        uint32 startTime;
        uint32 endTime;
        address receiver;
        uint128 flow;
        uint128 withdrawn;
    }

    mapping (uint256 => Campaign) idToCampaign;
    mapping (uint256 => address[]) idToBackers;
    // backer => idCampaign => amount
    mapping (address => mapping(uint256 => uint128)) public donations;
    mapping (address => uint128) refunds;
    // idCampaign => idProposition count
    mapping (uint256 => uint256) idProposition;
    mapping (uint256 => Proposition[]) idToProposition;

    Stream[] streams; 

    constructor() {
        owner = msg.sender;
    }

    modifier onlyCampaignOwner(uint256 _idCampaign) {
        if (msg.sender != idToCampaign[_idCampaign].owner) revert NotOwner();
        _;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    /**
     * @dev default duration is 4 weeks
     */
    function createCampaign(
        string memory _name, 
        uint128 _amount, 
        uint256 _duration
    ) external {
        if (_duration == 0) _duration = 4 weeks;
        if (_amount == 0) revert AmountIsZero();
        uint32 endTime = uint32(block.timestamp + _duration);
        Campaign memory campaign = Campaign(
            Status.Active,
            endTime,
            0,
            msg.sender,
            _amount,
            0,
            _name
        );
        idToCampaign[idCampaign] = campaign;
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
        if (idToCampaign[_idCampaign].status != Status.Active) revert CampaignIsNotActive();
        if (idToCampaign[_idCampaign].endTime < block.timestamp) revert CampaignEnded();
        idToCampaign[_idCampaign].amountReceived += uint128(msg.value);
        donations[msg.sender][_idCampaign] += uint128(msg.value);
        idToBackers[_idCampaign].push(msg.sender);  
        emit donationEvent(msg.sender, _idCampaign, msg.value); 
    }

    function stopAndRefundCampaign(uint256 _idCampaign) external {
        if (msg.sender != idToCampaign[_idCampaign].owner && msg.sender != owner) revert NotOwner();
        if (idToCampaign[_idCampaign].status != Status.Active) revert CampaignIsNotActive();
        if (idToCampaign[_idCampaign].status == Status.Finished) revert CampaignIsFinished();
        idToCampaign[_idCampaign].status = Status.Finished;
        address[] memory backers = idToBackers[_idCampaign];
        for (uint256 i; i < backers.length; ++i) {
            refunds[backers[i]] += donations[backers[i]][_idCampaign];
            delete donations[backers[i]][_idCampaign];
        }
        delete idToBackers[_idCampaign];
        //delete idToCampaign[_idCampaign];
        emit stopAndRefundCampaignEvent(msg.sender, _idCampaign);
    }

    function withdrawRefunds() external {
        uint256 refund = refunds[msg.sender];
        if(refund == 0) revert NoRefund();
        delete refunds[msg.sender];
        (bool sent,) = msg.sender.call{value: refund}("");
        if(!sent) revert NoRefund();
        emit refundEvent(msg.sender, refund);
    }

    /**
     * @dev Finish a campaign, pay fees and get quorum
     */
    function finishCampaign(uint256 _idCampaign) external onlyCampaignOwner(_idCampaign) {
        if (idToCampaign[_idCampaign].status != Status.Active) revert CampaignIsNotActive();
        if (idToCampaign[_idCampaign].status == Status.Finished) revert CampaignIsFinished();
        if (idToCampaign[_idCampaign].endTime >= block.timestamp) revert CampaignIsActive();
        idToCampaign[_idCampaign].status = Status.Finished;
        uint256 amount = idToCampaign[_idCampaign].amountReceived;
        // 0.5% fee
        fee += amount*5/1000;
        idToCampaign[_idCampaign].amountReceived = uint128(amount - fee);
        // 30% quorum + 1
        idToCampaign[_idCampaign].quorum = uint32(idToBackers[_idCampaign].length*300/1000) + 1;
        emit finishCampaignEvent(_idCampaign, amount-fee);
    }

    function newProposition(
        uint256 _idCampaign,
        string memory _description,
        uint128 _amount,
        uint32 _paymentDuration,
        uint32 _voteDuration
    ) external onlyCampaignOwner(_idCampaign) {
        if (idToCampaign[_idCampaign].status != Status.Finished) revert CampaignIsNotFinished();
        if (_amount > idToCampaign[_idCampaign].amountReceived) revert NotEnoughFunds();
        if (_paymentDuration == 0) revert DurationIsZero();
        if (_voteDuration == 0) revert DurationIsZero();
        uint256 idProposition_ = idProposition[_idCampaign];
        uint32 voteEndTime = uint32(block.timestamp) + _voteDuration;
        idToProposition[_idCampaign].push();
        idToProposition[_idCampaign][idProposition_].status = Status.Active;
        idToProposition[_idCampaign][idProposition_].paymentDuration = _paymentDuration;
        idToProposition[_idCampaign][idProposition_].voteEndTime = voteEndTime;
        idToProposition[_idCampaign][idProposition_].amount = _amount;
        idToProposition[_idCampaign][idProposition_].description = _description;
        emit newPropositionEvent(
            msg.sender, 
            _idCampaign, 
            idProposition_, 
            _description, 
            _amount, 
            _paymentDuration, 
            voteEndTime
        );
        ++idProposition[_idCampaign];
    }

    /**
     * @dev If voting is successful (qurorum met) and 
     * ayes are (50% + 1), create a stream
     */
    function endProposition(uint256 _idCampaign, uint256 _idProposition) external onlyCampaignOwner(_idCampaign) {
        if (idToProposition[_idCampaign][_idProposition].status != Status.Active) revert PropositionIsNotActive();
        if (idToProposition[_idCampaign][_idProposition].status == Status.Finished) revert PropositionIsFinished();
        if (idToProposition[_idCampaign][_idProposition].voteEndTime > block.timestamp) revert VotingIsActive();
        idToProposition[_idCampaign][_idProposition].status = Status.Finished;
        if (idToProposition[_idCampaign][_idProposition].numberOfVoters < idToCampaign[_idCampaign].quorum) { 
            emit QuorumIsNotMetEvent(_idCampaign, _idProposition);
        } else {
            if (idToProposition[_idCampaign][_idProposition].ayes > idToProposition[_idCampaign][_idProposition].nays) { 
                uint128 amount = idToProposition[_idCampaign][_idProposition].amount;               
                idToCampaign[_idCampaign].amountReceived -= amount;                               
                createStream(
                    amount, 
                    idToProposition[_idCampaign][_idProposition].paymentDuration
                );
                emit PropositionIsApprovedEvent(_idCampaign, _idProposition);
            } else {
                emit PropositionIsNotApprovedEvent(_idCampaign, _idProposition);
            }
        }
        //delete idToProposition[_idCampaign][_idProposition];
    }

    function vote(
        uint256 _idCampaign, 
        uint256 _idProposition, 
        bool _decision
    ) external {
        uint128 donation = donations[msg.sender][_idCampaign];
        if (donation == 0) revert NotBacker();
        if (idToProposition[_idCampaign][_idProposition].voteEndTime < block.timestamp) revert VotingEnded();
        if (idToProposition[_idCampaign][_idProposition].hasVoted[msg.sender] == true) revert AlreadyVoted();
        idToProposition[_idCampaign][_idProposition].hasVoted[msg.sender] = true;
        ++idToProposition[_idCampaign][_idProposition].numberOfVoters;
        uint128 votePower = sqrt(donation);
        if (_decision) {
            idToProposition[_idCampaign][_idProposition].ayes += votePower;
        } else {
            idToProposition[_idCampaign][_idProposition].nays += votePower;
        }

        emit voteEvent(msg.sender, _idCampaign, _idProposition, _decision, votePower);
    }

    function createStream(uint128 _amount, uint32 _paymentDuration) internal {
        uint128 flow = _amount/_paymentDuration;
        streams.push(Stream(
            uint32(block.timestamp),
            uint32(block.timestamp + _paymentDuration),
            msg.sender,
            flow,
            0
        ));
        emit createStreamEvent(msg.sender, streams.length-1, flow);
    }

    function withdrawFunds(uint256 idStream) external {
        Stream memory stream = streams[idStream];
        if (msg.sender != stream.receiver) revert NotReceiver();
        uint128 payment = getPayment(stream);
        if (payment != 0) {
            unchecked{streams[idStream].withdrawn += payment;}
            (bool sent,) = stream.receiver.call{value: payment}("");
            if (!sent) revert NoWithdraw();
        } else {
            revert NotEnoughFunds();
        }
    }

    function getPayment(Stream memory _stream) internal view returns (uint128){
        uint256 delta;
        if (block.timestamp < _stream.endTime) {
            delta = block.timestamp - _stream.startTime;
        } else {
            delta = _stream.endTime - _stream.startTime;
        }

        return uint128(delta*_stream.flow) - _stream.withdrawn;
    }

    function withdrawFee() external onlyOwner() {
        uint256 fee_ = fee;
        if (fee_ == 0) revert NoWithdraw();
        delete fee;
        (bool sent,) = owner.call{value: fee_}("");
        if (!sent) revert NoWithdraw();
        emit withdrawEvent(msg.sender, fee_);
    }

    function transferOwnership(address _newOwner) external onlyOwner() {
        owner = _newOwner;
        emit transferOwnershipEvent(msg.sender, _newOwner);
    }

    function getNumberOfStreams() external view returns (uint256) {
        return streams.length;
    }

    function getRefunds(address _addr) external view returns (uint256) {
        return refunds[_addr];
    }

    function getCampaign(uint256 _idCampaign) external view returns (Campaign memory) {
        return idToCampaign[_idCampaign];
    }

    function getProposition(
        uint256 _idCampaign, 
        uint256 _idProposition
    ) external view returns (PropositionShort memory PS) {
        PS.status = idToProposition[_idCampaign][_idProposition].status;
        PS.paymentDuration = idToProposition[_idCampaign][_idProposition].paymentDuration;
        PS.voteEndTime = idToProposition[_idCampaign][_idProposition].voteEndTime;
        PS.numberOfVoters = idToProposition[_idCampaign][_idProposition].numberOfVoters;
        PS.amount = idToProposition[_idCampaign][_idProposition].amount;
        PS.ayes = idToProposition[_idCampaign][_idProposition].ayes;
        PS.nays = idToProposition[_idCampaign][_idProposition].nays;
        PS.description = idToProposition[_idCampaign][_idProposition].description;        
    }

    function getStream(uint256 _idStream) external view returns (Stream memory) {
        return streams[_idStream];
    }

    function sqrt(uint128 x) internal pure returns (uint128 y) {
        uint128 z = (x + 1)/2;
        y = x;
        while (z < y) {
            y = z;
            z = (x/z + z)/2;
        }
    }

    event campaignCreatedEvent(
        address indexed creator, 
        uint256 indexed idCampaign, 
        uint32 endTime, 
        uint128 amount, 
        string name
    );
    event donationEvent(address indexed backer, uint256 indexed idCampaign, uint256 amount);
    event stopAndRefundCampaignEvent(address indexed creator, uint256 indexed idCampaign);
    event refundEvent(address indexed backer, uint256 amount);
    event withdrawEvent(address indexed owner, uint256 amount);
    event transferOwnershipEvent(address indexed oldOwner, address indexed newOwner);
    event finishCampaignEvent(uint256 indexed idCampaign, uint256 amount);
    event newPropositionEvent(
        address indexed owner, 
        uint256 indexed idCampaign, 
        uint256 indexed idProposition, 
        string description, 
        uint256 amount, 
        uint32 paymentDuration, 
        uint32 voteDuration
    );
    event voteEvent(address indexed voter, uint256 indexed idCampaign, uint256 indexed idProposition, bool decision, uint128 votePower);
    event PropositionIsApprovedEvent(uint256 indexed idCampaign, uint256 indexed idProposition);
    event PropositionIsNotApprovedEvent(uint256 indexed idCampaign, uint256 indexed idProposition);
    event QuorumIsNotMetEvent(uint256 indexed idCampaign, uint256 indexed idProposition);
    event createStreamEvent(address indexed receiver, uint256 indexed idStream, uint128 flow);

    error CampaignEnded();
    error CampaignIsActive();
    error CampaignIsNotActive();
    error CampaignIsFinished();
    error CampaignIsNotFinished();
    error AmountIsZero();
    error NotOwner();
    error NoRefund();
    error NoWithdraw();
    error NotEnoughFunds();
    error NotBacker();
    error AlreadyVoted();
    error VotingEnded();
    error VotingIsActive();
    error PropositionIsNotActive();
    error PropositionIsFinished();
    error NotReceiver();
    error DurationIsZero();

    receive() external payable {}
    fallback() external payable {}
}
