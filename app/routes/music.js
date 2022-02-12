const Router = require('@koa/router')
const router = new Router()
const musicService = require('../service/music')

router.get('/:id', async (ctx, next) => {
  let music = musicService.get(ctx.params.id)
  await ctx.render('music.ejs', {music})
})

module.exports = router
