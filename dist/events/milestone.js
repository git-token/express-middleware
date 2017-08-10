'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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
    var action = body.action,
        milestone = body.milestone;
    var decimals = _this.config.decimals;

    /**
     * NOTE Determine when milestones are created, edited, and when
     * they are reached;
     * When a milestone is created, an initial supply of tokens should be set
     * aside for auctioning when the milstone is reached
     */

    switch (action) {
      case 'created':
        _bluebird2.default.resolve().then(function () {
          _this.analyticsProcessor.send((0, _stringify2.default)({
            event: 'milestone_created',
            data: {
              createdBy: milestone['creator']['login'],
              title: milestone['title'],
              description: milestone['description'],
              createdOn: new Date(milestone['created_at']).getTime(),
              updatedOn: new Date(milestone['updated_at']).getTime(),
              dueOn: new Date(milestone['due_on']).getTime(),
              repository: milestone['repository']['full_name'],
              id: milestone['id']
            }
          }));
          return _this.generateReward({
            rewardType: event,
            deliveryID: headers['x-github-delivery'],
            // contributorUsername in this case should be the contract address;
            // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
            contributorUsername: data['body']['sender']['login'],
            rewardBonus: 0,
            /*
              NOTE Eventually remove this switch statement and
              replace with action field from payload request
             */
            reservedType: 'created'
          });
        }).then(function (data) {
          resolve(data);
        }).catch(function (error) {
          reject(error);
        });
        break;
      case 'edited':
        resolve(_this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: data['body']['sender']['login'],
          rewardBonus: 0,
          reservedType: ''
        }));
        break;
      default:
        var error = new Error('No method to handle milestone action ' + action + '.');
        reject(error);
    }
  });
}