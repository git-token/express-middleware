'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleAuthentication;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleAuthentication(_ref) {
  var connection = _ref.connection,
      data = _ref.data;

  return new _bluebird2.default(function (resolve, reject) {
    var event = data.event,
        message = data.message;
    // this.getSavedContract({}).then(() => {
    //   console.log('this.gittokenContract', this.gittokenContract)
    //   if (message.match(RegExp('/login'))) {
    //     let params = message.replace('/login ', '').split(' ')
    //     console.log('params', params)
    //     return this.gittokenContract.getContributorAddress(params[0])
    //   }
    // }).then((contributorAddress) => {
    //   console.log('contributorAddress', contributorAddress)
    //   connection.send(JSON.stringify({
    //     event: 'login',
    //     date: new Date().getTime(),
    //     message: `Login Matched Address: ${contributorAddress}`,
    //     data: { contributorAddress }
    //   }))
    //   resolve()
    // }).catch((error) => {
    //   console.log('error', error)
    // })
  });
}