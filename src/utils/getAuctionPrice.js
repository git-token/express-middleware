import Promise, { join } from 'bluebird'

export default function getAuctionPrice() {
  return new Promise((resolve, reject) => {
    const { decimals } = this.config
    this.gittokenContract.getAuctionRound.callAsync().then((auctionRound) => {
      if (auctionRound.toNumber() < 2) {
        // TODO Replace hard coded initial price with a config value
        resolve(1000 * Math.pow(10, decimals))
      } else {
        return this.gittokenContract.getAuctionDetails(auctionRound.toNumber() - 1)
      }
    }).then((auctionDetails) => {
      resolve(auctionDetails[0][6].toNumber())
    }).catch((error) => {
      reject(error)
    })
  })
}
