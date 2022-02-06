const koa = require('koa'),
    path = require('path'),
    views = require('koa-views'),
    config = require('config'),
    serve = require('koa-static');

const app = module.exports = new koa();

app.use(views(config.template.path, config.template.options));

require('./app/routes')(app);

if (!module.parent) app.listen(3000);