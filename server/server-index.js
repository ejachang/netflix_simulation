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
    ctx.body = "halp"
  })

  //  list will send info: videos to update, videos to delete, videos that are popular
  //  top 100 per region

  //if the user exists, update their videos list. If it doesn't, find based on id and insert

  .post('/api/login', controllers.post.storeUser)
  // .post('http://localhost:8080/api/login', controllers.post.storeUser)

  //based on userid, get watch/saved list; based on region, get the userid
  .get('/userHome/:userid/', controllers.get.userHome)
  //get and return searched videos in the dbase
  .get('/browse/:userid/:region/:search', controllers.get.searchVideo)
  //have service worker post in the background

  //eventual gets
  // .get('/browse/:userid/:region/:genre', controllers.get.searchVideoGenre)
  // .get('/browse/:userid/:region/:original', controllers.get.searchVideoOriginal)
  // .get('/browse/:userid/:region', controllers.get.searchVideoRegion)

  //request and save searched videos to VideoLists
  .post('/addVideoLibrary',controllers.post.requestVideo)

  //collect and send searched info to Analytics
  //will continuously push the searches into an object; send to the analytics every
  //3 minutes
  .post('/sendSearchInfo', controllers.post.searchedVideos)
  .post('/updateVideos', controllers.post.updateVideos)
  //post searched videos information
  //post videos to delete
  //post videos that are popular = top 100 per region
  //delete videos to delete


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8886);