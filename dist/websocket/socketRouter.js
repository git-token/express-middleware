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
            _context.next = _context.t0 === 'contractDetails' ? 3 : _context.t0 === 'authenticate' ? 6 : _context.t0 === 'verify' ? 9 : _context.t0 === 'login' ? 12 : _context.t0 === 'message' ? 15 : _context.t0 === 'exchange' ? 18 : _context.t0 === 'vote' ? 21 : 24;
            break;

          case 3:
            _context.next = 5;
            return this.handleContractDetails({ connection: connection });

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
            _context.next = 8;
            return this.handleAuthentication({ connection: connection, data: data });

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
            _context.next = 11;
            return this.handleVerification({ connection: connection, data: data });

          case 11:
            return _context.abrupt('return', _context.sent);

          case 12:
            _context.next = 14;
            return this.handleLogin({ connection: connection, data: data });

          case 14:
            return _context.abrupt('return', _context.sent);

          case 15:
            _context.next = 17;
            return this.logMessage({ connection: connection, data: data });

          case 17:
            return _context.abrupt('return', _context.sent);

          case 18:
            _context.next = 20;
            return this.logExchange({ connection: connection, data: data });

          case 20:
            return _context.abrupt('return', _context.sent);

          case 21:
            _context.next = 23;
            return this.logVote({ connection: connection, data: data });

          case 23:
            return _context.abrupt('return', _context.sent);

          case 24:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 26:
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