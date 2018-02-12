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
    //get userhome info - might take out
    userHome: async (ctx) => {
      try {
        console.log(ctx.params.userid)
        let userid = ctx.params.userid;
        let region_data = await models.get.userRegionList(userid);
        let watched_data = await models.get.userWatchedList(userid);
        let saved_data = await models.get.userSavedList(userid);
        // console.log(watched_data)
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
        ctx.body = "Video not in library"
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
        let watched = JSON.parse(info.videowatched);
        let saved = JSON.parse(info.videosaved);
        let list = await helpers.getTitlesOnly(region, watched, saved)
        // list = JSON.parse(list);
        // let toReturn = {
        //   "region": list[0],
        //   "watched list": list[1],
        //   "saved list": list[2]
        // };
        ctx.status = 200
        // console.log('ctx body', ctx.body)
        // helpers.postUserInfoToDB(userid, list[0], list[1], list[2]);
      } catch (err) {
        console.log('storeUser error handler:', err.message);
      };
    },
    requestVideos: async (ctx) =>  {
      try{
        //add everything to the library
        //get all the regions e.g. ["america, asia"]
        //need to match the video data to the correct region table
        //update videos_by_titles_[region], video_titles_by_id
        // TODO: modify controllers.get.ByRegion to find query videos_by_{region} and delete videos_by_region
        // TODO: update video_titles_by_id to just the videoid-videotitle
        let regions = ctx.request.body.regions;
        let videos = ctx.request.body.videoData;
        // console.log('videos', videos)
        // post to videoids table
        for (var j = 0; j < videos.length; j++) {
          // models.post.insertVideosByIDDB(videos[j]._id, videos[j].title);
        };
        // TODO: have a worker joining the title and ids
        for (var i = 0; i < regions.length; i++) {
          console.log('region', i, Object.keys(regions[i])[0]);
          for (var k = 0; k < regions[i].length; k++) {
             let video = await models.get.singleVideo(info.videowatched);
             models.post.insertVideosByRegionDB(Object.keys(regions[i])[0], video);
          }
        };
        // console.log('ctx', ctx);
      } catch (err) {
        console.log('requestVideo error handler:', err.message);
      }
    },
    updateVideos: async (ctx) => {
      try{
        let regions = ctx.request.body.regions;
        let videos = ctx.request.body.videoData;
        // console.log('videos', videos)
        // post to videoids table
        for (var j = 0; j < videos.length; j++) {
          // models.post.insertVideosByIDDB(videos[j]._id, videos[j].title);
        };
        // TODO: have a worker joining the title and ids
        for (var i = 0; i < regions.length; i++) {
          console.log('region', i, Object.keys(regions[i])[0]);
          for (var k = 0; k < regions[i].length; k++) {
             let video = await models.get.singleVideo(info.videowatched);
             models.post.insertVideosByRegionDB(Object.keys(regions[i])[0], video);
          }
        };
      } catch (err) {
        console.log('updateVideos error handler:', err.message);
      }
    },
  },
  delete: {
    deleteVideos: async (ctx) => {
      try {
        let regions = ctx.request.body.regions;
        let videos = ctx.request.body.videoData;
          // console.log('videos', videos)
          // post to videoids table
        for (var j = 0; j < videos.length; j++) {
            // models.delelte.videosByIDDB(videos[j]._id, videos[j].title);
          };
        // TODO: have a worker joining the title and ids
        for (var i = 0; i < regions.length; i++) {
          console.log('region', i, Object.keys(regions[i])[0]);
          for (var k = 0; k < regions[i].length; k++) {
             let video = await models.get.singleVideo(info.videowatched);
             models.delete.videosByRegionDB(Object.keys(regions[i])[0], video);
          }
        };
        } catch (err) {

        }
      }
    }
}

