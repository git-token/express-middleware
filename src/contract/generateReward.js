import Promise from 'bluebird'

export default function generateReward ({ rewardType, contributorAddress }) {
  return new Promise((resolve, reject) => {
    const { rewardEnum } = this.config
    const rawData = this.gittokenContract.generateReward.getData(rewardEnum(rewardType), contributorAddress)
    Promise.resolve(rawData).then((data) => {
      return this.signTransaction({
        to: this.gittokenContract.address,
        from: this.ks.getAddresses()[0],
        value: 0,
        gasLimit: 3e6,
        data
      })
    }).then((signedTx) => {
      return this.eth.sendRawTransactionAsync(signedTx)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
