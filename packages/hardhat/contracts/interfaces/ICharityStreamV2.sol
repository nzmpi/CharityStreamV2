//SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

import "./IErrors.sol";
import "./IEvents.sol";

interface ICharityStreamV2 is IErrors, IEvents {
  function createCampaign(
    string memory _name, 
    uint128 _amount, 
    uint256 _duration
  ) external;
  function donate(uint256 _idCampaign) external payable;
  function stopAndRefundCampaign(uint256 _idCampaign) external;
  function withdrawRefunds() external;
  function finishCampaign(uint256 _idCampaign) external;
  function newProposition(
    uint256 _idCampaign,
    string memory _description,
    uint128 _amount,
    uint32 _paymentDuration,
    uint32 _voteDuration
  ) external;
  function vote(
    uint256 _idCampaign, 
    uint256 _idProposition, 
    bool _decision
  ) external;
  function endProposition(uint256 _idCampaign, uint256 _idProposition) external;
  function withdrawFunds(uint256 idStream) external;
  function setFee(uint16 _newFee) external payable;
  function withdrawFee() external payable;
  function transferOwnership(address _newOwner) external payable;
  function acceptOwnership() external payable;
  function getNumberOfStreams() external view returns (uint256);
  function getRefunds(address _addr) external view returns (uint256);
  function getCampaign(uint256 _idCampaign) external view returns (Campaign memory);
  function getBackedCampaigns(address _backer) external view returns (uint256[] memory);
  function getProposition(
    uint256 _idCampaign, 
    uint256 _idProposition
  ) external view returns (Proposition memory);
  function getStream(uint256 _idStream) external view returns (Stream memory);

  enum Status {NotActive, Active, Finished, Refunded}

  struct Campaign {
    Status status;
    uint32 endTime; 
    uint64 quorum;
    address owner;
    uint128 amountGoal;
    uint128 amountReceived;
    uint128 amountLeft;
    uint128 idProposition;
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
  }

  struct LatestProposition {
    uint128 idCampaign;
    uint128 idProposition;    
  }

  struct Stream {
    uint32 startTime;
    uint32 endTime;
    uint32 lastWithdrawTime;
    address receiver;
    uint128 flow;
    uint128 leftAmount;
  }
}