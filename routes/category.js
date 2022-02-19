const Router = require('@koa/router')
const router = new Router()
const articleService = require('../service/article')

router.get('/:id', async (ctx, next) => {
    let categoryId = parseInt(ctx.params.id)
    let articleGroup = await articleService.groupByCategory(categoryId)
    await ctx.render('archive.ejs', {articleGroup, activeCategory: categoryId})
})

module.exports = router
