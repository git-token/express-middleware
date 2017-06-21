import Promise from 'bluebird'

export default function push ({ body }) {
  return new Promise((resolve, reject) => {
    const { pusher, commits, head_commit } = body
    const { author } = head_commit
    console.log('push::commits', commits)
    console.log('push::head_commit', head_commit)
    console.log('push::author', author)
    this.importKeystore({}).then((_ks) => {
      return this.generateReward({
        rewardType: 'push',
        contributorEmail: pusher['email']
      })
    }).then((contributorDetails) => {
      resolve(contributorDetails)
    }).catch((error) => {
      reject(error)
    })
  })
}
