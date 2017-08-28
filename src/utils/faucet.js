import Promis from 'bluebird'
import rp from 'request-promise'


export default function faucet() {
  return new Promise((resolve, reject) => {
    rp({
      uri: `https://gittoken.io/gittoken/faucet/0x${this.ks.getAddresses()[0]}`,
      method: 'POST',
    }).then((response) => {
      // console.log('faucet::response', response)
      resolve(true)
    }).catch((error) => {
      // console.log('faucet::error', error)
      reject(error)
    })
  })
}
