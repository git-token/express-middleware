import Promise, { join } from 'bluebird'

export default function retrieveDetails() {
  return new Promise((resolve, reject) => {
    console.log('Testing')
    this.getSavedContract({
      dirPath: this.dirPath,
      contractFile: this.contractFile
    }).then((contractDetails) => {
      this.middlewareState['contract'] = this.contractDetails
      return this.ks.getAddresses()
    }).map((address) => {
      return join(
        address,
        this.eth.getBalanceAsync(address),
        this.eth.getBlockAsync('latest')
        // retrieve details from contract after established
      )
    }).map((data) => {
      this.middlewareState = {
        ...this.middlewareState,
        accounts: {
          ...this.middlewareState['accounts'],
          [data[0]]: {
            balance: data[1]
          }
        },
        blockchain: {
          currentBlock: data[2]
        }
      }
      resolve(this.middlewareState)
    }).catch((error) => {
      reject(error)
    })
  })
}
