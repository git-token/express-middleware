pragma solidity ^0.4.11;

import './GitTokenLib.sol';
import './Ownable.sol';

contract GitToken is Ownable {

  using GitTokenLib for GitTokenLib.Data;
  GitTokenLib.Data gittoken;

  event Approval(address indexed owner, address indexed spender, uint value);
  event Transfer(address indexed from, address indexed to, uint value);
  event Contribution(address indexed contributor, uint value);

  function GitToken(string _email, string _organization, string _repoUri) {
    gittoken.organization = _organization;
    gittoken.repoUri = _repoUri;
    gittoken.totalSupply = 0;

    // Set initial contributor email & address
    gittoken.contributorEmails[msg.sender] = _email;
    gittoken.contributorAddresses[_email] = msg.sender;

    // Set default rewardValues

  }

  function totalSupply() constant returns (uint) {
    return gittoken.totalSupply;
  }

  /*
   * ERC20 Methods
   */
  function transfer(address _to, uint _value) public onlyPayloadSize(2 * 32) returns (bool) {
    if(!gittoken._transfer(_to, _value)) {
      throw;
    } else {
      Transfer(msg.sender, _to, _value);
    }
  }

  function balanceOf(address _contributor) constant returns (uint) {
    return gittoken.balances[_contributor];
  }

  function transferFrom(address _from, address _to, uint _value) public onlyPayloadSize(3 * 32) {
    if(!gittoken._transferFrom(_from, _to, _value)) {
      throw;
    } else {
      Transfer(_from, _to, _value);
    }
  }

  function approve(address _spender, uint _value) public onlyPayloadSize(2 * 32) {
    // Explicitly check if the approved address already has an allowance,
    // Ensure the approver must reset the approved value to 0 before changing to
    // the desired amount if.
    // see: https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
    if(_value > 0 && gittoken.allowed[msg.sender][_spender] > 0) {
      throw;
    } else {
      gittoken.allowed[msg.sender][_spender] = _value;
      Approval(msg.sender, _spender, _value);
    }
  }

  function allowance(address _owner, address _spender) constant returns (uint) {
    return gittoken.allowed[_owner][_spender];
  }


  /**
   * GitToken Setter (State Changing) Functions
   */
  function setRewardValue(
    uint256 _rewardValue,
    string _rewardType
  ) public returns (bool) {
    gittoken.rewardValues[_rewardType] = _rewardValue;
    return true;
  }

  function verifyContributor(string _email, bytes32 _hashedCode) onlyOwner public returns (bool) {
    gittoken.emailVerification[_email] = _hashedCode;
  }

  function setContributor(string _email, bytes32 _code) public returns (bool) {
    if (!gittoken._setContributor(_email, _code)) {
      throw;
    } else {
      return true;
    }
  }

  function rewardContributor(
    string _email,
    string _rewardType
  ) public returns (bool) {
    if(!gittoken._rewardContributor(_email, _rewardType)) {
      throw;
    } else {
      address _contributor = gittoken.contributorAddresses[_email];
      uint _value = gittoken.rewardValues[_rewardType];
      Contribution(_contributor, _value);
      return true;
    }
  }


  /**
   * GitToken Getter Functions
   */

  function getRewardDetails(string _rewardType) constant returns (uint256) {
    return gittoken.rewardValues[_rewardType];
  }

  function getContributorAddress(string _email) constant returns (address) {
    return gittoken.contributorAddresses[_email];
  }

  function getUnclaimedRewards(string _email) constant returns (uint) {
    return gittoken.unclaimedRewards[_email];
  }

  /**
   * @dev Fix for the ERC20 short address attack.
   */
  modifier onlyPayloadSize(uint size) {
     if(msg.data.length < size + 4) {
       throw;
     }
     _;
  }


}
