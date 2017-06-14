'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenEmitter = function () {
  function GitTokenEmitter(options) {
    (0, _classCallCheck3.default)(this, GitTokenEmitter);
  }

  (0, _createClass3.default)(GitTokenEmitter, [{
    key: 'handlePayload',
    value: function handlePayload(_ref) {
      var _this = this;

      var event = _ref.event,
          data = _ref.data;

      return new _bluebird2.default(function (resolve, reject) {
        switch (event) {
          case 'ping':
            resolve(_this.ping(data));
          default:
            var error = new Error('Invalid Event Found');
            reject(error);
        }
      });
    }
  }, {
    key: 'ping',
    value: function ping(data) {
      return new _bluebird2.default(function (resolve, reject) {
        resolve('success');
      });
    }
  }]);
  return GitTokenEmitter;
}();

exports.default = GitTokenEmitter;