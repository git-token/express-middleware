import Promise from 'bluebird'
import rp from 'request-promise'

export default function retrieveGitHubUser({ username, clientID, clientSecret }) {
  return new Promise((resolve, reject) => {
    rp({
      method: 'GET',
      uri: `https://api.github.com/users/${username}?client_id=${clientID}client_secret=${clientSecret}`,
      json: true,
      headers: {
        'User-Agent': 'GitToken'
      }
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}
