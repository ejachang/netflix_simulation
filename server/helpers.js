module.exports = {
  getDate: () => {
    var d1 = new Date();
    d1.toUTCString();
    Math.floor(d1.getTime()/ 1000)
    var d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
    d2.toUTCString()
    return d2
  },
  postUserInfoToDB: (info, region, watched, saved) => {
    models.post.insertByRegion(info.userid, region)
    models.post.updateByRegion(info.userid, region)
    models.post.insertByWatched(info.userid, watched)
    models.post.updateByWatched(info.userid, watched)
    models.post.insertBySaved(info.userid, saved)
    models.post.updateBySaved(info.userid, saved)
  },
  getTitlesOnly: async (info) => {
    let region_videos = await models.get.ByRegion(info.region);
        let region = [];
        for (var i = 0; i < region_videos.rows.length; i++) {
          region.push(region_videos.rows[i].videotitle)
        }
        let watched_videos = await models.get.videoList(info.videowatched);
        let watched = [];
        for (var j = 0; j < watched_videos.rows.length; j++) {
          watched.push(watched_videos.rows[j].videotitle)
        }
        let saved_videos = await models.get.videoList(info.videosaved);
        let saved = [];
        for (var k = 0; k < saved_videos.rows.length; k++) {
          saved.push(saved_videos.rows[k].videotitle)
        }
  }
}