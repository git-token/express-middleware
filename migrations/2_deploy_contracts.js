const Promise = require('bluebird')
const join = Promise.join
const GitTokenLib = artifacts.require("./GitTokenLib.sol");
const GitToken = artifacts.require("./GitToken.sol");
const config = require('../src/defaultConfig')

module.exports = function(deployer, accounts) {
  console.log('accounts', accounts);
  let gittoken
  let email = 'ryan.michael.tate@gmail.com'
  deployer.deploy(GitTokenLib);
  deployer.link(GitTokenLib, GitToken);
  GitToken.new().then((instance) => {
    gittoken = instance
    return join(
      gittoken.setRewardValue(0, 1000, 'push'),
      gittoken.setContributorAddress(email)
    )
  }).then((txReceipts) => {
    console.log('txReceipts::1', txReceipts)
    return join(
      gittoken.getContributorAddress(email),
      gittoken.getRewardDetails(0)
    );
  }).then((data) => {
    console.log('data', data)
    return join(
      gittoken.rewardContributor(email, 0)
    );
  }).then((txReceipts) => {
    console.log('txReceipts::2', txReceipts)
  }).catch((error) => {
    console.log('error', error)
  });
};
