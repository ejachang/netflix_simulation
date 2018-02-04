const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('lies.csv');
for (var i = 1; i <= 1000000; i++) {
  let fakename = faker.name.firstName();
  let fakeid = faker.random.number();
  let date = faker.date.past();
  let search = faker.random.word();
  let genre = faker.random.arrayElement([
    'action',
    'international',
    'comedy',
    'sci-fi',
    'horror',
    'drama',
    'thriller',
    'romance',
    'docuseries',
    'mystery']);
  let region = faker.random.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Australia',
    'South America']);
  let title = faker.random.arrayElement([
    'BURN-E',
    'Shanghai Knights',
    'Ewoks: The Battle for Endor',
    'Hatchet III',
    'Just Like Me (Igualita a Mi)',
    'Three on a Match',
    'Sione\'s Wedding (Samoan Wedding)',
    'Messenger: The Story of Joan of Arc, The',
    'Citizen Cohn',
    'Rocks in my Pockets',
    'The Widow From Chicago',
    'Billy Jack Goes to Washington'
  ]);
  let boolean = faker.random.boolean();

  lies.write(`${i} ${fakename} ${date} ${search} ${region} ${fakeid} ${title} ${genre} ${fakeid} ${region} ${region} ${boolean} `);
}
lies.end();
