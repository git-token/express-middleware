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
            _context.next = _context.t0 === 'auction' ? 3 : _context.t0 === 'analytics' ? 8 : _context.t0 === 'contractDetails' ? 21 : _context.t0 === 'authenticate' ? 24 : _context.t0 === 'verify' ? 27 : _context.t0 === 'login' ? 30 : _context.t0 === 'message' ? 33 : _context.t0 === 'exchange' ? 36 : _context.t0 === 'vote' ? 39 : 42;
            break;

          case 3:
            this.auctionProcessor.send((0, _stringify2.default)({ event: 'get_auctions' }));
            this.auctionProcessor.send((0, _stringify2.default)({ event: 'get_auction_bids' }));
            this.auctionProcessor.send((0, _stringify2.default)({ event: 'get_auction_history' }));
            this.auctionProcessor.on('message', function (msg) {
              var _JSON$parse = JSON.parse(msg),
                  event = _JSON$parse.event;

              if (connection.readyState == 1) {
                if (event.match(RegExp('broadcast'))) {
                  // Broadcast the above events to connected clients
                  _this.webSocketServer.clients.forEach(function (socket) {
                    if (socket.readyState === 1) {
                      socket.send(msg);
                    }
                  });
                } else {
                  connection.send(msg);
                }
              } else {
                connection.close();
              }
            });
            return _context.abrupt('break', 44);

          case 8:
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
              var _JSON$parse2 = JSON.parse(msg),
                  event = _JSON$parse2.event;

              if (connection.readyState == 1) {
                if (event == 'milestone_created' || event == 'broadcast_contribution_data') {
                  // Broadcast the above events to connected clients
                  _this.webSocketServer.clients.forEach(function (socket) {
                    if (socket.readyState === 1) {
                      socket.send(msg);
                    }
                  });
                } else {
                  connection.send(msg);
                }
              } else {
                connection.close();
              }
            });
            return _context.abrupt('break', 44);

          case 21:
            _context.next = 23;
            return this.handleContractDetails({ connection: connection });

          case 23:
            return _context.abrupt('return', _context.sent);

          case 24:
            _context.next = 26;
            return this.handleAuthentication({ connection: connection, data: data });

          case 26:
            return _context.abrupt('return', _context.sent);

          case 27:
            _context.next = 29;
            return this.handleVerification({ connection: connection, data: data });

          case 29:
            return _context.abrupt('return', _context.sent);

          case 30:
            _context.next = 32;
            return this.handleLogin({ connection: connection, data: data });

          case 32:
            return _context.abrupt('return', _context.sent);

          case 33:
            _context.next = 35;
            return this.logMessage({ connection: connection, data: data });

          case 35:
            return _context.abrupt('return', _context.sent);

          case 36:
            _context.next = 38;
            return this.logExchange({ connection: connection, data: data });

          case 38:
            return _context.abrupt('return', _context.sent);

          case 39:
            _context.next = 41;
            return this.logVote({ connection: connection, data: data });

          case 41:
            return _context.abrupt('return', _context.sent);

          case 42:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 44:
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