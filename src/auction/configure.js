import Promise from 'bluebird'

export default function configureAuction({ contractAddress, abi, web3Provider }) {
  return new Promise((resolve, reject) => {
    this.auctionProcessor.send(JSON.stringify({
      event: 'configure',
      data: {
        contractAddress,
        abi,
        web3Provider,
        mysqlOpts: this.mysqlOpts
      }
    }))
    this.auctionProcessor.on('message', (msg) => {
      // console.log('configureAnalytics::msg', msg)
      const { event } = JSON.parse(msg)
      if (event == 'configure') {
        resolve(true)
      }
    })
  })
}
