const db = require('../database/database-index.js');
const helpers = require('./helpers.js');
const assert = require('assert');
const models = require('./models.js');
const Router = require('koa-router')
const router = new Router()

// const { fork } = require('child_process');
// const forked = fork('./server/workers.js');

db.client.connect(function (err) {
    assert.ifError(err);
});

module.exports = {
  get: {
    //for cache-like purposes
    userHome: async (ctx) => {
      try {
        console.log(ctx.params.userid)
        let userid = ctx.params.userid;
        let region_data = await models.get.userRegionList(userid);
        let watched_data = await models.get.userWatchedList(userid);
        let saved_data = await models.get.userSavedList(userid);
        ctx.body = {
          'video list' : {
            videotitle1: region_data.rows[0].videotitle1,
            videotitle2: region_data.rows[0].videotitle2,
            videotitle3: region_data.rows[0].videotitle3,
          },
          'watched list': {
            videotitle1: watched_data.rows[0].videotitle1,
            videotitle2: watched_data.rows[0].videotitle1,
            videotitle3: watched_data.rows[0].videotitle3,
          },
          'saved list': {
            videotitle1: saved_data.rows[0].videotitle1,
            videotitle2: saved_data.rows[0].videotitle1,
            videotitle3: saved_data.rows[0].videotitle3,
          }
        }
      } catch (err) {
        console.log('userHome error handler:', err.message);
      };
    },
    //search video titles
    searchVideo: async (ctx, next) => {
      try {
        let time = JSON.stringify(helpers.getDate()).toString();
        let region = ctx.params.region;
        let userid = ctx.params.userid;
        let search = ctx.params.search;
        let found = await models.get.searchVideo(region, search);

        if (ctx.status === 404) {
          //TODO: TEST THIS
          router.get('/requestSearch', (ctx) => {
            ctx.body = ctx.params;
          });
          router.post('/searchedInfo', (ctx) => {
            ctx.body.userid = ctx.params.userid;
            ctx.body.region = ctx.params.region;
            ctx.body.search = ctx.params.serach;
            ctx.body.time = time;
          });
        }   
        // router.post('/searchedInfo', helpers.postToSearch(ctx, time));
        
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
        let time = JSON.stringify(helpers.getDate()).toString();
        let region = ctx.params.region;
        let userid = ctx.params.userid;
        let search = ctx.params.search;
        router.post('/searchedInfo', (ctx) => {
          ctx.body.userid = userid;
          ctx.body.region = region;
          ctx.body.search = search;
          ctx.body.time = time;
        });
        ctx.body = "Video currently not available. Please check back later"
        console.log('searchVideo error handler:', err.message);
      };
    },
    //collect and send searched info to Analytics
    //send to the analytics every 3 minutes
  },
  post: {
    //to get the video to compile lists and post into the user list tables
    storeUser: async (ctx) => {
      try {
        let info = ctx.request.body;
        // console.log('info', info)
        let userid = JSON.parse(info.userid);
        let region = info.region;
        let watched = info.videowatched;
        let saved = info.videosaved;
        let list = await helpers.getHomeTitles(region, watched, saved)
        ctx.status = 200
        let toReturn = {
          "region video list": list[0],
          "watched list": list[1],
          "saved list": list[2]
        };
        ctx.redirect(`userHome/${userid}`);
        ctx.status = 301;
        //TODO: to add to queue:
        // helpers.postUserInfoToDB(userid, list[0], list[1], list[2]);
      } catch (err) {
        console.log('storeUser error handler:', err.message);
      };
    },
    updateVideos: async (ctx) =>  {
      try{
        // TODO: modify controllers.get.ByRegion to find query videos_by_{region} and delete videos_by_region
        // TODO: update video_titles_by_id to just the videoid-videotitle
        let regions = ctx.request.body.regions;
        let videos = ctx.request.body.videoData;
        // console.log('videos', videos)
        // post to videoids table
        for (var j = 0; j < videos.length; j++) {
          // console.log('videos to insert', videos[j]._id, videos[j].title)
          models.post.insertVideosByIDDB(videos[j]._id, videos[j].title);
        };
        for (var i = 0; i < regions.length; i++) {
          let region_key = Object.keys(regions[i])[0]
          // console.log('region', i, region_key, regions[i][region_key]);
          for (var k = 0; k < regions[i][region_key].length; k++) {
            let videoid = regions[i][region_key][k];
            let video = await models.get.singleVideo(videoid);
            let region = region_key;
            region_key === "North America" ? region = "namerica" : null
            region_key === "South America" ? region = "samerica" : null;
            models.post.insertVideosByRegionDB(region, video.rows[0].videotitle);
          }
        };
        // console.log('ctx', ctx);
      } catch (err) {
        console.log('updateVideo error handler:', err.message);
      }
    },
  },
  delete: {
    deleteVideos: async (ctx) => {
      try {
        let regions = ctx.request.body.regions;
        let videos = ctx.request.body.videoData;
        // TODO: have a worker joining the title and ids
        for (var i = 0; i < regions.length; i++) {
        let region_key = Object.keys(regions[i])[0]
        // console.log('region key', region_key )
        let region_ids = regions[i][region_key]
        // console.log('delete region', i, region_key, region_ids);
          for (var k = 0; k < region_ids.length; k++) {
            let videoid = region_ids[k];
            let video = await models.get.singleVideo(videoid);
            let region = region_key;
            region_key === "North America" ? region = "namerica" : null
            region_key === "South America" ? region = "samerica" : null;
            region_key === "Asia" ? region = "asia" : null;
            // console.log('region', region)
            // console.log('video', video.rows[0].videotitle)
            models.delete.videosByRegionDB(region, video.rows[0].videotitle);
          }
        };
        for (var j = 0; j < videos.length; j++) {
          // console.log('other videos', videos[j]._id, videos[j].title)
          models.delete.videosByIDDB(videos[j]._id, videos[j].title);
        };
      } catch (err) {
        console.log('deleteVideos message handler: ', err.message);
      }
    }
  }
}

