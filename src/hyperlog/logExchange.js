import Promise from 'bluebird'


export default function logExchange({ connection, event, data }) {
  return new Promise((resolve, reject) => {
    /**
     * TODO Log message payload as event in hyperlog
     */

    console.log('Log Exchange Event to log, link to prior nodes')

    connection.send(JSON.stringify({
      event,
      received: true,
      node: {}
    }))
    resolve(true)
  })
}
