'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gittokenSQLite;
var sqlite3 = require('sqlite3').verbose();

function gittokenSQLite() {
  this.sqliteDB = new sqlite3.Database(this.dirPath + '/gittoken.sqlite');
}