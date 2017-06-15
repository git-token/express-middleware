'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveContractDetails;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonfile = (0, _bluebird.promisifyAll)(require('jsonfile'));

function saveContractDetails(_ref) {
  var _this = this;

  var dirPath = _ref.dirPath,
      contractFile = _ref.contractFile,
      contractDetails = _ref.contractDetails;

  return new _bluebird2.default(function (resolve, reject) {
    var path = (dirPath ? dirPath : _this.dirPath) + '/' + (contractFile ? contractFile : _this.contractFile);
    _this.contractDetails = contractDetails ? contractDetails : _this.contractDetails;
    jsonfile.writeFileAsync(path, _this.contractDetails, { flags: 'a' }).then(function () {
      resolve(_this.contractDetails);
    }).catch(function (error) {
      reject(error);
    });
  });
}