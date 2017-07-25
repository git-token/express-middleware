const GitTokenMiddleware = require('../dist/index').default
const GitTokenContract = require('gittoken-contracts/build/contracts/GitToken.json')

const { abi } = GitTokenContract

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
    contributor: "0xc7bd4ea12519088160dcdaa652d864f77d32c7db",
    email: 'ryan.tate@gittoken.io',
    organization: 'git-token'
  }
})

gittoken.analyticsProcessor.send(JSON.stringify({
  event: 'configure',
  data: {
    web3Provider: 'http://138.68.225.133:8545',
    contractAddress: '0xfc9421ae996008fb28a11edce05b786ee6738395',
    abi
  }
}))

// setTimeout(() => {
//   gittoken.analyticsProcessor.send(JSON.stringify({
//     type: 'update_contributions',
//   }))
// }, 5000)
