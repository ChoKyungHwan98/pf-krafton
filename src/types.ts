import React from 'react';
// --- Types ---
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  content: string;
  status?: string;
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

export interface GamePlay {
  id: string | number;
  genre?: string;
  name?: string;
  title?: string;
  platform?: string;
  playTime?: string;
  hours?: number;
  brand?: string;
}

export interface GameHistoryItem {
  id: string | number;
  category: 'PC' | 'Mobile' | 'Console';
  genre: string;
  title: string;
  company: string;
  playTime?: string;
}

export interface GameHistory {
  pc: GamePlay[];
  mobile: GamePlay[];
  console: GamePlay[];
}

export interface ResumeData {
  name: string;
  role: string;
  email: string;
  phone: string;
  birthDate?: string;
  summary: string;
  selfIntroduction?: string;
  selfIntroductions?: {
    navTitle: string;
    logline: string;
    hook: string;
    body: string;
    pullQuote?: string;
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
    details: string[];
  }[];
  certificates?: {
    name: string;
    date: string;
  }[];
  tools?: {
    name: string;
    description: string;
  }[];
}
