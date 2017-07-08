'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSavedContract;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonfile = (0, _bluebird.promisifyAll)(require('jsonfile'));

function getSavedContract(_ref) {
  var _this = this;

  var dirPath = _ref.dirPath,
      contractFile = _ref.contractFile;

  return new _bluebird2.default(function (resolve, reject) {
    var path = (dirPath ? dirPath : _this.dirPath) + '/' + (contractFile ? contractFile : _this.contractFile);

    jsonfile.readFileAsync(path).then(function (contractDetails) {
      var abi = _this.gittokenContract.abi;

      _this.gittokenContract = _this.eth.contract(abi).at(contractDetails['txReceipt']['contractAddress']);
      _this.contractDetails = contractDetails;
      resolve(_this.contractDetails);
    }).catch(function (error) {
      console.log('getSavedContract::error', error);
      if (error.code = 'ENOENT') {
        _this.createGitTokenContract().then(function (contractDetails) {
          resolve(contractDetails);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        reject(error);
      }
    });
  });
}