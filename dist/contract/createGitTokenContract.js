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
      console.log('createGitTokenContract::error', error);
      reject(error);
    });
  });
}

// export default function createGitTokenContract () {
//   return new Promise((resolve, reject) => {
//     console.log('this.gittokenContract', this.gittokenContract)
//     const { abi, unlinked_binary } = this.gittokenContract
//     const {
//       name, symbol, decimals, rewardValues, getRewardValues, rewardEnum
//     } = this.config
// this.eth.getBalanceAsync(this.ks.getAddresses()[0]).then((balance) => {
//   if (balance.toNumber() < 18e14) {
//     // console.log('call faucet')
//     return this.faucet()
//   } else {
//     return null
//   }
// }).then(() => {
//       const rewards = getRewardValues(rewardValues)
//       const params = [
//         name,
//         // symbol,
//         // decimals,
//         // rewards
//       ]
//       // console.log('createGitTokenContract::params', params)
//       return this.eth.contract(abi).new.getData(234, {
//         data: unlinked_binary,
//         from: `${this.ks.getAddresses()[0]}`
//       })
//
//     }).then((rawData) => {
//       console.log('rawData', rawData)
//       return this.signTransaction({
//         to: null,
//         from: this.ks.getAddresses()[0], //`0x${}`,
//         value: 0,
//         gasLimit: 3e6,
//         data: rawData
//       })
//     }).then((signedTx) => {
//       // console.log('createGitTokenContract::signedTx', signedTx)
//       return this.eth.sendRawTransactionAsync(signedTx)
//     }).then((txHash) => {
//       // console.log('createGitTokenContract::txHash', txHash)
//       return this.getTransactionReceipt(txHash)
//     }).then((txReceipt) => {
//       console.log('createGitTokenContract::txReceipt', txReceipt)
//       this.contractDetails = { txReceipt }
//       console.log(`txReceipt['contractAddress']`, txReceipt['contractAddress'])
//       return this.eth.contract(abi).at(txReceipt['contractAddress']).number.call()
//     // }).then((gittokenContract) => {
//     //   // console.log('createGitTokenContract::gittokenContract', gittokenContract)
//     //   this.gittokenContract = gittokenContract
//     //   // console.log('createGitTokenContract::this.gittokenContract', this.gittokenContract)
//     //   return Promise.delay(1000, gittokenContract.number.call({ from: `0x${this.ks.getAddresses()[0]}`})) // setRewardValue.getData(0, 250)
//     }).then((number) => {
//       console.log('createGitTokenContract::number', number)
//     // }).then((data) => {
//     //   return this.signTransaction({
//     //     from: `0x${this.ks.getAddresses()[0]}`,
//     //     to: this.gittokenContract.address,
//     //     data,
//     //     gasLimit: 3e6
//     //   })
//     // }).then((signedTx) => {
//     //   return this.eth.sendRawTransactionAsync(signedTx)
//     // }).then((txHash) => {
//     //   return this.getTransactionReceipt(txHash)
//     // }).then((txReceipt) => {
//     //   console.log('createGitTokenContract::txReceipt', txReceipt)
//     //   return this.gittokenContract.getRewardValue.call(0)
//     // }).then((rewardValue) => {
//     //   console.log('createGitTokenContract::rewardValue', rewardValue)
//     //   return this.generateReward({
//     //     rewardType: 'ping',
//     //     contributorAddress: '0xf1dca2634b48a8a22f1fd73918f4db5aa86d3efb' // get this programmatically from ping event
//     //   })
//     // }).then(() => {
//     //   return this.gittokenContract.totalSupply.call()
//     // }).then((totalSupply) => {
//     //   this.contractDetails = {
//     //     ...this.contractDetails,
//     //     totalSupply
//     //   }
//       return this.saveContractDetails({})
//     }).then((contractDetails) => {
//       resolve(contractDetails)
//     }).catch((error) => {
//       reject(error)
//       // console.log('error', error);
//       // if (error.message.match(RegExp(`sender doesn't have enough`))) {
//       //   console.log('call faucet service for ether')
//       //   this.faucet().then((data) => {
//       //     console.log('data', data)
//       //     // re-enter this function to recall the contract creation
//       //     return Promise.delay(1000, this.createGitTokenContract())
//       //   }).then((contractDetails) => {
//       //     resolve(contractDetails)
//       //   }).catch((error) => {
//       //     reject(error)
//       //   })
//       // } else {
//       //   reject(error)
//       // }
//     })
//   })
// }