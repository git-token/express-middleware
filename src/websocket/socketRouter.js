import Promise from 'bluebird'

export default async function socketRouter({ connection, event, data }) {
  switch(event) {
    case 'analytics':
      this.analyticsProcessor.send(JSON.stringify({ event: 'contract_details' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_milestones' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_contributions' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_total_supply' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_leaderboard' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_contribution_frequency' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_token_inflation' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_token_inflation_mean' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_user_token_creation' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_reward_type_stats' }))
      this.analyticsProcessor.send(JSON.stringify({ event: 'get_summary_statistics' }))
      this.analyticsProcessor.on('message', (msg) => {
        const { event } = JSON.parse(msg)
        if (connection.readyState == 1) {
          if (
            event == 'milestone_created' ||
            event == 'broadcast_contribution_data'
          ) {
            // Broadcast the above events to connected clients
            this.webSocketServer.clients.forEach((socket) => {
              if (socket.readyState === 1) {
                socket.send(msg)
              }
            })
          } else {
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
