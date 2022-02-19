const config = require("config")
const mysql = require('mysql2')
const pool = mysql.createPool(config['mysql']).promise()
const logger = require("log4js").getLogger("db")

const db = {
  async close() {
    logger.info('close db...')
    return await pool.end()
  },
  async query(sql, params) {
    logger.debug(`==> ${sql}`)
    if (params) {
      logger.debug(`==> ${params}`)
    }
    const [rows, filed] = await pool.query(sql, params)
    logger.debug(`<== rows: ${rows.length}`)
    return [rows, filed]
  },
  async execute(sql, params) {
    logger.debug(`==> ${sql}`)
    if (params) {
      logger.debug(`==> ${params}`)
    }
    const [results] = await pool.execute(sql, params)
    logger.debug(`<== affectedRows: ${results['affectedRows']}`)
    return results
  }
}

module.exports = db