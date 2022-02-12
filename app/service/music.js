const config = require('config')
const Database = require('better-sqlite3');

const db = new Database(config.db, {verbose: console.log});

module.exports = {
  get: (id) => {
    return db.prepare('select * from music where id = ?').get(id)
  }
}