// http => https
const config = require('config')
const production = require('process').env.NODE_ENV === 'production'
const port = config.get('https.port') || 443

module.exports = async (ctx, next) => {
  if (!production || ctx.request.secure) {
    return next()
  }
  ctx.response.status = 301;
  ctx.response.redirect(`https://${ctx.request.hostname}:${port}${ctx.request.url}`)
}