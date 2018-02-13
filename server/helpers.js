const models = require('./models.js');
// const db = require('../database/database-index.js');
const assert = require('assert');
const Router = require('koa-router')
const router = new Router()
// db.client.connect(function (err) {
//   assert.ifError(err);
// });

module.exports = {
  getDate: () => {
    var d1 = new Date();
    d1.toUTCString();
    Math.floor(d1.getTime()/ 1000)
    var d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
    d2.toUTCString()
    return d2
  },
  postUserInfoToDB: (userid, region, watched, saved) => {
    models.post.insertByRegion(userid, region)
    models.post.updateByRegion(userid, region)
    models.post.insertByWatched(userid, watched)
    models.post.updateByWatched(userid, watched)
    models.post.insertBySaved(userid, saved)
    models.post.updateBySaved(userid, saved)
  },
  getHomeTitles: async (region, videowatched, videosaved) => {
    let region_videos = await models.get.ByRegion(region);
    let regions = [];
      for (var i = 0; i < region_videos.rows.length; i++) {
        regions.push(region_videos.rows[i].videotitle)
      }
    let watched_videos = await models.get.videoList(videowatched);
    let watched = [];
      for (var j = 0; j < watched_videos.rows.length; j++) {
        watched.push(watched_videos.rows[j].videotitle)
      }
    let saved_videos = await models.get.videoList(videosaved);
    let saved = [];
      for (var k = 0; k < saved_videos.rows.length; k++) {
      saved.push(saved_videos.rows[k].videotitle)
    }
    return [regions, watched, saved];   
  },
  postToSearch: (ctx, time) => {
    // console.log('postToSearch', ctx.params.userid)
      ctx.body.userid = ctx.params.userid;
      ctx.body.region = ctx.params.region;
      ctx.body.search = ctx.params.serach;
      ctx.body.time = time;
      return ctx.body;
  }
}