'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = retrieveGitHubUser;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function retrieveGitHubUser(_ref) {
  var username = _ref.username,
      clientID = _ref.clientID,
      clientSecret = _ref.clientSecret;

  return new _bluebird2.default(function (resolve, reject) {
    (0, _requestPromise2.default)({
      method: 'GET',
      uri: 'https://api.github.com/users/' + username + '?client_id=' + clientID + 'client_secret=' + clientSecret,
      json: true,
      headers: {
        'User-Agent': 'GitToken'
      }
    }).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      reject(error);
    });
  });
}