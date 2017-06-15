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

var GitTokenContract = '{\n  "contract_name": "GitToken",\n  "abi": [\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "name",\n      "outputs": [\n        {\n          "name": "",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "totalSupply",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "organization",\n      "outputs": [\n        {\n          "name": "",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "decimals",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint8"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "contributor",\n          "type": "address"\n        }\n      ],\n      "name": "balanceOf",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "owner",\n      "outputs": [\n        {\n          "name": "",\n          "type": "address"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "symbol",\n      "outputs": [\n        {\n          "name": "",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_rewardType",\n          "type": "uint256"\n        },\n        {\n          "name": "_contributor",\n          "type": "address"\n        }\n      ],\n      "name": "generateReward",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_rewardType",\n          "type": "uint256"\n        }\n      ],\n      "name": "getRewardValue",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "newOwner",\n          "type": "address"\n        }\n      ],\n      "name": "transferOwnership",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "inputs": [\n        {\n          "name": "_name",\n          "type": "string"\n        },\n        {\n          "name": "_symbol",\n          "type": "string"\n        },\n        {\n          "name": "_decimals",\n          "type": "uint8"\n        },\n        {\n          "name": "_config",\n          "type": "uint256[]"\n        }\n      ],\n      "payable": false,\n      "type": "constructor"\n    },\n    {\n      "payable": false,\n      "type": "fallback"\n    }\n  ],\n  "unlinked_binary": "0x6060604052341561000c57fe5b60405161094f38038061094f8339810160409081528151602083015191830151606084015191840193928301929091015b5b60008054600160a060020a03191633600160a060020a03161790555b6100726001826401000000006106b76100c582021704565b151561007e5760006000fd5b60006001558351610096906006906020870190610141565b5082516100aa906007906020860190610141565b506009805460ff191660ff84161790555b5b505050506101e1565b600060008251600014156100d95760006000fd5b5060005b82518160ff16101561013957828160ff168151811015156100fa57fe5b602090810290910181015160ff831660008181526003880190935260409092205583516000190114156101305760019150610139565b5b6001016100dd565b5b5092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061018257805160ff19168380011785556101af565b828001600101855582156101af579182015b828111156101af578251825591602001919060010190610194565b5b506101bc9291506101c0565b5090565b6101de91905b808211156101bc57600081556001016101c6565b5090565b90565b61075f806101f06000396000f300606060405236156100885763ffffffff60e060020a60003504166306fdde03811461009e57806318160ddd1461012e57806323bd4d7a14610150578063313ce567146101e057806370a08231146102065780638da5cb5b1461023457806395d89b4114610260578063a77783cc146102f0578063e5fa6ff814610323578063f2fde38b14610348575b341561009057fe5b61009c5b60006000fd5b565b005b34156100a657fe5b6100ae610366565b6040805160208082528351818301528351919283929083019185019080838382156100f4575b8051825260208311156100f457601f1990920191602091820191016100d4565b505050905090810190601f1680156101205780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561013657fe5b61013e6103f4565b60408051918252519081900360200190f35b341561015857fe5b6100ae6103fb565b6040805160208082528351818301528351919283929083019185019080838382156100f4575b8051825260208311156100f457601f1990920191602091820191016100d4565b505050905090810190601f1680156101205780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101e857fe5b6101f0610489565b6040805160ff9092168252519081900360200190f35b341561020e57fe5b61013e600160a060020a0360043516610492565b60408051918252519081900360200190f35b341561023c57fe5b6102446104b1565b60408051600160a060020a039092168252519081900360200190f35b341561026857fe5b6100ae6104c0565b6040805160208082528351818301528351919283929083019185019080838382156100f4575b8051825260208311156100f457601f1990920191602091820191016100d4565b505050905090810190601f1680156101205780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102f857fe5b61030f600435600160a060020a036024351661054e565b604080519115158252519081900360200190f35b341561032b57fe5b61013e600435610595565b60408051918252519081900360200190f35b341561035057fe5b61009c600160a060020a03600435166105aa565b005b6006805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103ec5780601f106103c1576101008083540402835291602001916103ec565b820191906000526020600020905b8154815290600101906020018083116103cf57829003601f168201915b505050505081565b6001545b90565b6008805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103ec5780601f106103c1576101008083540402835291602001916103ec565b820191906000526020600020905b8154815290600101906020018083116103cf57829003601f168201915b505050505081565b60095460ff1681565b600160a060020a0381166000908152600560205260409020545b919050565b600054600160a060020a031681565b6007805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103ec5780601f106103c1576101008083540402835291602001916103ec565b820191906000526020600020905b8154815290600101906020018083116103cf57829003601f168201915b505050505081565b6000805433600160a060020a0390811691161461056b5760006000fd5b61057d6001848463ffffffff6105f616565b15156105895760006000fd5b5060015b5b5b92915050565b6000818152600460205260409020545b919050565b60005433600160a060020a039081169116146105c65760006000fd5b600160a060020a038116156105f15760008054600160a060020a031916600160a060020a0383161790555b5b5b50565b600082815260038401602052604081205484546106189163ffffffff61068a16565b8455600160a060020a0382161561067f576000838152600385016020908152604080832054600160a060020a038616845260048801909252909120546106639163ffffffff61068a16565b600160a060020a03831660009081526004860160205260409020555b5060015b9392505050565b600082820161069b848210156106a6565b8091505b5092915050565b8015156105f15760006000fd5b5b50565b600060008251600014156106cb5760006000fd5b5060005b82518160ff16101561069f57828160ff168151811015156106ec57fe5b602090810290910181015160ff83166000818152600388019093526040909220558351600019011415610722576001915061069f565b5b6001016106cf565b5b50929150505600a165627a7a7230582028c5b3d604cfd384f7199217d525fb8dc6aae12f51f70ba0d2346d633e27c5d30029",\n  "networks": {},\n  "schema_version": "0.0.5",\n  "updated_at": 1497477650454\n}';

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
          case 'push':
            resolve(_this3.push(data));
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