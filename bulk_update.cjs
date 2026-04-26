const fs = require('fs');
const path = require('path');

const filesToUpdate = {
  console: path.join(__dirname, 'src/data/games/console.ts'),
  mobile: path.join(__dirname, 'src/data/games/mobile.ts')
};

const clearedGames = [
  "2010 프로야구", "2011 프로야구", "2012 프로야구", "2013 프로야구",
  "메이플스토리 LIVE", "스노우레인2", "Ready Action", 
  "DARK SOULS\u2122 II", "DARK SOULS\u2122 III",
  "가정교사 히트맨 REBORN! DS 플레임 럼블 XX 초결전! 리얼 6조화"
];

const favoriteGames = [
  "DARK SOULS\u2122 III", "DARK SOULS\u2122 II", "DARK SOULS\u2122: REMASTERED", 
  "Danganronpa V3: Killing Harmony"
];

for (const [key, filePath] of Object.entries(filesToUpdate)) {
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes('{"id":')) {
      // 1. isCleared update
      for (const title of clearedGames) {
        if (line.includes(`"title": "${title}"`)) {
          if (!line.includes('"isCleared": true')) {
            line = line.replace('},', ', "isCleared": true},');
          }
          break;
        }
      }

      // 2. isFavorite update
      for (const title of favoriteGames) {
        if (line.includes(`"title": "${title}"`)) {
          if (!line.includes('"isFavorite": true')) {
            line = line.replace('},', ', "isFavorite": true},');
          }
          break;
        }
      }

      // 3. Playtime specific update
      if (line.includes('"title": "Vampire Survivors"')) {
        if (!line.includes('"flag": "15시간"')) {
          line = line.replace('},', ', "flag": "15시간"},');
        }
      }

      lines[i] = line;
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}
console.log('Bulk update completed successfully!');
