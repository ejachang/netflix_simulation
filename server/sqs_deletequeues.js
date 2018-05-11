var AWS = require('aws-sdk');

// var creds = new AWS.SharedIniFileCredentials({profile: 'halp'});
// AWS.config.credentials = creds;
AWS.config.loadFromPath('/Users/ajkchang/Documents/School/2018/HR/hrsf86-thesis/server/config.json');
AWS.config.update({region: 'us-west-2'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
  QueueUrl: 'https://sqs.us-west-2.amazonaws.com/767328498291/sqs_worker'
};

sqs.deleteQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});