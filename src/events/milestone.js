import Promise from 'bluebird'

export default function milestone ({ event, data }) {
  return new Promise((resolve, reject) => {
    const { headers, body } = data
    const { action, milestone, repository } = body
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
              state: milestone['state'],
              createdOn: new Date(milestone['created_at']).getTime(),
              updatedOn: new Date(milestone['updated_at']).getTime(),
              dueOn: new Date(milestone['due_on']).getTime(),
              closedOn: new Date(milestone['closed_at']).getTime(),
              repository: repository['full_name'],
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
      case 'closed':
        var reward;
        Promise.resolve().then(() => {
          this.analyticsProcessor.send(JSON.stringify({
            event: 'milestone_closed',
            data: {
              createdBy: milestone['creator']['login'],
              title: milestone['title'],
              description: milestone['description'],
              state: milestone['state'],
              createdOn: new Date(milestone['created_at']).getTime(),
              updatedOn: new Date(milestone['updated_at']).getTime(),
              dueOn: new Date(milestone['due_on']).getTime(),
              closedOn: new Date(milestone['closed_at']).getTime(),
              repository: repository['full_name'],
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
          reward = data
          return this.initializeAuction({
            initialPrice: 1000 * Math.pow(10, decimals), // 1 ETH / TOken
            delay: 60*5, // 20 minute delay CHANGE IN PRODUCTION
            tokenLimitFactor: 20,
            lockTokens: true
          })
        }).then(() => {
          resolve(reward)
        }).catch((error) => {
          reject(error)
        })
        break;
      default:
        let error = new Error(`No method to handle milestone action ${action}.`)
        reject(error)
    }

  })
}
