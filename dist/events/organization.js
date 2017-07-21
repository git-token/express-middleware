'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = organization;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function organization(_ref) {
  var _this = this;

  var event = _ref.event,
      data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    var headers = data.headers,
        body = data.body;
    var action = body.action;
    var decimals = _this.config.decimals;


    switch (action) {
      case 'member_invited':
        resolve(true);
        break;
      case 'member_added':
        _this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: body['sender']['login'],
          rewardBonus: 0,
          reservedValue: 0
        }).then(function () {
          resolve(_this.generateReward({
            rewardType: event,
            deliveryID: headers['x-github-delivery'],
            // contributorUsername in this case should be the contract address;
            // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
            contributorUsername: body['membership']['user']['login'],
            rewardBonus: 0,
            reservedValue: 15000
          }));
        });
        break;
      default:
        var error = new Error('No method to handle action ' + action + '.');
        reject(error);
    }
  });
}