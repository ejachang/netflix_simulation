const newrelic = require('newrelic');
const Koa = require('koa');
const app = new Koa();
const controllers = require('./controllers');

//  use for routes module later
//  const routes = require('../server/routes.js')

const Router = require('koa-router')
const router = new Router()

router
  .all('/', async (ctx) => {
    ctx.body = "halp"
  })
  //  list will send info: videos to update, videos to delete, videos that are popular
  //  top 100 per region

  //need to check what region the user is from to enter in the correct region 
  .get('/getByUser/:userID/:region', controllers.get.userHome)
  .post('/insertUserSaved/:userID', controllers.post.insertUserSaved)
  .post('/insertUserWatched/:userID', controllers.post.insertUserWatched)

  // .get('/test/:region', controllers.test.getByTest)
  //later by genre
  //later by title?
  //by search

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8886);
