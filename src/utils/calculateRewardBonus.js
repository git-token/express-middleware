import Promise, { join, promisifyAll } from 'bluebird'

export default function calculateRewardBonus({ repository, commits, head_commit }) {
  return new Promise((resolve, reject) => {
    const { decimals } = this.config
    const { size } = repository

    console.log('calculateRewardBonus::repository', repository)
    console.log('calculateRewardBonus::commits', commits)
    console.log('calculateRewardBonus::head_commit', head_commit)

    let bonus = ((commits.length * 1000) - 1000)

    Promise.resolve(commits).map((commit) => {
      const { removed, modified, distinct } = commit

      if (modified.length > removed.length && distinct) {
        bonus += ((modified.length/removed.length) - 1) * Math.pow(10, decimals)
      }

      if (!repository['private']) {
        bonus += 1000 * Math.pow(10, decimals)
      }

      return null
    }).then(() => {
      console.log('bonus', bonus)
      resolve(bonus)
    }).catch((error) => {
      reject(error)
    })
  })
}
