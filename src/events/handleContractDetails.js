import Promise from 'bluebird'

export default function handleAuthentication({ connection }) {
  return new Promise((resolve, reject) => {
    this.getSavedContract({}).then((contractDetails) => {
      console.log('contractDetails', contractDetails)

      connection.send(JSON.stringify({ ...contractDetails }))
      resolve()
    }).catch((error) => {
      console.log('error', error)
    })
  })
}
