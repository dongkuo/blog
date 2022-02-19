const koa = require('koa')
const config = require('config')
const views = require('koa-views')
const router = require('./routes')
const mount = require('koa-mount')
const serve = require('koa-static')
const compress = require('koa-compress')
const state = require('./middleware/state')
const log = require('./middleware/log')
const log4js = require('log4js')
const logger = log4js.getLogger('app')

log4js.configure(config['log4js'])

new koa()
  .use(log)
  .use(compress({
    filter(contentType) {
      return /text/i.test(contentType)
    },
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false
  }))
  .use(mount('/static', serve('static', {maxage: 600 * 1000})))
  .use(state)
  .use(views(config['template'].path, config['template'].options))
  .use(router.routes())
  .listen(config.get('server.port'), () => logger.info(`the blog is running at: http://127.0.0.1:${config.get('server.port')}`))

