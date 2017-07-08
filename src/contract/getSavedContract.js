import Promise, { promisifyAll, join } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function getSavedContract ({ dirPath, contractFile }) {
  return new Promise((resolve, reject) => {
    let path = `${dirPath ? dirPath : this.dirPath}/${contractFile ? contractFile : this.contractFile}`

    jsonfile.readFileAsync(path).then((contractDetails) => {
      const { abi } = this.gittokenContract
      this.gittokenContract = this.eth.contract(abi).at(contractDetails['txReceipt']['contractAddress'])
      this.contractDetails = contractDetails
      resolve(this.contractDetails)
    }).catch((error) => {
      console.log('error', error)
      if (error.code = 'ENOENT') {
        this.createGitTokenContract().then((contractDetails) => {
          resolve(contractDetails)
        }).catch((error) => {
          reject(error)
        })
      } else {
        reject(error)
      }
    })
  })
}
