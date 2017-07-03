'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
    var connection = _ref.connection,
        event = _ref.event,
        data = _ref.data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = event;
            _context.next = _context.t0 === 'authenticate' ? 3 : _context.t0 === 'verify' ? 4 : _context.t0 === 'login' ? 5 : _context.t0 === 'message' ? 8 : _context.t0 === 'exchange' ? 11 : _context.t0 === 'vote' ? 14 : 17;
            break;

          case 3:
            return _context.abrupt('return', this.handleAuthentication({ connection: connection, data: data }));

          case 4:
            return _context.abrupt('return', this.handleVerification({ connection: connection, data: data }));

          case 5:
            _context.next = 7;
            return this.handleLogin({ connection: connection, data: data });

          case 7:
            return _context.abrupt('return', _context.sent);

          case 8:
            _context.next = 10;
            return this.logMessage({ connection: connection, data: data });

          case 10:
            return _context.abrupt('return', _context.sent);

          case 11:
            _context.next = 13;
            return this.logExchange({ connection: connection, data: data });

          case 13:
            return _context.abrupt('return', _context.sent);

          case 14:
            _context.next = 16;
            return this.logVote({ connection: connection, data: data });

          case 16:
            return _context.abrupt('return', _context.sent);

          case 17:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function socketRouter(_x) {
    return _ref2.apply(this, arguments);
  }

  return socketRouter;
}();