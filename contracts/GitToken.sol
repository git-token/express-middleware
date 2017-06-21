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

    // Set default rewardValues -- Note, these values are not solidified and are untested as to their effectiveness of incentivization;
    // These values are customizable using setRewardValue(uint256 value, string type)
    gittoken.rewardValues['ping']                     = 2500; // Use when setting up the webhook for github
    gittoken.rewardValues['push']                     = 1000;
    gittoken.rewardValues['commitComment']            = 250; // Any time a Commit is commented on.
    gittoken.rewardValues['create']                   = 2500; // Any time a Branch or Tag is created.
    gittoken.rewardValues['delete']                   = 0; // Any time a Branch or Tag is deleted.
    gittoken.rewardValues['deployment']               = 5000; // Any time a Repository has a new deployment created from the API.
    gittoken.rewardValues['deploymentStatus']         = 100; // Any time a deployment for a Repository has a status update
    gittoken.rewardValues['fork']                     = 5000; // Any time a Repository is forked.
    gittoken.rewardValues['gollum']                   = 250; // Any time a Wiki page is updated.
    gittoken.rewardValues['installation']             = 250; // Any time a GitHub App is installed or uninstalled.
    gittoken.rewardValues['installationRepositories'] = 1000; // Any time a repository is added or removed from an organization (? check this)
    gittoken.rewardValues['issueComment']             = 250; // Any time a comment on an issue is created, edited, or deleted.
    gittoken.rewardValues['issues']                   = 100; // Any time an Issue is assigned, unassigned, labeled, unlabeled, opened, edited,
    gittoken.rewardValues['label']                    = 100; // Any time a Label is created, edited, or deleted.
    gittoken.rewardValues['marketplacePurchase']      = 0; // Any time a user purchases, cancels, or changes their GitHub
    gittoken.rewardValues['member']                   = 1000; // Any time a User is added or removed as a collaborator to a Repository, or has
    gittoken.rewardValues['membership']               = 1000; // Any time a User is added or removed from a team. Organization hooks only.
    gittoken.rewardValues['milestone']                = 15000; // Any time a Milestone is created, closed, opened, edited, or deleted.
    gittoken.rewardValues['organization']             = 1000; // Any time a user is added, removed, or invited to an Organization.
    gittoken.rewardValues['orgBlock']                 = 0; // Any time an organization blocks or unblocks a user. Organization hooks only.
    gittoken.rewardValues['pageBuild']                = 500; // Any time a Pages site is built or results in a failed build.
    gittoken.rewardValues['projectCard']              = 250; // Any time a Project Card is created, edited, moved, converted to an issue,
    gittoken.rewardValues['projectColumn']            = 250; // Any time a Project Column is created, edited, moved, or deleted.


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

  function setContributor(string _email, string _code) public returns (bool) {
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
