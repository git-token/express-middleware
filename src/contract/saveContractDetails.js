import Promise, { promisifyAll, join } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function saveContractDetails ({ dirPath, contractFile, contractDetails }) {
  return new Promise((resolve, reject) => {
    let path = `${dirPath ? dirPath : this.dirPath}/${contractFile ? contractFile : this.contractFile}`
    this.contractDetails = contractDetails ? contractDetails : this.contractDetails
    jsonfile.writeFileAsync(path, this.contractDetails, { flags: 'a' }).then(() => {
      resolve(this.contractDetails)
    }).catch((error) => {
      reject(error)
    })
  })
}
