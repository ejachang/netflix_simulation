const Koa = require('koa');
const app = new Koa();
const models = require('../server/models.js')

app.use(ctx => {
  ctx.body = 'You can always put in an effort, but if you\'re stupid, you\'re stupid';
});

app.listen(8886);
