'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parsePushEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePushEvent(_ref) {
  var event = _ref.event;

  return new _bluebird2.default(function (resolve, reject) {
    var payload = event.payload;

    var Stats = {};

    _bluebird2.default.resolve(payload['commits']).map(function (commit) {
      var url = commit.url;

      return (0, _requestPromise2.default)({
        method: 'GET',
        uri: url,
        json: true,
        headers: {
          'User-Agent': 'GitToken'
        }
      });
    }).map(function (data) {
      var stats = data.stats,
          email = data.commit.author.email;

      console.log('stats', stats);
      return null;
    }).then(function () {
      resolve(null);
    }).catch(function (error) {
      reject(error);
    });
  });
}