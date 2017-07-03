import Web3 from 'web3'
import { Router } from 'express'
import Promise, { promisifyAll } from 'bluebird'

import defaultConfig from './defaultConfig'
import KeystoreGenerator from './KeystoreGenerator'
import { smtpServer, smtpHandleAuth } from './smtp/index'
import { socketHandler, socketRouter } from './websocket/index'
import { retrieveDetails, faucet, calculateRewardBonus } from './utils/index'
import { gittokenHyperlog, logMessage, logExchange, logVote } from './hyperlog/index'
import { handleLogin, handleVerification, handleAuthentication, ping, push, pullRequest } from './events/index'
import {
  getSavedContract, createGitTokenContract, saveContractDetails, generateReward, verifyContributor 
} from './contract/index'

import GitTokenContract from '../build/contracts/GitToken.json'



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
    // this.smtpHandleAuth = smtpHandleAuth.bind(this)
    // this.smtpServer = smtpServer.bind(this)
    // this.smtpServer({
    //   onAuth: this.smtpHandleAuth
    // })
    this.verifyContributor = verifyContributor.bind(this)

    this.gittokenHyperlog = gittokenHyperlog.bind(this)
    this.logMessage = logMessage.bind(this)
    this.logExchange = logExchange.bind(this)
    this.logVote = logVote.bind(this)
    this.handleLogin = handleLogin.bind(this)
    this.handleVerification = handleVerification.bind(this)
    this.handleAuthentication = handleAuthentication.bind(this)
    this.gittokenHyperlog({})

    this.socketHandler = socketHandler.bind(this)
    this.socketRouter = socketRouter.bind(this)
    this.socketHandler({})

    // Bind event methods to class scope

    this.ping = ping.bind(this)
    this.push = push.bind(this)
    this.pullRequest = pullRequest.bind(this)

    // bind utility methods to class scope
    this.getSavedContract = getSavedContract.bind(this)
    this.createGitTokenContract = createGitTokenContract.bind(this)
    this.saveContractDetails = saveContractDetails.bind(this)
    this.retrieveDetails = retrieveDetails.bind(this)
    this.faucet = faucet.bind(this)
    this.generateReward = generateReward.bind(this)
    this.calculateRewardBonus = calculateRewardBonus.bind(this)

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
        case 'pull_request':
          resolve(this.pullRequest(data))
          break;
        default:
          let error = new Error('Invalid Event Found')
          reject(error)
      }
    })
  }

}
