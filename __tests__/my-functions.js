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
      '4983639Hatchet III',
      '4983640Messenger: The Story of Joan of Arc, The',
      '4983641Quigley Down Under',
      'Quigley Down Under',
      '4983643In Which We Serve',
      '4983644Franz Kafka\'s a Country Doctor',
      '4983645Ewoks: The Battle for Endor',
      '4983646Rocks in my Pockets',
      'Hatchet III',
      '4983648Hatchet III',
      '4983649Faithless',
      'In Which We Serve',
      '4983651Firelight',
      'Just Like Me (Igualita a Mi)',
      '4983653Billy Jack Goes to Washington',
      '4983654Just Like Me (Igualita a Mi)',
      '4983655Firelight',
      'Billy Jack Goes to Washington',
      'BURN-E',
      '4983658Born to Be Wild',
      '4983659Quigley Down Under',
      '4983660Miami Rhapsody',

    ];
  const videotitle = faker.random.arrayElement(titlelist);  
  userContext.vars.userid = userid;
  userContext.vars.region = region;
  userContext.vars.search = videotitle;
  return done();
}

function videoUpdate(userContext, events, done) {
}