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
    console.log('this.gittokenContract', _this.gittokenContract);
    var _gittokenContract = _this.gittokenContract,
        abi = _gittokenContract.abi,
        unlinked_binary = _gittokenContract.unlinked_binary;
    var _config = _this.config,
        name = _config.name,
        symbol = _config.symbol,
        decimals = _config.decimals,
        rewardValues = _config.rewardValues,
        getRewardValues = _config.getRewardValues,
        rewardEnum = _config.rewardEnum;

    _this.eth.getBalanceAsync(_this.ks.getAddresses()[0]).then(function (balance) {
      if (balance.toNumber() < 18e14) {
        // console.log('call faucet')
        return _this.faucet();
      } else {
        return null;
      }
    }).then(function () {
      var rewards = getRewardValues(rewardValues);
      var params = [name];
      // console.log('createGitTokenContract::params', params)
      return _this.eth.contract(abi).new.getData(234, {
        data: unlinked_binary,
        from: '' + _this.ks.getAddresses()[0]
      });
    }).then(function (rawData) {
      console.log('rawData', rawData);
      return _this.signTransaction({
        to: null,
        from: _this.ks.getAddresses()[0], //`0x${}`,
        value: 0,
        gasLimit: 3e6,
        data: rawData
      });
    }).then(function (signedTx) {
      // console.log('createGitTokenContract::signedTx', signedTx)
      return _this.eth.sendRawTransactionAsync(signedTx);
    }).then(function (txHash) {
      // console.log('createGitTokenContract::txHash', txHash)
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      console.log('createGitTokenContract::txReceipt', txReceipt);
      _this.contractDetails = { txReceipt: txReceipt };
      console.log('txReceipt[\'contractAddress\']', txReceipt['contractAddress']);
      return _this.eth.contract(abi).at(txReceipt['contractAddress']).number.call
      // }).then((gittokenContract) => {
      //   // console.log('createGitTokenContract::gittokenContract', gittokenContract)
      //   this.gittokenContract = gittokenContract
      //   // console.log('createGitTokenContract::this.gittokenContract', this.gittokenContract)
      //   return Promise.delay(1000, gittokenContract.number.call({ from: `0x${this.ks.getAddresses()[0]}`})) // setRewardValue.getData(0, 250)
      ();
    }).then(function (number) {
      console.log('createGitTokenContract::number', number
      // }).then((data) => {
      //   return this.signTransaction({
      //     from: `0x${this.ks.getAddresses()[0]}`,
      //     to: this.gittokenContract.address,
      //     data,
      //     gasLimit: 3e6
      //   })
      // }).then((signedTx) => {
      //   return this.eth.sendRawTransactionAsync(signedTx)
      // }).then((txHash) => {
      //   return this.getTransactionReceipt(txHash)
      // }).then((txReceipt) => {
      //   console.log('createGitTokenContract::txReceipt', txReceipt)
      //   return this.gittokenContract.getRewardValue.call(0)
      // }).then((rewardValue) => {
      //   console.log('createGitTokenContract::rewardValue', rewardValue)
      //   return this.generateReward({
      //     rewardType: 'ping',
      //     contributorAddress: '0xf1dca2634b48a8a22f1fd73918f4db5aa86d3efb' // get this programmatically from ping event
      //   })
      // }).then(() => {
      //   return this.gittokenContract.totalSupply.call()
      // }).then((totalSupply) => {
      //   this.contractDetails = {
      //     ...this.contractDetails,
      //     totalSupply
      //   }
      );return _this.saveContractDetails({});
    }).then(function (contractDetails) {
      resolve(contractDetails);
    }).catch(function (error) {
      reject(error
      // console.log('error', error);
      // if (error.message.match(RegExp(`sender doesn't have enough`))) {
      //   console.log('call faucet service for ether')
      //   this.faucet().then((data) => {
      //     console.log('data', data)
      //     // re-enter this function to recall the contract creation
      //     return Promise.delay(1000, this.createGitTokenContract())
      //   }).then((contractDetails) => {
      //     resolve(contractDetails)
      //   }).catch((error) => {
      //     reject(error)
      //   })
      // } else {
      //   reject(error)
      // }
      );
    });
  });
}