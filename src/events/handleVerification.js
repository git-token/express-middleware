import Promise from 'bluebird'

export default function handleVerification({ user, address }) {
  return new Promise((resolve, reject) => {
    if (!user || !user.profile || !user.profile.username) {
      resolve({ code: 401, authentication: false, user })
    } else {
      const { profile: { username } } = user

      this.gittokenContract.getContributorAddress.callAsync(username)
        .then((contributorAddress) => {
          if (address == contributorAddress) {
            resolve({
              code: 200,
              authentication: true,
              user,
              address
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
              authentication: true,
              user,
              address
            })
          } else {
            let error = new Error('Could not verify user with the contract! Transaction Failed')
            reject(error)
          }
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}
