'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = pullRequest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pullRequest(_ref) {
  var body = _ref.body;

  return new _promise2.default(function (resolve, reject) {
    console.log('body[\'pull_request\'][\'user\']', body['pull_request']['user']);
    resolve({ received: true });
  });
}