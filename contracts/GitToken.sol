pragma solidity ^0.4.8;

import "./zeppelin/token/StandardToken.sol";
import "./zeppelin/ownership/Ownable.sol";
import "./GitTokenLib.sol";

contract GitToken is Ownable {
  using GitTokenLib for GitTokenLib.Data;
  GitTokenLib.Data gittoken;

  string public name;
  string public symbol;
  string public organization;
  uint8 public decimals;

  function GitToken(string _name, string _symbol, uint8 _decimals, uint[] _config) {
    if (!gittoken.setup(_config)) {
      throw;
    } else {
      gittoken.totalSupply = 0;
      name = _name; // name of organization token
      symbol = _symbol; // symbol of organization token
      decimals = _decimals;
    }
  }

  function totalSupply() constant returns (uint) {
    return gittoken.totalSupply;
  }

  function balanceOf(address contributor) constant returns (uint) {
    return gittoken.balances[contributor];
  }

  /*function transfer(address to, uint value) public returns (bool) {
    if(!gittoken.transfer(to, value)) {
      throw;
    } else {
      return true;
    }
  }*/

  /*function allowance(address owner, address spender) constant returns (uint);
  function transferFrom(address from, address to, uint value);
  function approve(address spender, uint value);*/


  function generateReward(uint _rewardType, address _contributor) onlyOwner public returns(bool) {
    if (!gittoken.generateReward(_rewardType, _contributor)) {
      throw; // Return the value back to the sender of the transaction
    } else {
      return true;
    }
  }

  function getRewardValue(uint _rewardType) constant public returns (uint) {
    return gittoken.rewards[_rewardType];
  }

  /*function getAmountContributed() constant public returns (uint) {
    return gittoken.getAmountContributed(msg.sender);
  }*/

  function () {
    throw;
  }
}
