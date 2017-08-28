import Promise, { promisifyAll } from 'bluebird'
import { fork } from 'child_process'

export default function analyticsEngine({ }) {
  this.analyticsProcessor = fork(`${process.cwd()}/node_modules/gittoken-analytics/dist/processor`)

  this.analyticsProcessor.on('disconnect', () => {
    console.log('Analytics Processor Exited. Attempting to restart...')
    this.analyticsProcessor = fork(`${process.cwd()}/node_modules/gittoken-analytics/dist/processor`)
  })
}
