const db = require('../database/database-index.js');
const assert = require('assert');
const models = require('./models.js');

db.client.connect(function (err) {
    assert.ifError(err);
});

module.exports = {
  //need to check what region the user is from to enter in the correct region 
  get: {
    userHome: async (ctx, next) => {
      let user_entered = ctx.params.userID;
      let region_entered = ctx.params.region;
      try {
        let region_data = await models.get.ByRegion(region_entered);
        let watched_data = await models.get.ByWatched(user_entered);
        let saved_data = await models.get.BySaved(user_entered);
        ctx.body = [region_data.rows, watched_data.rows, saved_data.rows];
      } catch (err) {
        console.log('Error handler:', err.message);
      };
    },
  },
  post: {
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

