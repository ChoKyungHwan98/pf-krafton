const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  path.join(__dirname, 'src/data/games/console.ts'),
  path.join(__dirname, 'src/data/games/mobile.ts'),
  path.join(__dirname, 'src/data/games/pc.ts')
];

const favoritesToKeep = [
  "메이플스토리",
  "DARK SOULS\u2122 III",
  "무기미도"
];

for (const filePath of filesToUpdate) {
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes('{"id":')) {
      // Find the title
      const titleMatch = line.match(/"title":\s*"([^"]+)"/);
      if (titleMatch) {
        const title = titleMatch[1];
        if (favoritesToKeep.includes(title)) {
          // Ensure it has isFavorite
          if (!line.includes('"isFavorite": true')) {
            line = line.replace('},', ', "isFavorite": true},');
          }
        } else {
          // Remove isFavorite if present
          if (line.includes('"isFavorite": true')) {
            line = line.replace(/,\s*"isFavorite":\s*true/, '');
          }
        }
      }
      lines[i] = line;
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}
console.log('Favorites reset complete!');
