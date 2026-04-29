# 웹젠 포트폴리오 — 모바일 UI 구현 계획서

**작성일:** 2026-04-28  
**대상 파일:** `포트폴리오사이트_웹젠`  
**목표:** 모바일 접속 시 PC와 완전히 분리된 모바일 전용 UI 렌더링  
**방향:** 기존 사이트 톤앤매너 유지 + 세로형 모바일 게임 UI 레이아웃 패턴 차용

---

## 톤앤매너 기준 (변경 금지)

| 항목 | 값 |
|------|-----|
| 배경색 | `#FDFCF8` (크림 페이퍼) |
| 강조색 | `#0047BB` (로열 블루) |
| 본문색 | `#1A2332` (다크 네이비) |
| 보조색 | `zinc-400/500` |
| 폰트 | Pretendard |
| 카드 | 흰색 배경 + 미세 테두리 + glass 효과 |
| 애니메이션 | Framer Motion (기존 동일) |

---

## 모바일 UI 레이아웃 패턴

PC 상단 Navbar 대신 → **하단 탭바 (Bottom Tab Navigation)**  
섹션별 세로 스크롤 → 콘텐츠는 탭별 독립 스크롤  
프로젝트 목록 → **2열 카드 그리드**  
상세 진입 → **풀스크린 슬라이드업**  

---

## 파일 구조 (신규 생성)

```
src/
  hooks/
    useIsMobile.ts             ← [신규] 모바일 감지 훅
  components/
    mobile/
      MobileApp.tsx            ← [신규] 모바일 전체 컨테이너
      MobileNavBar.tsx         ← [신규] 하단 탭바
      MobileLoadingScreen.tsx  ← [신규] 진입 로딩 (CinematicIntro 대체)
      MobileHome.tsx           ← [신규] 홈 탭
      MobilePortfolio.tsx      ← [신규] Works 탭 (프로젝트 그리드)
      MobileProjectDetail.tsx  ← [신규] 프로젝트 상세 (풀스크린)
      MobileResume.tsx         ← [신규] 이력서 탭
      MobileGameHistory.tsx    ← [신규] 게임DNA 탭
      MobileMore.tsx           ← [신규] 더보기 탭 (연락처 등)
```

**수정 파일:**
- `src/App.tsx` — `useIsMobile()` 분기 추가

**변경 없는 파일:**
- 기존 모든 PC 컴포넌트 (Navbar, Hero, Portfolio 등) — 완전 보존

---

## 구현 단계

### STEP 1 — 모바일 감지 훅 + 분기 연결
**파일:** `src/hooks/useIsMobile.ts`, `src/App.tsx`

```ts
// useIsMobile.ts
import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const byWidth = window.innerWidth <= 768;
      const byTouch = 'ontouchstart' in window;
      setIsMobile(byWidth && byTouch);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};
```

```tsx
// App.tsx 추가
import { useIsMobile } from './hooks/useIsMobile';
import { MobileApp } from './components/mobile/MobileApp';

// 기존 return 앞에
const isMobile = useIsMobile();
if (isMobile) return <MobileApp />;
// 이후 기존 PC 렌더링 유지
```

**완료 기준:** 모바일 브라우저에서 빈 `<MobileApp />` 렌더링 확인, PC는 기존 그대로

---

### STEP 2 — 하단 탭바 (MobileNavBar)
**파일:** `src/components/mobile/MobileNavBar.tsx`

탭 구성:
```
[ 홈 ]  [ Works ]  [ 이력서 ]  [ 게임DNA ]  [ 더보기 ]
  🏠       🗂️         📄          🎮          ···
```

스타일:
- 배경: `#FDFCF8` (사이트 배경색 동일)
- 상단 테두리: `border-t border-black/8`
- 선택된 탭: `#0047BB` (강조색), 탭 아이콘 + 레이블 강조
- 비선택 탭: `zinc-400`
- 높이: `64px` fixed
- 콘텐츠 영역: `padding-bottom: 64px`

```tsx
// MobileApp.tsx 기본 구조
type MobileTab = 'home' | 'portfolio' | 'resume' | 'game-history' | 'more';

const [activeTab, setActiveTab] = useState<MobileTab>('home');
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

**완료 기준:** 5개 탭 렌더링, 탭 전환 시 active 상태 변경 확인

---

### STEP 3 — 진입 로딩 화면 (MobileLoadingScreen)
**파일:** `src/components/mobile/MobileLoadingScreen.tsx`

- CinematicIntro 대체 (모바일에서만)
- 배경: `#FDFCF8` → 로고/이름 → 얇은 파란 프로그레스 라인
- 0.8초 후 자동 완료 → 홈 탭 진입 (Framer Motion fade)
- 텍스트: "조경환 포트폴리오" + `#0047BB` 선 애니메이션

```tsx
// MobileApp.tsx 로딩 분기
const [loaded, setLoaded] = useState(false);
if (!loaded) return <MobileLoadingScreen onComplete={() => setLoaded(true)} />;
```

**완료 기준:** 진입 시 로딩 → 홈 자동 전환, 0.8초 내 완료

---

### STEP 4 — 홈 탭 (MobileHome)
**파일:** `src/components/mobile/MobileHome.tsx`

레이아웃:
```
┌─────────────────────────┐
│  Game Designer          │  ← 상단 eyebrow (기존 Hero 스타일)
│  Portfolio              │
│                         │
│  조경환                  │  ← 이름 (대형 타이포)
│  목차를 쓸줄 아는 기획자   │  ← 서브 헤드
│                         │
│  ──────────────────────  │
│  About 내용 (짧게)       │
│                         │
│  [포트폴리오 보기 →]     │  ← CTA → Works 탭
│  [이력서 보기 →]         │
└─────────────────────────┘
```

- 기존 `RESUME_DATA`, Hero 컨텐츠 재사용
- `#0047BB` 상단 얇은 라인 유지 (PC Hero 상단과 동일)
- 세로 스크롤 가능
- CTA 버튼 탭 전환 연결

**완료 기준:** 이름/소개 표시, CTA 버튼 탭 전환 동작

---

### STEP 5 — Works 탭 (MobilePortfolio)
**파일:** `src/components/mobile/MobilePortfolio.tsx`

레이아웃:
```
┌─────────────────────────┐
│  Works                  │  ← sticky 헤더
│  [전체] [기획] [시스템]  │  ← 필터 칩 (가로 스크롤)
│                         │
│  ┌─────────┐ ┌─────────┐│
│  │ 도로시아  │ │Digreed  ││  ← 2열 카드 그리드
│  │ [이미지] │ │[이미지] ││
│  │ 제목    │ │ 제목    ││
│  │ 장르    │ │ 장르    ││
│  └─────────┘ └─────────┘│
│                         │
│  ┌─────────┐ ┌─────────┐│
│  │ 침묵의   │ │        ││
│  │ 저택    │ │        ││
│  └─────────┘ └─────────┘│
└─────────────────────────┘
```

- 기존 `PROJECTS` 데이터 재사용
- 카드 스타일: 기존 bento-card 스타일 (흰색 + 미세 테두리)
- 필터: `project.genre` 또는 `project.roles` 기반
- 카드 탭 → `MobileProjectDetail` 풀스크린 슬라이드업

**완료 기준:** 프로젝트 목록 2열 그리드 표시, 필터 동작, 카드 탭 이동

---

### STEP 6 — 프로젝트 상세 (MobileProjectDetail)
**파일:** `src/components/mobile/MobileProjectDetail.tsx`

레이아웃:
```
┌─────────────────────────┐
│ ← 뒤로                  │  ← 상단 뒤로가기 버튼
│                         │
│  [프로젝트 이미지]        │  ← 상단 히어로 이미지
│                         │
│  도로시아                │  ← 제목
│  기획 | 2024 | 미출시    │  ← 메타 정보
│                         │
│  ──────────────────────  │
│  [프로젝트 설명]          │
│                         │
│  [기획서 보기 PDF →]     │
└─────────────────────────┘
```

- 기존 `ProjectDetail` 데이터 재사용 (description, image, roles, status 등)
- Framer Motion 슬라이드업 진입
- 뒤로가기 → Works 탭 복귀

**완료 기준:** 상세 페이지 슬라이드업, 뒤로가기 동작

---

### STEP 7 — 이력서 탭 (MobileResume)
**파일:** `src/components/mobile/MobileResume.tsx`

레이아웃:
```
┌─────────────────────────┐
│  이력서                  │  ← sticky 헤더
│  [이력서] [자기소개서]    │  ← 탭 전환
│                         │
│  ── 경력 ──             │
│  ▸ (경력 리스트)         │
│                         │
│  ── 학력 ──             │
│  ▸ (학력 리스트)         │
│                         │
│  ── 자격증 / 어학 ──    │
│  ▸ (자격증 리스트)       │
│                         │
│  [PDF 다운로드]          │
└─────────────────────────┘
```

- 기존 `RESUME_DATA` 재사용
- ResumeExperience, ResumeEducation 로직 참조
- PDF 다운로드 버튼 유지
- 자기소개서 탭: CoverLetter 내용 모바일용 재배치

**완료 기준:** 이력서 내용 표시, 이력서/자기소개서 탭 전환, PDF 버튼

---

### STEP 8 — 게임DNA 탭 (MobileGameHistory)
**파일:** `src/components/mobile/MobileGameHistory.tsx`

- 기존 `GameHistoryView` 로직/데이터 참조
- 세로 스크롤 리스트 형태로 재배치
- PC의 가로 레이아웃 → 모바일 세로 카드 스택

**완료 기준:** 게임 목록 세로 표시

---

### STEP 9 — 더보기 탭 (MobileMore)
**파일:** `src/components/mobile/MobileMore.tsx`

- 연락처 (Contact 내용)
- GitHub 링크
- 사이트 설명 한 줄

**완료 기준:** 연락처 정보 표시

---

### STEP 10 — 탭 전환 애니메이션 + QA
**파일:** `MobileApp.tsx`

- Framer Motion `AnimatePresence` + `key={activeTab}` 로 탭 전환 시 fade 또는 slide 애니메이션
- 각 탭 전환 시 스크롤 위치 초기화 (`window.scrollTo(0, 0)`)
- 모바일 실제 기기 확인 (Chrome 개발자 도구 → 모바일 시뮬레이션)
- 375px (iPhone SE), 390px (iPhone 15), 430px (iPhone 15 Plus) 확인

**완료 기준:** 탭 전환 매끄럽게, 3개 해상도 레이아웃 깨짐 없음

---

## 구현 우선순위

| 순서 | STEP | 설명 | 예상 소요 |
|------|------|------|----------|
| 1 | STEP 1 | 모바일 감지 + 분기 | 30분 |
| 2 | STEP 2 | 하단 탭바 | 1시간 |
| 3 | STEP 3 | 로딩 화면 | 30분 |
| 4 | STEP 4 | 홈 탭 | 1시간 |
| 5 | STEP 5 | Works 탭 (그리드) | 1.5시간 |
| 6 | STEP 6 | 프로젝트 상세 | 1시간 |
| 7 | STEP 7 | 이력서 탭 | 1시간 |
| 8 | STEP 8 | 게임DNA 탭 | 45분 |
| 9 | STEP 9 | 더보기 탭 | 30분 |
| 10 | STEP 10 | 애니메이션 + QA | 1시간 |

**총 예상 소요:** 8~9시간 (CC 기준 30~40분)

---

## 제약사항 재확인

- PC 레이아웃 파일 **일체 수정 없음**
- 기존 데이터 파일 (`data.ts`, `types.ts`) **수정 없음**
- 편집 기능 (`isEditing`) 모바일에서 **비활성화**
- 기존 `PROJECTS`, `RESUME_DATA`, `GAME_HISTORY`, `SKILLS` **그대로 재사용**
- PDF 생성 기능 모바일에서 **버튼만 유지** (기존 로직 재사용)

---

## 검증 체크리스트

- [ ] PC 접속 → 기존 레이아웃 완전히 동일
- [ ] 모바일(768px 이하 + 터치) → 모바일 UI 렌더링
- [ ] 5개 탭 모두 전환 동작
- [ ] 프로젝트 카드 → 상세 → 뒤로가기
- [ ] 이력서 PDF 버튼 동작
- [ ] 375px / 390px / 430px 레이아웃 정상
- [ ] 하단 탭바가 콘텐츠를 가리지 않음
