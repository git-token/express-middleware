'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = smtpServer;

var _smtpServer = require('smtp-server');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _pem = require('pem');

var _pem2 = _interopRequireDefault(_pem);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smtpServer(_ref) {
  var _this = this;

  var name = _ref.name,
      username = _ref.username,
      userpass = _ref.userpass,
      host = _ref.host,
      port = _ref.port;

  var HOST = host ? host : '127.0.0.1'; //ip.address()
  var PORT = port ? port : 1752;
  var USERNAME = username ? username : 'GitToken';
  var USERPASS = userpass ? userpass : new Buffer('' + HOST + new Date().toString()).toString('hex');
  _pem2.default.createCertificate({ days: 1, selfSigned: true }, function (error, keys) {
    if (error) {
      console.log(error);
    }
    var serviceKey = keys.serviceKey,
        certificate = keys.certificate;

    _this.smtp = new _smtpServer.SMTPServer({
      secure: false,
      name: name
      // key: serviceKey,
      // cert: certificate 
    });

    _this.smtp.listen(PORT, function () {

      _this.smtpTransporter = _nodemailer2.default.createTransport({
        host: HOST,
        port: PORT,
        secure: true,
        auth: {
          user: '',
          pass: USERPASS
        }
      });

      _this.smtpTransporter.sendMail({
        from: '"GitToken Helper" <' + USERNAME + '@' + HOST + '>', // sender address
        to: 'ryan.michael.tate@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
      }, function (error, info) {
        console.log('smtpServer::error', error);
        console.log('smtpServer::info', info);
      });
      console.log('SMTP Server running on host ' + HOST + ' & port ' + PORT);
    });
  });
}