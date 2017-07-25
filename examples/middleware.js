const GitTokenMiddleware = require('../dist/index').default

const clientID = process.argv[2]
const clientSecret = process.argv[3]

gittoken = new GitTokenMiddleware({
  web3Provider: 'http://gittoken.org/web3/',
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
  return gittoken.parseRepositoryStats({
    owner: 'git-token',
    repository: 'contracts',
    clientID,
    clientSecret
  })
}).then((result) => {
  console.log('result', JSON.stringify(result, null, 2))
}).catch((error) => {
  console.log('error', error)
})
