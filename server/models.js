const db = require('../database/database-index.js');
const assert = require('assert');

db.client.connect(function (err) {
    assert.ifError(err);
});

module.exports = {
  get: {
    ByRegion: (region) => {
      const query = 'SELECT * from videos_by_region WHERE region=? limit 3';
      return db.client.execute(query, [region], { prepare: true });
    },
    videoList: (list) => {
      const query = 'SELECT * from video_titles_by_id where id=? and id=? and id=?';
      const params = [list[0], list[1], list[2]];
      return db.client.execute(query, params, { prepare: true });
    },
  },
  post: {
    ByRegion: (region) => {
      // const query = 'SELECT * from videos_by_region WHERE region=? limit 3';
      // return db.client.execute(query, [region], { prepare: true });
    },
    updateUserWatched: (list) => {
      
    },
    updateUserSaved: (list) => {

    },
    insertUserWatched: (list) => {

    },
    insertUserSaved: (list) => {

    },
    placeholder: 'placeholder'    
    // insertUserSaved: (saved) => {
    //   const insert_saved = 'INSERT INTO saved_video_by_user (userid, videotitle1, videotitle2, videotitle3) VALUES (?, ?, ?, ?)';
    //   const params =[saved.userID, saved.videotitle1, saved.videotitle2, saved.videotitle3];
    //   db.client.execute(insert_saved, params, { prepare: true });
    //   return 'something happened';
    // },
  },
  delete: {
    placeholder: 'placeholder'
  },
}
