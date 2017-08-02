import Promise, { join } from 'bluebird'
import { sha3 } from 'ethereumjs-util'

export default function ping ({ event, data }) {
  return new Promise((resolve, reject) => {
    const { headers, body } = data
    console.log('Retrieving Keystore')
    this.importKeystore({}).then((_ks) => {
       if (!_ks) {
         console.log('Did not find keystore, generating new keystore')
         let salt = new Date()
         let password = sha3(`${headers['x-github-delivery']}${salt}`).toString('hex')
         return this.createAndSaveKeystore(password)
       } else {
         return this.ks
       }
     }).then((_ks) => {
       return this.createGitTokenContract()
     }).then((contractDetails) => {
       return this.generateReward({
         rewardType: event,
         deliveryID: headers['x-github-delivery'],
         contributorUsername: body['sender']['login'],
         rewardBonus: 0,
         reservedType: ''
       })
     }).then(() => {
       resolve(this.contractDetails)
     }).catch((error) => {
       reject(error)
     })
  })
}
