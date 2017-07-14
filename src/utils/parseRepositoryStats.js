import rp from 'request-promise'
import Promise, { join } from 'bluebird'

export default function parseRepositoryStats({
  repository,
  owner,
  clientID,
  clientSecret
}) {
  return new Promise((resolve, reject) => {
    let contributors = {}
    Promise.resolve().then(() => {
      return rp({
        method: 'GET',
        uri: `https://api.github.com/repos/${owner}/${repository}/stats/contributors?client_id=${clientID}&client_secret=${clientSecret}`,
        json: true,
        headers: {
          'User-Agent': 'GitToken'
        }
      })
    }).map((data) => {

      const { weeks } = data

      let reward = weeks.map((week, i) => {
        const { a, d, c } = week
        console.log('a, d, c', a, d, c)
        let b = Math.pow(c, (1/c))
        let v = ((a - d) / b) + (b*1000)
        console.log('v', v)
        console.log('b', b)
        return v
      }).reduce((acc, v) => {
        return acc += parseInt(v);
      })

      return join(
        reward,
        this.retrieveGitHubUser({
          username: data['author']['login'],
          clientID,
          clientSecret
        })
      )
    }).map((data) => {
      // console.log('data', data)
      contributors[data[1]['login']] = data[0]
      return null
    }).then(() => {
      resolve(contributors)
    }).catch((error) => {
      reject(error)
    })
  })
}
