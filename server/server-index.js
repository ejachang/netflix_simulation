const newrelic = require('newrelic');
const Koa = require('koa');
const app = new Koa();
const controllers = require('./controllers');

//  use for routes module later
//  const routes = require('../server/routes.js')

const Router = require('koa-router')
const router = new Router()


// [ {region: 'Antartica'}
  // {videoSaved:[1, 2, 3]},
  // {videoWatched:[1, 2, 3]}

router
  .all('/', async (ctx) => {
    ctx.body = "halp"
  })
  //  list will send info: videos to update, videos to delete, videos that are popular
  //  top 100 per region

  .get('/UserHome/:userID/', controllers.get.userHome)
  //post at the certain user's url the videos
  // .post('/userHome/:userID/', controllers.get.userHome)

  //get and return searched videos in the dbase
  // .get('/browse/:userid/:region/:search', controllers.get.searchVideoTerm)
  // .post('/browse/:userid/:region/:search', controllers.post.searchVideoTerm)

  // .get('/browse/:userid/:region/:genre', controllers.get.searchVideoGenre)
  // .post('/browse/:userid/:region/:genre', controllers.post.searchVideoGenre)
  // .get('/browse/:userid/:region/:original', controllers.get.searchVideoOriginal)
  // .post('/browse/:userid/:region/:original', controllers.post.searchVideoOriginal)
  // .get('/browse/:userid/:region', controllers.get.searchVideoRegion)
  // .post('/browse/:userid/:region', controllers.post.searchVideoRegion)

  //request and save searched videos to VideoLists
  // .get('requestVideoLibrary/:search', controllers.get.requestVideo)
  // .put('/addVideoLibrary/:region',controllers.put.requestVideo)

  //collect and send searched info to Analytics
  // .post('sendSearchInfo', controllers.post.searchedVideos)


  //post searched videos information
  //post videos to delete
  //post videos that are popular = top 100 per region
  //delete videos to delete
  

  //later by genre
  //later by title?
  //by search

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8886);
//eventually have this in the cache so that it saves the lists of 
  //what the user has saved and watched
  // .post('/insertUserSaved/:userID', controllers.post.insertUserSaved)
  // .post('/insertUserWatched/:userID', controllers.post.insertUserWatched)
  