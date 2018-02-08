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
    ByWatched: (user) => {
      const watched_query = 'SELECT * from watched_video_by_user WHERE userid=?';
      return db.client.execute(watched_query, [user], { prepare: true });
    },
    BySaved: (user) => {
      const saved_query = 'SELECT * from saved_video_by_user WHERE userid=?';
      return db.client.execute(saved_query, [user], { prepare: true });
    },
  },
  post: {
    insertUserSaved: (saved) => {
      const insert_saved = 'INSERT INTO saved_video_by_user (userid, videotitle1, videotitle2, videotitle3) VALUES (?, ?, ?, ?)';
      const params =[saved.userID, saved.videotitle1, saved.videotitle2, saved.videotitle3];
      db.client.execute(insert_saved, params, { prepare: true });
      return 'something happened';
    },
    insertUserWatched: (watched) => {
      const insert_watched = 'INSERT INTO saved_video_by_user (userid, videotitle1, videotitle2, videotitle3) VALUES (?, ?, ?, ?)';
      const params =[watched.userID, watched.videotitle1, watched.videotitle2, watched.videotitle3];
      db.client.execute(insert_watched, params, { prepare: true });
      return 'something happened';
    },
    updateUserSaved: (saved) => {
      const update_watched = 'UPDATE saved_video_by_user SET videotitle1=?, videotitle2=?, videotitle3=? WHERE userid=?';
      const params = [saved.videotitle1, saved.videotitle2, saved.videotitle3, saved.userID];
      db.client.execute(update_watched, params, { prepare: true });
      console.log('something happened')
    }
  },
  delete: {
    placeholder: 'placeholder'
  },
}
