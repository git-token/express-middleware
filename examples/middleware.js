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
    decimals: 8,
    email: 'ryan.michael.tate@gmail.com',
    organization: 'GitToken',
    repoUri: 'git://github.com/git-token/api-middleware.git'
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
//   return gittoken.handleGitHubWebHookEvent({
//     event: 'push',
//     data: {
//       body: {},
//       headers: {
//         'x-github-delivery': 'randomTestMsg'
//       }
//     }
//   })
// }).then((result) => {
//   console.log('result', JSON.stringify(result, null, 2))
}).catch((error) => {
  console.log('error', error)
})
