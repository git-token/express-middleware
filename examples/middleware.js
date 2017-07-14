const GitTokenMiddleware = require('../dist/index').default

const clientID = process.argv[2]
const clientSecret = process.argv[3]

gittoken = new GitTokenMiddleware({
  web3Provider: 'http://192.168.0.17:8545',
  isGitHubHook: true,
  dirPath: `${process.cwd()}/gittoken`,
  keystoreFileName: `.keystore`,
  contractFile: 'contract.json',
  config: {
    symbol: 'GTK',
    decimals: 8,
    contributor: "0xc7bd4ea12519088160dcdaa652d864f77d32c7db",
    email: 'ryan.michael.tate@gmail.com',
    organization: 'git-token'
  }
})

// emit ping event and dummy data
gittoken.handleGitHubWebHookEvent({
  event: 'ping',
  data: {
    body: {},
    headers: {
      'x-github-delivery': 'randomTestMsg'
    }
  }
}).then((result) => {
  console.log('result', JSON.stringify(result, null, 2))
  return gittoken.parseRepositoryStats({
    owner: 'consensys',
    repository: 'eth-lightwallet',
    clientID,
    clientSecret
  })
}).then((result) => {
  console.log('result', JSON.stringify(result, null, 2))
}).catch((error) => {
  console.log('error', error)
})
