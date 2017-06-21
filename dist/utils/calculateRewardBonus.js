'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateRewardBonus;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateRewardBonus(_ref) {
  var _this = this;

  var repository = _ref.repository,
      commits = _ref.commits,
      head_commit = _ref.head_commit;

  return new _bluebird2.default(function (resolve, reject) {
    var decimals = _this.config.decimals;
    var size = repository.size;


    console.log('calculateRewardBonus::repository', repository);
    console.log('calculateRewardBonus::commits', commits);
    console.log('calculateRewardBonus::head_commit', head_commit);

    var bonus = commits.length * 1000 - 1000;

    _bluebird2.default.resolve(commits).map(function (commit) {
      var removed = commit.removed,
          modified = commit.modified,
          distinct = commit.distinct;


      if (modified.length > removed.length && distinct) {
        bonus += (modified.length / removed.length - 1) * Math.pow(10, decimals);
      }

      if (!repository['private']) {
        bonus += 1000 * Math.pow(10, decimals);
      }

      return null;
    }).then(function () {
      console.log('bonus', bonus);
      resolve(bonus);
    }).catch(function (error) {
      reject(error);
    });
  });
}