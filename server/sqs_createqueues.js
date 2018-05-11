var AWS = require('aws-sdk');

// var creds = new AWS.SharedIniFileCredentials({profile: 'halp'});
// AWS.config.credentials = creds;
AWS.config.loadFromPath('/Users/ajkchang/Documents/School/2018/HR/hrsf86-thesis/server/config.json');
AWS.config.update({region: 'us-west-2'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

//library_sqs_worker
//search_sqs_worker
//analytics_sqs_worker
var params = {
  QueueName: 'analytics_sqs_worker',
  Attributes: {
    'DelaySeconds': '5',
    'MessageRetentionPeriod': '20000'
  }
};

sqs.createQueue(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});
