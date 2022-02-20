const koa = require('koa')
const config = require('config')
const views = require('koa-views')
const router = require('./routes')
const mount = require('koa-mount')
const serve = require('koa-static')
const compress = require('koa-compress')
const redirect = require('./middleware/redirect')
const state = require('./middleware/state')
const log = require('./middleware/log')
const log4js = require('log4js')
const logger = log4js.getLogger('app')
const http = require('http')
const https = require('https')
const fs = require('fs')

log4js.configure(config['log4js'])

// compress
const zip = compress({
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
})

const app = new koa()
  .use(redirect)
  .use(log)
  .use(zip)
  .use(mount('/static', serve('static', {maxage: 600 * 1000})))
  .use(state)
  .use(views(config['template'].path, config['template'].options))
  .use(router.routes())

// http
const httpPort = config.get("http.port")
http.createServer(app.callback()).listen(httpPort, () => logger.info(`the blog is running at: http://127.0.0.1:${httpPort}`))

// https
const httpsPort = config.get("https.port")
const httpsKey = config.get("https.ssl.key")
const httpsCert = config.get("https.ssl.cert")
const options = {}
if (httpsKey && httpsCert) {
  options.key = fs.readFileSync(httpsKey, "utf-8")
  options.cert = fs.readFileSync(httpsCert, "utf-8")
}
https.createServer(options, app.callback()).listen(httpsPort, () => logger.info(`the blog is running at: https://127.0.0.1:${httpsPort}`))

