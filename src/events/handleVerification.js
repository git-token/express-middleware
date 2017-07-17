import Promise from 'bluebird'

export default function handleVerification({ user, address }) {
  return new Promise((resolve, reject) => {
    console.log('handleVerification::user', user)
    resolve(true)
    // let txReceipt
    // this.verifyContributor({ email, contributorAddress }).then((_txReceipt) => {
    //   txReceipt = _txReceipt
    //   return this.gittokenContract.getContributorAddress(email)
    // }).then((_contributorAddress) => {
    //   if (_contributorAddress == contributorAddress) {
    //     connection.send(JSON.stringify({
    //       event: 'verify',
    //       topic: 'login',
    //       msg: 'Verification Successful',
    //       data: { email, contributorAddress, txReceipt }
    //     }))
    //   }
    //
    //   resolve(true)
    // }).catch((error) => {
    //   console.log('handleVerification::error', error)
    //   reject(error)
    // })
  })
}
