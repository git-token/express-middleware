import Promise, { promisifyAll, join } from 'bluebird'

export default function createGitTokenContract () {
  return new Promise((resolve, reject) => {
    const { abi, unlinked_binary } = this.gittokenContract
    Promise.resolve().then(() => {
      const { name, symbol, decimals, rewardValues } = this.config
      // console.log('createGitTokenContract::rewardValues()', rewardValues())
      const rewards = rewardValues()
      const params = [ name, symbol, decimals, rewards ]
      console.log('createGitTokenContract::params', params)
      return this.eth.contract(abi).new.getData(...params, {
        data: unlinked_binary
      })

    }).then((rawData) => {
      return this.signTransaction({
        to: null,
        from: this.ks.getAddresses()[0],
        value: 0,
        gasLimit: 3e6,
        data: rawData
      })
    }).then((signedTx) => {
      return this.eth.sendRawTransactionAsync(signedTx)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      return this.eth.contract(abi).at(txReceipt['contractAddress'])
    }).then((gittokenContract) => {
      this.gittokenContract = gittokenContract
      const { rewardEnum } = this.config
      return join(
        this.generateReward({
          rewardType: 'ping',
          contributorAddress: '0xf1dca2634b48a8a22f1fd73918f4db5aa86d3efb' // get this programmatically from ping event
        })
      )
    }).then((data) => {
      console.log('createGitTokenContract::data', data)
      return this.saveContractDetails({
        contractDetails: null
      })
    }).then((details) => {
      resolve(details)
    }).catch((error) => {
      reject(error)
    })
  })
}
