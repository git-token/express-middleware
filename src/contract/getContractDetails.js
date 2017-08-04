import Promise, { promisifyAll, join } from 'bluebird'

export default function getContractDetails ({ contractAddress, abi }) {
  return new Promise((resolve, reject) => {
    const contract = this.web3.eth.contract(abi).at(contractAddress)
    join(
      contract.name.callAsync(),
      contract.symbol.callAsync(),
      contract.decimals.callAsync(),
      contract.organization.callAsync()
    ).then((data) => {
      resolve({
        name: data[0],
        symbol: data[1],
        decimals: data[2].toNumber(),
        organization: data[3],
        address: contractAddress
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
