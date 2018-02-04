const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('liesbysaved.csv');
for (var i = 0; i < 3000000; i++) {
  let userid = faker.random.number();
  let list = ['BURN-E',
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
  'Billy Jack Goes to Washington'];
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
  let videoid = list.indexOf(title);
  let title2 = faker.random.arrayElement([
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
  let videoid2 = list.indexOf(title2);
  let title3 = faker.random.arrayElement([
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
  let videoid3 = list.indexOf(title3);
  lies.write(`${userid}; ${title}; ${title2}; ${title3} \n`);
}
lies.end();
