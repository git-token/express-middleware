import Promise, { join, promisifyAll } from 'bluebird'
import rp from 'request-promise'

export default function parseGitHubEvents({ eventsURL }) {
  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      return rp({
        method: 'GET',
        uri: eventsURL,
        json: true,
        headers: {
          'User-Agent': 'GitToken'
        }
      })
    }).map((event) => {
      const { type, payload } = event
      switch(type) {
        case 'PushEvent':
          return this.parsePushEvent({ event })
        default:
          return null
      }
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}
