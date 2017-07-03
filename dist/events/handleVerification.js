'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleVerification;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleVerification(_ref) {
  var _this = this;

  var connection = _ref.connection,
      data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    var event = data.event,
        _data$data = data.data,
        email = _data$data.email,
        contributorAddress = _data$data.contributorAddress;

    var txReceipt = void 0;
    _this.verifyContributor({ email: email, contributorAddress: contributorAddress }).then(function (_txReceipt) {
      console.log('handleVerification::txReceipt', txReceipt);
      txReceipt = _txReceipt;
      return _this.gittokenContract.getContributorAddress(email);
    }).then(function (_contributorAddress) {
      if (_contributorAddress == contributorAddress) {
        connection.send((0, _stringify2.default)({
          event: 'verify',
          topic: 'login',
          msg: 'Verification Successful',
          data: { email: email, contributorAddress: contributorAddress, txReceipt: txReceipt }
        }));
      }

      resolve(true);
    }).catch(function (error) {
      console.log('handleVerification::error', error);
      reject(error);
    });
  });
}