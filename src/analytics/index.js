import Promise, { promisifyAll } from 'bluebird'
import { fork } from 'child_process'

export default function analyticsEngine({ }) {
  this.analyticsProcessor = fork(`${process.cwd()}/node_modules/gittoken-analytics/dist/processor`)

  // this.analyticsProcessor.on('message', (msg) => {
  //   const { type, data } = JSON.parse(msg)
  //   console.log('msg', msg)
  //   // switch(type) {
  //   //   case 'configure':
  //   //
  //   //     break;
  //   //   default:
  //   //     console.log('analyticsEngine::message::type, data', type, data)
  //   // }
  // })
}
