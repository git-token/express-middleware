'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = faucet;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function faucet() {
  var _this = this;

  return new _promise2.default(function (resolve, reject) {
    (0, _requestPromise2.default)({
      uri: 'https://gittoken.org/faucet/' + _this.ks.getAddresses()[0],
      method: 'POST'
    }).then(function (response) {
      console.log('faucet::response', response);
      resolve(response);
    }).catch(function (error) {
      reject(error);
    });
  });
}