import Promise from 'bluebird'

export default async function socketRouter({ connection, event, data }) {
  switch(event) {
    case 'authenticate':
      return this.handleAuthentication({ connection, data })
    case 'verify':
      return this.handleVerification({ connection, data })
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
