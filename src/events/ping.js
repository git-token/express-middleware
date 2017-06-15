import Promise, { join } from 'bluebird'
import { sha3 } from 'ethereumjs-util'

export default function ping ({ deliveryId }) {
  return new Promise((resolve, reject) => {
    this.importKeystore().then((_ks) => {
       if (!_ks) {
         let salt = new Date()
         let password = sha3(`${deliveryId}${salt}`).toString('hex')
         return this.createAndSaveKeystore(password)
       } else {
         return this.ks
       }
     }).then((_ks) => {
        return this.retrieveDetails()
     }).then((details) => {
       resolve(details)
     }).catch((error) => {
       reject(error)
     })
  })
}
