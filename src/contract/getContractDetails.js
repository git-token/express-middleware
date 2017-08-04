import Promise, { promisifyAll, join } from 'bluebird'

export default function getContractDetails ({ contractAddress, abi }) {
  return new Promise((resolve, reject) => {
    const contract = this.web3.eth.contract(abi).at(contractAddress)
    join(
      // contract.name.call(),
      // contract.symbol.call(),
      contract.decimals.call(),
      // contract.organization.call()
    ).then((data) => {
      let decimals = data[0].toNumber()
      console.log('decimals', decimals)
      resolve({
        // name: data[0],
        // symbol: data[1],
        decimals,
        // organization: data[3],
        address: contractAddress
      })
    }).catch((error) => {
      reject(error)
    })
  })
}
