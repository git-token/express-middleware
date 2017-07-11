import Promise, { join, promisifyAll } from 'bluebird'
import rp from 'request-promise'

export default function parsePushEvent({ event }) {
  return new Promise((resolve, reject) => {
    const { payload } = event
    let Stats = {}

    Promise.resolve(payload['commits']).map((commit) => {
      const { url } = commit
      return rp({
        method: 'GET',
        uri: url,
        json: true,
        headers: {
          'User-Agent': 'GitToken'
        }
      })
    }).map((data) => {
      const { stats, commit: { author: { email } } } = data
      let v0 = (Stats[email] ? Stats[email] : 0)
      Stats = {
        ...Stats,
        [email]: v0 + stats
      }
      return null
    }).then(() => {
      resolve(Stats)
    }).catch((error) => {
      reject(error)
    })
  })
}
