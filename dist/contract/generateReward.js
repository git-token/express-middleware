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
      deliveryID = _ref.deliveryID,
      contributorUsername = _ref.contributorUsername,
      rewardBonus = _ref.rewardBonus;

  return new _bluebird2.default(function (resolve, reject) {
    var decimals = _this.config.decimals;

    var from = '0x' + _this.ks.getAddresses()[0];
    var contributorAddress = void 0;
    _this.getSavedContract({
      dirPath: _this.dirPath,
      contractFile: _this.contractFile
    }).then(function (contractDetails) {
      console.log('generateReward::contractDetails', contractDetails);
      return _this.gittokenContract.rewardContributor.getData(contributorUsername, rewardType, rewardBonus, deliveryID);
    }).then(function (data) {
      console.log('generateReward::data', data);
      return _this.signTransaction({
        to: _this.gittokenContract.address,
        from: from,
        value: 0,
        gasLimit: 3e6,
        data: data
      });
    }).then(function (signedTx) {
      console.log('generateReward::signedTx', signedTx);
      return _this.eth.sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      console.log('generateReward::txReceipt', txReceipt);
      return _this.gittokenContract.getContributorAddress.call(contributorUsername);
    }).then(function (_contributorAddress) {
      contributorAddress = _contributorAddress;
      if (!contributorAddress) {
        return _this.gittokenContract.getUnclaimedRewards.call(contributorUsername);
      } else {
        return _this.gittokenContract.balanceOf.call(contributorAddress);
      }
    }).then(function (contributorBalance) {
      resolve({
        address: contributorAddress,
        username: contributorUsername,
        balance: contributorBalance.toNumber() / Math.pow(10, decimals),
        contract: _this.gittokenContract.address
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}