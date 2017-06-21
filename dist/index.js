'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _KeystoreGenerator2 = require('./KeystoreGenerator');

var _KeystoreGenerator3 = _interopRequireDefault(_KeystoreGenerator2);

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _index = require('./utils/index');

var _index2 = require('./events/index');

var _index3 = require('./contract/index');

var _express = require('express');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenContract = '{\n  "contract_name": "GitToken",\n  "abi": [\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "number",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "getNumber",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "inputs": [\n        {\n          "name": "_number",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "constructor"\n    }\n  ],\n  "unlinked_binary": "0x6060604052341561000c57fe5b6040516020806100d583398101604052515b60008190555b505b60a1806100346000396000f300606060405263ffffffff60e060020a6000350416638381f58a8114602a578063f2c9ecd8146049575bfe5b3415603157fe5b60376068565b60408051918252519081900360200190f35b3415605057fe5b6037606e565b60408051918252519081900360200190f35b60005481565b6000545b905600a165627a7a723058206da25a5ac4ed04377cf7586a0f5046e95043985eeadabb77e101f33a65e826240029",\n  "networks": {\n    "1497587172937": {\n      "links": {},\n      "events": {},\n      "updated_at": 1497593991492\n    },\n    "1497595660712": {\n      "links": {},\n      "events": {},\n      "updated_at": 1497985340554\n    },\n    "1497598920461": {\n      "links": {},\n      "events": {},\n      "updated_at": 1497599025763\n    },\n    "1497985858242": {\n      "links": {},\n      "events": {},\n      "updated_at": 1497987871242\n    },\n    "1497988935987": {\n      "links": {},\n      "events": {},\n      "updated_at": 1497992055888\n    }\n  },\n  "schema_version": "0.0.5",\n  "updated_at": 1497992055888\n}';

var GitTokenMiddleware = function (_KeystoreGenerator) {
  (0, _inherits3.default)(GitTokenMiddleware, _KeystoreGenerator);

  function GitTokenMiddleware(options) {
    (0, _classCallCheck3.default)(this, GitTokenMiddleware);

    var _this

    // bind utility methods to class scope


    //
    = (0, _possibleConstructorReturn3.default)(this, (GitTokenMiddleware.__proto__ || (0, _getPrototypeOf2.default)(GitTokenMiddleware)).call(this, options));

    var isGitHubHook = options.isGitHubHook,
        config = options.config,
        web3Provider = options.web3Provider,
        dirPath = options.dirPath,
        contractFile = options.contractFile;


    _this.dirPath = dirPath;
    _this.contractFile = contractFile;
    _this.gittokenContract = JSON.parse(GitTokenContract);
    _this.isGitHubHook = isGitHubHook;
    _this.config = (0, _extends3.default)({}, config, _defaultConfig2.default);

    // this.dirPath = dirPath
    // this.web3Provider = web3Provider
    // this.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
    // this.eth = promisifyAll(this.web3.eth)

    // Bind event methods to class scope
    _this.ping = _index2.ping.bind(_this);
    _this.push = _index2.push.bind(_this);_this.getSavedContract = _index3.getSavedContract.bind(_this);
    _this.createGitTokenContract = _index3.createGitTokenContract.bind(_this);
    _this.saveContractDetails = _index3.saveContractDetails.bind(_this);
    _this.retrieveDetails = _index.retrieveDetails.bind(_this);
    _this.faucet = _index.faucet.bind(_this);
    _this.generateReward = _index3.generateReward.bind(_this);_this.middlewareState = {
      accounts: {},
      contract: {},
      blockchain: {}
    };
    return _this;
  }

  (0, _createClass3.default)(GitTokenMiddleware, [{
    key: 'routeRequests',
    value: function routeRequests() {
      var _this2 = this;

      var router = (0, _express.Router)();
      router.post('/', function (req, res, next) {
        var headers = req.headers,
            body = req.body;

        _bluebird2.default.resolve().then(function () {
          if (_this2.isGitHubHook) {
            // console.log('GitHub WebHook Request')
            return _this2.handleGitHubWebHookEvent({
              event: headers['x-github-event'],
              data: { headers: headers, body: body }
            });
          } else {
            throw new Error('Request not yet configured');
          }
        }).then(function (response) {
          res.status(200).send((0, _stringify2.default)(response, null, 2));
        }).catch(function (error) {
          console.log('routeRequests::error', error);
          res.status(500).send((0, _stringify2.default)(error, null, 2));
        });
      });
      return router;
    }
  }, {
    key: 'handleGitHubWebHookEvent',
    value: function handleGitHubWebHookEvent(_ref) {
      var _this3 = this;

      var event = _ref.event,
          data = _ref.data;

      return new _bluebird2.default(function (resolve, reject) {
        // console.log('handleGitHubWebHookEvent::event', event)
        switch (event) {
          case 'ping':
            resolve(_this3.ping(data));
            break;
          case 'push':
            resolve(_this3.push(data));
            break;
          default:
            var error = new Error('Invalid Event Found');
            reject(error);
        }
      });
    }
  }]);
  return GitTokenMiddleware;
}(_KeystoreGenerator3.default);

exports.default = GitTokenMiddleware;