import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Colors
content = content.replace(/bg-indigo-500\/10 text-pink-500/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/bg-pink-500\/10 text-pink-400/g, 'bg-pink-500/10 text-pink-500');
content = content.replace(/text-emerald-400/g, 'text-emerald-500');
content = content.replace(/bg-emerald-400/g, 'bg-emerald-500');

// Image overlay text
content = content.replace(/<div className="text-gray-900 text-2xl font-bold">신입 UI\/UX 디자이너<\/div>/g, '<div className="text-white text-2xl font-bold">신입 UI/UX 디자이너</div>');

// Delete button text
content = content.replace(/bg-red-500 text-gray-900/g, 'bg-red-500 text-white');

// Backgrounds
content = content.replace(/bg-white\/\[0\.01\]/g, 'bg-gray-50');

// Text
content = content.replace(/게임 컨셉과 프로토타입 결과물입니다\./g, 'UI/UX 디자인 및 프로토타입 결과물입니다.');

// Fix any remaining text-gray-900 inside buttons that should be white
content = content.replace(/text-gray-900 font-bold rounded-2xl flex items-center gap-2 shadow-xl shadow-pink-500\/25 hover:bg-pink-600/g, 'text-white font-bold rounded-2xl flex items-center gap-2 shadow-xl shadow-pink-500/25 hover:bg-pink-600');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully');
