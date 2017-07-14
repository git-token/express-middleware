'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseRepositoryStats;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseRepositoryStats(_ref) {
  var _this = this;

  var repository = _ref.repository,
      owner = _ref.owner,
      clientID = _ref.clientID,
      clientSecret = _ref.clientSecret;

  return new _bluebird2.default(function (resolve, reject) {
    var contributors = {};
    _bluebird2.default.resolve().then(function () {
      return (0, _requestPromise2.default)({
        method: 'GET',
        uri: 'https://api.github.com/repos/' + owner + '/' + repository + '/stats/contributors?client_id=' + clientID + '&client_secret=' + clientSecret,
        json: true,
        headers: {
          'User-Agent': 'GitToken'
        }
      });
    }).map(function (data) {
      var weeks = data.weeks;


      var reward = weeks.map(function (week, i) {
        var a = week.a,
            d = week.d,
            c = week.c;

        console.log('a, d, c', a, d, c);
        var b = Math.pow(c, 1 / c);
        var v = (a - d) / b + b * 1000;
        console.log('v', v);
        console.log('b', b);
        return v;
      }).reduce(function (acc, v) {
        return acc += parseInt(v);
      });

      return (0, _bluebird.join)(reward, _this.retrieveGitHubUser({
        username: data['author']['login'],
        clientID: clientID,
        clientSecret: clientSecret
      }));
    }).map(function (data) {
      // console.log('data', data)
      contributors[data[1]['login']] = data[0];
      return null;
    }).then(function () {
      resolve(contributors);
    }).catch(function (error) {
      reject(error);
    });
  });
}