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

    var from = '0x' + _this.ks.getAddresses()[0];
    console.log('from', from);
    _this.eth.getBalanceAsync(from).then(function (balance) {
      if (balance.toNumber() < 18e14) {
        console.log('call faucet');
        return _this.faucet();
      } else {
        return null;
      }
    }).then(function () {
      var _eth$contract$new;

      var _config = _this.config,
          contributor = _config.contributor,
          name = _config.name,
          username = _config.username,
          organization = _config.organization,
          symbol = _config.symbol,
          decimals = _config.decimals;

      var params = [contributor, name, username, organization, symbol, decimals];
      // console.log('params', params)
      return (_eth$contract$new = _this.eth.contract(abi).new).getData.apply(_eth$contract$new, params.concat([{
        from: from,
        data: unlinked_binary
      }]));
    }).then(function (data) {
      return _this.signTransaction({
        from: from,
        data: data,
        gasLimit: 4e6,
        value: 0
      });
    }).then(function (signedTx) {
      return _this.eth.sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      _this.contractDetails = { txReceipt: txReceipt };
      return _this.saveContractDetails({});
    }).then(function (contractDetails) {
      var contractAddress = contractDetails['txReceipt'].contractAddress;

      return _this.configureAnalytics({
        web3Provider: _this.web3Provider,
        contractAddress: contractAddress,
        abi: abi
      });
    }).then(function (configured) {
      resolve(_this.contractDetails);
    }).catch(function (error) {
      // console.log('createGitTokenContract::error', error)
      reject(error);
    });
  });
}