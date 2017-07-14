'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = push;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function push(_ref) {
  var _this = this;

  var body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    var commits = body.commits,
        head_commit = body.head_commit;
    var author = head_commit.author;
    // console.log('push::commits', commits)
    // console.log('push::head_commit', head_commit)
    // console.log('push::author', author)

    _this.importKeystore({}).then(function (_ks) {
      return _this.calculateRewardBonus((0, _extends3.default)({}, body));
    }).then(function (rewardBonus) {
      return _this.generateReward({
        rewardType: 'push',
        contributorEmail: author['username'],
        rewardBonus: rewardBonus
      });
    }).then(function (contributorDetails) {
      resolve(contributorDetails);
    }).catch(function (error) {
      reject(error);
    });
  });
}