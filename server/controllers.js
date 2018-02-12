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
    //get userhome info - might take out
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
    //search video titles
    searchVideo: async (ctx, next) => {
      try {
        if (ctx.status === 404) {
          //TODO: TEST THIS
          router.get('/requestSearch', (ctx) => {
            ctx.body = ctx.params;
          });
          // TODO: QUESTION TO KENNY - WANT FAILED SEARCHES?
          // router.post('/searchedInfo', (ctx) => {
          //   ctx.body.userid = ctx.params.userid;
          //   ctx.body.region = ctx.params.region;
          //   ctx.body.search = ctx.params.serach;
          //   ctx.body.time = time;
          // });
        }
        let time = JSON.stringify(helpers.getDate()).toString();
        let region = ctx.params.region;
        let search = ctx.params.search;
        let found = await models.get.searchVideo(region, search);
        router.post('/searchedInfo', (ctx) => {
          ctx.body.userid = ctx.params.userid;
          ctx.body.region = ctx.params.region;
          ctx.body.search = ctx.params.serach;
          ctx.body.time = time;
        });
        ctx.body = found.rows[0].videotitle
        //add to queue 
        //add background worker that sends posts to search records tables
        models.post.searchInfo(time, userid, region, search); 
      } catch (err) {
        //TODO: TEST THIS
        ctx.body = "Video not in library"
        console.log('searchVideo error handler:', err.message);
      };
    },
    //collect and send searched info to Analytics
    //send to the analytics every 3 minutes
  },
  post: {
    //to get the video to compile lists and post into the user list tables
    storeUser: async (ctx, next) => {
      try {
        helpers.getTitlesOnly(ctx.request.body)
        helpers.postUserInfoToDB(info, region, watched, saved);
        
        ctx.status = 200
      } catch (err) {
        console.log('storeUser error handler:', err.message);
      };
    },
    requestVideos: async (ctx) =>  {
      try{
        //get all the regions e.g. ["america, asia"]
        //need to match the video data to the correct region table
        //update videos_by_id, videos_by_region, videos_by_titles_[region], video_titles_by_id
        let regions = ctx.request.body.regions;
        let videos = ctx.request.body.videoData;
        console.log('videos', videos)
        for (var i = 0; i < regions.length; i++) {
          console.log('region', regions[i])
        }
        console.log('ctx', ctx);
      } catch (err) {
        console.log('requestVideo error handler:', err.message);
      }
      
    },
    updateVideos: async (ctx) => {
      try{
        //array of region obj with value of array videoids
        let regions = ctx.request.body.regions
        for (var i = 0; i < regions.length; i++) {
          // console.log(regions[i])
        }
        // console.log(ctx.request.body);
      } catch (err) {
        console.log('updateVideos error handler:', err.message);
      }


    },
    placeholder: 'placeholder'
  },
}

