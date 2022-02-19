const log4js = require('log4js')
const moment = require('moment')
const useragent = require('useragent')
const accessLogger = log4js.getLogger('access')
const errorLogger = log4js.getLogger('error')

module.exports = async (ctx, next) => {
  const method = ctx.request.method
  const url = ctx.request.url
  const enterTime = Date.now()
  const ip = ctx.request.ip
  const agent = useragent.parse(ctx.request.headers['user-agent']).toString().split(' ').join('-')

  try {
    await next()
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    const cost = Date.now() - enterTime
    accessLogger.info(`${timestamp} ${method} ${url} ${agent} ${ip} ${cost}ms`)
  } catch (err) {
    errorLogger.error(err)
    throw err
  }
}