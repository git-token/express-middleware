import Promise, { join } from 'bluebird'
import { sha3 } from 'ethereumjs-util'

// Using a function rather than an es6 class to bind encapsulated logic
// to base classes
export default function ping ({ deliveryId }) {

  // Internal methods

  let createAndSaveKeystore = ({ password }) => {
    return new Promise((resolve, reject) => {
      this.createKeystore(password).then((_ks) => {
        return this.getDerivedKey(password)
      }).then((_derivedKey) => {
        return this.ks.generateNewAddress(_derivedKey, 1)
      }).then(() => {
        return this.saveKeystore()
      }).then(() => {
        resolve(this.ks)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  let retrieveDetails = () => {
    return new Promise((resolve, reject) => {
      Promise.resolve(this.ks.getAddresses()).map((address) => {
        return join(
          address,
          this.eth.getBalanceAsync(address),
          // retrieve details from contract after established
        )
      }).map((accountDetails) => {
        this.middlewareState['accounts'] = {
          ...this.middlewareState['accounts'],
          [accountDetails[0]]: {
            balance: accountDetails[1]
          }
        }
      }).then(() => {
        return this.getSavedContract({
          dirPath: this.dirPath,
          contractFile: this.contractFile
        })
      }).then((savedContract) => {
        if (!savedContract) {
          return this.createGitTokenContract()
        } else {
          return savedContract
        }
      }).then((contractDetails) => {
        this.middlewareState['contract'] = contractDetails
        resolve(this.middlewareState)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  // Return promise
  return new Promise((resolve, reject) => {
    this.importKeystore().then((_ks) => {
       if (!_ks) {
         let salt = new Date()
         let password = sha3(`${deliveryId}${salt}`).toString('hex')
         return createAndSaveKeystore({ password })
       } else {
         return this.ks
       }
     }).then((_ks) => {
        return retrieveDetails()
     }).then((details) => {
       resolve(details)
     }).catch((error) => {
       reject(error)
     })
  })
}
