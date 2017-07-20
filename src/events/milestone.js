import Promise from 'bluebird'

export function milestone ({ event, data }) {
  return new Promise((resolve, reject) => {
    const { headers, body } = data
    const { action } = body

    /**
     * NOTE Determine when milestones are created, edited, and when
     * they are reached;
     * When a milestone is created, an initial supply of tokens should be set
     * aside for auctioning when the milstone is reached
     */

     switch(action) {
      case 'created':
        resolve(this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: data['body']['sender']['login'],
          rewardBonus: 0,
          reservedValue: 15000,
        }))
        break;
      case 'edited':
        resolve(this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: data['body']['sender']['login'],
          rewardBonus: 0,
          reservedValue: 0,
        }))
        break;
      default:
        let error = new Error(`No method to handle milestone action ${action}.`)
        reject(error)
    }

  })
}
