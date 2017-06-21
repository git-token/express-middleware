import Promise from 'bluebird'

export default function generateReward ({ rewardType, contributorEmail, rewardBonus }) {
  return new Promise((resolve, reject) => {
    const { decimals } = this.config
    const from = this.ks.getAddresses()[0]
    let contributorAddress;
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      // console.log('generateReward::contractDetails', contractDetails)
      return this.gittokenContract.rewardContributor.getData(contributorEmail, rewardType, rewardBonus)
    }).then((data) => {
      return this.signTransaction({
        to: this.gittokenContract.address,
        from,
        value: 0,
        gasLimit: 3e6,
        data
      })
    }).then((signedTx) => {
      return this.eth.sendRawTransactionAsync(signedTx)
    }).then((txHash) => {
      return this.getTransactionReceipt(txHash)
    }).then((txReceipt) => {
      return this.gittokenContract.getContributorAddress.call(contributorEmail)
    }).then((_contributorAddress) => {
      contributorAddress = _contributorAddress
      if (!contributorAddress) {
        return this.gittokenContract.getUnclaimedRewards.call(contributorEmail)
      } else {
        return this.gittokenContract.balanceOf.call(contributorAddress)
      }
    }).then((contributorBalance) => {
      resolve({
        address: contributorAddress,
        email: contributorEmail,
        balance: contributorBalance.toNumber() / Math.pow(10, decimals),
        contract: this.gittokenContract.address
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
