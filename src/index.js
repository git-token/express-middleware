import Promise, { promisifyAll } from 'bluebird'
import Web3 from 'web3'
import KeystoreGenerator from './KeystoreGenerator'
import defaultConfig from './defaultConfig'
import {
  retrieveDetails,
  faucet
} from './utils/index'
import { ping, push } from './events/index'
import {
  getSavedContract,
  createGitTokenContract,
  saveContractDetails,
  generateReward
} from './contract/index'
import GitTokenContract from '../build/contracts/GitToken.json'

import { Router } from 'express'

export default class GitTokenMiddleware extends KeystoreGenerator {
  constructor(options) {
    super(options)
    const { isGitHubHook, config, web3Provider, dirPath, contractFile } = options

    this.dirPath = dirPath
    this.contractFile = contractFile
    this.gittokenContract = JSON.parse(GitTokenContract)
    this.isGitHubHook = isGitHubHook
    this.config = config

    // this.dirPath = dirPath
    // this.web3Provider = web3Provider
    // this.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
    // this.eth = promisifyAll(this.web3.eth)

    // Bind event methods to class scope
    this.ping = ping.bind(this)
    this.push = push.bind(this)

    // bind utility methods to class scope
    this.getSavedContract = getSavedContract.bind(this)
    this.createGitTokenContract = createGitTokenContract.bind(this)
    this.saveContractDetails = saveContractDetails.bind(this)
    this.retrieveDetails = retrieveDetails.bind(this)
    this.faucet = faucet.bind(this)
    this.generateReward = generateReward.bind(this)

    //
    this.middlewareState = {
      accounts: {},
      contract: {},
      blockchain: {}
    }
  }

  routeRequests () {
    let router = Router()
    router.post('/', (req, res, next) => {
      const { headers, body } = req
      Promise.resolve().then(() => {
        if (this.isGitHubHook) {
          // console.log('GitHub WebHook Request')
          return this.handleGitHubWebHookEvent({
            event: headers['x-github-event'],
            data: { headers, body }
          })
        } else {
          throw new Error('Request not yet configured')
        }
      }).then((response) => {
        res.status(200).send(JSON.stringify(response, null, 2))
      }).catch((error) => {
        console.log('routeRequests::error', error)
        res.status(500).send(error.message)
      })
    })
    return router
  }

  handleGitHubWebHookEvent ({ event, data }) {
    return new Promise((resolve, reject) => {
      console.log('handleGitHubWebHookEvent::event', event)
      console.log('handleGitHubWebHookEvent::data', data)

      switch(event) {
        case 'ping':
          resolve(this.ping(data))
          break;
        case 'push':
          resolve(this.push(data))
          break;
        default:
          let error = new Error('Invalid Event Found')
          reject(error)
      }
    })
  }

}
