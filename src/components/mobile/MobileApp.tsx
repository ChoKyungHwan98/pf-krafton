import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { MobileLoadingScreen } from './MobileLoadingScreen';
import { MobileNavBar, type MobileTab } from './MobileNavBar';
import { MobileHome } from './MobileHome';
import { MobilePortfolio } from './MobilePortfolio';
import { MobileResume } from './MobileResume';
import { MobileGameHistory } from './MobileGameHistory';
import { MobileMore } from './MobileMore';
import { useEditableContent } from '../../hooks/useEditableContent';
import { RESUME_DATA, PROJECTS } from '../../data';

const TAB_ORDER: MobileTab[] = ['home', 'portfolio', 'resume', 'game-history', 'more'];

export const MobileApp = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTab>('home');
  const prevTabRef = useRef<MobileTab>('home');

  const [resumeData] = useEditableContent(RESUME_DATA, 'webzen_resume_data');
  const [projectsData] = useEditableContent(PROJECTS, 'webzen_portfolio_projects_v2');

  const handleTabChange = (tab: MobileTab) => {
    prevTabRef.current = activeTab;
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (!loaded) {
    return (
      <AnimatePresence>
        <MobileLoadingScreen key="loading" onComplete={() => setLoaded(true)} />
      </AnimatePresence>
    );
  }

  // 탭 전환 방향 결정
  const prevIdx = TAB_ORDER.indexOf(prevTabRef.current);
  const currIdx = TAB_ORDER.indexOf(activeTab);
  const dir = currIdx > prevIdx ? 1 : -1;

  return (
    <div style={{ minHeight: '100vh', background: '#FDFCF8', fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* 콘텐츠 — 탭바 높이(60px) + safe-area 패딩 */}
      <div style={{ overflowY: 'auto', minHeight: '100vh' }}>
        <AnimatePresence mode="wait" custom={dir}>
          {activeTab === 'home' && (
            <MobileHome key="home" onTabChange={handleTabChange} />
          )}
          {activeTab === 'portfolio' && (
            <MobilePortfolio key="portfolio" projects={projectsData} />
          )}
          {activeTab === 'resume' && (
            <MobileResume key="resume" data={resumeData} />
          )}
          {activeTab === 'game-history' && (
            <MobileGameHistory key="game-history" />
          )}
          {activeTab === 'more' && (
            <MobileMore key="more" />
          )}
        </AnimatePresence>
      </div>

      <MobileNavBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};
