'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = push;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function push(_ref) {
  var _this = this;

  var body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    var pusher = body.pusher;

    _this.importKeystore({}).then(function (_ks) {
      console.log('test');
      return _this.generateReward({
        rewardType: 'push',
        contributorEmail: pusher['email']
      });
    }).then(function (contributorDetails) {
      resolve(contributorDetails);
    }).catch(function (error) {
      reject(error);
    });
  });
}