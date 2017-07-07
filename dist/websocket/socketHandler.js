'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

exports.default = socketHandler;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function socketHandler(_ref) {
  var _this = this;

  (0, _objectDestructuringEmpty3.default)(_ref);


  var WebSocketPort = 1325;
  this.webSocketServer = new _ws2.default.Server({ port: WebSocketPort });
  console.log('GitToken WebSocket Server Listening on Port ' + WebSocketPort);
  this.webSocketServer.on('connection', function (connection, req) {
    // console.log('connection', connection)
    // console.log('req.connection.remoteAddress', req.connection.remoteAddress)
    connection.on('message', function (message) {
      var data = JSON.parse(message);
      var event = data.event;

      _this.socketRouter({ connection: connection, event: event, data: data });
    });
  });
}