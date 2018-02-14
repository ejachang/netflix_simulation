'use strict'

module.exports = {
  userHome,
  userSearch,
  videoUpdate
};

const faker = require('faker');

function userHome(userContext, events, done) {
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
  userContext.vars.userid = userid;
  userContext.vars.videowatched = videowatched;
  userContext.vars.videosaved = videosaved;
  userContext.vars.region = region
  return done();
};

function userSearch(userContext, events, done) {
  const userid = faker.random.number().toString();
  const region = faker.random.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Australia',
    'South America']);
    let titlelist = [
      'Ewoks: The Battle for Endor',
      'Hatchet III',
      'Just Like Me (Igualita a Mi)',
      'Three on a Match',
      'Sione\'s Wedding (Samoan Wedding)',
      'Messenger: The Story of Joan of Arc, The',
      'Citizen Cohn',
      'Rocks in my Pockets',
      'The Widow From Chicago',
      'Billy Jack Goes to Washington',
      'BURN-E',
      'Shanghai Knights',
      'Franz Kafka\'s a Country Doctor',
      'In Which We Serve',
      'Quigley Down Under',
      'Born to Be Wild',
      'Firelight',
      'Miami Rhapsody',
      'Faithless',
      'Hansel & Gretel Get Baked'
    ];
  const videotitle = faker.random.arrayElement(titlelist);  
  userContext.vars.userid = userid;
  userContext.vars.region = region;
  userContext.vars.search = videotitle;
  return done();
}

function videoUpdate(userContext, events, done) {
}