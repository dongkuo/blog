const Router = require('@koa/router')
const articleService = require('../service/article')
const moment = require("moment");
const article = new Router()

article.get('/:id', async (ctx, next) => {
    let article = articleService.getById(ctx.params.id)
    if (!article) {
        // TODO go to 404 page
        return ctx.body = '404'
    }
    article.postDateTime = moment(article['post_time']).format('YYYY年MM月DD日 HH:mm')
    await ctx.render('article.ejs', {article})
})

module.exports = article
