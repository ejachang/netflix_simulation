const db = require('../database/database-index.js');
const helpers = require('./helpers.js');
const assert = require('assert');
const models = require('./models.js');

db.client.connect(function (err) {
    assert.ifError(err);
});

// app.use(bodyParser());

module.exports = {
  get: {
    userHome: async (ctx) => {
      try {
        let user = ctx.userid;
        let region_data = await models.get.ByRegion(userid);
        let watched_data = await models.get.videoList(info.videowatched);
        let saved_data = await models.get.videoList(info.videosaved);
        ctx.body = [region_data.rows, watched_data.rows, saved_data.rows];
        ctx.response.status = 418
      } catch (err) {
        console.log('userHome error handler:', err.message);
      };
    },
    searchVideo: async (ctx) => {
      //userid - to post into the search table
      //region - to find available video in the region table
      //search - what the user searched for
      //also post to the dbase
      try {
        let time = JSON.stringify(helpers.getDate()).toString();
        let userid = ctx.params.userid
        let region = ctx.params.region;
        let search = ctx.params.search;
        let found = await models.get.searchVideo(region, search);
        ctx.body = found.rows[0].videotitle
        models.post.searchInfo(time, userid, region, search); 
      } catch (err) {
        console.log('searchVideo error handler:', err.message);
      };
    }
  },
  post: {
    //to get the video to compile lists and post into the user list tables
    storeUser: async (ctx, next) => {
      try {
        let info = ctx.request.body;
        userid = info.userid
        let region_videos = await models.get.ByRegion(info.region);
        let region = [];
        for (var i = 0; i < region_videos.rows.length; i++) {
          region.push(region_videos.rows[i].videotitle)
        }
        let watched_videos = await models.get.videoList(info.videowatched);
        let watched = [];
        for (var i = 0; i < watched_videos.rows.length; i++) {
          watched.push(watched_videos.rows[i].videotitle)
        }
        let saved_videos = await models.get.videoList(info.videosaved);
        let saved = [];
        for (var i = 0; i < saved_videos.rows.length; i++) {
          saved.push(saved_videos.rows[i].videotitle)
        }
        models.post.insertByRegion(info.userid, region)
        models.post.updateByRegion(info.userid, region)
        models.post.insertByWatched(info.userid, watched)
        models.post.updateByWatched(info.userid, watched)
        models.post.insertBySaved(info.userid, saved)
        models.post.updateBySaved(info.userid, saved)
        ctx.response.status = 418
      } catch (err) {
        console.log('storeUser error handler:', err.message);
      };
    },
    placeholder: 'placeholder'
  },
}

