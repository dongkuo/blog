const category = require('../service/category')

module.exports = async (ctx, next) => {
  ctx.state.categories = await category.list()
  await next()
}