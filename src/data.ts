import { ALL_GAMES } from './data/games';
import type { GameHistory } from './types';

export const GAME_HISTORY: GameHistory = {
  pc: [
    ALL_GAMES.find(g => g.title === '메이플스토리') || ALL_GAMES[0],
    ALL_GAMES.find(g => g.title.includes('리그 오브 레전드')) || ALL_GAMES[25],
    ALL_GAMES.find(g => g.title === '던전앤파이터') || ALL_GAMES[5],
  ],
  mobile: [
    { id: 1001, genre: "수집형 RPG", title: "원신", platform: "호요버스", playTime: "" },
    { id: 1002, genre: "방치형 RPG", title: "버섯커 키우기", platform: "조이 나이스 게임즈", playTime: "" },
    { id: 1003, genre: "전략", title: "명일방주", platform: "하이퍼그리프", playTime: "" },
  ],
  console: [
    { id: 2001, genre: "액션 어드벤처", title: "젤다의 전설: 야생의 숨결", platform: "닌텐도 스위치", playTime: "" },
    { id: 2002, genre: "액션 RPG", title: "엘든 링", platform: "PS5", playTime: "" },
    { id: 2003, genre: "액션 어드벤처", title: "갓 오브 워: 라그나로크", platform: "PS5", playTime: "" },
  ]
};

export { RESUME_DATA } from './data/resume';
export { PROJECTS } from './data/projects';
export { SKILLS } from './data/skills';
