import Promise from 'bluebird'

export default function milestone ({ event, data }) {
  return new Promise((resolve, reject) => {
    const { headers, body } = data
    const { action, milestone } = body
    const { decimals } = this.config

    /**
     * NOTE Determine when milestones are created, edited, and when
     * they are reached;
     * When a milestone is created, an initial supply of tokens should be set
     * aside for auctioning when the milstone is reached
     */

     switch(action) {
      case 'created':
        Promise.resolve().then(() => {
          this.analyticsProcessor.send(JSON.stringify({
            event: 'milestone_created',
            data: {
              createdBy: milestone['creator']['login'],
              title: milestone['title'],
              description: milestone['description'],
              createdOn: new Date(milestone['created_at']).getTime(),
              updatedOn: new Date(milestone['updated_at']).getTime(),
              dueOn: new Date(milestone['due_on']).getTime(),
              repository: milestone['repository']['full_name'],
              id: milestone['id']
            }
          }))
          return this.generateReward({
            rewardType: event,
            deliveryID: headers['x-github-delivery'],
            // contributorUsername in this case should be the contract address;
            // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
            contributorUsername: data['body']['sender']['login'],
            rewardBonus: 0,
            /*
              NOTE Eventually remove this switch statement and
              replace with action field from payload request
             */
            reservedType: 'created',
          })
        }).then((data) => {
          resolve(data)
        }).catch((error) => {
          reject(error)
        })
        break;
      case 'edited':
        resolve(this.generateReward({
          rewardType: event,
          deliveryID: headers['x-github-delivery'],
          // contributorUsername in this case should be the contract address;
          // basically the contract should hold the rewards until the milestone is // reached. Tokens will be auctioned on behalf of the project for funding.
          contributorUsername: data['body']['sender']['login'],
          rewardBonus: 0,
          reservedType: '',
        }))
        break;
      default:
        let error = new Error(`No method to handle milestone action ${action}.`)
        reject(error)
    }

  })
}
