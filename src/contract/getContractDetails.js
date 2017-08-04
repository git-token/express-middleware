import Promise, { promisifyAll, join } from 'bluebird'
const jsonfile = promisifyAll(require('jsonfile'))

export default function getContractDetails ({ contractAddress, abi }) {
  return new Promise((resolve, reject) => {
    const contract = this.web3.eth.contract(abi).at(contractAddress)
    join(
      contract.name.callAsync(),
      contract.symbol.callAsync(),
      contract.decimals.callAsync(),
      contract.organization.callAsync()
    ).then((data) => {
      try {
        resolve({
          name: data[0],
          symbol: data[1],
          decimals: data[2].toNumber(),
          organization: data[3],
          address: contractAddress
        })
      } catch (error) {
        throw error
      }
    }).catch((error) => {
      console.log('contractDetails::error', error)
      this.handleError({ error, method: 'getContractDetails' })
    })
  })
}
