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
}