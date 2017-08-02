'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleLogin;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleLogin(_ref) {
  var _this = this;

  var connection = _ref.connection,
      data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    var event = data.event,
        message = data.message;

    _this.getSavedContract({}).then(function () {
      // console.log('this.gittokenContract', this.gittokenContract)
      if (message.match(RegExp('/login'))) {
        var params = message.replace('/login ', '').split(' '
        // console.log('params', params)
        );return _this.gittokenContract.getContributorAddress(params[0]);
      }
    }).then(function (contributorAddress) {
      // console.log('contributorAddress', contributorAddress)
      connection.send((0, _stringify2.default)({
        event: 'login',
        date: new Date().getTime(),
        message: 'Login Matched Address: ' + contributorAddress,
        data: { contributorAddress: contributorAddress }
      }));
      resolve();
    }).catch(function (error) {
      console.log('error', error);
    });
  });
}