import Promise from 'bluebird'


export default function logVote({ connection, event, data }) {
  return new Promise((resolve, reject) => {
    console.log('Log Vote Event to log, link to prior nodes')

    connection.send(JSON.stringify({
      event,
      received: true,
      node: {}
    }))
    resolve(true)
  })
}
