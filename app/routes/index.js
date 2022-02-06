const Router = require('@koa/router')
const archive = require('./archive')
const article = require('./article')
const coding = require('./coding')
const writing = require('./writing')

const router = new Router()

router.use('/', archive.routes())
router.use('/article', article.routes())
router.use('/coding', coding.routes())
router.use('/writing', writing.routes())

module.exports = router