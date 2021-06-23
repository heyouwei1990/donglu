var Koa = require('koa');
// var views = require('koa-views')
var app = new Koa();
var cors = require('koa2-cors');
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
app.use(cors());
app.use(logger());
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
// app.use(views(__dirname + '/pages', {
//     extension: 'ejs'
// }))
var novel = require('./router/novel')
var user = require('./router/user')
app.use(novel.routes()).use(novel.allowedMethods())
app.use(user.routes()).use(user.allowedMethods())
app.listen(8000);
module.exports = app