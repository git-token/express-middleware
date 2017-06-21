import Promise from 'bluebird'

export default function push ({ pusher }) {
  return new Promise((resolve, reject) => {
    this.importKeystore({}).then((_ks) => {
      console.log('test')
      return this.generateReward({
        rewardType: 'push',
        contributorEmail: pusher['email']
      })
    }).then((txReceipt) => {
      resolve(txReceipt)
    }).catch((error) => {
      reject(error)
    })
  })
}
