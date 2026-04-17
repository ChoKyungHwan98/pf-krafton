import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Portfolio } from './components/Portfolio';
import { Skills } from './components/Skills';
import { PlayHistory } from './components/PlayHistory';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { RightRail } from './components/RightRail';
import { ProjectDetail } from './components/ProjectDetail';
import { GameHistoryView } from './components/GameHistoryView';
import { motion } from 'motion/react';

import { useEditableContent } from './hooks/useEditableContent';
import { RESUME_DATA, PROJECTS, PORTFOLIO_PROJECTS, GAME_HISTORY, SKILLS } from './data';
import type { Project, ResumeData, GameHistory, Skill } from './types';

function App() {
  const [view, setView] = useState<'home' | 'resume' | 'project-detail' | 'portfolio' | 'all-projects' | 'game-history'>('home');
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [targetProjectId, setTargetProjectId] = useState<number | null>(null);
  const [resumeTab, setResumeTab] = useState<'resume' | 'cover-letter'>('resume');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Supabase Data
  const [resumeData, setResumeData, resumeLoaded] = useEditableContent(RESUME_DATA, 'resume_data');
  const [projectsData, setProjectsData, projectsLoaded] = useEditableContent(PROJECTS, 'projects_data');
  const [portfolioProjects, setPortfolioProjects, portfolioLoaded] = useEditableContent(PORTFOLIO_PROJECTS, 'portfolio_projects');
  const [gameHistory, setGameHistory, gameHistoryLoaded] = useEditableContent(GAME_HISTORY, 'game_history');
  const [skillsData, setSkillsData] = useState(SKILLS);
  const [heroContent, setHeroContent, heroLoaded] = useEditableContent({
    titleLine1: "기획의도를 알고",
    titleLine2: "목차를 쓸줄 아는 기획자",
    description: "법학의 치밀한 논리 구조를 게임 시스템 기획에 접목합니다.\n기획 의도가 흔들리지 않는 튼튼한 뼈대를 설계하여,\n\n어떤 변수에도 대응할 수 있는 견고한 재미를 구축합니다."
  }, 'hero_content');
  const [aboutContent, setAboutContent, aboutLoaded] = useEditableContent({
    p1: "저는 7년간 법학을 전공하며 '기획 의도를 먼저 세우고 그것을 관통하는 목차를 작성하는 훈련'을 반복했습니다.\n이 능력은 복잡한 시스템 기획과 밸런싱을 설계할 때 그 진가를 발휘합니다.",
    p2: "법학이 '-에서 0으로 되돌리는 일'이었다면, 게임은 누군가의 하루를 '0에서 +가 되는 경험'으로 만드는 일입니다.\n탄탄한 시스템의 논리적 뼈대 위에서, 유저의 마음에 즐거움이라는 감성을 채워넣는 기획자가 되겠습니다."
  }, 'about_content');

  const isDataLoaded = resumeLoaded && projectsLoaded && portfolioLoaded && gameHistoryLoaded && heroLoaded && aboutLoaded;


  // Section Observer
  useEffect(() => {
    if (view !== 'home') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    ['hero', 'about', 'projects', 'skills', 'play-history', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [view, isDataLoaded]);

  const handleNavClick = (id: string) => {
    setView('home');
    setTimeout(() => {
      if (id === 'hero-top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('');
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    }, 100);
  };

  const handleBack = () => {
    if (view === 'resume') { setResumeTab('resume'); handleNavClick('hero-top'); }
    else if (view === 'portfolio') { setTargetProjectId(null); handleNavClick('projects'); }
    else if (view === 'game-history') handleNavClick('play-history');
    else if (view === 'project-detail') handleNavClick('projects');
    else handleNavClick('hero-top');
  };

  // Resume 탭 UI → Navbar centerSlot으로 주입
  const resumeCenterSlot = view === 'resume' ? (
    <div className="grid grid-cols-2 w-[260px] bg-zinc-200/50 p-1 rounded-full border border-black/5 shadow-inner relative">
      {(['resume', 'cover-letter'] as const).map((tab) => (
        <button key={tab} onClick={() => setResumeTab(tab)}
          className={`relative w-full py-2.5 rounded-full text-sm font-extrabold transition-colors tracking-tight flex items-center justify-center ${resumeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-[#2C2C2C]'}`}>
          {resumeTab === tab && (
            <motion.div layoutId="resumeTabBadge" className="absolute inset-0 bg-[#0047BB] rounded-full shadow-md" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
          )}
          <span className="relative z-10">{tab === 'resume' ? '이력서' : '자기소개서'}</span>
        </button>
      ))}
    </div>
  ) : undefined;

  if (!isDataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFB]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#0047BB]/20 border-t-[#0047BB] rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-medium font-mono text-sm tracking-widest uppercase">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-[#0047BB]/20 text-[#2C2C2C] bg-[#FAFAFA]">
      <Navbar 
        setView={setView} 
        currentView={view} 
        onNavClick={handleNavClick} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        activeSection={activeSection} 
        onBack={view !== 'home' ? handleBack : undefined}
        centerSlot={resumeCenterSlot}
      />
      <RightRail view={view} onNavClick={handleNavClick} activeSection={activeSection} />

      {view === 'home' && (
        <main>
          <Hero onPortfolioClick={() => setView('portfolio')} onResumeClick={() => setView('resume')} isEditing={isEditing} content={heroContent} setContent={setHeroContent} aboutContent={aboutContent} setAboutContent={setAboutContent} />
          <About isEditing={isEditing} content={aboutContent} setContent={setAboutContent} />
          <Projects onProjectClick={(p) => { setTargetProjectId(p.id); setView('portfolio'); }} isEditing={isEditing} projects={projectsData} setProjects={setProjectsData} limit={3} setView={setView} />
          <Skills isEditing={isEditing} skills={skillsData} setSkills={setSkillsData} />
          <PlayHistory isEditing={isEditing} history={gameHistory} setHistory={setGameHistory} onViewAll={() => { setView('game-history'); window.scrollTo(0,0); }} />
          <Contact />
        </main>
      )}

      {view === 'resume' && (
        <Resume 
          setView={setView} 
          isEditing={isEditing} 
          data={resumeData} 
          setData={setResumeData} 
          onBack={handleBack}
          activeTab={resumeTab} 
          setActiveTab={setResumeTab}
          isGeneratingPdf={isGeneratingPdf} 
          setIsGeneratingPdf={setIsGeneratingPdf} 
        />
      )}
      {view === 'project-detail' && selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          isEditing={isEditing} 
          onBack={handleBack} 
          onSaveContent={(c) => { const p = [...projectsData]; const index = p.findIndex(pp => pp.id === selectedProject.id); if (index !== -1) { p[index].content = c; setProjectsData(p); setSelectedProject(p[index]); } }} 
        />
      )}
      {view === 'portfolio' && (
        <Portfolio 
          onProjectClick={(p) => { setSelectedProject(p); setView('project-detail'); }} 
          isEditing={isEditing} 
          projects={portfolioProjects} 
          setProjects={setPortfolioProjects} 
          setView={setView} 
          onBack={handleBack} 
          initialProjectId={targetProjectId} 
        />
      )}
      {view === 'game-history' && (
        <GameHistoryView 
          onBack={handleBack} 
          history={gameHistory} 
          setHistory={setGameHistory} 
          isEditing={isEditing} 
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
