const GitTokenMiddleware = require('../dist/index').default

gittoken = new GitTokenMiddleware({
  web3Provider: 'http://138.68.225.133:8545',
  isGitHubHook: true,
  dirPath: `${process.cwd()}`,
  keystoreFileName: `.keystore`,
  contractFile: 'contract.json',
  config: {
    name: 'TestToken',
    symbol: 'T',
    decimals: 8
  }
})

// emit ping event and dummy data
gittoken.handleGitHubWebHookEvent({
  event: 'ping',
  data: {
    deliveryId: 'random github id'
  }
}).then((result) => {
  console.log('result', JSON.stringify(result, null, 2))
}).catch((error) => {
  console.log('error', error)
})
