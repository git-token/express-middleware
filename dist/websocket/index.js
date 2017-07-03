'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketHandler = exports.socketRouter = undefined;

var _socketHandler = require('./socketHandler');

var _socketHandler2 = _interopRequireDefault(_socketHandler);

var _socketRouter = require('./socketRouter');

var _socketRouter2 = _interopRequireDefault(_socketRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.socketRouter = _socketRouter2.default;
exports.socketHandler = _socketHandler2.default;