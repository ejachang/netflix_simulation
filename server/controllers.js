const db = require('../database/database-index.js');
const assert = require('assert');
const Koa = require('koa');
const app = new Koa();

// const Router = require('koa-router')
// const router = new Router()

db.client.connect(function (err) {
    assert.ifError(err);
});

const query = 'SELECT * from videos_by_region WHERE region=? limit 3';
const getVideoByAsia = db.client.execute(query, ['Asia'], { prepare: true })

const savedquery = 'SELECT * from saved_video_by_user limit 1';
const getVideosBySaved = db.client.execute(savedquery) 

const watchedquery = 'SELECT * from watched_video_by_user limit 1';
const getVideosByWatched = db.client.execute(watchedquery);

module.exports = { 
  getVideoByAsia,
  getVideosBySaved,
  getVideosByWatched
 }

// module.exports = {
//     getByRegionAsia: () => {
//       const query = 'SELECT * from videos_by_region WHERE region=?';
//       const getVideoByAsia = db.client.execute(query, ['Asia'], { prepare: true })
//     }
// }

// app.use(router.routes())

// makes sure a 405 Method Not Allowed is sent
// app.use(router.allowedMethods())

//reference
// db.client.connect(function (err) {
//     assert.ifError(err);
// });

// db.client.connect(function (err) {
//     assert.ifError(err);
//     const query = 'SELECT * from videos_by_region WHERE region=?';
//     db.client.execute(query, ['Asia'], { prepare: true })
//       .then(result => 
//         console.log(result.rows[0].videotitle)  
//     )
// });