import Promise from 'bluebird'

export default async function socketRouter({ connection, event, data }) {
  switch(event) {
    case 'analytics':
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_contributions' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_totalSupply' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_leaderboard' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_contribution_frequency' }))
      this.analyticsProcessor.on('message', (msg) => {
        const { event } = JSON.parse(msg)
        if (connection.readyState == 1) {
          switch(event) {
            case 'broadcast_contribution_data':
              this.webSocketServer.clients.forEach((connection) => {
                if (connection.readyState === 1) {
                  connection.send(msg)
                }
              })
              break;
            default:
              connection.send(msg)
          }
        } else {
          connection.close()
        }
      })
      break;
    case 'contractDetails':
      return await this.handleContractDetails({ connection })
    case 'authenticate':
      return await this.handleAuthentication({ connection, data })
    case 'verify':
      return await this.handleVerification({ connection, data })
    case 'login':
      return await this.handleLogin({ connection, data })
    case 'message':
      return await this.logMessage({ connection, data })
    case 'exchange':
      return await this.logExchange({ connection, data })
    case 'vote':
      return await this.logVote({ connection, data })
    default:
      connection.send(JSON.stringify({
        event: 'Error',
        message: `Invalid event, ${event}, requested`
      }))
      return null
  }
}
