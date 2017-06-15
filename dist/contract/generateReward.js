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
      contributorAddress = _ref.contributorAddress;

  return new _bluebird2.default(function (resolve, reject) {
    var rewardEnum = _this.config.rewardEnum;

    var rawData = _this.gittokenContract.generateReward.getData(rewardEnum(rewardType), contributorAddress);
    _bluebird2.default.resolve(rawData).then(function (data) {
      return _this.signTransaction({
        to: _this.gittokenContract.address,
        from: _this.ks.getAddresses()[0],
        value: 0,
        gasLimit: 3e6,
        data: data
      });
    }).then(function (signedTx) {
      return _this.eth.sendRawTransactionAsync(signedTx);
    }).then(function (txHash) {
      console.log('generateReward::txHash', txHash);
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      resolve(txReceipt);
    }).catch(function (error) {
      reject(error);
    });
  });
}