const category = require('../service/category')

module.exports = async (ctx, next) => {
    ctx.state.categories = category.list()
    await next()
}