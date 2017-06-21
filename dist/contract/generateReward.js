'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateReward;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateReward(_ref) {
  var _this = this;

  var rewardType = _ref.rewardType,
      contributorEmail = _ref.contributorEmail;

  return new _bluebird2.default(function (resolve, reject) {
    var rewardEnum = _this.config.rewardEnum;

    _this.getSavedContract({
      dirPath: _this.dirPath,
      contractFile: _this.contractFile
    }).then(function (contractDetails) {
      console.log('generateReward::contractDetails', contractDetails);
      resolve({}
      //   const rawData = this.gittokenContract.generateReward.getData(rewardEnum(rewardType), contributorEmail)
      //   return rawData
      // }).then((data) => {
      //   return this.signTransaction({
      //     to: this.gittokenContract.address,
      //     from: this.ks.getAddresses()[0],
      //     value: 0,
      //     gasLimit: 3e6,
      //     data
      //   })
      // }).then((signedTx) => {
      //   return this.eth.sendRawTransactionAsync(signedTx)
      // }).then((txHash) => {
      //   return this.getTransactionReceipt(txHash)
      // }).then((txReceipt) => {
      //   resolve(txReceipt)
      );
    }).catch(function (error) {
      reject(error);
    });
  });
}