const faker = require('faker');
const fs = require('fs');

let lies = fs.createWriteStream('newliesbyregion.csv');
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
    'Billy Jack Goes to Washington'
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
  lies.write(`${region}; ${i}${videotitle}\n`);
}
lies.end();
