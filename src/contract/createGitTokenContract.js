import Promise, { promisifyAll, join } from 'bluebird'

export default function createGitTokenContract () {
  return new Promise((resolve, reject) => {
    const { abi, unlinked_binary } = this.gittokenContract
    const {
      name, symbol, decimals, rewardValues, getRewardValues, rewardEnum
    } = this.config
    Promise.resolve().then(() => {
      // console.log('createGitTokenContract::rewardValues()', rewardValues())
      const rewards = getRewardValues(rewardValues)
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
      this.contractDetails = { txReceipt }
      return this.eth.contract(abi).at(txReceipt['contractAddress'])
    }).then((gittokenContract) => {
      this.gittokenContract = gittokenContract
      return this.gittokenContract.getRewardValue.call(0)
    }).then((rewardValue) => {
      console.log('createGitTokenContract::rewardValue', rewardValue)
      return this.generateReward({
        rewardType: 'ping',
        contributorAddress: '0xf1dca2634b48a8a22f1fd73918f4db5aa86d3efb' // get this programmatically from ping event
      })
    }).then(() => {
      return this.gittokenContract.totalSupply.call()
    }).then((totalSupply) => {
      this.contractDetails = {
        ...this.contractDetails,
        totalSupply
      }
      return this.saveContractDetails({})
    }).then((contractDetails) => {
      resolve(contractDetails)
    }).catch((error) => {
      reject(error)
    })
  })
}
