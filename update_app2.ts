import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Section Tags
content = content.replace(/03_SKILLS/g, '03_SKILLS');
content = content.replace(/04_PLAY_HISTORY/g, '04_TOOLS_USAGE');
content = content.replace(/게임 플레이 이력\./g, '툴 사용 이력.');

// Categories
content = content.replace(/Online Games/g, 'UI/UX Design');
content = content.replace(/Mobile Games/g, 'Graphic Design');
content = content.replace(/Package Games/g, 'Collaboration');

// Colors
content = content.replace(/bg-emerald-500\/10 text-emerald-400/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/bg-purple-500\/10 text-purple-400/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/bg-blue-500\/10 text-blue-400/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/bg-amber-500\/10 text-amber-400/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/bg-rose-500\/10 text-rose-400/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/bg-indigo-500\/10 text-indigo-400/g, 'bg-pink-500/10 text-pink-500');

// Fix text-white inside buttons that got turned into text-gray-900
content = content.replace(/text-gray-900 w-5 h-5/g, 'text-white w-5 h-5');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully');
