import Promise from 'bluebird'

export default function verifyContributor({ contributorAddress, username }) {
  return new Promise((resolve, reject) => {
    const { decimals } = this.config
    const from = `0x${this.ks.getAddresses()[0]}`
    // console.log('from', from)
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      // console.log('generateReward::contractDetails', contractDetails)
      console.log('verifyContributor::username, contributorAddress', username, contributorAddress)
      return this.gittokenContract.verifyContributor.getData(contributorAddress, username)
    }).then((data) => {
      return this.signTransaction({
        to: this.gittokenContract.address,
        from,
        value: 0,
        gasPrice: 1e9,
        gasLimit: 5e5,
        data
      })
    }).then((signedTx) => {
      return this.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      // console.log('txReceipt', txReceipt)
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
