const nav = require('../service/nav')

module.exports = async (ctx, next) => {
    ctx.state.navs = nav.list()
    await next()
}