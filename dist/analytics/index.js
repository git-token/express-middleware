'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

exports.default = analyticsEngine;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function analyticsEngine(_ref) {
  var _this = this;

  (0, _objectDestructuringEmpty3.default)(_ref);

  this.analyticsProcessor = (0, _child_process.fork)('./dist/analytics/processor');

  this.analyticsProcessor.on('message', function (msg) {
    var _JSON$parse = JSON.parse(msg),
        type = _JSON$parse.type,
        data = _JSON$parse.data;

    console.log('msg', msg);
    switch (type) {
      case 'configure':
        _this.analyticsProcessor.send((0, _stringify2.default)({
          type: type,
          data: {
            web3Provider: '',
            contractAddress: '0x0',
            abi: []
          }
        }));
        break;
      default:
        console.log('analyticsEngine::message::type, data', type, data);
    }
  });
}