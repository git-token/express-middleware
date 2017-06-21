import Promis from 'bluebird'
import rp from 'request-promise'


export default function faucet() {
  return new Promise((resolve, reject) => {
    rp({
      uri: `https://gittoken.org/faucet/${this.ks.getAddresses()[0]}`,
      method: 'POST',
    }).then((response) => {
      console.log('faucet::response', response)
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}
