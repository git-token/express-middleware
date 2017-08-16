'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = configureAuction;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureAuction(_ref) {
  var _this = this;

  var contractAddress = _ref.contractAddress,
      abi = _ref.abi,
      web3Provider = _ref.web3Provider;

  return new _bluebird2.default(function (resolve, reject) {
    _this.auctionProcessor.send((0, _stringify2.default)({
      event: 'configure',
      data: {
        contractAddress: contractAddress,
        abi: abi,
        web3Provider: web3Provider,
        mysqlOpts: _this.mysqlOpts
      }
    }));
    _this.auctionProcessor.on('message', function (msg) {
      // console.log('configureAnalytics::msg', msg)
      var _JSON$parse = JSON.parse(msg),
          event = _JSON$parse.event;

      if (event == 'configure') {
        resolve(true);
      }
    });
  });
}