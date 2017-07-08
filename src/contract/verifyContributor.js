import Promise from 'bluebird'

export default function verifyContributor({ contributorAddress, email }) {
  return new Promise((resolve, reject) => {
    const { decimals } = this.config
    const from = `0x${this.ks.getAddresses()[0]}`
    // console.log('from', from)
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      // console.log('generateReward::contractDetails', contractDetails)
      // console.log('verifyContributor::email, contributorAddress', email, contributorAddress)
      return this.gittokenContract.verifyContributor.getData(contributorAddress, email)
    }).then((data) => {
      return this.signTransaction({
        to: this.gittokenContract.address,
        from,
        value: 0,
        gasLimit: 3e6,
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
