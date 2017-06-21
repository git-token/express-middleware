const Promise = require('bluebird')
const join = Promise.join
const GitTokenLib = artifacts.require("./GitTokenLib.sol");
const GitToken = artifacts.require("./GitToken.sol");
const config = require('../src/defaultConfig')

module.exports = function(deployer, network, accounts) {
  console.log('accounts', accounts);
  let gittoken
  let email = 'ryan.michael.tate@gmail.com'
  deployer.deploy(GitTokenLib);
  deployer.link(GitTokenLib, GitToken);
  GitToken.new(email, 'GitToken', 'http://gittoken.org').then((instance) => {
    gittoken = instance
    return join(
      gittoken.setRewardValue(2500, 'ping'),
      gittoken.setRewardValue(1000, 'push')
      // gittoken.setContributorAddress(email)
    )
  }).then((txReceipts) => {
    console.log('txReceipts::1', txReceipts)
    return join(
      gittoken.getContributorAddress(email),
      gittoken.getRewardDetails('ping')
    );
  }).then((data) => {
    console.log('data', data)
    return join(
      gittoken.rewardContributor(email, 'ping'),
      gittoken.rewardContributor('test@test.com', 'push')
    );
  }).then((txReceipts) => {
    console.log('txReceipts::2', txReceipts)
    const { receipt: { logs } } = txReceipts[0]
    console.log('logs', logs)
    return join(
      gittoken.totalSupply(),
      gittoken.balanceOf(accounts[0]),
      gittoken.getUnclaimedRewards('test@test.com')
    )
  }).then((data) => {
    console.log('data', data)
  }).catch((error) => {
    console.log('error', error)
  });
};
