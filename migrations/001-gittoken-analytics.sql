--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
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

CREATE TABLE IF NOT EXISTS leaderboard (
  username             TEXT,
  contributorAddress   CHAR(42),
  value                INTEGER,
  latestContribution   TIMESTAMP DEFAULT '1970-01-01 00:00:01.001',
  numContributions     INTEGER,
  valuePerContribution REAL,
  CONSTRAINT leaderboard_pk PRIMARY KEY (username)
);

CREATE TABLE IF NOT EXISTS total_supply (
  totalSupply    INTEGER,
  date           TIMESTAMP DEFAULT '1970-01-01 00:00:01.001',
  CONSTRAINT total_supply_pk PRIMARY KEY (date)
);

CREATE TABLE IF NOT EXISTS contribution_frequency (
  rewardType     TEXT,
  count          INTEGER,
  percentOfTotal REAL,
  CONSTRAINT contribution_frequency_pk PRIMARY KEY (rewardType)
);

CREATE TABLE IF NOT EXISTS summary_statistics (
  githubOrganization   TEXT,
  contractAddress      CHAR(42),
  tokenName            TEXT,
  tokenSymbol          TEXT,
  latestContribution   TIMESTAMP DEFAULT '1970-01-01 00:00:01.001',
  tokenSupply          INTEGER,
  reservedSupply       INTEGER,
  percentReserved      REAL,
  tokenInflation       REAL,
  totalContributions   INTEGER,
  uniqueContributions  INTEGER,
  CONSTRAINT summary_statistics_pk PRIMARY KEY (contractAddress)
);

-- CREATE TABLE IF NOT EXISTS contributor_verified (
--   txHash          CHAR(66),
--   contributor     CHAR(42),
--   username        TEXT,
--   date            TIMESTAMP DEFAULT '1970-01-01 00:00:01.001'
--   -- CONSTRAINT contributor_verified_pk PRIMARY KEY (txHash)
-- );
--
-- CREATE TABLE IF NOT EXISTS transfer (
--   txHash          CHAR(66),
--   from            CHAR(42),
--   to              CHAR(42),
--   value           INTEGER
--   -- CONSTRAINT transfer_pk PRIMARY KEY (txHash)
-- );
--
-- CREATE TABLE IF NOT EXISTS approval (
--   txHash          CHAR(66),
--   owner           CHAR(42),
--   spender         CHAR(42),
--   value           INTEGER
--   -- CONSTRAINT transfer_pk PRIMARY KEY (txHash)
-- );

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
