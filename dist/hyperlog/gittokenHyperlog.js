'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gittokenHyperlog;

var _level = require('level');

var _level2 = _interopRequireDefault(_level);

var _hyperlog = require('hyperlog');

var _hyperlog2 = _interopRequireDefault(_hyperlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function gittokenHyperlog() {
  var dbPath = this.dirPath + '/gittoken';
  this.gittokenDB = (0, _level2.default)(dbPath);
  this.gittokenLog = (0, _hyperlog2.default)(this.gittokenDB);
  console.log('GitToken Hyperlog Instance Running');
}