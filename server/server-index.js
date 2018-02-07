const newrelic = require('newrelic');
const Koa = require('koa');
const app = new Koa();
const controllers = require('./controllers');

//  use for routes module later
//  const routes = require('../server/routes.js')

const Router = require('koa-router')
const router = new Router()

app.use(async(ctx, next) => {
  ctx.body = '不知死活';
  next();
});

//to get by region
router.get('/getByRegion/Asia', async (ctx) => {
  try {
    const data = await controllers.getVideoByAsia;
    ctx.body = data;
  } catch (err) {
    console.log('Error handler:', err.message);
  }
})

router.get('/savedByUser',  async (ctx) => {
  try {
    const data = await controllers
  } catch (err) {
    console.log('Error handler:', err.message);
  }
})

router.get('/watchedByUser', async (ctx) => {
  try {
    const data = await controllers
  } catch (err) {
    console.log('Error handler:', err.message);
  }
})


//later by genre
//later by title?

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8886);
