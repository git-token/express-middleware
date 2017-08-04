const GitTokenMiddleware = require('../dist/index').default

const clientID = process.argv[2]
const clientSecret = process.argv[3]

gittoken = new GitTokenMiddleware({
  web3Provider: 'http://138.68.225.133:8545',
  isGitHubHook: true,
  dirPath: `${process.cwd()}/gittoken`,
  keystoreFileName: `.keystore`,
  contractFile: 'contract.json',
  config: {
    symbol: 'GTK',
    decimals: 8,
    contributor: "0x8CB2CeBB0070b231d4BA4D3b747acAebDFbbD142",
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
}).catch((error) => {
  console.log('error', error)
})
