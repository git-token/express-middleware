import Promise from 'bluebird'

export default function generateReward ({ rewardType, deliveryID, contributorUsername, rewardBonus, reservedType }) {
  return new Promise((resolve, reject) => {
    const { decimals } = this.config
    const from = `0x${this.ks.getAddresses()[0]}`
    let contributorAddress;
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      console.log('generateReward::contractDetails', contractDetails)
      return this.gittokenContract.rewardContributor.getData(contributorUsername, rewardType, reservedType, rewardBonus, deliveryID)
    }).then((data) => {
      console.log('generateReward::data', data)
      return this.signTransaction({
        to: this.gittokenContract.address,
        from,
        value: 0,
        gasLimit: 3e6,
        data
      })
    }).then((signedTx) => {
      console.log('generateReward::signedTx', signedTx)
      return this.eth.sendRawTransactionAsync(`0x${signedTx}`)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      console.log('generateReward::txReceipt', txReceipt)
      return this.gittokenContract.getContributorAddress.call(contributorUsername)
    }).then((_contributorAddress) => {
      console.log('generateReward::_contributorAddress', _contributorAddress)
      contributorAddress = _contributorAddress
      if (!contributorAddress) {
        return this.gittokenContract.getUnclaimedRewards.call(contributorUsername)
      } else {
        return this.gittokenContract.balanceOf.call(contributorAddress)
      }
    }).then((contributorBalance) => {
      resolve({
        address: contributorAddress,
        username: contributorUsername,
        balance: contributorBalance.toNumber() / Math.pow(10, decimals),
        contract: this.gittokenContract.address
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
