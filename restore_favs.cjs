const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/games/console.ts');
let content = fs.readFileSync(filePath, 'utf8');
let lines = content.split('\n');

const favoritesToRestore = [
  "엘든 링",
  "OMORI",
  "Danganronpa V3: Killing Harmony"
];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('{"id":')) {
    for (const title of favoritesToRestore) {
      if (line.includes(`"title": "${title}"`)) {
        if (!line.includes('"isFavorite": true')) {
          line = line.replace('},', ', "isFavorite": true},');
        }
        break;
      }
    }
  }
  lines[i] = line;
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Restored favorites');
