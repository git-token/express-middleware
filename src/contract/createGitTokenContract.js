import Promise, { promisifyAll, join } from 'bluebird'

export default function createGitTokenContract () {
  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      const { name, symbol, decimals, rewardValues } = this.config
      const { abi, unlinked_binary } = this.gittokenContract
      const params = [ name, symbol, decimals, rewardValues ]

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
      return this.saveContractDetails({
        contractDetails: this.contractDetails
      })
    }).then((details) => {
      resolve(details)
    }).catch((error) => {
      reject(error)
    })
  })
}
