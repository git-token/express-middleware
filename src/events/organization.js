import Promise, { join } from 'bluebird'

export default function organization ({ event, data }) {
  return new Promise((resolve, reject) => {
    const { headers, body } = data
    const { action } = body
    const { decimals } = this.config

    switch(action) {
      case 'member_invited':
        this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: body['sender']['login'],
          rewardBonus: 0,
          reservedType: '',
        }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error)
        })
        break;
      case 'member_added':
        this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: body['sender']['login'],
          rewardBonus: 0,
          reservedType: '',
        }).then(() => {
          return this.generateReward({
            rewardType: event,
            // Note that if deriving mutiple events from a single event, the delivery ID must be unique,
            // Suggest appending a value to the deliveryID, e.g. "ID"+"B"
            deliveryID: `${headers['x-github-delivery']}B`,
            // contributorUsername in this case should be the contract address;
            // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
            contributorUsername: body['membership']['user']['login'],
            rewardBonus: 0,
            reservedType: 'member_added',
          })
        }).then((result) => {
          resolve(result)
        }).catch((error) => {
          reject(error)
        })
        break;
      default:
        let error = new Error(`No method to handle action ${action}.`)
        reject(error)
    }

  })
}
