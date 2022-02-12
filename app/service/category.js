const config = require('config')
const Database = require('better-sqlite3');

const db = new Database(config.db, {verbose: console.log});

module.exports = {
    list: () => {
        return db.prepare('select * from category order by id').all()
    }
}