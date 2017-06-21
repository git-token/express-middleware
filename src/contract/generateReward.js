import Promise from 'bluebird'

export default function generateReward ({ rewardType, contributorEmail }) {
  return new Promise((resolve, reject) => {
    const { rewardEnum } = this.config
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      console.log('generateReward::contractDetails', contractDetails)
      resolve({})
    //   const rawData = this.gittokenContract.generateReward.getData(rewardEnum(rewardType), contributorEmail)
    //   return rawData
    // }).then((data) => {
    //   return this.signTransaction({
    //     to: this.gittokenContract.address,
    //     from: this.ks.getAddresses()[0],
    //     value: 0,
    //     gasLimit: 3e6,
    //     data
    //   })
    // }).then((signedTx) => {
    //   return this.eth.sendRawTransactionAsync(signedTx)
    // }).then((txHash) => {
    //   return this.getTransactionReceipt(txHash)
    // }).then((txReceipt) => {
    //   resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
