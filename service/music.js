const db = require('../dao/db');

async function get(id) {
  let [music] = await db.query('select * from music where id = ?', [id])
  return music[0]
}

module.exports = {get}