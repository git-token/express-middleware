import WebSocket from 'ws'

export default function socketHandler ({ }) {
  console.log('Socket Server Listening')
  this.webSocketServer = new WebSocket.Server({ port: 1751 })
  this.webSocketServer.on('connection', (connection, req) => {
    // console.log('connection', connection)
    // console.log('req.connection.remoteAddress', req.connection.remoteAddress)
    connection.on('message', (message) => {
      const data = JSON.parse(message)
      const { event }= data
      this.socketRouter({ connection, event, data })
    })
  })
}
