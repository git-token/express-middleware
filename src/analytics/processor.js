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

function SendError(error) {
  process.send(JSON.stringify({
    event: 'error',
    message: error.msg,
    data: error
  }))
}

process.on('message', (msg) => {
  const { event, data } = JSON.parse(msg)
  switch(event) {
    case 'configure':
      return configure({ ...data });
      break;
    case 'get_leaderboard':
      query({
        queryString: `SELECT * FROM leaderboard ORDER BY value DESC;`,
        queryObject: []
      }).then((data) => {
        process.send(JSON.stringify({ event, data }))
      }).catch((error) => {
        console.log('error', error)
        SendError(error)
      });
      break;
    case 'get_contribution_frequency':
    query({
      queryString: `SELECT * FROM contribution_frequency ORDER BY percentOfTotal ASC;`,
      queryObject: []
    }).then((data) => {
      process.send(JSON.stringify({ event, data }))
    }).catch((error) => {
      console.log('error', error)
      SendError(error)
    });
    break;
    case 'get_totalSupply':
      query({
        queryString: `SELECT * FROM total_supply ORDER BY date ASC;`,
        queryObject: []
      }).then((data) => {
        process.send(JSON.stringify({ event, data }))
      }).catch((error) => {
        console.log('error', error)
        SendError(error)
      });
      break;
    case 'get_contributions':
      query({
        queryString: `SELECT * FROM contribution ORDER BY date DESC;`,
        queryObject: []
      }).then((data) => {
        process.send(JSON.stringify({ event, data }))
      }).catch((error) => {
        console.log('error', error)
        SendError(error)
      });
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
        value           INTEGER DEFAULT 0,
        reservedValue   INTEGER DEFAULT 0,
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
      resolve(contribution[0])
    }).catch((error) => {
      console.log('saveContributionEvent::error', error)
      reject(error)
    })
  })
}

function updateContributionFrequency({ contribution }) {
  return new Promise((resolve, reject) => {
    Promise.resolve(sqlite.all(`
      CREATE TABLE IF NOT EXISTS contribution_frequency (
        rewardType     TEXT,
        count          INTEGER,
        percentOfTotal REAL,
        CONSTRAINT contribution_frequency_pk PRIMARY KEY (rewardType)
      );
    `)).then(() => {
      const { rewardType } = contribution
      return Promise.resolve(sqlite.all(`
        INSERT OR REPLACE INTO contribution_frequency (
          rewardType,
          count,
          percentOfTotal
        ) VALUES (
          "${rewardType}",
          (SELECT count(*) FROM contribution WHERE rewardType = "${rewardType}"),
          (SELECT 100.0 * count(*) / (SELECT count(*) FROM contribution) AS PERCENTAGE FROM contribution WHERE rewardType = "${rewardType}")
        );
      `))
    }).then(() => {
      resolve(true)
    }).catch((error) => {
      reject(error)
    })
  })
}

function updateTotalSupply({ contribution }) {
  return new Promise((resolve, reject) => {
    const { date, value, reservedValue } = contribution
    Promise.resolve(sqlite.all(`
      CREATE TABLE IF NOT EXISTS total_supply (
        totalSupply    INTEGER,
        date           TIMESTAMP DEFAULT '1970-01-01 00:00:01.001',
        CONSTRAINT total_supply_pk PRIMARY KEY (date)
      );
    `)).then(() => {
      const contributionValue = value + reservedValue;
      // console.log('contributionValue', contributionValue)
      return Promise.resolve(sqlite.all(`
        INSERT OR REPLACE INTO total_supply (
          totalSupply,
          date
        ) VALUES (
          (SELECT (sum(value)+sum(reservedValue)) FROM contribution WHERE date <= ${date}),
          ${date}
        );
      `))
    }).then(() => {
      return Promise.resolve(sqlite.all(`
        SELECT * FROM total_supply ORDER BY date ASC limit 1;
      `))
    }).then((totalSupply) => {
      resolve(totalSupply)
    }).catch((error) => {
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
        // Replace "0x0" with contract address;
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

function query({ queryString, queryObject }) {
  return new Promise((resolve, reject) => {
    Promise.resolve(sqlite.all(queryString, queryObject)).then((result) => {
      resolve(result)
    }).catch((error) => {
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
      saveContributionEvent({ event: result }).then((contribution) => {
        return join(
          updateLeaderboard({ contribution }),
          updateTotalSupply({ contribution }),
          updateContributionFrequency({ contribution })
        )
      }).then((data) => {
        console.log('watchContractContributionEvents::data', data)
        process.send(JSON.stringify({
          event: 'broadcast_contribution_data',
          data
        }))
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
