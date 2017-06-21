'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateRewardBonus;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateRewardBonus(_ref) {
  var repository = _ref.repository,
      commits = _ref.commits,
      head_commit = _ref.head_commit;

  return new _bluebird2.default(function (resolve, reject) {
    var size = repository.size;

    console.log('calculateRewardBonus::repository', repository);
    console.log('calculateRewardBonus::commits', commits);
    console.log('calculateRewardBonus::head_commit', head_commit);

    resolve(1e18 / size);
  });
}