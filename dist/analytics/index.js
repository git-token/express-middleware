'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

exports.default = analyticsEngine;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function analyticsEngine(_ref) {
  (0, _objectDestructuringEmpty3.default)(_ref);

  this.analyticsProcessor = (0, _child_process.fork)('gittoken-analytics/dist/processor'

  // this.analyticsProcessor.on('message', (msg) => {
  //   const { type, data } = JSON.parse(msg)
  //   console.log('msg', msg)
  //   // switch(type) {
  //   //   case 'configure':
  //   //
  //   //     break;
  //   //   default:
  //   //     console.log('analyticsEngine::message::type, data', type, data)
  //   // }
  // })
  );
}