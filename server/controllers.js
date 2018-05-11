const db = require('../database/database-index.js');
const helpers = require('./helpers.js');
const assert = require('assert');
const models = require('./models.js');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

var AWS = require('aws-sdk');
AWS.config.loadFromPath('/Users/ajkchang/Documents/School/2018/HR/hrsf86-thesis/server/config.json');
AWS.config.update({region: 'us-west-2'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

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
        let region_key = ctx.params.region;
        let userid = ctx.params.userid;
        let search = ctx.params.search;
        let region = region_key;
        region_key === "North America" ? region = "namerica" : null
        region_key === "South America" ? region = "samerica" : null;
        let found = await models.get.searchVideo(region, search);
        let toSend = {
          _userid: ctx.params.userid,
          _region: ctx.params.region,
          _search: ctx.params.search,
          _time: time
        }

        var msg = { payload: toSend };

        var sqsParams = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: 'https://sqs.us-west-2.amazonaws.com/767328498291/library_sqs_worker'
        }
        
        sqs.sendMessage(sqsParams, function(err, data) {
          if (err) {
            console.log('ERR', err);
          }
          // console.log('data', data);
        });

        ctx.body = found.rows[0].videotitle
        
      } catch (err) {
        ctx.body = "Video currently not available. Please check back later"
        var sqsParams = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: 'https://sqs.us-west-2.amazonaws.com/767328498291/search_sqs_worker'
        }
        
        sqs.sendMessage(sqsParams, function(err, data) {
          if (err) {
            console.log('ERR', err);
          }
          // console.log('data2', data);
        });
        // console.log('region', ctx)
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
        let region_key = info.region;
        let watched = JSON.parse(info.videowatched);
        let saved = JSON.parse(info.videosaved);
        let region = region_key;
        region_key === "North America" ? region = "namerica" : null
        region_key === "South America" ? region = "samerica" : null;
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
        helpers.postUserInfoToDB(userid, list[0], list[1], list[2]);
      } catch (err) {
        console.log(region);
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

