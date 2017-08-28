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
  var _this = this;

  (0, _objectDestructuringEmpty3.default)(_ref);

  this.analyticsProcessor = (0, _child_process.fork)(process.cwd() + '/node_modules/gittoken-analytics/dist/processor');

  this.analyticsProcessor.on('disconnect', function () {
    console.log('Analytics Processor Exited. Attempting to restart...');
    _this.analyticsProcessor = (0, _child_process.fork)(process.cwd() + '/node_modules/gittoken-analytics/dist/processor');
  });
}