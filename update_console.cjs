const fs = require('fs');
const path = require('path');

const consoleTsPath = path.join(__dirname, 'src/data/games/console.ts');
let content = fs.readFileSync(consoleTsPath, 'utf8');

const clearedGames = [
  "스노우 브라더스", "스노우 브라더스 2", "DARK SOULS™: REMASTERED",
  "Danganronpa 2: Goodbye Despair", "Danganronpa V3: Killing Harmony", "Danganronpa: Trigger Happy Havoc",
  "Fakebook", "Grand Theft Auto: Chinatown Wars", "Ghost Trick", "Ib", "Legal Dungeon", "OMORI",
  "Refind Self: 성격 진단 게임", "P의 거짓", "Palworld", "Sekiro™: Shadows Die Twice", "Slay the Spire 2",
  "Unsouled", "This War of Mine", "The Forest", "Terraria", "기적의 분식집", "뉴 슈퍼 마리오브라더스",
  "대역전재판 -나루호도 류노스케의 모험-", "대역전재판2 -나루호도 류노스케의 각오-", "도와줘! 리듬 히어로",
  "동방비상천 ~ Scarlet Weather Rhapsody.", "동방요요몽 ~ Perfect Cherry Blossom.",
  "동방췌몽상 ~ Immaterial and Missing Power.", "드래곤 퀘스트 V 천공의 신부",
  "동방홍마향 ~ the Embodiment of Scarlet Devil.", "동방비상천칙 ~ 초대형 기뇰의 수수께끼를 쫓아서",
  "디지몬 챔피언십", "라그나로크 DS", "라이덴 2", "레이튼 교수와 이상한 마을", "만져라 메이드 인 와리오",
  "리듬 세상", "메탈슬러그", "메탈슬러그 2", "메탈슬러그 3", "메탈슬러그 4", "메탈슬러그 7",
  "메타포: 리판타지오", "별의 커비 울트라 슈퍼 디럭스", "별의 커비 도팡 일당의 습격",
  "슈퍼 마리오 64 DS", "슈퍼 마리오 랜드 2 6개의 금화", "슈퍼 마리오 오디세이", "섹시 파로디우스",
  "스폰지밥의 아틀란티스", "썸썸편의점", "역전재판 2", "역전재판 1", "역전검사 1", "역전재판 3", "역전재판 4",
  "Ori and the Blind Forest: Definitive Edition", "Ori and the Will of the Wisps",
  "젤다의 전설 1", "젤다의 전설 몽환의 모래시계", "젤다의 전설 브레스 오브 더 와일드",
  "젤다의 전설 스카이워드 소드 HD", "젤다의 전설 시간의 오카리나 3D", "젤다의 전설 이상한 모자",
  "짱구는 못말려 DS 알쏭달쏭 크레용 대작전!", "초강전기 키카이오", "터치! 봄버맨 랜드", "클레르 옵스퀴르: 33 원정대",
  "포켓몬스터 금", "포켓몬스터 Y", "포켓몬스터 레드", "포켓몬스터 다이아몬드", "포켓몬스터 플래티넘",
  "포켓몬스터 소드", "포켓몬스터 스칼렛", "포켓몬스터 알파 사파이어", "포켓몬스터 에메랄드",
  "포켓몬스터 피카츄", "포켓몬스터 파이어레드", "포켓몬 불가사의 던전 파랑 구조대",
  "포켓몬스터 울트라문", "포켓몬스터 하트골드", "포켓몬스터 화이트", "포켓몬스터 화이트 2",
  "푸른뇌정 건볼트", "MiSide", "Doki Doki Literature Club!", "BnB 어드벤처", "Helltaker", "8번출구",
  "엘든 링: 나이트레인"
];

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('{"id":')) {
    // Check if the title is in the clearedGames array
    for (const title of clearedGames) {
      if (line.includes(`"title": "${title}"`)) {
        if (!line.includes('"isCleared": true')) {
          // Replace the closing brace with the new property
          lines[i] = line.replace('},', ', "isCleared": true},');
        }
        break; // Stop checking titles once a match is found
      }
    }
  }
}

fs.writeFileSync(consoleTsPath, lines.join('\n'), 'utf8');
console.log('Update complete!');
