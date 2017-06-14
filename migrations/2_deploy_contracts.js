var GitTokenLib = artifacts.require("./GitTokenLib.sol");
var GitToken = artifacts.require("./GitToken.sol");

module.exports = function(deployer) {
  deployer.deploy(GitTokenLib);
  deployer.link(GitTokenLib, GitToken);
  deployer.deploy(GitToken);
};
