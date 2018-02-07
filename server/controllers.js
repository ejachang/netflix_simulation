const db = require('../database/database-index.js');
const assert = require('assert');
const Koa = require('koa');
const app = new Koa();

// const Router = require('koa-router')
// const router = new Router()

db.client.connect(function (err) {
    assert.ifError(err);
});

const query = 'SELECT * from videos_by_region WHERE region=? limit 3';
const getVideoByAsia = db.client.execute(query, ['Asia'], { prepare: true })

module.exports = { getVideoByAsia }

// module.exports = {
//     getByRegionAsia: () => {
//       const query = 'SELECT * from videos_by_region WHERE region=?';
//       const getVideoByAsia = db.client.execute(query, ['Asia'], { prepare: true })
//     }
// }

// app.use(router.routes())

// makes sure a 405 Method Not Allowed is sent
// app.use(router.allowedMethods())

//reference
// db.client.connect(function (err) {
//     assert.ifError(err);
// });

// db.client.connect(function (err) {
//     assert.ifError(err);
//     const query = 'SELECT * from videos_by_region WHERE region=?';
//     db.client.execute(query, ['Asia'], { prepare: true })
//       .then(result => 
//         console.log(result.rows[0].videotitle)  
//     )
// });


// export this later
// module.exports = {
//   post: {
//     getByRegion: ( region ) => {
//       const getByRegion = {
//         text: 'SELECT * from videos_by_region WHERE region=?',
//       }  
//       db.client.execute(getByRegion.text, [region])
//         .then(result => result.rows[0]);
//         console.log('hello')
//         console.log(result.rows[0])
//     }
//   }
// }