const Router = require('@koa/router')
const router = new Router()
const article = require('../service/article')

router.get('/', async (ctx, next) => {
    let articleGroup = await article.groupByYear()
    await ctx.render('archive.ejs', {articleGroup, activeCategory: 1})
})

module.exports = router
