import React from 'react';
// --- Types ---
export interface Project {
  id: number;
  title: string;
  roles: string[];
  description: string;
  keyTasks?: string[];
  tags: string[];
  image: string;
  gallery?: string[];
  videoUrl?: string;
  pdfUrl?: string;
  documentLabel?: string;
  scenarioGallery?: string[];
  externalUrl?: string;
  simulatorUrl?: string;
  simulatorVideoUrl?: string;
  hasSimulator?: boolean;
  prototypeUrl?: string;
  ganttUrl?: string;
  bookmarks?: { id: string; title: string; type: 'section' | 'link' | 'ebook'; target: string }[];
  color: string;
  content: string;
  status?: string;
  stats?: {
    released: string;
    teamSize: string;
    myRole: string;
    achievement: string;
  };
}

export interface SkillEvidence {
  value: string;   // e.g. "3건+", "1.022배"
  label: string;   // e.g. "팀장 완성 프로젝트"
}

export interface SkillCapability {
  name: string;
  tier?: 1 | 2 | 3; // hierarchy depth for indentation
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  caption: string;
  capabilities: SkillCapability[];
  evidences: SkillEvidence[];
}

export interface GameHistoryItem {
  id: string | number;
  category: 'PC' | 'Pc' | 'Mobile' | 'Console';
  genre: string;
  title: string;
  company: string;
  playTime?: string;
  image?: string;
  position?: string;
  size?: string;
  flag?: string;
  isCleared?: boolean;
  isPerfectCleared?: boolean;
  isFavorite?: boolean;
  yearsPlayed?: number;
}

export interface GameHistory {
  pc: GameHistoryItem[];
  mobile: GameHistoryItem[];
  console: GameHistoryItem[];
}

export interface ResumeData {
  name: string;
  image?: string;
  role: string;
  email: string;
  phone: string;
  address?: string;
  birthDate?: string;
  summary: string;
  selfIntroduction?: string;
  selfIntroductions?: {
    navTitle: string;
    question?: string;
    logline: string;
    hook: string;
    body: string;
    pullQuote?: string;
    steps?: { title: string; desc?: string }[];
    highlights?: { bold: string; em: string }[];
    closing?: string;
  }[];
  education: {
    title: string;
    period: string;
    description: string;
    details: string[];
  }[];
  experience: {
    title: string;
    period: string;
    description: string;
    teamSize?: string;
    details: string[];
  }[];
  certificates?: {
    name: string;
    score?: string;
    date: string;
  }[];
  military?: {
    branch: string;
    role: string;
    rank: string;
    status: string;
  };
  tools?: {
    name: string;
    description: string;
  }[];
}
