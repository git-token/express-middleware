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
            _context.next = _context.t0 === 'analytics' ? 3 : _context.t0 === 'contractDetails' ? 16 : _context.t0 === 'authenticate' ? 19 : _context.t0 === 'verify' ? 22 : _context.t0 === 'login' ? 25 : _context.t0 === 'message' ? 28 : _context.t0 === 'exchange' ? 31 : _context.t0 === 'vote' ? 34 : 37;
            break;

          case 3:
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'contract_details' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_milestones' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_contributions' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_total_supply' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_leaderboard' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_contribution_frequency' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_token_inflation' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_token_inflation_mean' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_user_token_creation' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_reward_type_stats' }));
            this.analyticsProcessor.send((0, _stringify2.default)({ event: 'get_summary_statistics' }));
            this.analyticsProcessor.on('message', function (msg) {
              var _JSON$parse = JSON.parse(msg),
                  event = _JSON$parse.event;

              if (connection.readyState == 1) {
                switch (event) {
                  case 'milestone_created':
                    console.log('milestone created received from processor');
                    _this.webSocketServer.clients.forEach(function (socket) {
                      if (socket.readyState === 1) {
                        socket.send(msg);
                      }
                    });
                    break;
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
            return _context.abrupt('break', 39);

          case 16:
            _context.next = 18;
            return this.handleContractDetails({ connection: connection });

          case 18:
            return _context.abrupt('return', _context.sent);

          case 19:
            _context.next = 21;
            return this.handleAuthentication({ connection: connection, data: data });

          case 21:
            return _context.abrupt('return', _context.sent);

          case 22:
            _context.next = 24;
            return this.handleVerification({ connection: connection, data: data });

          case 24:
            return _context.abrupt('return', _context.sent);

          case 25:
            _context.next = 27;
            return this.handleLogin({ connection: connection, data: data });

          case 27:
            return _context.abrupt('return', _context.sent);

          case 28:
            _context.next = 30;
            return this.logMessage({ connection: connection, data: data });

          case 30:
            return _context.abrupt('return', _context.sent);

          case 31:
            _context.next = 33;
            return this.logExchange({ connection: connection, data: data });

          case 33:
            return _context.abrupt('return', _context.sent);

          case 34:
            _context.next = 36;
            return this.logVote({ connection: connection, data: data });

          case 36:
            return _context.abrupt('return', _context.sent);

          case 37:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 39:
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