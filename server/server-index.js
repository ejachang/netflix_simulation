const newrelic = require('newrelic');
const Koa = require('koa');
const app = new Koa();
const controllers = require('./controllers');
// const db = require('../database/database-index.js');

//  use for routes module later
//  const routes = require('../server/routes.js')

const Router = require('koa-router')
const router = new Router()

//to get by region
// router
//   .get('/getByRegion/:region', controllers.getByRegion);
router
  .all('/', async (ctx) => {
    ctx.body = "halp"
  })
  //  list will send info: videos to update, videos to delete, videos that are popular
  //  top 100 per region


  //need to check what region the user is from to enter in the correct region 
  .get('/getByUser/:userID/:region', async (ctx, next) => {
    let user_entered = ctx.params.userID
    let region_entered = ctx.params.region
    try {
      region_data = await controllers.getByRegion(region_entered);
      watched_data = await controllers.getByWatched(user_entered);
      saved_data = await controllers.getBySaved(user_entered);
      ctx.body = [region_data.rows, watched_data.rows, saved_data.rows];
    } catch (err) {
      console.log('Error handler:', err.message);
    };
    
  })
  // .post( {});
  

  

// router.get('/savedByUser',  async (ctx) => {
//   try {
//     const data = await controllers.getVideosBySaved;
//     ctx.body = data;
//   } catch (err) {
//     console.log('Error handler:', err.message);
//   }
// })

// router.get('/watchedByUser', async (ctx) => {
//   try {
//     const data = await controllers.getVideosByWatched
//     ctx.body = data;
//   } catch (err) {
//     console.log('Error handler:', err.message);
//   }
// })


//later by genre
//later by title?
//by search

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8886);
