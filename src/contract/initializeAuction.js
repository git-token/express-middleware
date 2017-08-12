import Promise, { promisifyAll, join } from 'bluebird'

export default function initializeAuction({ initialPrice, delay, lockTokens }) {
  return new Promise((resolve, reject) => {
    const from = `0x${this.ks.getAddresses()[0]}`;
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      return this.gittokenContract.initializeAuction.getData(
        initialPrice, delay, lockTokens
      )
    }).then((data) => {
      return this.signTransaction({
        to: this.gittokenContract.address,
        from,
        value: 0,
        gasPrice: 1e9,
        gasLimit: 3e6,
        data
      })
    }).then((signedTx) => {
      return this.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      console.log('initializeAuction::txReceipt', txReceipt)
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
