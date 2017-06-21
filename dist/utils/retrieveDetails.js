'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = retrieveDetails;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retrieveDetails() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    _this.getSavedContract({
      dirPath: _this.dirPath,
      contractFile: _this.contractFile
    }).then(function (contractDetails) {
      _this.middlewareState['contract'] = _this.contractDetails;
      return _this.ks.getAddresses();
    }).map(function (address) {
      return (0, _bluebird.join)(address, _this.eth.getBalanceAsync(address), _this.eth.getBlockAsync('latest'
      // retrieve details from contract after established
      ));
    }).map(function (data) {
      _this.middlewareState = (0, _extends4.default)({}, _this.middlewareState, {
        accounts: (0, _extends4.default)({}, _this.middlewareState['accounts'], (0, _defineProperty3.default)({}, data[0], {
          balance: data[1]
        })),
        blockchain: {
          currentBlock: data[2]
        }
      });
      resolve(_this.middlewareState);
    }).catch(function (error) {
      reject(error);
    });
  });
}