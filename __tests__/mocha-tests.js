var expect  = require('chai').expect;
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:8886' , function(error, response, body) {
        expect(body).to.equal('halp');
        done();
    });
});

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

xit('Should send a get request to Videos if search fails'), function(done) {
  request('http://localhost:8886//browse/2/asia/1000013BURN', function(error, response, body) {
    expect(response)
  })
};

xit('Should return not found page if search fails'), function(done) {
  request('http://localhost:8886//browse/2/asia/1000013BURN', function(error, response, body) {
    expect(response)
  })
};

