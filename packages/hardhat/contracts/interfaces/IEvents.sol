//SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

interface IEvents {
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
  event finishCampaignEvent(uint256 indexed idCampaign, uint256 amount);
  event newPropositionEvent(
    address indexed owner, 
    uint256 indexed idCampaign, 
    uint256 indexed idProposition, 
    string description, 
    uint256 amount, 
    uint32 paymentDuration, 
    uint32 voteEndTime
  );
  event voteEvent(address indexed voter, uint256 indexed idCampaign, uint256 indexed idProposition, bool decision, uint128 votePower);
  event quorumIsNotMetEvent(address indexed creator, uint256 indexed idCampaign, uint256 indexed idProposition);
  event propositionIsApprovedEvent(address indexed creator, uint256 indexed idCampaign, uint256 indexed idProposition);
  event propositionIsNotApprovedEvent(address indexed creator, uint256 indexed idCampaign, uint256 indexed idProposition);
  event createStreamEvent(address indexed receiver, uint256 indexed idStream, uint128 flow, uint128 funds);
  event fundsWithrawnEvent(address receiver, uint256 idStream, uint128 payment);
  event newFeeEvent(uint256 oldFee, uint256 newFee);
  event withdrawEvent(address indexed owner, uint256 amount);
  event transferOwnershipEvent(address indexed oldOwner, address indexed newOwner);
  event acceptOwnershipEvent(address indexed newOwner);
}