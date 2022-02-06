const Router = require('@koa/router')
const archive = new Router()
const articleService = require('../service/article')

archive.get('/', async (ctx, next) => {
    let articleGroup = articleService.groupByCategory(1)
    await ctx.render('archive.ejs', {articleGroup})
})

module.exports = archive
