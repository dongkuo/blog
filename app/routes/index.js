const Router = require('@koa/router')
const archive = require('./archive')
const article = require('./article')
const category = require('./category')
const music = require('./music')

const router = new Router()

router.use('/', archive.routes())
router.use('/article', article.routes())
router.use('/category', category.routes())
router.use('/music', music.routes())

module.exports = router