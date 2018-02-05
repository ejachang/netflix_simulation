const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('liesbyregion2.csv');
for (var i = 5000001; i <= 10000000; i++) {
  let titlelist = [
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
  let genrelist = [
    'action',
    'international',
    'comedy',
    'sci-fi',
    'horror',
    'drama',
    'thriller',
    'romance',
    'docuseries',
    'mystery'];
  let region = faker.random.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Australia',
    'South America']);
  let videotitle = faker.random.arrayElement(titlelist);
  let genre = genrelist[titlelist.indexOf(videotitle)];
  let boolean1 = faker.random.arrayElement([true, false]);
  let boolean2 = faker.random.arrayElement([true, false]);
  let time = faker.random.number();

  lies.write(`${region}; ${i}; ${genre}; ${boolean1}; ${boolean2}; ${time}; ${videotitle}\n`);
}
lies.end();
