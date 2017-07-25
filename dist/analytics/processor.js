'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _sqlite = require('sqlite');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;
var eth = void 0;
var contract = void 0;

var dbPath = process.cwd() + '/analytics.sqlite';

_bluebird2.default.resolve().then(function () {
  return _sqlite2.default.open(dbPath, { Promise: _bluebird2.default });
}).then(function () {
  return _sqlite2.default.migrate({ force: 'last ' });
}).catch(function (error) {
  console.log('SQLite DB Error', error);
});

function SendError(error) {
  process.send((0, _stringify2.default)({
    event: 'error',
    message: error.msg,
    data: error
  }));
}

process.on('message', function (msg) {
  var _JSON$parse = JSON.parse(msg),
      event = _JSON$parse.event,
      data = _JSON$parse.data;

  switch (event) {
    case 'configure':
      return configure((0, _extends3.default)({}, data));
      break;
    case 'get_leaderboard':
      query({
        queryString: 'SELECT * FROM leaderboard ORDER BY value DESC;',
        queryObject: []
      }).then(function (data) {
        process.send((0, _stringify2.default)({ event: event, data: data }));
      }).catch(function (error) {
        console.log('error', error);
        SendError(error);
      });
      break;
    case 'get_contribution_frequency':
      query({
        queryString: 'SELECT * FROM contribution_frequency ORDER BY percentOfTotal ASC;',
        queryObject: []
      }).then(function (data) {
        process.send((0, _stringify2.default)({ event: event, data: data }));
      }).catch(function (error) {
        console.log('error', error);
        SendError(error);
      });
      break;
    case 'get_totalSupply':
      query({
        queryString: 'SELECT * FROM total_supply ORDER BY date ASC;',
        queryObject: []
      }).then(function (data) {
        process.send((0, _stringify2.default)({ event: event, data: data }));
      }).catch(function (error) {
        console.log('error', error);
        SendError(error);
      });
      break;
    case 'get_contributions':
      query({
        queryString: 'SELECT * FROM contribution ORDER BY date DESC;',
        queryObject: []
      }).then(function (data) {
        process.send((0, _stringify2.default)({ event: event, data: data }));
      }).catch(function (error) {
        console.log('error', error);
        SendError(error);
      });
      break;
    case 'update_contributions':
      return updateContributions();
      break;
    default:
      return null;
  }
});

function saveContributionEvent(_ref) {
  var event = _ref.event;

  return new _bluebird2.default(function (resolve, reject) {
    var transactionHash = event.transactionHash,
        args = event.args;

    _bluebird2.default.resolve(_sqlite2.default.all('\n      CREATE TABLE IF NOT EXISTS contribution (\n        txHash          CHAR(66),\n        contributor     CHAR(42),\n        username        TEXT,\n        value           INTEGER DEFAULT 0,\n        reservedValue   INTEGER DEFAULT 0,\n        date            TIMESTAMP DEFAULT \'1970-01-01 00:00:01.001\',\n        rewardType      TEXT,\n        CONSTRAINT contribution_pk PRIMARY KEY (txHash)\n      );\n    ')).then(function () {
      var queryString = '\n        INSERT INTO contribution (\n          txHash,\n          contributor,\n          username,\n          value,\n          reservedValue,\n          date,\n          rewardType\n        ) VALUES (\n          $txHash,\n          $contributor,\n          $username,\n          $value,\n          $reservedValue,\n          $date,\n          $rewardType\n        );\n      ';
      var queryObject = {
        $txHash: transactionHash,
        $contributor: args['contributor'],
        $username: args['username'],
        $value: args['value'].toNumber(),
        $reservedValue: args['reservedValue'].toNumber(),
        $date: args['date'].toNumber(),
        $rewardType: args['rewardType']
      };
      return _bluebird2.default.resolve(_sqlite2.default.all(queryString, queryObject));
    }).then(function (saved) {
      return _bluebird2.default.resolve(_sqlite2.default.all('\n        SELECT * FROM contribution WHERE txHash = "' + transactionHash + '"\n      '));
    }).then(function (contribution) {
      resolve(contribution[0]);
    }).catch(function (error) {
      console.log('saveContributionEvent::error', error);
      reject(error);
    });
  });
}

function updateContributionFrequency(_ref2) {
  var contribution = _ref2.contribution;

  return new _bluebird2.default(function (resolve, reject) {
    _bluebird2.default.resolve(_sqlite2.default.all('\n      CREATE TABLE IF NOT EXISTS contribution_frequency (\n        rewardType     TEXT,\n        count          INTEGER,\n        percentOfTotal REAL,\n        CONSTRAINT contribution_frequency_pk PRIMARY KEY (rewardType)\n      );\n    ')).then(function () {
      var rewardType = contribution.rewardType;

      return _bluebird2.default.resolve(_sqlite2.default.all('\n        INSERT OR REPLACE INTO contribution_frequency (\n          rewardType,\n          count,\n          percentOfTotal\n        ) VALUES (\n          "' + rewardType + '",\n          (SELECT count(*) FROM contribution WHERE rewardType = "' + rewardType + '"),\n          (SELECT 100.0 * count(*) / (SELECT count(*) FROM contribution) AS PERCENTAGE FROM contribution WHERE rewardType = "' + rewardType + '")\n        );\n      '));
    }).then(function () {
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function updateTotalSupply(_ref3) {
  var contribution = _ref3.contribution;

  return new _bluebird2.default(function (resolve, reject) {
    var date = contribution.date,
        value = contribution.value,
        reservedValue = contribution.reservedValue;

    _bluebird2.default.resolve(_sqlite2.default.all('\n      CREATE TABLE IF NOT EXISTS total_supply (\n        totalSupply    INTEGER,\n        date           TIMESTAMP DEFAULT \'1970-01-01 00:00:01.001\',\n        CONSTRAINT total_supply_pk PRIMARY KEY (date)\n      );\n    ')).then(function () {
      var contributionValue = value + reservedValue;
      // console.log('contributionValue', contributionValue)
      return _bluebird2.default.resolve(_sqlite2.default.all('\n        INSERT OR REPLACE INTO total_supply (\n          totalSupply,\n          date\n        ) VALUES (\n          (SELECT (sum(value)+sum(reservedValue)) FROM contribution WHERE date <= ' + date + '),\n          ' + date + '\n        );\n      '));
    }).then(function () {
      return _bluebird2.default.resolve(_sqlite2.default.all('\n        SELECT * FROM total_supply ORDER BY date ASC limit 1;\n      '));
    }).then(function (totalSupply) {
      resolve(totalSupply);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function updateLeaderboard(_ref4) {
  var contribution = _ref4.contribution;

  return new _bluebird2.default(function (resolve, reject) {
    var username = contribution.username,
        contributor = contribution.contributor;

    _bluebird2.default.resolve(_sqlite2.default.all('\n      CREATE TABLE IF NOT EXISTS leaderboard (\n        username             TEXT,\n        contributorAddress   CHAR(42),\n        value                INTEGER,\n        latestContribution   TIMESTAMP DEFAULT \'1970-01-01 00:00:01.001\',\n        numContributions     INTEGER,\n        valuePerContribution REAL,\n        CONSTRAINT leaderboard_pk PRIMARY KEY (username)\n      );\n    ')).then(function () {
      return _bluebird2.default.resolve(_sqlite2.default.all('\n          INSERT OR REPLACE INTO leaderboard (\n            username,\n            contributorAddress,\n            value,\n            latestContribution,\n            numContributions,\n            valuePerContribution\n          ) VALUES (\n            "' + username + '",\n            "' + contribution['contributor'] + '",\n            (SELECT sum(value) FROM contribution where username = "' + username + '"),\n            (SELECT max(date) FROM contribution where username = "' + username + '"),\n            (SELECT count(*) FROM contribution where username = "' + username + '"),\n            (SELECT sum(value)/count(*) FROM contribution where username = "' + username + '")\n          );\n        '));
    }).then(function () {
      // Replace "0x0" with contract address;
      return _bluebird2.default.resolve(_sqlite2.default.all('\n            INSERT OR REPLACE INTO leaderboard (\n              username,\n              contributorAddress,\n              value,\n              latestContribution,\n              numContributions,\n              valuePerContribution\n            ) VALUES (\n              "Total",\n              "0x0",\n              (SELECT sum(value) FROM contribution),\n              (SELECT max(date) FROM contribution),\n              (SELECT count(*) FROM contribution),\n              (SELECT sum(value)/count(*) FROM contribution)\n            );\n          '));
    }).then(function () {
      return _bluebird2.default.resolve(_sqlite2.default.all('\n          SELECT * FROM leaderboard WHERE username = "' + username + '";'));
    }).then(function (profile) {
      resolve(profile);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function query(_ref5) {
  var queryString = _ref5.queryString,
      queryObject = _ref5.queryObject;

  return new _bluebird2.default(function (resolve, reject) {
    _bluebird2.default.resolve(_sqlite2.default.all(queryString, queryObject)).then(function (result) {
      resolve(result);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function watchContractContributionEvents() {
  var events = contract.Contribution({}, { fromBlock: 0, toBlock: 'latest' });
  events.watch(function (error, result) {
    if (error) {
      console.log('watchContractContributionEvents::error', error);
    } else {
      saveContributionEvent({ event: result }).then(function (contribution) {
        return (0, _bluebird.join)(updateLeaderboard({ contribution: contribution }), updateTotalSupply({ contribution: contribution }), updateContributionFrequency({ contribution: contribution }));
      }).then(function (data) {
        console.log('watchContractContributionEvents::data', data);
        process.send((0, _stringify2.default)({
          event: 'broadcast_contribution_data',
          data: data
        }));
      }).catch(function (error) {
        console.log('error', error);
      });
    }
  });
}

function configure(_ref6) {
  var web3Provider = _ref6.web3Provider,
      contractAddress = _ref6.contractAddress,
      abi = _ref6.abi;

  web3 = new _web2.default(new _web2.default.providers.HttpProvider(web3Provider));
  eth = (0, _bluebird.promisifyAll)(web3.eth);
  contract = web3.eth.contract(abi).at(contractAddress);

  watchContractContributionEvents();
}