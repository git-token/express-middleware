const KeystoreGenerator = require('../dist/KeystoreGenerator').default
const Promise = require('bluebird')

const gittokenContract = require('../build/contracts/GitToken.json')
const { abi, unlinked_binary } = gittokenContract

//  const abi = [{"constant":true,"inputs":[],"name":"number","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_number","type":"uint256"}],"payable":false,"type":"constructor"}]
//
// const unlinked_binary = "60606040523415600b57fe5b6040516020806100bd83398101604052515b60008190555b505b608a806100336000396000f300606060405263ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416638381f58a81146039575bfe5b3415604057fe5b60466058565b60408051918252519081900360200190f35b600054815600a165627a7a72305820e63e6f8e9a675a1c128cc3a86052ae79662acefed81b23028f5440d9ea8413b50029"
//

let hex32 = function(val) {
    val &= 0xFFFFFFFF;
    var hex = val.toString(16).toUpperCase();
    return ("00000000" + hex).slice(-8);
}


let keystore = new KeystoreGenerator({
 web3Provider: 'http://138.68.225.133:8545',
 dirPath: `${process.cwd()}`,
 keystoreFileName: `.keystore`
})
keystore.importKeystore({}).then((_ks) => {
  return `0x${_ks.getAddresses()[0]}`
}).then((from) => {
  console.log('from', from)

  // console.log('gittokenContract', gittokenContract)
  // console.log('abi', abi)
  // console.log('unlinked_binary', unlinked_binary)

  let data = keystore.eth.contract(abi).new.getData(60000, { from: from, data: unlinked_binary })


  return keystore.signTransaction({
    to: null,
    from: from,
    data: data,
    gasLimit: 4e6
  })
}).then((signedTx) => {
  console.log('signedTx', signedTx)
  return keystore.eth.sendRawTransactionAsync(`0x${signedTx}`)
}).then((txHash) => {
  console.log('txHash', txHash)
  return keystore.getTransactionReceipt(txHash)
}).then((txReceipt) => {
  const { contractAddress } = txReceipt
  console.log('txReceipt', txReceipt)
  console.log('contractAddress', contractAddress)
  let contract = keystore.eth.contract(abi).at(contractAddress)
  console.log('contract', contract)
  return contract.number.call()
}).then((number) => {
  console.log('number', number)
  return hex32(Math.pow(2, 31))
}).then((bytes) => {
  console.log('bytes', bytes)
}).catch((error) => {
  console.log('error', error)
})
