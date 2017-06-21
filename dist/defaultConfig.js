'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REWARD_VALUES = {
  commitComment: 250, // | Any time a Commit is commented on.
  create: 1000, // | Any time a Branch or Tag is created.
  delete: 0, // | Any time a Branch or Tag is deleted.
  deployment: 10000, // | Any time a Repository has a new deployment created from the API.
  deploymentStatus: 0, // | Any time a deployment for a Repository has a status update from
  fork: 15000, // | Any time a Repository is forked.
  gollum: 750, // | Any time a Wiki page is updated.
  installation: 0, // | Any time a GitHub App is installed or uninstalled.
  installationRepositories: 0, // | Any time a repository is added or removed from an
  issueComment: 250, // | Any time a comment on an issue is created, edited, or deleted.
  issues: 1000, // | Any time an Issue is assigned, unassigned, labeled, unlabeled, opened, edited,
  label: 100, // | Any time a Label is created, edited, or deleted.
  marketplacePurchase: 0, // | Any time a user purchases, cancels, or changes their GitHub
  member: 25000, // | Any time a User is added or removed as a collaborator to a Repository, or has their
  membership: 5000, // | Any time a User is added or removed from a team. Organization hooks only.
  milestone: 15000, // | Any time a Milestone is created, closed, opened, edited, or deleted.
  organization: 100000, // | Any time a user is added, removed, or invited to an Organization.
  orgBlock: 0, // | Any time an organization blocks or unblocks a user. Organization hooks only.
  pageBuild: 1000, // | Any time a Pages site is built or results in a failed build.
  projectCard: 0, // | Any time a Project Card is created, edited, moved, converted to an issue,
  projectColumn: 0, // | Any time a Project Column is created, edited, moved, or deleted.
  ping: 1000, // | Use when setting up the webhook for github
  push: 1000
};

module.exports = {
  name: 'GitToken',
  symbol: 'GTK',
  decimals: 8,
  rewardValues: REWARD_VALUES,
  rewardEnum: function rewardEnum(type) {
    var filteredList = (0, _keys2.default)(REWARD_VALUES).sort(function (a, b) {
      return a.localeCompare(b);
    }).map(function (_type) {
      return _type;
    });

    return filteredList.indexOf(type);
  },
  getRewardValues: function getRewardValues(values) {
    return (0, _keys2.default)(values).sort(function (a, b) {
      return a.localeCompare(b);
    }).map(function (_type) {
      return values[_type];
    });
  }

};