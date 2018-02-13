const newrelic = require('newrelic');
const Koa = require('koa');
const app = new Koa();
const controllers = require('./controllers');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router')
const router = new Router()

app.use(bodyParser())

router
  .all('/', async (ctx) => {
    ctx.body = "Welcome to the Netflix Clone"
  })

  //  USER:
  // TODO: background worker will update the records to url: /userHome/:userid/
  // TODO: create dbase of all top 100 per region
  .all('/api/login', controllers.post.storeUser)
  // .post('http://localhost:8080/api/login', controllers.post.storeUser)

  //this is for the cache
  //based on userid, get watch/saved list; based on region, get the userid
  .get('/userHome/:userid/', controllers.get.userHome)

  //SEARCH
  //get and return searched videos in the dbase
  .get('/browse/:userid/:region/:search', controllers.get.searchVideo)
  //TODO: have service worker post in the background
  //TODO: gets
  // .get('/browse/:userid/:region/:genre', controllers.get.searchVideoGenre)
  // .get('/browse/:userid/:region/:original', controllers.get.searchVideoOriginal)
  // .get('/browse/:userid/:region', controllers.get.searchVideoRegion)

  //VIDEOLISTS
  //request and save searched videos to VideoLists
  .post('/requestVideos',controllers.post.updateVideos)
  .post('/updateVideos', controllers.post.updateVideos)
  .delete('/removeVideos', controllers.delete.deleteVideos)
  
  //post videos that are popular = top 100 per region
  //delete videos to delete

  //ANALYTICS
  //see contollers.get.searchVideo
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8886);