// const cassandra = require('cassandra-driver');
// const db = require('../database/database-index.js');
// const assert = require('assert');

// db.client.connect(function (err) {
//     assert.ifError(err);
// });

// // db.client.connect(function (err) {
// //     assert.ifError(err);
// //     const query = 'SELECT * from videos_by_region WHERE region=?';
// //     db.client.execute(query, ['Asia'])
// //       .then(result => console.log(result.rows[0]))
// // });
// module.exports = {
//   post: {
//     getByRegion: () => {
//       const getByRegion = {
//         text: 'SELECT * from videos_by_region WHERE region=?',
//           values: ['Asia']
//       }  
//       return db.client.query(getByRegion);
//     }
//   }
// }
