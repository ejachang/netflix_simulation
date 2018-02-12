const expect  = require('chai').expect;
const request = require('request');
const assert = require('assert');
const base_url = "http://localhost:8886/"
// const server = require('../server/server-index.js')

describe('Home and Search Server', function() {
  it('Main page content', function(done) {
    request('http://localhost:8886' , function(error, response, body) {
        expect(body).to.equal('halp');
        done();
    });
  });
})


it('Main page status', function(done) {
  request('http://localhost:8886' , function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
  });
});

it('About page content', function(done) {
  request('http://localhost:8886/about' , function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
  });
});

// xit('Should send a get request to Videos if search fails'), function(done) {
//   request('http://localhost:8886/requestSearch', function(error, response, body) {
//     expect(response)
//   })
// };

describe('GET /', function() {
  it('Should return "Video Not Found" if search fails'), function(done) {
    request.get('http://localhost:8886/browse/2/asia/1000013BURN', function(error, response, body) {
      // expect(body).to.equal('Video not in library');
      assert.equal('Video not in library', body);
      // server.closeServer();
      done();
    })
  };
});


