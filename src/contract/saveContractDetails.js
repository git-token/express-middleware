import Promise, { promisifyAll, join } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function saveContractDetails ({ dirPath, contractFile, contractDetails }) {
  return new Promise((resolve, reject) => {
    let path = `${dirPath ? dirPath : this.dirPath}/${contractFile ? contractFile : this.contractFile}`
    let data = contractDetails ? contractDetails : this.contractDetails
    jsonfile.writeFileAsync(path, data, { flags: 'a' }).then(() => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}
