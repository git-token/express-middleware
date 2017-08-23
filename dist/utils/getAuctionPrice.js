'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAuctionPrice;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAuctionPrice() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var decimals = _this.config.decimals;

    _this.gittokenContract.getAuctionRound.callAsync().then(function (auctionRound) {
      if (auctionRound.toNumber() == 0) {
        // TODO Replace hard coded initial price with a config value
        resolve(1000 * Math.pow(10, decimals));
      } else {
        return _this.gittokenContract.getAuctionDetails(auctionRound.toNumber());
      }
    }).then(function (auctionDetails) {
      resolve(auctionDetails[0][6].toNumber());
    }).catch(function (error) {
      reject(error);
    });
  });
}