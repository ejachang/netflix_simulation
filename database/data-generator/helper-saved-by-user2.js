const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('liesbysaved2.csv');
for (var i = 5000001; i <= 10000000; i++) {
  let list = [
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
  let title = faker.random.arrayElement(list);
  let title2 = faker.random.arrayElement(list);
  let title3 = faker.random.arrayElement(list);

  lies.write(`${i}; ${title}; ${title2}; ${title3} \n`);
}
lies.end();
