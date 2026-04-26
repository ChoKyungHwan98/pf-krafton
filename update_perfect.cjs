const fs = require('fs');
const path = require('path');

const consoleTsPath = path.join(__dirname, 'src/data/games/console.ts');
let content = fs.readFileSync(consoleTsPath, 'utf8');

const perfectGames = [
  "DARK SOULS\u2122 III",
  "엘든 링",
  "Sekiro\u2122: Shadows Die Twice",
  "Cyberpunk 2077",
  "대역전재판 -나루호도 류노스케의 모험-",
  "Baldur's Gate 3",
  "Ghost Trick"
];

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('{"id":')) {
    for (const title of perfectGames) {
      if (line.includes(`"title": "${title}"`)) {
        if (!line.includes('"isPerfectCleared": true')) {
          lines[i] = line.replace('},', ', "isPerfectCleared": true},');
        }
        break;
      }
    }
  }
}

fs.writeFileSync(consoleTsPath, lines.join('\n'), 'utf8');
console.log('Perfect cleared update complete!');
