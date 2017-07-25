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
    var _this = this;

    var connection = _ref.connection,
        event = _ref.event,
        data = _ref.data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = event;
            _context.next = _context.t0 === 'analytics' ? 3 : _context.t0 === 'contractDetails' ? 9 : _context.t0 === 'authenticate' ? 12 : _context.t0 === 'verify' ? 15 : _context.t0 === 'login' ? 18 : _context.t0 === 'message' ? 21 : _context.t0 === 'exchange' ? 24 : _context.t0 === 'vote' ? 27 : 30;
            break;

          case 3:
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_contributions' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_totalSupply' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_leaderboard' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_contribution_frequency' }));
            this.analyticsProcessor.on('message', function (msg) {
              var _JSON$parse = JSON.parse(msg),
                  event = _JSON$parse.event;

              if (connection.readyState == 1) {
                switch (event) {
                  case 'broadcast_contribution_data':
                    _this.webSocketServer.clients.forEach(function (connection) {
                      if (connection.readyState === 1) {
                        connection.send(msg);
                      }
                    });
                    break;
                  default:
                    connection.send(msg);
                }
              } else {
                connection.close();
              }
            });
            return _context.abrupt('break', 32);

          case 9:
            _context.next = 11;
            return this.handleContractDetails({ connection: connection });

          case 11:
            return _context.abrupt('return', _context.sent);

          case 12:
            _context.next = 14;
            return this.handleAuthentication({ connection: connection, data: data });

          case 14:
            return _context.abrupt('return', _context.sent);

          case 15:
            _context.next = 17;
            return this.handleVerification({ connection: connection, data: data });

          case 17:
            return _context.abrupt('return', _context.sent);

          case 18:
            _context.next = 20;
            return this.handleLogin({ connection: connection, data: data });

          case 20:
            return _context.abrupt('return', _context.sent);

          case 21:
            _context.next = 23;
            return this.logMessage({ connection: connection, data: data });

          case 23:
            return _context.abrupt('return', _context.sent);

          case 24:
            _context.next = 26;
            return this.logExchange({ connection: connection, data: data });

          case 26:
            return _context.abrupt('return', _context.sent);

          case 27:
            _context.next = 29;
            return this.logVote({ connection: connection, data: data });

          case 29:
            return _context.abrupt('return', _context.sent);

          case 30:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 32:
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