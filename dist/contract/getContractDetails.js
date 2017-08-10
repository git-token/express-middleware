'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContractDetails;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getContractDetails(_ref) {
  var _this = this;

  var contractAddress = _ref.contractAddress,
      abi = _ref.abi;

  return new _bluebird2.default(function (resolve, reject) {
    var contract = _this.web3.eth.contract(abi).at(contractAddress);
    (0, _bluebird.join)(
    // contract.name.call(),
    // contract.symbol.call(),
    contract.decimals.call()
    // contract.organization.call()
    ).then(function (data) {
      var decimals = data[0].toNumber
      // console.log('decimals', decimals)
      ();resolve({
        // name: data[0],
        // symbol: data[1],
        decimals: decimals,
        // organization: data[3],
        address: contractAddress
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}