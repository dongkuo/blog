const koa = require('koa')
const config = require('config')
const views = require('koa-views')
const router = require('./app/routes')
const mount = require('koa-mount')
const serve = require('koa-static')
const compress = require('koa-compress')
const state = require('./app/middleware/state')

new koa()
    .use(state)
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
    .use(mount('/static', serve('app/static', {maxage: 600 * 1000})))
    .use(views(config.template.path, config.template.options))
    .use(router.routes())
    .listen(3000)