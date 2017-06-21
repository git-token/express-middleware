pragma solidity ^0.4.11;

import './GitTokenLib.sol';
import './Ownable.sol';

contract GitToken is Ownable {

  using GitTokenLib for GitTokenLib.Data;
  GitTokenLib.Data gittoken;

  event Approval(address indexed owner, address indexed spender, uint value);
  event Transfer(address indexed from, address indexed to, uint value);
  event Contribution(address indexed contributor, uint value);

  enum ContributionType {
    ping,
    push
  }

  function GitToken() {
    gittoken.totalSupply = 0;
  }

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

  function setRewardValue(
    ContributionType _contributionType,
    uint256 _rewardValue,
    string _rewardType
  ) public returns (bool) {
    gittoken.rewardValues[uint(_contributionType)] = _rewardValue;
    gittoken.rewardTypes[uint(_contributionType)] = _rewardType;
    return true;
  }

  function getRewardDetails(ContributionType _contributionType) constant returns (string, uint256) {
    return (
      gittoken.rewardTypes[uint(_contributionType)],
      gittoken.rewardValues[uint(_contributionType)]
    );
  }

  function rewardContributor(string _contributorEmail, ContributionType _contributionType) public returns (bool) {
    if(!gittoken._rewardContributor(_contributorEmail, uint(_contributionType))) {
      throw;
    } else {
      address _contributor = gittoken.contributorAddresses[_contributorEmail];
      uint _value = gittoken.rewardValues[uint(_contributionType)];
      Contribution(_contributor, _value);
      return true;
    }
  }

  function setContributorAddress(string _contributorEmail) public returns (bool) {
    gittoken.contributorEmails[msg.sender] = _contributorEmail;
    gittoken.contributorAddresses[_contributorEmail] = msg.sender;
    return true;
  }

  function getContributorAddress(string _contributorEmail) constant returns (address) {
    return gittoken.contributorAddresses[_contributorEmail];
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
