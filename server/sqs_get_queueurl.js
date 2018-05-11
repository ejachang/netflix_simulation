// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
AWS.config.loadFromPath('/Users/ajkchang/Documents/School/2018/HR/hrsf86-thesis/server/config.json');
AWS.config.update({region: 'us-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// Success https://sqs.us-west-2.amazonaws.com/767328498291/search_sqs_worker
// Success https://sqs.us-west-2.amazonaws.com/767328498291/analytics_sqs_worker
// Success https://sqs.us-west-2.amazonaws.com/767328498291/library_sqs_worker
var params = { QueueName: 'library_sqs_worker' };
var params2 = { QueueName: 'search_sqs_worker' };
var params3 = { QueueName: 'analytics_sqs_worker' };
sqs.getQueueUrl(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});

sqs.getQueueUrl(params2, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});

sqs.getQueueUrl(params3, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});