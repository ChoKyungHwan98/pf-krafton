import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace styling classes
const replacements: [RegExp, string][] = [
  [/text-slate-400/g, 'text-gray-500'],
  [/text-slate-300/g, 'text-gray-600'],
  [/text-slate-500/g, 'text-gray-400'],
  [/text-slate-600/g, 'text-gray-400'],
  [/text-white/g, 'text-gray-900'],
  [/bg-slate-900/g, 'bg-gray-50'],
  [/bg-slate-800/g, 'bg-white'],
  [/bg-white\/5/g, 'bg-gray-100'],
  [/bg-white\/10/g, 'bg-gray-200'],
  [/border-white\/10/g, 'border-gray-200'],
  [/border-white\/20/g, 'border-gray-300'],
  [/border-white\/5/g, 'border-gray-100'],
  [/from-indigo-500/g, 'from-pink-500'],
  [/to-purple-600/g, 'to-rose-500'],
  [/to-purple-500/g, 'to-rose-400'],
  [/text-indigo-400/g, 'text-pink-500'],
  [/bg-indigo-600/g, 'bg-pink-500'],
  [/hover:bg-indigo-500/g, 'hover:bg-pink-600'],
  [/shadow-indigo-500\/20/g, 'shadow-pink-500/20'],
  [/shadow-indigo-500\/25/g, 'shadow-pink-500/25'],
  [/text-indigo-500/g, 'text-pink-500'],
  [/text-indigo-300/g, 'text-pink-400'],
  [/bg-indigo-500\/20/g, 'bg-pink-500/10'],
  [/hover:text-white/g, 'hover:text-pink-500'],
  [/focus:border-indigo-500/g, 'focus:border-pink-500'],
  [/bg-black\/80/g, 'bg-gray-900/40'],
  [/bg-black\/50/g, 'bg-gray-900/20'],
  [/from-black\/80/g, 'from-gray-900/60'],
  [/to-transparent/g, 'to-transparent'],
  [/text-gray-900\/80/g, 'text-gray-700'],
];

for (const [pattern, replacement] of replacements) {
  content = content.replace(pattern, replacement);
}

// 2. Replace mock data
content = content.replace(/"Game System Designer"/g, '"UI/UX Designer"');

content = content.replace(
  /"\\"재미\\"를 수치와 논리로 증명하는 게임 기획자입니다. 단순한 아이디어 나열이 아닌, 유기적으로 연결된 시스템과 플레이어의 감정 곡선을 고려한 설계를 지향합니다. 데이터 기반의 의사결정과 끊임없는 프로토타이핑을 통해 최상의 사용자 경험을 만들어냅니다."/g,
  '"사용자 중심의 직관적인 인터페이스와 매끄러운 경험을 설계하는 UI/UX 디자이너입니다. 데이터 기반의 리서치와 끊임없는 프로토타이핑을 통해 비즈니스 목표와 사용자 니즈를 동시에 만족시키는 최상의 디자인 솔루션을 만들어냅니다."'
);

content = content.replace(/어린 시절부터 게임은 저에게 단순한 오락 이상의 의미였습니다. 다양한 장르의 게임을 접하며 '왜 이 게임은 재미있을까\?'라는 질문을 끊임없이 던졌고, 이는 자연스럽게 게임 기획이라는 꿈으로 이어졌습니다. 저는 "논리 없는 재미는 우연이지만, 설계된 재미는 필연이다"라는 가치관을 가지고 있습니다./g, "사용자가 제품을 만나는 첫 순간부터 목표를 달성하는 마지막 순간까지, 모든 여정을 매끄럽게 만드는 것에 열정을 느낍니다. '좋은 디자인은 보이지 않는다'는 철학을 바탕으로, 화려함보다는 사용성을 최우선으로 고려하는 디자인을 추구합니다.");
content = content.replace(/저의 가장 큰 강점은 데이터와 논리에 기반한 사고력입니다. 밸런싱 작업 시 단순한 감에 의존하지 않고, 엑셀 시뮬레이션과 확률 통계를 활용하여 의도한 수치 결과가 나오도록 정밀하게 설계합니다. 또한, 개발팀과의 원활한 소통을 위해 기술적 이해도를 높이려 노력하며, 기획 의도를 명확하게 전달하는 문서를 작성하는 데 탁월합니다./g, "저의 가장 큰 강점은 사용자 데이터와 리서치에 기반한 문제 해결 능력입니다. 직관에만 의존하지 않고, A/B 테스트와 사용성 평가를 통해 디자인을 검증하고 개선합니다. 또한, 개발팀 및 기획팀과의 원활한 소통을 위해 디자인 시스템을 구축하고, 명확한 핸드오프 문서를 작성하는 데 탁월합니다.");
content = content.replace(/플레이어의 심리를 꿰뚫는 정교한 시스템 설계를 통해, 전 세계 게이머들에게 잊지 못할 경험을 선사하고 싶습니다. 귀사에서 저의 기획 역량을 발휘하여 시장을 선도하는 혁신적인 게임을 만드는 데 기여하겠습니다. 끊임없이 배우고 성장하는 기획자로서, 팀의 핵심 인재로 거듭나겠습니다./g, "사용자의 페인 포인트를 정확히 짚어내고 이를 우아하게 해결하는 디자인을 통해, 제품의 비즈니스적 성공을 이끌고 싶습니다. 귀사에서 저의 UI/UX 역량을 발휘하여 시장을 선도하는 혁신적인 서비스를 만드는 데 기여하겠습니다. 끊임없이 배우고 성장하는 디자이너로서, 팀의 핵심 인재로 거듭나겠습니다.");

content = content.replace(/"게임 기획 전문가 부트캠프 \(6개월\)"/g, '"UI/UX 디자인 부트캠프 (6개월)"');
content = content.replace(/"실무 중심의 게임 기획 프로세스 전반을 이수했습니다."/g, '"실무 중심의 UI/UX 디자인 프로세스 전반을 이수했습니다."');
content = content.replace(/"시스템 기획: 캐릭터 성장 곡선 및 경제 밸런싱 설계"/g, '"UX 리서치: 심층 인터뷰 및 페르소나, 유저 저니 맵 도출"');
content = content.replace(/"레벨 디자인: UE5를 활용한 수직적 구조의 3D 레벨 제작"/g, '"UI 디자인: 모바일 앱 및 웹 서비스 반응형 화면 설계"');
content = content.replace(/"GDD 작성: 50페이지 분량의 상세 기획서 3종 작성"/g, '"프로토타이핑: Figma를 활용한 인터랙티브 프로토타입 제작"');
content = content.replace(/"한국대학교 게임공학과"/g, '"한국대학교 산업디자인학과"');
content = content.replace(/"게임 엔진 기초 및 컴퓨터 그래픽스, 확률과 통계 등 게임 개발의 공학적 기초를 다졌습니다."/g, '"시각 디자인 기초, 인간공학, 인터랙션 디자인 등 UI/UX 디자인의 학문적 기초를 다졌습니다."');

content = content.replace(/"네온 프로토콜 \(Neon Protocol\)"/g, '"핀테크 앱 리디자인 (Fintech App)"');
content = content.replace(/"사이버펑크 RPG 시스템 기획 및 프로토타이핑"/g, '"송금 및 자산 관리 플로우 UX 개선 및 UI 리디자인"');
content = content.replace(/"엑셀을 활용한 1~50레벨 구간의 경험치 및 스탯 성장 테이블 설계"/g, '"사용자 인터뷰를 통한 기존 송금 프로세스의 페인 포인트 도출"');
content = content.replace(/"모듈형 스킬 트리 시스템 설계 \(20종 이상의 액티브\/패시브 스킬\)"/g, '"송금 단계를 5단계에서 3단계로 축소하여 전환율 15% 상승 예상"');
content = content.replace(/"Python 스크립트를 활용한 전투 밸런싱 시뮬레이션 1,000회 수행"/g, '"Figma를 활용한 하이파이 프로토타입 제작 및 사용성 테스트 진행"');

content = content.replace(/"잊혀진 첨탑 \(The Forgotten Spire\)"/g, '"이커머스 디자인 시스템 구축"');
content = content.replace(/"UE5 기반 3D 플랫포머 레벨 디자인"/g, '"사내 프로덕트 전반에 적용할 디자인 시스템 파운데이션 및 컴포넌트 제작"');
content = content.replace(/"플레이어 동선을 고려한 랜드마크 배치 및 시각적 가이드 설계"/g, '"컬러, 타이포그래피, 스페이싱 등 파운데이션 정의 및 토큰화"');
content = content.replace(/"환경 스토리텔링 요소를 활용한 내러티브 전달 방식 구현"/g, '"재사용 가능한 UI 컴포넌트 50여 종 제작 및 가이드라인 문서화"');

content = content.replace(/"게임기획전문가 자격증"/g, '"디자인 공모전 대상"');

content = content.replace(/"시스템 디자인"/g, '"UI 디자인"');
content = content.replace(/"복잡한 수치 체계 및 밸런싱 설계 가능"/g, '"타이포그래피, 컬러, 레이아웃에 대한 깊은 이해"');
content = content.replace(/"레벨 디자인"/g, '"UX 리서치"');
content = content.replace(/"UE5 기반 수직적 동선 및 라이팅 가이드 설계"/g, '"정성적/정량적 데이터 기반의 사용자 경험 분석"');
content = content.replace(/"내러티브 디자인"/g, '"프로토타이핑"');
content = content.replace(/"세계관 설정 및 퀘스트 스크립트 작성"/g, '"Figma, Protopie를 활용한 마이크로 인터랙션 구현"');
content = content.replace(/"밸런싱 & QA"/g, '"디자인 시스템"');
content = content.replace(/"시뮬레이션을 통한 정밀한 수치 검증"/g, '"확장 가능하고 일관된 UI 컴포넌트 라이브러리 구축"');
content = content.replace(/"C# \/ Blueprint"/g, '"HTML / CSS"');
content = content.replace(/"기능 구현 및 프로토타이핑 가능"/g, '"퍼블리싱에 대한 이해를 바탕으로 한 개발팀과의 원활한 협업"');

content = content.replace(/"League of Legends"/g, '"Figma"');
content = content.replace(/"Lost Ark"/g, '"Protopie"');
content = content.replace(/"MapleStory"/g, '"Framer"');
content = content.replace(/"Overwatch 2"/g, '"Sketch"');
content = content.replace(/"Genshin Impact"/g, '"Adobe XD"');
content = content.replace(/"Blue Archive"/g, '"Illustrator"');
content = content.replace(/"Fate\/Grand Order"/g, '"Photoshop"');
content = content.replace(/"Arknights"/g, '"After Effects"');
content = content.replace(/"Elden Ring"/g, '"Notion"');
content = content.replace(/"The Legend of Zelda: BotW"/g, '"Jira"');
content = content.replace(/"Monster Hunter: World"/g, '"Slack"');
content = content.replace(/"Cyberpunk 2077"/g, '"Miro"');

content = content.replace(/>플레이이력</g, '>툴 사용시간<');
content = content.replace(/플레이 타임/g, '사용 시간');
content = content.replace(/온라인 게임/g, 'UI/UX 디자인');
content = content.replace(/모바일 게임/g, '그래픽 디자인');
content = content.replace(/패키지 게임/g, '협업 툴');

content = content.replace(/category: "시스템 디자인"/g, 'category: "UI/UX"');
content = content.replace(/category: "레벨 디자인"/g, 'category: "디자인 시스템"');
content = content.replace(/category: "전투 디자인"/g, 'category: "UX 리서치"');

content = content.replace(/<Gamepad2 /g, '<Sparkles ');
content = content.replace(/<Gamepad /g, '<Sparkles ');

content = content.replace(/게임 기획자 포트폴리오/g, 'UI/UX 디자이너 포트폴리오');
content = content.replace(/게임 기획자/g, 'UI/UX 디자이너');

// Fix text-white on buttons/badges that should remain white or be dark
// Actually, text-gray-900 on buttons might look bad if the button is pink.
// Pink buttons with text-gray-900? Let's fix that.
content = content.replace(/bg-pink-500 rounded-xl text-gray-900/g, 'bg-pink-500 rounded-xl text-white');
content = content.replace(/bg-pink-600 rounded-xl text-gray-900/g, 'bg-pink-600 rounded-xl text-white');
content = content.replace(/text-gray-900 font-bold hover:bg-pink-500/g, 'text-white font-bold hover:bg-pink-500');
content = content.replace(/text-gray-900 w-5 h-5/g, 'text-white w-5 h-5'); // Icons inside colored boxes

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated successfully');
