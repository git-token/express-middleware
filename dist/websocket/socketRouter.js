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
            _context.next = _context.t0 === 'auction' ? 3 : _context.t0 === 'analytics' ? 7 : _context.t0 === 'contractDetails' ? 20 : _context.t0 === 'authenticate' ? 23 : _context.t0 === 'verify' ? 26 : _context.t0 === 'login' ? 29 : _context.t0 === 'message' ? 32 : _context.t0 === 'exchange' ? 35 : _context.t0 === 'vote' ? 38 : 41;
            break;

          case 3:
            this.auctionProcessor.send((0, _stringify2.default)({ event: 'get_auctions' }));
            this.auctionProcessor.send((0, _stringify2.default)({ event: 'get_auction_bids' }));
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
            return _context.abrupt('break', 43);

          case 7:
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
            return _context.abrupt('break', 43);

          case 20:
            _context.next = 22;
            return this.handleContractDetails({ connection: connection });

          case 22:
            return _context.abrupt('return', _context.sent);

          case 23:
            _context.next = 25;
            return this.handleAuthentication({ connection: connection, data: data });

          case 25:
            return _context.abrupt('return', _context.sent);

          case 26:
            _context.next = 28;
            return this.handleVerification({ connection: connection, data: data });

          case 28:
            return _context.abrupt('return', _context.sent);

          case 29:
            _context.next = 31;
            return this.handleLogin({ connection: connection, data: data });

          case 31:
            return _context.abrupt('return', _context.sent);

          case 32:
            _context.next = 34;
            return this.logMessage({ connection: connection, data: data });

          case 34:
            return _context.abrupt('return', _context.sent);

          case 35:
            _context.next = 37;
            return this.logExchange({ connection: connection, data: data });

          case 37:
            return _context.abrupt('return', _context.sent);

          case 38:
            _context.next = 40;
            return this.logVote({ connection: connection, data: data });

          case 40:
            return _context.abrupt('return', _context.sent);

          case 41:
            connection.send((0, _stringify2.default)({
              event: 'Error',
              message: 'Invalid event, ' + event + ', requested'
            }));
            return _context.abrupt('return', null);

          case 43:
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