pragma solidity ^0.4.11;

import './zeppelin/SafeMath.sol';

library GitTokenLib {
    using SafeMath for uint;

    struct Data {
      uint totalSupply;
      mapping(address => bool) owners;
      mapping(address => uint) contributed;
      mapping(uint => uint) rewards;
      mapping(address => uint) balances;
    }

    event Test(bool success, uint amount);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    function setup(Data storage self, uint[] _config) internal returns (bool) {
      if (_config.length == 0) { throw; }
      for(var i = 0; i < _config.length; i++ ) {
        self.rewards[i] = _config[i]; // map index value of _config uint[] to reward value at index enumerator
        if (i == (_config.length - 1)) {
          return true;
        }
      }
    }

    function test(Data storage self, address _owner, uint _value) internal returns (bool) {
      self.owners[_owner] = true;
      self.contributed[_owner] += _value;
      Test(true, _value);
      return true;
    }

    function generateReward(Data storage self, uint _rewardType, address _contributor ) internal returns (bool) {
      self.totalSupply = self.totalSupply.add(self.rewards[_rewardType]);
      if (_contributor != 0x0) {
        self.balances[_contributor] = self.balances[_contributor].add(self.rewards[_rewardType]);
      }
      return true;
    }

    function getAmountContributed(Data storage self, address _owner) internal returns (uint) {
      return self.contributed[_owner];
    }



}






/**
 *  Rewards mapped to _config array
 * @notice
 * _config[] -- commitComment | Any time a Commit is commented on.
 * _config[] -- create | Any time a Branch or Tag is created.
 * _config[] -- delete | Any time a Branch or Tag is deleted.
 * _config[] -- deployment | Any time a Repository has a new deployment created from the API.
 * _config[] -- deploymentStatus | Any time a deployment for a Repository has a status update from the API.
 * _config[] -- fork | Any time a Repository is forked.
 * _config[] -- gollum | Any time a Wiki page is updated.
 * _config[] -- installation | Any time a GitHub App is installed or uninstalled.
 * _config[] -- installationRepositories | Any time a repository is added or removed from an installation.
 * _config[] -- issueComment | Any time a comment on an issue is created, edited, or deleted.
 * _config[] -- issues | Any time an Issue is assigned, unassigned, labeled, unlabeled, opened, edited, milestoned, demilestoned, closed, or reopened.
 * _config[] -- label | Any time a Label is created, edited, or deleted.
 * _config[] -- marketplacePurchase | Any time a user purchases, cancels, or changes their GitHub Marketplace plan.
 * _config[] -- member | Any time a User is added or removed as a collaborator to a Repository, or has their permissions modified.
 * _config[] -- membership | Any time a User is added or removed from a team. Organization hooks only.
 * _config[] -- milestone | Any time a Milestone is created, closed, opened, edited, or deleted.
 * _config[] -- organization | Any time a user is added, removed, or invited to an Organization. Organization hooks only.
 * _config[] -- orgBlock | Any time an organization blocks or unblocks a user. Organization hooks only.
 * _config[] -- pageBuild | Any time a Pages site is built or results in a failed build.
 * _config[] -- projectCard | Any time a Project Card is created, edited, moved, converted to an issue, or deleted.
 * _config[] -- projectColumn | Any time a Project Column is created, edited, moved, or deleted.
 */
