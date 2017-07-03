const WebSocket = require('ws')
const Promise = require('bluebird')
const ws = new WebSocket('http://127.0.0.1:1751')

ws.on('open', () => {
  sendMessage({
    ws,
    event: 'message',
    message: 'Hello!',
    data: []
  }).then((msg) => {
    console.log('msg::1', msg)
    return sendMessage({
      ws,
      event: 'vote',
      message: 'Vote on Measure! Some Standard heading title',
      data: {
        id: '0x0',
        author: '0x0',
        expiration: new Date().getTime() + (60 * 60 * 60)
      }
    })
  }).then((msg) => {
    console.log('msg::2', msg)
  }).catch((error) => {
    console.log('error', error)
  })
})


//

function sendMessage({ ws, event, data, message }) {
  return new Promise((resolve, reject) => {
    if (!ws || !event || !data || !message) {
      let error = new Error(`
        Invalid parameters! { ws, event, data, message }, but found { ${ws}, ${event}, ${data}, ${message} }
      `)
      reject(error)
    }
    ws.send(JSON.stringify({ event, message, data }))
    ws.on('message', (msg) => {
      resolve(msg)
    })
  })
}
