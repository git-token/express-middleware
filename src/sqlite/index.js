const sqlite3 = require('sqlite3').verbose()

export default function gittokenSQLite () {
  this.sqliteDB = new sqlite3.Database(`${this.dirPath}/gittoken.sqlite`)
}
