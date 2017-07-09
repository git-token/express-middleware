const GitTokenMiddleware = require('../dist/index').default

gittoken = new GitTokenMiddleware({
  web3Provider: 'http://192.168.0.17:8545',
  isGitHubHook: true,
  dirPath: `${process.cwd()}/gittoken`,
  keystoreFileName: `.keystore`,
  contractFile: 'contract.json',
  config: {
    name: 'TestToken',
    symbol: 'T',
    decimals: 8,
    contributor: "0xc7bd4ea12519088160dcdaa652d864f77d32c7db",
    email: 'ryan.michael.tate@gmail.com',
    organization: 'GitToken'
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
// }).then((result) => {
//   console.log('result', JSON.stringify(result, null, 2))
//   return gittoken.handleGitHubWebHookEvent({
//     event: 'push',
//     data: {
//       body: {
//         commits: [{
//           distinct: true,
//           modified: [0, 1],
//           removed: [0, 1]
//         },{
//           distinct: true,
//           modified: [0, 1, 1, 1, 2, 5],
//           removed: [0, 1]
//         },{
//           distinct: true,
//           modified: [0, 1, 1, 1, 2, 5],
//           removed: [0, 1, 4, 5]
//         }],
//         head_commit: {
//           author: {
//             email: 'ryan.michael.tate@gmail.com'
//           },
//         },
//         repository: {
//           private: false,
//
//         }
//       },
//       headers: {
//         'x-github-delivery': 'randomTestMsg'
//       }
//     }
//   })
}).then((result) => {
  console.log('result', JSON.stringify(result, null, 2))
}).catch((error) => {
  console.log('error', error)
})
