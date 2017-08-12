import Promise, { promisifyAll } from 'bluebird'

export default function createGitTokenContract() {
  return new Promise((resolve, reject) => {
    const { abi, unlinked_binary } = this.gittokenContract
    const from = `0x${this.ks.getAddresses()[0]}`;
    console.log('from', from)
    this.eth.getBalanceAsync(from).then((balance) => {
      if (balance.toNumber() < 18e14) {
        console.log('call faucet')
        return this.faucet()
      } else {
        return null
      }
    }).then(() => {
      const { contributor, name, username, organization, symbol, decimals } = this.config
      const params = [ contributor, name, username, organization, symbol, decimals ]
      // console.log('params', params)
      return this.eth.contract(abi).new.getData(...params, {
        from,
        data: unlinked_binary
      })
    }).then((data) => {
      return this.signTransaction({
        from,
        data,
        gasPrice: 1e9, // 10 Gwei
        gasLimit: 4e6,
        value: 0
      })
    }).then((signedTx) => {
      return this.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      this.contractDetails = { txReceipt }
      return this.saveContractDetails({})
    }).then((contractDetails) => {
      const { contractAddress } = contractDetails['txReceipt']
      return this.configureAnalytics({
        web3Provider: this.web3Provider,
        contractAddress,
        abi
      })
    }).then((configured) => {
      resolve(this.contractDetails)
    }).catch((error) => {
      // console.log('createGitTokenContract::error', error)
      reject(error)
    })
  })
}
