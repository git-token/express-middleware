import Promise from 'bluebird'


export default function logMessage({ connection, event, data }) {
  return new Promise((resolve, reject) => {
    /**
     * TODO Log message payload as event in hyperlog
     */

     console.log('this.gittokenLog', this.gittokenLog)

    connection.send(JSON.stringify({
      event,
      received: true,
      node: {}
    }))
    resolve(true)
  })
}
