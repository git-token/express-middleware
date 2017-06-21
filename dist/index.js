'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var GitTokenContract = '{\n  "contract_name": "GitToken",\n  "abi": [\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_rewardType",\n          "type": "string"\n        }\n      ],\n      "name": "getRewardDetails",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_spender",\n          "type": "address"\n        },\n        {\n          "name": "_value",\n          "type": "uint256"\n        }\n      ],\n      "name": "approve",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "totalSupply",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        }\n      ],\n      "name": "getContributorAddress",\n      "outputs": [\n        {\n          "name": "",\n          "type": "address"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_from",\n          "type": "address"\n        },\n        {\n          "name": "_to",\n          "type": "address"\n        },\n        {\n          "name": "_value",\n          "type": "uint256"\n        }\n      ],\n      "name": "transferFrom",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_hashedCode",\n          "type": "bytes32"\n        }\n      ],\n      "name": "verifyContributor",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_code",\n          "type": "string"\n        }\n      ],\n      "name": "setContributor",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_rewardValue",\n          "type": "uint256"\n        },\n        {\n          "name": "_rewardType",\n          "type": "string"\n        }\n      ],\n      "name": "setRewardValue",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_contributor",\n          "type": "address"\n        }\n      ],\n      "name": "balanceOf",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        }\n      ],\n      "name": "getUnclaimedRewards",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [],\n      "name": "owner",\n      "outputs": [\n        {\n          "name": "",\n          "type": "address"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_rewardType",\n          "type": "string"\n        }\n      ],\n      "name": "rewardContributor",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "_to",\n          "type": "address"\n        },\n        {\n          "name": "_value",\n          "type": "uint256"\n        }\n      ],\n      "name": "transfer",\n      "outputs": [\n        {\n          "name": "",\n          "type": "bool"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": true,\n      "inputs": [\n        {\n          "name": "_owner",\n          "type": "address"\n        },\n        {\n          "name": "_spender",\n          "type": "address"\n        }\n      ],\n      "name": "allowance",\n      "outputs": [\n        {\n          "name": "",\n          "type": "uint256"\n        }\n      ],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "constant": false,\n      "inputs": [\n        {\n          "name": "newOwner",\n          "type": "address"\n        }\n      ],\n      "name": "transferOwnership",\n      "outputs": [],\n      "payable": false,\n      "type": "function"\n    },\n    {\n      "inputs": [\n        {\n          "name": "_email",\n          "type": "string"\n        },\n        {\n          "name": "_organization",\n          "type": "string"\n        },\n        {\n          "name": "_repoUri",\n          "type": "string"\n        }\n      ],\n      "payable": false,\n      "type": "constructor"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "owner",\n          "type": "address"\n        },\n        {\n          "indexed": true,\n          "name": "spender",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "value",\n          "type": "uint256"\n        }\n      ],\n      "name": "Approval",\n      "type": "event"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "from",\n          "type": "address"\n        },\n        {\n          "indexed": true,\n          "name": "to",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "value",\n          "type": "uint256"\n        }\n      ],\n      "name": "Transfer",\n      "type": "event"\n    },\n    {\n      "anonymous": false,\n      "inputs": [\n        {\n          "indexed": true,\n          "name": "contributor",\n          "type": "address"\n        },\n        {\n          "indexed": false,\n          "name": "value",\n          "type": "uint256"\n        }\n      ],\n      "name": "Contribution",\n      "type": "event"\n    }\n  ],\n  "unlinked_binary": "0x606060405234156200000d57fe5b60405162001ab038038062001ab083398101604090815281516020830151918301519083019291820191015b5b60008054600160a060020a03191633600160a060020a03161790555b81516200006b90600290602085019062000699565b5080516200008190600390602084019062000699565b5060006001819055600160a060020a03331681526005602090815260409091208451620000b19286019062000699565b50336001600501846040518082805190602001908083835b60208310620000ea5780518252601f199092019160209182019101620000c9565b51815160001960209485036101000a01908116901991909116179052920194855250604080519485900390910184208054600160a060020a0396909616600160a060020a03199096169590951790945550507f70696e670000000000000000000000000000000000000000000000000000000081526004808201819052825191829003602490810183206109c4908190557f70757368000000000000000000000000000000000000000000000000000000008452838301839052845193849003820184206103e8908190557f636f6d6d6974436f6d6d656e74000000000000000000000000000000000000008552600d808601859052865195869003602d908101872060fa908190557f63726561746500000000000000000000000000000000000000000000000000008852600680890188905289519889900360269081018a20969096557f64656c65746500000000000000000000000000000000000000000000000000008952888101889052895198899003860189206000908190557f6465706c6f796d656e74000000000000000000000000000000000000000000008a52600a808b018a90528b519a8b9003602a9081018c20611388908190557f6465706c6f796d656e74537461747573000000000000000000000000000000008d5260108d018c90528d519c8d90036030018d206064908190557f666f726b000000000000000000000000000000000000000000000000000000008e528d8d018d90528e519d8e9003909b018d20557f676f6c6c756d00000000000000000000000000000000000000000000000000008c528b84018b90528c519b8c900389018c208590557f696e7374616c6c6174696f6e00000000000000000000000000000000000000008c52600c808d018c90528d519c8d9003602c9081018e208790557f696e7374616c6c6174696f6e5265706f7369746f7269657300000000000000008e5260188e018d90528e519d8e90036038018e208a90557f6973737565436f6d6d656e7400000000000000000000000000000000000000008e528d82018d90528e519d8e900381018e208790557f69737375657300000000000000000000000000000000000000000000000000008e528d86018d90528e519d8e90038b018e208c90557f6c6162656c0000000000000000000000000000000000000000000000000000008e5260058e018d90528e519d8e90036025018e209b909b557f6d61726b6574706c6163655075726368617365000000000000000000000000008d5260138d018c90528d519c8d90036033018d208490557f6d656d62657200000000000000000000000000000000000000000000000000008d52938c018b90528c519b8c90039098018b208790557f6d656d62657273686970000000000000000000000000000000000000000000008b528a018990528a51998a900390960189208590557f6d696c6573746f6e65000000000000000000000000000000000000000000000089526009808a018990528a51998a900360299081018b20613a9890557f6f7267616e697a6174696f6e00000000000000000000000000000000000000008b528a83018a90528b519a8b900389018b208790557f6f7267426c6f636b0000000000000000000000000000000000000000000000008b5260088b018a90528b519a8b90036028018b20979097557f706167654275696c6400000000000000000000000000000000000000000000008a52890188905289519889900390950188206101f490557f70726f6a656374436172640000000000000000000000000000000000000000008852600b8801879052885197889003602b0188208190557f70726f6a656374436f6c756d6e000000000000000000000000000000000000008852918701869052875196879003018620557f70756c6c5f7265717565737400000000000000000000000000000000000000008552908401929092529251918290039092019020555b50505062000743565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620006dc57805160ff19168380011785556200070c565b828001600101855582156200070c579182015b828111156200070c578251825591602001919060010190620006ef565b5b506200071b9291506200071f565b5090565b6200074091905b808211156200071b576000815560010162000726565b5090565b90565b61135d80620007536000396000f300606060405236156100bf5763ffffffff60e060020a600035041663025dabae81146100c1578063095ea7b31461012957806318160ddd1461014a5780631e923ded1461016c57806323b872dd146101de57806350428fd914610205578063538ddc611461027157806366253c441461031857806370a082311461038357806376500a7e146103b15780638da5cb5b1461041957806393e9de8c14610445578063a9059cbb146104ec578063dd62ed3e1461051f578063f2fde38b14610553575bfe5b34156100c957fe5b610117600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061057195505050505050565b60408051918252519081900360200190f35b341561013157fe5b610148600160a060020a03600435166024356105de565b005b341561015257fe5b610117610694565b60408051918252519081900360200190f35b341561017457fe5b6101c2600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061069b95505050505050565b60408051600160a060020a039092168252519081900360200190f35b34156101e657fe5b610148600160a060020a0360043581169060243516604435610711565b005b341561020d57fe5b61025d600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650509335935061078392505050565b604080519115158252519081900360200190f35b341561027957fe5b61025d600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965061080f95505050505050565b604080519115158252519081900360200190f35b341561032057fe5b60408051602060046024803582810135601f810185900485028601850190965285855261025d958335959394604494939290920191819084018382808284375094965061083e95505050505050565b604080519115158252519081900360200190f35b341561038b57fe5b610117600160a060020a03600435166108b2565b60408051918252519081900360200190f35b34156103b957fe5b610117600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437509496506108d195505050505050565b60408051918252519081900360200190f35b341561042157fe5b6101c261093e565b60408051600160a060020a039092168252519081900360200190f35b341561044d57fe5b61025d600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965061094d95505050505050565b604080519115158252519081900360200190f35b34156104f457fe5b61025d600160a060020a0360043516602435610a89565b604080519115158252519081900360200190f35b341561052757fe5b610117600160a060020a0360043581169060243516610afd565b60408051918252519081900360200190f35b341561055b57fe5b610148600160a060020a0360043516610b2a565b005b60006001600301826040518082805190602001908083835b602083106105a85780518252601f199092019160209182019101610589565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054925050505b919050565b604060443610156105ef5760006000fd5b6000821180156106245750600160a060020a033381166000908152600760209081526040808320938716835292905290812054115b1561062f5760006000fd5b600160a060020a03338116600081815260076020908152604080832094881680845294825291829020869055815186815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a35b5b5b505050565b6001545b90565b60006001600501826040518082805190602001908083835b602083106106d25780518252601f1990920191602091820191016106b3565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054600160a060020a0316925050505b919050565b606060643610156107225760006000fd5b610735600185858563ffffffff610b7616565b15156107415760006000fd5b82600160a060020a031684600160a060020a0316600080516020611312833981519152846040518082815260200191505060405180910390a35b5b5b50505050565b6000805433600160a060020a039081169116146107a05760006000fd5b816001600901846040518082805190602001908083835b602083106107d65780518252601f1990920191602091820191016107b7565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092209290925550505b5b92915050565b60006108236001848463ffffffff610c5b16565b151561082f5760006000fd5b506001610808565b5b92915050565b6000826001600301836040518082805190602001908083835b602083106108765780518252601f199092019160209182019101610857565b51815160209384036101000a60001901801990921691161790529201948552506040519384900301909220929092555060019150505b92915050565b600160a060020a0381166000908152600860205260409020545b919050565b60006001600801826040518082805190602001908083835b602083106105a85780518252601f199092019160209182019101610589565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054925050505b919050565b600054600160a060020a031681565b600080806109636001868663ffffffff610f6e16565b151561096f5760006000fd5b6001600501856040518082805190602001908083835b602083106109a45780518252601f199092019160209182019101610985565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381018420548851600160a060020a039091169650600494899450925082918401908083835b60208310610a0f5780518252601f1990920191602091820191016109f0565b51815160209384036101000a6000190180199092169116179052920194855250604080519485900382018520548086529051909550600160a060020a038716947f4d154d4aae216bed6d0926db77c00df2b57c6b5ba4eee05775de20facede3a7b94508190039091019150a2600192505b5b505092915050565b600060406044361015610a9c5760006000fd5b610aae6001858563ffffffff6111a316565b1515610aba5760006000fd5b83600160a060020a031633600160a060020a0316600080516020611312833981519152856040518082815260200191505060405180910390a35b5b5b5092915050565b600160a060020a038083166000908152600760209081526040808320938516835292905220545b92915050565b60005433600160a060020a03908116911614610b465760006000fd5b600160a060020a03811615610b715760008054600160a060020a031916600160a060020a0383161790555b5b5b50565b600160a060020a038084166000908152600686016020908152604080832033909416835292905290812054610bb1818463ffffffff61122b16565b600160a060020a038087166000908152600689016020908152604080832033851684528252808320949094559187168152600789019091522054610bfb908463ffffffff61124416565b600160a060020a0380861660009081526007890160205260408082209390935590871681522054610c32908463ffffffff61122b16565b600160a060020a0386166000908152600788016020526040902055600191505b50949350505050565b6000816040518082805190602001908083835b60208310610c8d5780518252601f199092019160209182019101610c6e565b51815160209384036101000a6000190180199092169116179052604051919093018190038120885190955060098a019450889391925082918401908083835b60208310610ceb5780518252601f199092019160209182019101610ccc565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054929092149150610d2990505760006000fd5b600084600801846040518082805190602001908083835b60208310610d5f5780518252601f199092019160209182019101610d40565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020541115610eb457610e2184600801846040518082805190602001908083835b60208310610dd05780518252601f199092019160209182019101610db1565b51815160209384036101000a6000190180199092169116179052920194855250604080519485900382019094205433600160a060020a0316600090815260078b019092529390205492915050611244565b84600701600033600160a060020a0316600160a060020a0316815260200190815260200160002081905550600084600801846040518082805190602001908083835b60208310610e825780518252601f199092019160209182019101610e63565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092209290925550505b5b600160a060020a033316600090815260048501602090815260409091208451610ee092860190611271565b503384600501846040518082805190602001908083835b60208310610f165780518252601f199092019160209182019101610ef7565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092208054600160a060020a031916600160a060020a0394909416939093179092555060019150505b9392505050565b60006000600085600301846040518082805190602001908083835b60208310610fa85780518252601f199092019160209182019101610f89565b51815160209384036101000a6000190180199092169116179052920194855250604051938490038101842054895190965060058b01948a9450925082918401908083835b6020831061100b5780518252601f199092019160209182019101610fec565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054600160a060020a0316925050508115156110515760006000fd5b8554611063908363ffffffff61124416565b8655600160a060020a038116151561114d576110e28287600801876040518082805190602001908083835b602083106110ad5780518252601f19909201916020918201910161108e565b51815160209384036101000a600019018019909216911617905292019485525060405193849003019092205492915050611244565b86600801866040518082805190602001908083835b602083106111165780518252601f1990920191602091820191016110f7565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922092909255506111949050565b600160a060020a0381166000908152600787016020526040902054611178908363ffffffff61124416565b600160a060020a03821660009081526007880160205260409020555b600192505b5b50509392505050565b600160a060020a03331660009081526007840160205260408120546111ce908363ffffffff61122b16565b600160a060020a0333811660009081526007870160205260408082209390935590851681522054611205908363ffffffff61124416565b600160a060020a03841660009081526007860160205260409020555060015b9392505050565b600061123983831115611260565b508082035b92915050565b600082820161125584821015611260565b8091505b5092915050565b801515610b715760006000fd5b5b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106112b257805160ff19168380011785556112df565b828001600101855582156112df579182015b828111156112df5782518255916020019190600101906112c4565b5b506112ec9291506112f0565b5090565b61069891905b808211156112ec57600081556001016112f6565b5090565b905600ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa165627a7a72305820852f99e2ad3a52290aa1d5f24de0bf62a63fb8efa55924286544e2e9d241b58e0029",\n  "networks": {\n    "1497988935987": {\n      "links": {},\n      "events": {\n        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "owner",\n              "type": "address"\n            },\n            {\n              "indexed": true,\n              "name": "spender",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "value",\n              "type": "uint256"\n            }\n          ],\n          "name": "Approval",\n          "type": "event"\n        },\n        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "from",\n              "type": "address"\n            },\n            {\n              "indexed": true,\n              "name": "to",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "value",\n              "type": "uint256"\n            }\n          ],\n          "name": "Transfer",\n          "type": "event"\n        },\n        "0x4d154d4aae216bed6d0926db77c00df2b57c6b5ba4eee05775de20facede3a7b": {\n          "anonymous": false,\n          "inputs": [\n            {\n              "indexed": true,\n              "name": "contributor",\n              "type": "address"\n            },\n            {\n              "indexed": false,\n              "name": "value",\n              "type": "uint256"\n            }\n          ],\n          "name": "Contribution",\n          "type": "event"\n        }\n      },\n      "updated_at": 1498075867407\n    }\n  },\n  "schema_version": "0.0.5",\n  "updated_at": 1498075867407\n}';

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
    _this.config = config;

    // this.dirPath = dirPath
    // this.web3Provider = web3Provider
    // this.web3 = new Web3(new Web3.providers.HttpProvider(web3Provider))
    // this.eth = promisifyAll(this.web3.eth)

    // Bind event methods to class scope
    _this.ping = _index2.ping.bind(_this);
    _this.push = _index2.push.bind(_this);
    _this.pullRequest = _index2.pullRequest.bind(_this);_this.getSavedContract = _index3.getSavedContract.bind(_this);
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
          res.status(500).send(error.message);
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
        console.log('handleGitHubWebHookEvent::event', event);
        console.log('handleGitHubWebHookEvent::data', data);

        switch (event) {
          case 'ping':
            resolve(_this3.ping(data));
            break;
          case 'push':
            resolve(_this3.push(data));
            break;
          case 'pull_request':
            resolve(_this3.pullRequest(data));
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