const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance;
// A data-center aware Round-robin load balancing policy. Uncomment when using
// multiple datacenters
// const DCAwareRoundRobinPolicy = cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy;

//  TODO: ADD POLICY
// const LatencyAwarePolicy = cassandra.policies.TokenAwarePolicy();
//  connecting to the cluster
const options = { 
    contactPoints: ['127.0.0.1'],
    pooling: { coreConnectionsPerHost: 1 },
    keyspace: 'fakecassandra'
    //  TODO: ADD POLICY
    // policies: {
        // loadBalancing: new LatencyAwarePolicy()
        //  change to this when there are multiple datacenters
        //  loadBalancing: new DCAwareRoundRobinPolicy()
    // }
};

const client = new cassandra.Client(options);
// ensure that you start your app once your are connected to your Cassandra cluster.

module.exports = { client };
