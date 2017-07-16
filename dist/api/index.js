'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gittokenAPI;

var _express = require('express');

function gittokenAPI() {
  var _this = this;

  var router = (0, _express.Router)();

  router.get('/', function (req, res, next) {
    console.log('gittokenAPI::this.sqliteDB', _this.sqliteDB);
  });

  return router;
}