import Promise, { promisifyAll } from 'bluebird'
import { fork } from 'child_process'

export default function auctionEngine({ }) {
  this.auctionProcessor = fork(`${process.cwd()}/node_modules/gittoken-auction/dist/processor`)

  this.auctionProcessor.on('disconnect', () => {
    console.log('Auction Processor Exited. Attempting to restart...')
    this.auctionProcessor = fork(`${process.cwd()}/node_modules/gittoken-auction/dist/processor`)
  })
}
