'use strict'

module.exports = {
  generateRandomData,
  // convertIDToInt
};

const faker = require('faker');

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const userid = faker.random.number().toString();
  const videowatched = [faker.random.number(), faker.random.number(), faker.random.number()];
  const videosaved = [faker.random.number(), faker.random.number(), faker.random.number()];
  const region = faker.random.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Australia',
    'South America']);
  // add variables to virtual user's context:
  userContext.vars.userid = userid;
  userContext.vars.videowatched = videowatched;
  userContext.vars.videosaved = videosaved;
  userContext.vars.region = region
  // continue with executing the scenario:
  return done();
};

// function convertIDToInt(userContext, events, done) {
//   userContext.json.userid = parseInt(userContext.json.userid)
//   return done();
// };