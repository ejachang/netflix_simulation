// const cassandra = require('cassandra-driver');
const db = require('../database/database-index.js');
const assert = require('assert');

db.client.connect(function (err) {
    assert.ifError(err);
});
module.exports = {
    post: {
        getX: () => {
            const getX = {
                text: 'select '
            };
            return db.client.query(getX);
        },
        getXX: () => {
            const getXX = {
                text: 'select'
            };
            return db.client.query(getXX);
        }
    },
    get: {

    },
//  retrieving data
//  query for list of watched video titles for a specific user

// const query = {
//     text: "SELECT * FROM saved_video_by_user WHERE ",
//     value: ""
// },
}
