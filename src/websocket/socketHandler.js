import WebSocket from 'ws'

export default function socketHandler ({ }) {

  const WebSocketPort = 1325
  this.webSocketServer = new WebSocket.Server({ port: WebSocketPort })
  console.log(`GitToken WebSocket Server Listening on Port ${WebSocketPort}`)
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
