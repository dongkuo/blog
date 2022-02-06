const Router = require('@koa/router')
const archive = new Router()
const article = require('../service/article')

archive.get('/', async (ctx, next) => {
    let articleGroup = article.groupByYear()
    await ctx.render('archive.ejs', {articleGroup})
})

module.exports = archive
