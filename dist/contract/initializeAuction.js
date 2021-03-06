'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initializeAuction;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initializeAuction(_ref) {
  var _this = this;

  var initialPrice = _ref.initialPrice,
      delay = _ref.delay,
      tokenLimitFactor = _ref.tokenLimitFactor,
      lockTokens = _ref.lockTokens;

  return new _bluebird2.default(function (resolve, reject) {
    var from = '0x' + _this.ks.getAddresses()[0];
    _this.getSavedContract({
      dirPath: _this.dirPath,
      contractFile: _this.contractFile
    }).then(function (contractDetails) {

      return _this.getAuctionPrice();
    }).then(function (auctionPrice) {

      return _this.gittokenContract.initializeAuction.getData(auctionPrice, delay, tokenLimitFactor, lockTokens);
    }).then(function (data) {
      return _this.signTransaction({
        to: _this.gittokenContract.address,
        from: from,
        value: 0,
        gasPrice: 1e9,
        gasLimit: 3e6,
        data: data
      });
    }).then(function (signedTx) {
      return _this.eth.sendRawTransactionAsync('0x' + signedTx);
    }).then(function (txHash) {
      return _this.getTransactionReceipt(txHash);
    }).then(function (txReceipt) {
      console.log('initializeAuction::txReceipt', txReceipt);
      resolve(txReceipt);
    }).catch(function (error) {
      reject(error);
    });
  });
}