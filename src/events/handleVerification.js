import Promise from 'bluebird'

export default function handleVerification({ user, address }) {
  return new Promise((resolve, reject) => {
    if (!user || !user.profile || !user.profile.username) {
      resolve({ code: 200, data: { authentication: false, user } })
    } else {
      console.log('handleVerification::user.profile', user.profile)
      console.log('handleVerification::user.profile.username', user.profile.username)
      const { profile: { username } } = user

      this.gittokenContract.getContributorAddress.callAsync(username)
        .then((contributorAddress) => {
          console.log('handleVerification::contributorAddress', contributorAddress)
          if (address == contributorAddress) {
            resolve({
              code: 200,
              data: {
                authentication: true,
                user,
                address
              }
            })
          } else {
            return this.verifyContributor({
              username,
              contributorAddress: address
            })
          }
        })
        .then((txReceipt) => {
          return this.gittokenContract.getContributorAddress(username)
        })
        .then((_contributorAddress) => {
          if (_contributorAddress == address) {
            resolve({
              code: 200,
              data: {
                authentication: true,
                user,
                address
              }
            })
          } else {
            let error = new Error('Could not verify user with the contract! Transaction Failed')
            throw error
          }
        })
        .catch((error) => {
          console.log('handleVerification::error', error)
          reject(error)
        })
    }
  })
}
