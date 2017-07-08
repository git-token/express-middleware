'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ping;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ethereumjsUtil = require('ethereumjs-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ping(_ref) {
  var _this = this;

  var headers = _ref.headers;

  return new _bluebird2.default(function (resolve, reject) {
    console.log('Retrieving Keystore');
    _this.importKeystore({}).then(function (_ks) {
      if (!_ks) {
        console.log('Did not find keystore, generating new keystore');
        var salt = new Date();
        var password = (0, _ethereumjsUtil.sha3)('' + headers['x-github-delivery'] + salt).toString('hex');
        return _this.createAndSaveKeystore(password);
      } else {
        return _this.ks;
      }
    }).then(function (_ks) {
      console.log('Retrieving Details');
      return _this.retrieveDetails();
    }).then(function (details) {
      resolve(details);
    }).catch(function (error) {
      reject(error);
    });
  });
}