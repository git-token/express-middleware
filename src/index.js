import Web3 from 'web3'
import express, { Router } from 'express'
import Promise, { promisifyAll } from 'bluebird'
import passport from 'passport'
import { Strategy } from 'passport-github'
import KeystoreGenerator from './KeystoreGenerator'
import { smtpServer, smtpHandleAuth } from './smtp/index'
import { socketHandler, socketRouter } from './websocket/index'
import {
  retrieveDetails,
  faucet,
  calculateRewardBonus,
  parseGitHubEvents,
  parsePushEvent
} from './utils/index'
import { gittokenHyperlog, logMessage, logExchange, logVote } from './hyperlog/index'
import {
  handleLogin,
  handleVerification,
  handleContractDetails,
  handleAuthentication,
  ping,
  push,
  pullRequest
} from './events/index'
import {
  getSavedContract, createGitTokenContract, saveContractDetails, generateReward, verifyContributor
} from './contract/index'

import GitTokenContract from 'gittoken-contracts/build/contracts/GitToken.json'

export default class GitTokenMiddleware extends KeystoreGenerator {
  constructor(options) {
    super(options)
    const { githubCredentials, isGitHubHook, config, web3Provider, dirPath, contractFile, faucetActive } = options

    this.githubCredentials = githubCredentials
    this.faucetActive = faucetActive
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
    this.handleContractDetails = handleContractDetails.bind(this)

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
    this.parsePushEvent = parsePushEvent.bind(this)
    this.parseGitHubEvents = parseGitHubEvents.bind(this)
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

    passport.use(new Strategy(this.githubCredentials,
      function(accessToken, refreshToken, profile, cb) {
        cb(null, { accessToken, profile });
      })
    );

    passport.serializeUser((user, cb) => {
      cb(null, user)
    })

    passport.deserializeUser((user, cb) => {
      cb(null, user)
    })

    router.use(passport.initialize());
    router.use(passport.session());
    router.use('/messenger',
      express.static(`${process.cwd()}/node_modules/gittoken-messenger-ui/`))
    router.get('/auth', passport.authenticate('github'))
    router.get('/auth/callback',
      passport.authenticate('github', { failureRedirect: '/' }),
      (req, res) => { res.redirect('/messenger') })

    router.post('/verify/:address', (req, res) => {
      console.log('gittoken::verify::req.user', req.user)
      res.send(true)
    })

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

    router.post('/faucet/:address', (req, res, next) => {
      if (!this.faucetActive) {
        res.status(500).send(JSON.stringify({
          message: `Faucet is not active! Set { faucetActive: true } to enable`
        }, null, 2))
      } else {
        let from
        this.importKeystore({}).then((_ks) => {
          from = `0x${this.ks.getAddresses()[0]}`
          return this.eth.getBalanceAsync(from)
        }).then((balance) => {
          console.log(`Balance of ${from}::balance`, balance)
          if (balance.toNumber() > 2e16) {
            return this.signTransaction({
              to: `0x${req.params.address}`,
              from,
              value: 2e16,
              gasLimit: 4e6,
              data: null
            })
          } else {
            res.status(500).send(JSON.stringify({
              message: `Faucet does not have enough funds! Send funds to ${from}`,
              balance
            }, null, 2))
          }
        }).then((signedTx) => {
          console.log('`0x${signedTx}`', `0x${signedTx}`)
          return this.eth.sendRawTransactionAsync(`0x${signedTx}`)
        }).then((txHash) => {
          console.log('txHash', txHash)
          return this.getTransactionReceipt(txHash)
        }).then((txReceipt) => {
          console.log('txReceipt', txReceipt)
          res.status(200).send(txReceipt)
        }).catch((error) => {
          console.log('error', error)
          res.status(500).send(JSON.stringify(error, null, 2))
        })
      }
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
