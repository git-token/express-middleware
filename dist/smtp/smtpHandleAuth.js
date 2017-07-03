'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = smtpHandleAuth;
function smtpHandleAuth(auth, session, callback) {
  console.log('smtpHandleAuth::auth', auth);
  console.log('smtpHandleAuth::session', session);
  callback(null, {
    user: 'someUserDetails'
  });
}