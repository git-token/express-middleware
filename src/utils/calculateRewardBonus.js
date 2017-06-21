import Promise, { join, promisifyAll } from 'bluebird'

export default function calculateRewardBonus({ repository }) {
  return new Promise((resolve, reject) => {
    resolve(1000000)
  })
}
