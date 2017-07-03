import Promise from 'bluebird'

export default function handleLogin({ connection, data }) {
  return new Promise((resolve, reject) => {
    const { event, message } = data
    this.getSavedContract({}).then(() => {
      console.log('this.gittokenContract', this.gittokenContract)
      if (message.match(RegExp('/login'))) {
        let params = message.replace('/login ', '').split(' ')
        console.log('params', params)
        return this.gittokenContract.getContributorAddress(params[0])
      }
    }).then((contributorAddress) => {
      console.log('contributorAddress', contributorAddress)
      connection.send(JSON.stringify({
        event: 'login',
        date: new Date().getTime(),
        message: `Login Matched Address: ${contributorAddress}`,
        data: { contributorAddress }
      }))
      resolve()
    }).catch((error) => {
      console.log('error', error)
    })
  })
}
