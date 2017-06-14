'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

exports.default = ping;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ethereumjsUtil = require('ethereumjs-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Using a function rather than an es6 class to bind encapsulated logic
// to base classes
function ping(_ref) {
  var _this = this;

  var deliveryId = _ref.deliveryId;


  // Internal methods

  var createAndSaveKeystore = function createAndSaveKeystore(_ref2) {
    var password = _ref2.password;

    return new _bluebird2.default(function (resolve, reject) {
      _this.createKeystore(password).then(function (_ks) {
        return _this.getDerivedKey(password);
      }).then(function (_derivedKey) {
        return _this.ks.generateNewAddress(_derivedKey, 1);
      }).then(function () {
        return _this.saveKeystore();
      }).then(function () {
        resolve(_this.ks);
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  var retrieveDetails = function retrieveDetails() {
    return new _bluebird2.default(function (resolve, reject) {
      _bluebird2.default.resolve(_this.ks.getAddresses()).map(function (address) {
        return (0, _bluebird.join)(address, _this.eth.getBalanceAsync(address)
        // retrieve details from contract after established
        );
      }).map(function (accountDetails) {
        _this.middlewareState['accounts'] = (0, _extends4.default)({}, _this.middlewareState['accounts'], (0, _defineProperty3.default)({}, accountDetails[0], {
          balance: accountDetails[1]
        }));
      }).then(function () {
        return _this.getSavedContract({
          dirPath: _this.dirPath,
          contractFile: _this.contractFile
        });
      }).then(function (savedContract) {
        if (!savedContract) {
          return _this.createGitTokenContract();
        } else {
          return savedContract;
        }
      }).then(function (contractDetails) {
        _this.middlewareState['contract'] = contractDetails;
        resolve(_this.middlewareState);
      }).catch(function (error) {
        reject(error);
      });
    });
  };

  // Return promise
  return new _bluebird2.default(function (resolve, reject) {
    _this.importKeystore().then(function (_ks) {
      if (!_ks) {
        var salt = new Date();
        var password = (0, _ethereumjsUtil.sha3)('' + deliveryId + salt).toString('hex');
        return createAndSaveKeystore({ password: password });
      } else {
        return _this.ks;
      }
    }).then(function (_ks) {
      return retrieveDetails();
    }).then(function (details) {
      resolve(details);
    }).catch(function (error) {
      reject(error);
    });
  });
}