'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContractDetails;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonfile = (0, _bluebird.promisifyAll)(require('jsonfile'));

function getContractDetails(_ref) {
  var _this = this;

  var contractAddress = _ref.contractAddress,
      abi = _ref.abi;

  return new _bluebird2.default(function (resolve, reject) {
    var contract = _this.web3.eth.contract(abi).at(contractAddress);
    (0, _bluebird.join)(contract.name.callAsync(), contract.symbol.callAsync(), contract.decimals.callAsync(), contract.organization.callAsync()).then(function (data) {
      try {
        resolve({
          name: data[0],
          symbol: data[1],
          decimals: data[2].toNumber(),
          organization: data[3],
          address: contractAddress
        });
      } catch (error) {
        throw error;
      }
    }).catch(function (error) {
      console.log('contractDetails::error', error);
      _this.handleError({ error: error, method: 'getContractDetails' });
    });
  });
}