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

export interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  caption?: string;
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
  summary: string;
  selfIntroduction?: string;
  selfIntroductions?: {
    logline: string;
    content: string;
    navTitle?: string;
    badge?: string;
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
  certificates?: string[];
  tools?: {
    name: string;
    description: string;
  }[];
}
