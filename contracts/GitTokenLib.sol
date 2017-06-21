pragma solidity ^0.4.11;

import './SafeMath.sol';

library GitTokenLib {

  using SafeMath for uint;

  struct Data {
    uint totalSupply;
    mapping(uint256 => uint256) rewardValues;
    mapping(uint256 => string) rewardTypes;
    mapping(string => uint256) rewardEnum;
    mapping(address => string) contributorEmails;
    mapping(string => address) contributorAddresses;
    mapping(address => mapping(address => uint)) allowed;
    mapping(address => uint) balances;
  }

  /**/
  function _transfer(
    Data storage self,
    address _to,
    uint _value
  ) internal returns (bool) {
    self.balances[msg.sender] = self.balances[msg.sender].sub(_value);
    self.balances[_to] = self.balances[_to].add(_value);
    return true;
  }

  /**/
  function _transferFrom(
    Data storage self,
    address _from,
    address _to,
    uint _value
  ) internal returns (bool) {
    // Check if msg.sender has sufficient allowance;
    // Check is handled by SafeMath library _allowance.sub(_value);
    uint _allowance = self.allowed[_from][msg.sender];
    self.allowed[_from][msg.sender] = _allowance.sub(_value);

    // Update balances
    self.balances[_to] = self.balances[_to].add(_value);
    self.balances[_from] = self.balances[_from].sub(_value);

    return true;
  }

  function _rewardContributor (
    Data storage self,
    string _contributorEmail,
    uint _contributionType
  ) internal returns (bool) {
    uint _value = self.rewardValues[_contributionType];
    address _contributor = self.contributorAddresses[_contributorEmail];

    if(_value == 0 || _contributor == 0x0) {
      throw;
    } else {
      self.totalSupply = self.totalSupply.add(_value);
      self.balances[_contributor] = self.balances[_contributor].add(_value);
      return true;
    }

  }

}
