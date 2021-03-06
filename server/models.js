const db = require('../database/database-index.js');
const assert = require('assert');

db.client.connect(function (err) {
    assert.ifError(err);
});

module.exports = {
  get: {
    ByRegion: (region) => {
      const query = `SELECT * from videos_by_titles_${region} limit 3`;
      return db.client.execute(query, { prepare: true });
    },
    videoList: (list) => {
      //TODO: update
      const query = 'SELECT * from video_titles_by_id WHERE videoid IN (?, ?, ?)';
      const params = [list[0], list[1], list[2]];
      return db.client.execute(query, params, { prepare: true });
    },
    userWatchedList: (userid) => {
      const query = 'SELECT * from saved_video_by_user WHERE userid=?';
      const params = [userid];
      return db.client.execute(query, params, { prepare: true });
    },
    userSavedList: (userid) => {
      const query = 'SELECT * from watched_video_by_user WHERE userid=?';
      const params = [userid];
      return db.client.execute(query, params, { prepare: true });
    },
    userRegionList: (userid) => {
      const query = 'SELECT * from region_videos_by_user WHERE userid=?';
      return db.client.execute(query, [userid], { prepare: true });
    },
    singleVideo: (videoid) => {
      const query = 'SELECT * from video_titles_by_id WHERE videoid IN (?)';
      const params = [videoid];
      return db.client.execute(query, params, { prepare: true });
    },
    searchVideo: (region, search) => {
      const query = `SELECT * from videos_by_titles_${region} WHERE videotitle=?`;
      const params = [search];
      return db.client.execute(query, params, { prepare: true });
    }
  },
  post: {
    insertByRegion: (userid, region) => {
      const insert_region = 'INSERT INTO region_videos_by_user (userid, videotitle1, videotitle2, videotitle3) VALUES (?, ?, ?, ?) IF NOT EXISTS';
      const params =[userid, region[0], region[1], region[2]];
      db.client.execute(insert_region, params, { prepare: true });      
    },
    updateByRegion: (userid, region) => {
      const update_region = 'UPDATE region_videos_by_user SET videotitle1=?, videotitle2=?, videotitle3=? WHERE userid=? IF EXISTS';
      const params2 = [region[0], region[1], region[2], userid];
      db.client.execute(update_region, params2, { prepare: true });
    },
    insertByWatched: (userid, watched) => {
      const insert_watched = 'INSERT INTO watched_video_by_user  (userid, videotitle1, videotitle2, videotitle3) VALUES (?, ?, ?, ?) IF NOT EXISTS';
      const params =[userid, watched[0], watched[1], watched[2]];
      db.client.execute(insert_watched, params, { prepare: true });      
    },
    updateByWatched: (userid, watched) => {
      const update_watched = 'UPDATE watched_video_by_user SET videotitle1=?, videotitle2=?, videotitle3=? WHERE userid=? IF EXISTS';
      const params2 = [watched[0], watched[1], watched[2], userid];
      db.client.execute(update_watched, params2, { prepare: true });
    },
    insertBySaved: (userid, saved) => {
      const insert_saved = 'INSERT INTO saved_video_by_user (userid, videotitle1, videotitle2, videotitle3) VALUES (?, ?, ?, ?) IF NOT EXISTS';
      const params =[userid, saved[0], saved[1], saved[2]];
      db.client.execute(insert_saved, params, { prepare: true });      
    },
    updateBySaved: (userid, saved) => {
      const update_saved = 'UPDATE saved_video_by_user SET videotitle1=?, videotitle2=?, videotitle3=? WHERE userid=? IF EXISTS';
      const params2 = [saved[0], saved[1], saved[2], userid];
      db.client.execute(update_saved, params2, { prepare: true });
    },
    searchInfo: (time, userid, region, search) => {
      const post_search = 'INSERT INTO search_by_time (time, userid, region, search) VALUES (?, ?, ?, ?)';
      const params = [time, userid, region, search];
      db.client.execute(post_search, params, { prepare: true });
    },
    insertVideosByRegionDB: (region, videotitle) => {
      const query = `INSERT INTO videos_by_titles_${region} (videotitle) VALUES (?)`;
      const params = [videotitle];
      db.client.execute(query, params, { prepare: true });
    },
    insertVideosByIDDB: (videoid, videotitle) => {
      const query = `INSERT INTO video_titles_by_id (videoid, videotitle) VALUES (?, ?)`;
      const params = [videoid, videotitle];
      db.client.execute(query, params, { prepare: true });
    }
  },
// DELETE id FROM cyclist_id 
// WHERE lastname = 'WELTEN' AND firstname = 'Bram' 
// IF age = 2000;
  delete: {
    videosByRegionDB: (region, videotitle) => {
      const query = `DELETE FROM videos_by_titles_${region} WHERE videotitle=? IF EXISTS`;
      const params = [videotitle];
      db.client.execute(query, params, { prepare: true });
    },
    videosByIDDB: (videoid, videotitle) => {
      const query = `DELETE FROM video_titles_by_id WHERE videoid=? IF EXISTS`;
      const params = [videoid];
      db.client.execute(query, params, { prepare: true });
    }
  },
}
