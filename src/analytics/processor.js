import sqlite from 'sqlite'
import Promise, { delay, join, promisifyAll } from 'bluebird'
import Web3 from 'web3'

let web3;
let eth;
let contract;

const dbPath = `${process.cwd()}/analytics.sqlite`

Promise.resolve().then(() => {
    return sqlite.open(dbPath, { Promise })
}).then(() => {
    return sqlite.migrate({ force: 'last '})
}).catch((error) => {
    console.log('SQLite DB Error', error)
})



process.on('message', (msg) => {
  const { type, data } = JSON.parse(msg)
  switch(type) {
    case 'configure':
      return configure({ ...data });
      break;
    case 'get_contributions':
      return getContributionEvents();
      break;
    case 'update_contributions':
      return updateContributions();
      break;
    default:
      return null;
  }
})

function saveContributionEvent({ event }) {
  return new Promise((resolve, reject) => {
    const { transactionHash, args } = event
    Promise.resolve(sqlite.all(`
      CREATE TABLE IF NOT EXISTS contribution (
        txHash          CHAR(66),
        contributor     CHAR(42),
        username        TEXT,
        value           INTEGER,
        reservedValue   INTEGER,
        date            TIMESTAMP DEFAULT '1970-01-01 00:00:01.001',
        rewardType      TEXT,
        CONSTRAINT contribution_pk PRIMARY KEY (txHash)
      );
    `)).then(() => {
      const queryString = `
        INSERT INTO contribution (
          txHash,
          contributor,
          username,
          value,
          reservedValue,
          date,
          rewardType
        ) VALUES (
          $txHash,
          $contributor,
          $username,
          $value,
          $reservedValue,
          $date,
          $rewardType
        );
      `
      const queryObject = {
        $txHash: transactionHash,
        $contributor: args['contributor'],
        $username: args['username'],
        $value: args['value'].toNumber(),
        $reservedValue: args['reservedValue'].toNumber(),
        $date: args['date'].toNumber(),
        $rewardType: args['rewardType']
      }
      return Promise.resolve(sqlite.all(queryString, queryObject))
    }).then((saved) => {
      return Promise.resolve(sqlite.all(`
        SELECT * FROM contribution WHERE txHash = "${transactionHash}"
      `))
    }).then((contribution) => {
      return updateLeaderboard({ contribution: contribution[0] })
    }).then((profile) => {
      console.log('profile', profile)
      resolve(profile)
    }).catch((error) => {
      console.log('saveContributionEvent::error', error)
      reject(error)
    })
  })
}

function updateLeaderboard({ contribution }) {
  return new Promise((resolve, reject) => {
    const { username, contributor } = contribution
    Promise.resolve(sqlite.all(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        username             TEXT,
        contributorAddress   CHAR(42),
        value                INTEGER,
        latestContribution   TIMESTAMP DEFAULT '1970-01-01 00:00:01.001',
        numContributions     INTEGER,
        valuePerContribution REAL,
        CONSTRAINT leaderboard_pk PRIMARY KEY (username)
      );
    `)).then(() => {
      return Promise.resolve(sqlite.all(`
          INSERT OR REPLACE INTO leaderboard (
            username,
            contributorAddress,
            value,
            latestContribution,
            numContributions,
            valuePerContribution
          ) VALUES (
            "${username}",
            "${contribution['contributor']}",
            (SELECT sum(value) FROM contribution where username = "${username}"),
            (SELECT max(date) FROM contribution where username = "${username}"),
            (SELECT count(*) FROM contribution where username = "${username}"),
            (SELECT sum(value)/count(*) FROM contribution where username = "${username}")
          );
        `
      ))
      }).then(() => {
        return Promise.resolve(sqlite.all(`
            INSERT OR REPLACE INTO leaderboard (
              username,
              contributorAddress,
              value,
              latestContribution,
              numContributions,
              valuePerContribution
            ) VALUES (
              "Total",
              "0x0",
              (SELECT sum(value) FROM contribution),
              (SELECT max(date) FROM contribution),
              (SELECT count(*) FROM contribution),
              (SELECT sum(value)/count(*) FROM contribution)
            );
          `
        ))
    }).then(() => {
      return Promise.resolve(sqlite.all(`
          SELECT * FROM leaderboard WHERE username = "${username}";`
        ))
    }).then((profile) => {
      resolve(profile)
    }).catch((error) => {
      reject(error)
    })
  })
}

function getContributionEvents() {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM contribution ORDER BY date ASC;`
    Promise.resolve(sqlite.all(queryString)).then((contributions) => {
      resolve(contributions)
    }).catch((error) => {
      // console.log('getContributionEvents::error', error)
      reject(error)
    })
  })
}

function watchContractContributionEvents() {
  let events = contract.Contribution({}, { fromBlock: 0, toBlock: 'latest' })
  events.watch((error, result) => {
    if (error) {
      console.log('watchContractContributionEvents::error', error)
    } else {
      saveContributionEvent({ event: result }).then(() => {
        // console.log('Contribution Saved')
      }).catch((error) => {
        console.log('error', error)
      })
    }
  })
}

function configure({ web3Provider, contractAddress, abi }) {
  web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
  eth = promisifyAll(web3.eth)
  contract = web3.eth.contract(abi).at(contractAddress)

  watchContractContributionEvents()
}
