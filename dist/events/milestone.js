'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = milestone;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function milestone(_ref) {
  var _this = this;

  var event = _ref.event,
      data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    var headers = data.headers,
        body = data.body;
    var action = body.action;
    var decimals = _this.config.decimals;

    /**
     * NOTE Determine when milestones are created, edited, and when
     * they are reached;
     * When a milestone is created, an initial supply of tokens should be set
     * aside for auctioning when the milstone is reached
     */

    switch (action) {
      case 'created':
        resolve(_this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: data['body']['sender']['login'],
          rewardBonus: 0,
          reservedValue: Number(15000 * Math.pow(10, decimals))
        }));
        break;
      case 'edited':
        resolve(_this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: data['body']['sender']['login'],
          rewardBonus: 0,
          reservedValue: 0
        }));
        break;
      default:
        var error = new Error('No method to handle milestone action ' + action + '.');
        reject(error);
    }
  });
}