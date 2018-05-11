const db = require('../database/database-index.js');
const helpers = require('./helpers.js');
const assert = require('assert');
const models = require('./models.js');
const Koa = require('koa');
const koa_app = new Koa();
const Router = require('koa-router');
const router = new Router();

const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('/Users/ajkchang/Documents/School/2018/HR/hrsf86-thesis/server/config.json');
AWS.config.update({region: 'us-west-2'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// Success https://sqs.us-west-2.amazonaws.com/767328498291/search_sqs_worker
// Success https://sqs.us-west-2.amazonaws.com/767328498291/analytics_sqs_worker
// Success https://sqs.us-west-2.amazonaws.com/767328498291/library_sqs_worker

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/767328498291/library_sqs_worker',
  handleMessage: (message, done) => {
    var msgBody = JSON.parse(message.Body);
    router.get('/requestVideo', (ctx) => {
      try {
        ctx.body = msgBody.payload._search;
        ctx.status = 200;
      } catch (err) {
        console.log('request video error handler:', err.message);
      }
    })
    // console.log('messagebody', msgBody);
    return done();
  }
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();

