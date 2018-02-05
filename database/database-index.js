const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['10.1.1.3', '10.1.1.4', '10.1.1.5'] });
// ensure that you start your app once your are connected to your Cassandra cluster.
client.connect(function(err) {
    assert.ifError(err);
});