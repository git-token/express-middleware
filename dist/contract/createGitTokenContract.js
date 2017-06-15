'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGitTokenContract;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGitTokenContract() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var _gittokenContract = _this.gittokenContract,
        abi = _gittokenContract.abi,
        unlinked_binary = _gittokenContract.unlinked_binary;

    _bluebird2.default.resolve().then(function () {
      var _eth$contract$new;

      var _config = _this.config,
          name = _config.name,
          symbol = _config.symbol,
          decimals = _config.decimals,
          rewardValues = _config.rewardValues;
      // console.log('createGitTokenContract::rewardValues()', rewardValues())

      var rewards = rewardValues();
      var params = [name, symbol, decimals, rewards];
      console.log('createGitTokenContract::params', params);
      return (_eth$contract$new = _this.eth.contract(abi).new).getData.apply(_eth$contract$new, params.concat([{
        data: unlinked_binary
      }]));
    }).then(function (rawData) {
      return _this.signTransaction({
        to: null,
        from: _this.ks.getAddresses()[0],
        value: 0,
        gasLimit: 3e6,
        data: rawData
      });
    }).then(function (signedTx) {
      return _this.eth.sendRawTransactionAsync(signedTx);
    }).then(function (txHash) {
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      return _this.eth.contract(abi).at(txReceipt['contractAddress']);
    }).then(function (gittokenContract) {
      _this.gittokenContract = gittokenContract;
      var rewardEnum = _this.config.rewardEnum;

      return (0, _bluebird.join)(_this.generateReward({
        rewardType: 'ping',
        contributorAddress: '0xf1dca2634b48a8a22f1fd73918f4db5aa86d3efb' // get this programmatically from ping event
      }));
    }).then(function (data) {
      console.log('createGitTokenContract::data', data);
      return _this.saveContractDetails({
        contractDetails: null
      });
    }).then(function (details) {
      resolve(details);
    }).catch(function (error) {
      reject(error);
    });
  });
}