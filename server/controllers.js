const db = require('../database/database-index.js');
const assert = require('assert');
const models = require('./models.js');

db.client.connect(function (err) {
    assert.ifError(err);
});

// app.use(bodyParser());

module.exports = {
  //need to check what region the user is from to enter in the correct region 
  get: {
    //to return to the client
    userHome: async (ctx) => {
      console.log(ctx)
      try {
        let user = ctx.userid;
        let region_data = await models.get.ByRegion(userid);
        let watched_data = await models.get.videoList(info.videowatched);
        let saved_data = await models.get.videoList(info.videosaved);
        ctx.body = [region_data.rows, watched_data.rows, saved_data.rows];
        ctx.response.status = 418
      } catch (err) {
        console.log('Error handler:', err.message);
      };
    },
  },
  post: {
    //to get the video to compile lists and post into the user list tables
    storeUser: async (ctx, next) => {
      try {
        let info = ctx.request.body;
        let region_videos = await models.get.ByRegion(info.region);
        let watch_videos = await models.get.videoList(info.videowatched);
        let save_videos = await models.get.videoList(info.videosaved);
        
        ctx.response.status = 418
      } catch (err) {
        console.log('Error handler:', err.message);
      };
    },
  placeholder: 'placeholder'
    // insertUserSaved: async (ctx, next) => {
    //   let userID = ctx.params.userID;
    //   let user_entered = {
    //     userID: userID,
    //     //update the stuff below later
    //     videotitle1: 'Lord of the Rings',
    //     videotitle2: 'Like Mike',
    //     videotitle3: 'The Big Sick'
    //   };
    //   try {
    //     let result = models.post.insertUserSaved(user_entered);
    //     console.log('this is the post result test', result);
    //   } catch (err) {
    //     console.log('Error handler:', err.message);
    //   }
    // },
    // updateUserSaved: async (ctx, next) => {
    //   let userID = ctx.params.userID;
    //   let update = {
    //     userID: userID,
    //     //update the stuff below later
    //     videotitle1: 'Ali Wong: Baby Cobra',
    //     videotitle2: 'Toy Story',
    //     videotitle3: 'Up'
    //   };
    //   try {
    //     let result = models.post.updateUserSaved(update)
    //   } catch (err) {
    //     console.log('Error handler:', err.message);
    //   }
    // }
  },
}

