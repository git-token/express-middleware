import Promise, { promisifyAll, join } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function getSavedContract ({ dirPath, contractFile }) {
  return new Promise((resolve, reject) => {
    let path = `${dirPath ? dirPath : this.dirPath}/${contractFile ? contractFile : this.contractFile}`

    jsonfile.readFileAsync(path).then((contractDetails) => {
      this.contractDetails = contractDetails
      resolve(this.contractDetails)
    }).catch((error) => {
      if (error.code = 'ENOENT') {
        resolve(null)
      } else {
        reject(error)
      }
    })
  })
}
