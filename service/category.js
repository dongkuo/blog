const db = require('../dao/db');

async function list() {
  let [rows] = await db.query('select * from category where status != -1 order by id')
  return rows
}

module.exports = {list}