const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('videoidlies2.csv');
for (var i = 5000001; i <= 10000000; i++) {
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
    'mystery',
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
  let videotitle = faker.random.arrayElement(titlelist);
  let genre = genrelist[titlelist.indexOf(videotitle)];
  let boolean1 = faker.random.arrayElement([true, false]);
  let boolean2 = faker.random.arrayElement([true, false]);
  let videotime = faker.random.number();

  lies.write(`${i}; ${genre}; ${boolean1}; ${boolean2}; ${videotime}; ${videotitle} \n`);
}
lies.end();
