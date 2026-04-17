import React from 'react';
import { Layers, ScrollText, Bot } from 'lucide-react';
import type { Skill } from '../types';

export const SKILLS: Skill[] = [
  {
    name: "기획 설계",
    icon: React.createElement(Layers, { className: "w-5 h-5" }),
    caption: "시스템의 골격을 세우고 수치로 검증하는 게임 기획 역량",
    capabilities: [
      { name: "시스템 기획", tier: 1 },
      { name: "콘텐츠 기획", tier: 2 },
      { name: "밸런스 기획", tier: 3 },
      { name: "코어 루프 설계" },
      { name: "재화 순환 구조 설계" },
    ],
    evidences: [
      { value: "3건+", label: "팀장 완성 프로젝트" },
      { value: "1.022배", label: "장비 성장 지수" },
      { value: "4종", label: "재화 순환 설계" },
    ],
  },
  {
    name: "AI 활용",
    icon: React.createElement(Bot, { className: "w-5 h-5" }),
    caption: "AI를 도구로 기획·검증·자동화까지 실무에 직접 적용",
    capabilities: [
      { name: "LLM 봇 기획 소프트사클 구현" },
      { name: "프로토타이핑 & 검증" },
      { name: "프롬프트 엔지니어링" },
      { name: "Unity 기반 구현 테스트" },
    ],
    evidences: [
      { value: "20건+", label: "회의록 자동화" },
      { value: "×20배", label: "업무 효율 향상" },
      { value: "3분", label: "자동화 후 처리시간" },
    ],
  },
  {
    name: "문서 작성",
    icon: React.createElement(ScrollText, { className: "w-5 h-5" }),
    caption: "기획 의도를 관통하는 목차 설계와 GDD 문서화 역량",
    capabilities: [
      { name: "목차 기반 기획서 작성", tier: 1 },
      { name: "GDD · 사양서 작성", tier: 2 },
      { name: "논리 구조 시각화" },
      { name: "팀 협업 문서 체계화" },
    ],
    evidences: [
      { value: "7년", label: "법학 논리 훈련" },
      { value: "95점", label: "졸업 논문 점수" },
      { value: "A→Z", label: "기획 의도 완결성" },
    ],
  },
];
