import Promise from 'bluebird'

export default function push ({ body }) {
  return new Promise((resolve, reject) => {
    this.importKeystore({}).then((_ks) => {
      console.log('test')
      return this.generateReward({
        rewardType: 'push',
        contributorAddress: '0x0', // TODO: Grab this from the commit notes
      })
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
