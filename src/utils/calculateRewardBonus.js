import Promise, { join, promisifyAll } from 'bluebird'

export default function calculateRewardBonus({ repository, commits, head_commit }) {
  return new Promise((resolve, reject) => {
    const { size } = repository
    console.log('calculateRewardBonus::repository', repository)
    console.log('calculateRewardBonus::commits', commits)
    console.log('calculateRewardBonus::head_commit', head_commit)

    resolve(1e18/size)
  })
}
