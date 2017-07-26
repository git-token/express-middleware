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
            _context.next = _context.t0 === 'analytics' ? 3 : _context.t0 === 'contractDetails' ? 11 : _context.t0 === 'authenticate' ? 14 : _context.t0 === 'verify' ? 17 : _context.t0 === 'login' ? 20 : _context.t0 === 'message' ? 23 : _context.t0 === 'exchange' ? 26 : _context.t0 === 'vote' ? 29 : 32;
            break;

          case 3:
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_contributions' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_totalSupply' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_leaderboard' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_contribution_frequency' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_token_inflation' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_summary_statistics' }));
            this.analyticsProcessor.on('message', function (msg) {
              var _JSON$parse = JSON.parse(msg),
                  event = _JSON$parse.event;

              if (connection.readyState == 1) {
                switch (event) {
                  case 'broadcast_contribution_data':
                    _this.webSocketServer.clients.forEach(function (socket) {
                      if (socket.readyState === 1) {
                        socket.send(msg);
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
            return _context.abrupt('break', 34);

          case 11:
            _context.next = 13;
            return this.handleContractDetails({ connection: connection });

          case 13:
            return _context.abrupt('return', _context.sent);

          case 14:
            _context.next = 16;
            return this.handleAuthentication({ connection: connection, data: data });

          case 16:
            return _context.abrupt('return', _context.sent);

          case 17:
            _context.next = 19;
            return this.handleVerification({ connection: connection, data: data });

          case 19:
            return _context.abrupt('return', _context.sent);

          case 20:
            _context.next = 22;
            return this.handleLogin({ connection: connection, data: data });

          case 22:
            return _context.abrupt('return', _context.sent);

          case 23:
            _context.next = 25;
            return this.logMessage({ connection: connection, data: data });

          case 25:
            return _context.abrupt('return', _context.sent);

          case 26:
            _context.next = 28;
            return this.logExchange({ connection: connection, data: data });

          case 28:
            return _context.abrupt('return', _context.sent);

          case 29:
            _context.next = 31;
            return this.logVote({ connection: connection, data: data });

          case 31:
            return _context.abrupt('return', _context.sent);

          case 32:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 34:
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