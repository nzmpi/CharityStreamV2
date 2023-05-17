//SPDX-License-Identifier: MIT 
pragma solidity 0.8.19;

interface IErrors {
  error CampaignEnded();
  error CampaignIsActive();
  error CampaignIsNotActive();
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
  error NotReceiver();
  error DurationIsZero();
  error FeeTooHigh();
}