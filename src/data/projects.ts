import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "도로시아",
    roles: ["밸런스 기획"],
    description: "핵앤슬래시 방치형 RPG의 전투/재화 밸런스와 방치 보상 시스템을 담당했습니다.",
    keyTasks: ["밸런스 기획", "시스템 기획", "AI 활용", "PM"],
    tags: ["#PDPS", "#TTK설계", "#재화순환", "#성장곡선", "#AI시뮬레이터"],
    image: "./images/dorothia_main.jpg",
    gallery: Array.from({ length: 33 }, (_, i) => `./images/dorothia_ebook/page_${(i + 1).toString().padStart(3, '0')}.png`),
    hasSimulator: true,
    prototypeUrl: "./prototypes/dorothia_prototype.html",
    simulatorVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    color: "from-zinc-500/20 to-zinc-400/20",
    status: "구글플레이스토어 출시",
    stats: {
      released: "구글플레이스토어 출시",
      teamSize: "기획 7인",
      myRole: "밸런스 기획 총괄",
      achievement: "AI 시뮬레이터 전항목 통과",
    },
    content: `# 도로시아 밸런스 기획서

## 1. 기획 개요
핵앤슬래시 방치형 RPG의 성패를 좌우하는 전투 수치와 경제 수치의 전체 밸런스 구조를 설계했습니다.

### 파워 밸런스 모델링
- 캐릭터 33.4% vs 장비 66.6% (eq:char = ×2.00) — 목표 구간 통과
- Lv200 Rank8 기준 캐릭터 ATK 37,460 vs 장비 ATK 74,803 수치 검증
- 방어력 공식(100÷(100+DEF))으로 피해 적용률·EHP 산정 — 보스 DEF 78 → 적용률 56.1%

### 스테이지 템포 & 성장 곡선
- 목표 TTK: 일반 몬스터 1.35초, 보스 15~35초 → 실측 29.6초 통과
- ATK 성장: 1.020^(Lv-1) × 랭크 배율, Lv1 → Lv200 ×133.8배 설계
- 스테이지 HP 배율: 1.002^(S-1), S2000 누적 ×54.3배 — 구간별 성장 체감 설계

### 스킬 & 그렘린 DPS 설계
- 스킬 팩터(sf): 노강 1.917 ~ 풀강 3.051 — 허용 범위 0.5~5.0 내 통과
- 그렘린 DPS 기여율 8.8% — 설계 목표 2~30% 구간 통과
- AGI 100 달성 시 DPS ×2.22 효과로 장기 과금 동기 설계

### 경제 & 재화 밸런스
- 60일 골드 플로우: 획득 33,000,000G − 소비 14,000,000G(Rank5) = +19,000,000G 잉여 통과
- 스테이지 골드 드랍: S1~S500 +0.6%, S501~S1000 +0.7% 구간별 차등 설계
- 스크랩 60일 상한 119,000개가 실질 병목으로 작용 — 재화 간 흡수 구조 의도

### 오프라인 방치 보상 설계
- 최대 적용 시간 12시간 상한, 초과분 0% 지급 — 과도한 오프라인 보상 방지
- 실시간 DPS의 70% 효율 적용 — 온라인 플레이 가치 보전
- S500 기준 12시간 방치 골드 획득량 약 13,300,000G (드랍량 × 40/h × 70% × 12h)

### AI 시뮬레이터 검증
- Python 기반 5탭 시뮬레이터 자체 설계: TTK 계산, Monte Carlo N=5,000, CSV 내보내기
- 38개 파라미터 기준 범위 설정 → 전항목 Pass 달성
- 민감도 분석 1위: char_base_atk(캐릭터 기초 ATK) — DPS 전반 영향도 최상위`
  },
  {
    id: 2,
    title: "Digreed",
    roles: ["코어 룰 기획"],
    description: "로그라이트 RPG의 코어 루프와 필요 시스템을 정의하고, 각 파트를 팀원에게 분배·총괄했습니다.",
    keyTasks: ["코어 룰 기획", "시스템 기획", "시나리오 기획", "PM"],
    tags: ["#코어루프", "#무기교체", "#맵프리팹"],
    image: "./images/digreed.png",
    gallery: Array.from({ length: 14 }, (_, i) => `./images/digreed_ebook/page_${(i + 1).toString().padStart(3, '0')}.png`),
    pdfUrl: "./documents/digreed_mvp_plan.pdf",
    color: "from-emerald-500/20 to-teal-500/20",
    status: "로컬 제작 완료",
    stats: {
      released: "미출시 (로컬 완성)",
      teamSize: "기획 6인",
      myRole: "기획 PM",
      achievement: "게임의 코어 루프 완성",
    },
    content: `# Digreed 시스템 기획서

## 1. 기획 개요
탐색 → 전투 → 숨기 → 탈출의 반복 도전 구조를 가진 로그라이트. 층별 수집 목표와 적 AI를 설계했습니다.

### 코어 루프 & 맵 설계
- 탐색 → 전투 → 탈출의 반복 도전 루프
- 층별 구성: 1·2층 방 4개 + 문(Door) 구조, 3·5층 중간보스 배치
- 층별 아이템 수집 목표 9개 / 12개 / 12개 — 탐색 동기와 시간 압박 동시 설계

### 무기 교체 시스템
- 근거리 무기만 최대 3개 소지, E키로 즉시 교체
- 무기 교체 시 UI 표시로 현재 장착 무기 인지 설계
- 무기 교체 타이밍이 전투 생존의 핵심 판단 요소로 기능

### 적 AI 상태머신 설계
- 일반 적: Idle → Chase → Attack → Return → Die 5단계 상태머신 설계
- 보스 적: Patrol → Detect → Hit 상태 설계, 범위(AttackRange) 기반 공격 패턴
- 오브젝트 적: Trigger 타입(접근 시 발동) / Timer 타입(주기 Active·Inactive) 2종 설계

### 탈출 & 수집 설계
- DigSpot 상호작용 시 아이템 / 함정 랜덤 드랍 (아이템 > 함정 확률 조건)
- 탈출 조건: 아이템 3개 수집 + 탈출문 상호작용`
  },
  {
    id: 3,
    title: "침묵의 저택",
    roles: ["시스템 기획"],
    description: "횡스크롤 공포 게임의 코어 루프와 필요 시스템을 정의하고 각 파트를 팀원에게 분배·총괄했습니다.",
    keyTasks: ["코어 룰 기획", "시스템 기획", "PM"],
    tags: ["#AI패턴", "#시야축소", "#상호작용"],
    image: "./images/silence.png",
    gallery: Array.from({ length: 22 }, (_, i) => `./images/silence_ebook/page_${(i + 1).toString().padStart(3, '0')}.png`),
    color: "from-orange-500/20 to-zinc-500/20",
    status: "메이플월드 출시",
    stats: {
      released: "메이플월드 정식 출시",
      teamSize: "팀 프로젝트",
      myRole: "시스템 기획 총괄",
      achievement: "메이플월드 출시",
    },
    content: `# 침묵의 저택 기획서

## 1. 기획 개요
메이플스토리 월드 플랫폼 기반 1 vs 1 술래잡기 생존 공포. 목표 게임타임 3~5분/판, 아이템 3개 수집 후 탈출하는 구조를 설계했습니다.

### 추격자 AI 상태머신 설계
- Chase → Search(5초) → Despawn 3단계 상태머신 직접 설계
- [IsHidden=true] 조건으로 Chase→Search 전환, SearchDuration 경과 후 Despawn
- ChaserCount 최대 2, 단계별 순차 등장으로 긴장감 점층 설계

### 시야(VisionValue) 공포 연출 시스템
- VisionValue 60 → 0, 매 초 -1 감소 — 횃불 획득 시 +10 회복
- 구간별 Vignette 강도: 정상(60~40) / 경고(40~20) / 위험(20~0) 3단계 연출
- 횃불 드랍 확률 50% / 40% / 10% 차등 설계 — 희소성으로 생존 압박 제어

### 가구 상호작용 & 아이템 시스템
- 가구별 DropChance(0~50%) + 고유 InteractionID로 중복 획득 방지 설계
- 숨기(E키) 성공/실패 조건, CoolDown 상태로 반복 사용 제한
- 탈출 조건: 아이템 3개 수집 + EscaDoor 상호작용 — 명확한 목표 구조

### 수치 밸런스
- HP=1(즉사), ChaserMoveSpeed=1.2, SearchDuration=5초, JumpScareDuration=2.0초
- SpawnDelay=1.0초, DestroyDelay=0.6초로 공포 연출 타이밍 정밀 조정
- 전 수치를 목표 게임타임 3~5분/판 기준으로 역산 설계`
  },
  {
    id: 4,
    title: "Pico-Bang!",
    roles: ["프로토타이핑", "AI 활용"],
    description: "바이브코딩으로 핵심 코어 루프를 직접 구현한 런앤건 프로토타입입니다.",
    keyTasks: ["프로토타이핑", "AI 활용"],
    tags: ["#바이브코딩", "#핵심루프", "#빠른검증"],
    image: "./images/picobang.png",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    color: "from-violet-500/20 to-pink-500/20",
    status: "프로토타입",
    stats: {
      released: "플레이어블 프로토타입",
      teamSize: "1인 개발",
      myRole: "기획 · 직접 개발",
      achievement: "24시간 내 구현",
    },
    content: `# Pico-Bang! 프로토타입 기획서

## 1. 기획 의도
바이브코딩(AI 활용 1인 개발)으로 핵심 게임루프를 직접 구현한 런앤건 프로토타입입니다.

### 핵심 게임루프 설계
- 포탈 기반 라운드 진행: 타겟 30개 파괴 → 게임 클리어
- GameFlowManager로 시작 → 게임 → 클리어/오버 → 홈 복귀 전체 흐름 직접 설계


### 플레이어 시스템
- PlayerHealth: HP 5, 피격 판정 및 사망 조건 구현
- PlayerShooter: 발사 로직 직접 구현, FireTime으로 연사 속도 수치 조정
- PlayerController: 이동 + 에임 조작 구현

### 적 AI & 스폰 시스템
- MonsterAI: NavMesh 기반 추격(chaseSpeed 수치 조정), 스턴 반응 구현
- AlertNearbyMonsters + OnHearShooting: 발사음으로 주변 적 활성화 메카닉 구현
- SpawnAreaGenerator: 라운드별 적 스폰 영역 동적 생성

### 검증 결과
- 24시간 이내 플레이어블 프로토타입 완성
- 수치(chaseSpeed, FireTime, HP) 반복 조정으로 난이도 밸런싱 검증
- 점수(Score) + 처치 텍스트(KillText) 실시간 피드백 루프 확인`
  },
  {
    id: 5,
    title: "게임 스토어의 불청객",
    roles: ["AI 활용"],
    description: "LLM 기반 NPC 대화 시스템을 설계, NPC의 대사와 묘사에서 단서를 추리하는 비정형 시나리오를 구현했습니다.",
    keyTasks: ["AI 활용", "시스템 기획", "시나리오 기획"],
    tags: ["#LLM프롬프트", "#가변시나리오", "#단서추출"],
    image: "./images/uninvited_guest.png",
    externalUrl: "https://gemini.google.com/gem/1mRNOwrLoLSi_nzpoI6PwXQxmXMz9cYdk?usp=sharing",
    color: "from-purple-500/20 to-indigo-500/20",
    status: "제작 완료",
    stats: {
      released: "Gemini 플랫폼 공개",
      teamSize: "1인",
      myRole: "AI 기획 · 설계",
      achievement: "LLM 챗봇 완성",
    },
    content: `# 게임 스토어의 불청객
LLM(대규모 언어 모델)을 활용한 시나리오 챗봇 프로젝트입니다.

## 1. 기획 의도
기존의 정형화된 대화 트리 방식에서 벗어나, 대규모 언어 모델을 활용해 플레이어와 NPC 간의 비정형적이고 자유로운 상호작용을 구현하고자 했습니다. 이를 통해 매번 새로운 스토리 경험을 제공하는 시스템을 설계했습니다.

## 2. 핵심 시스템 설계
### 2.1 LLM 프롬프트 설계
- NPC의 성격, 배경지식, 목표를 정교하게 설정하여 대화의 일관성 유지
- 시나리오 핵심 키워드를 플레이어가 유도해낼 수 있도록 유도하는 AI 로직 기획

### 2.2 가변 시나리오 구조
- 고정된 엔딩이 아닌, 플레이어의 대화 내용에 따라 사건의 흐름이 실시간으로 변화하는 시나리오 구조 설계
- 플레이어의 발화 데이터에서 사건 해결을 위한 '단서'를 추출하는 분석 로직 정의`
  }
];
