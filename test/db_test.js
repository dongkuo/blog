const process = require('process')
process.env.NODE_CONFIG_DIR = require('path').join(__dirname, '../config')
const log4js = require("log4js");
log4js.configure({
  appenders: {
    stdout: {type: 'stdout'},
  },
  categories: {
    default: {appenders: ['stdout'], level: 'debug'}
  }
})

const db = require('../dao/db')

async function query() {
  let [rows] = await db.query('select * from category where id = ?', [1])
  console.log(rows)
}

async function execute() {
  let r = await db.execute("insert into category(name, link) value (?, ?)", ['jdjdd', 'dssds'])
  console.log(r)
}

// Promise.all([execute(), query()]).finally(() => db.close())
// query().finally(() => db.close())
execute().finally(() => db.close())