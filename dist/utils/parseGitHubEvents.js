'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseGitHubEvents;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseGitHubEvents(_ref) {
  var _this = this;

  var eventsURL = _ref.eventsURL;

  return new _bluebird2.default(function (resolve, reject) {
    _bluebird2.default.resolve().then(function () {
      return (0, _requestPromise2.default)({
        method: 'GET',
        uri: eventsURL,
        json: true,
        headers: {
          'User-Agent': 'GitToken'
        }
      });
    }).map(function (event) {
      var type = event.type,
          payload = event.payload;

      switch (type) {
        case 'PushEvent':
          return _this.parsePushEvent({ event: event });
        default:
          return null;
      }
    }).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      reject(error);
    });
  });
}