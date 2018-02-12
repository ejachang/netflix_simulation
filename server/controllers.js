const db = require('../database/database-index.js');
const helpers = require('./helpers.js');
const assert = require('assert');
const models = require('./models.js');
const Router = require('koa-router')
const router = new Router()

const { fork } = require('child_process');

const forked = fork('./server/workers.js');


db.client.connect(function (err) {
    assert.ifError(err);
});

module.exports = {
  get: {
    userHome: async (ctx) => {
      try {
        let user = ctx.userid;
        let region_data = await models.get.ByRegion(userid);
        let watched_data = await models.get.videoList(info.videowatched);
        let saved_data = await models.get.videoList(info.videosaved);
        ctx.body = [region_data.rows, watched_data.rows, saved_data.rows];
      } catch (err) {
        console.log('userHome error handler:', err.message);
      };
    },
    searchVideo: async (ctx, next) => {
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
        await next();
        if (ctx.status === 404) {
          // console.log('get request sent?')
          //test if this was sent
          router.get('/requestSearch', (ctx) => {
            ctx.body = ctx.params;
          });
        }
        ctx.body = found.rows[0].videotitle
        //add to queue 
        //add background worker that sends posts to search records tables
        models.post.searchInfo(time, userid, region, search); 
      } catch (err) {
        //stores the details with the userid, region, and search term
        // console.log(ctx.params)
        ctx.body = "Video not in library"
        console.log('searchVideo error handler:', err.message);
      };
    },
    requestSearch: async (cxt, next) => {
      try{
        let videoid = ctx.id;
        let videotitle = ctx.title;
        let region = ctx.region;
        let genre = ctx.genre;
        let popularity = ctx.popularity;
      } catch (err) {
        console.log('requestSearch error: ', err.message);
      }
    },
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
        ctx.status = 200
      } catch (err) {
        console.log('storeUser error handler:', err.message);
      };
    },
    requestVideo: () =>  {

    },
    searchedVideos: (ctx) => {

    },
    updateVideos: () => {



    },
    placeholder: 'placeholder'
  },
}

