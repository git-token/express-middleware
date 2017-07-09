'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleAuthentication;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleAuthentication(_ref) {
  var _this = this;

  var connection = _ref.connection;

  return new _bluebird2.default(function (resolve, reject) {
    _this.getSavedContract({}).then(function (contractDetails) {
      console.log('contractDetails', contractDetails);

      connection.send((0, _stringify2.default)((0, _extends3.default)({}, contractDetails)));
      resolve();
    }).catch(function (error) {
      console.log('error', error);
    });
  });
}