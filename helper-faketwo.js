const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('lies2.csv');
for (var i = 5000001; i <= 10000000; i++) {
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
    'The Battle for Endor',
    'Hatchet III',
    'Just Like Me',
    'Three on a Match',
    'Samoan Wedding',
    'Harry Potter',
    'Citizen Cohn',
    'Wonder Woman',
    'Jumanji',
    'Avengers'
  ]);
  let boolean = faker.random.boolean();

  lies.write(`${i}; ${date}; ${fakename}; ${genre}; ${region}; ${region}; ${boolean}; ${region}; ${search}; ${fakeid}; ${title}; ${fakeid} \n`);
}
lies.end();
