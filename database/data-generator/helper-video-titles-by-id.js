const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('videotitlesbyid.csv');
for (var i = 1; i <= 5000000; i++) {
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
  let videotitle = faker.random.arrayElement(titlelist);
  lies.write(`${i}; ${videotitle} \n`);
}
lies.end();
