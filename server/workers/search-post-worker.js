const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const router = new Router()

router.get('/requestVideoLibrary', async (ctx) => {
  try {
    console.log('get request maybe sent?')
    ctx.search = 'search';
    ctx.region = 'region';
    ctx.status = 200;
  } catch (err) {
    console.log('searchInfo error handler:', err.message);
  }
});