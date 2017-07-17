'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleVerification;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleVerification(_ref) {
  var user = _ref.user,
      address = _ref.address;

  return new _bluebird2.default(function (resolve, reject) {
    console.log('handleVerification::user', user);
    resolve(true
    // let txReceipt
    // this.verifyContributor({ email, contributorAddress }).then((_txReceipt) => {
    //   txReceipt = _txReceipt
    //   return this.gittokenContract.getContributorAddress(email)
    // }).then((_contributorAddress) => {
    //   if (_contributorAddress == contributorAddress) {
    //     connection.send(JSON.stringify({
    //       event: 'verify',
    //       topic: 'login',
    //       msg: 'Verification Successful',
    //       data: { email, contributorAddress, txReceipt }
    //     }))
    //   }
    //
    //   resolve(true)
    // }).catch((error) => {
    //   console.log('handleVerification::error', error)
    //   reject(error)
    // })
    );
  });
}