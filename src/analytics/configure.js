import Promise from 'bluebird'

export default function configureAnalytics({ contractAddress, abi, web3Provider }) {
  return new Promise((resolve, reject) => {
    this.analyticsProcessor.send(JSON.stringify({
      event: 'configure',
      data: {
        contractAddress,
        abi,
        web3Provider,
        mysqlOpts: this.mysqlOpts
      }
    }))
    this.analyticsProcessor.on('message', (msg) => {
      const { event } = JSON.parse(msg)
      if (event == 'configured') {
        resolve(true)
      }
    })
  })
}
