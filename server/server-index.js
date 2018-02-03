const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'You can put in an effort, but if you\'re stupid, you\'re stupid';
});

app.listen(8886);
