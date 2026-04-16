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

import { useEditableContent } from './hooks/useEditableContent';
import { RESUME_DATA, PROJECTS, PORTFOLIO_PROJECTS, GAME_HISTORY, SKILLS } from './data';
import type { Project, ResumeData, GameHistory, Skill } from './types';

function App() {
  const [view, setView] = useState<'home' | 'resume' | 'project-detail' | 'portfolio' | 'all-projects' | 'game-history'>('home');
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [targetProjectId, setTargetProjectId] = useState<number | null>(null);

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
    p1: "저는 7년간 법학을 전공하며 **'기획 의도를 먼저 세우고 그것을 관통하는 목차를 작성하는 훈련'**을 반복했습니다. 이 능력은 복잡한 시스템 기획과 밸런싱을 설계할 때 그 진가를 발휘합니다.",
    p2: "저는 단순히 엑셀 수치를 채우는 것을 넘어, 코어 루프와 연계된 경제 시스템의 근본적인 문제(인플레이션 등)를 예측하고 이를 제어하는 기획을 지향합니다. 구조가 탄탄한 문서를 통해 팀원들을 설득하고 프로젝트의 비전을 이끌겠습니다."
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
      <Navbar setView={setView} currentView={view} onNavClick={handleNavClick} isEditing={isEditing} setIsEditing={setIsEditing} activeSection={activeSection} />
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

      {view === 'resume' && <Resume setView={setView} isEditing={isEditing} data={resumeData} setData={setResumeData} onBack={() => handleNavClick('hero-top')} />}
      {view === 'project-detail' && selectedProject && (
        <ProjectDetail project={selectedProject} isEditing={isEditing} onBack={() => handleNavClick('projects')} onSaveContent={(c) => { const p = [...projectsData]; const index = p.findIndex(pp => pp.id === selectedProject.id); if (index !== -1) { p[index].content = c; setProjectsData(p); setSelectedProject(p[index]); } }} />
      )}
      {view === 'portfolio' && (
        <Portfolio onProjectClick={(p) => { setSelectedProject(p); setView('project-detail'); }} isEditing={isEditing} projects={portfolioProjects} setProjects={setPortfolioProjects} setView={setView} onBack={() => { setTargetProjectId(null); handleNavClick('projects'); }} initialProjectId={targetProjectId} />
      )}
      {view === 'game-history' && <GameHistoryView onBack={() => handleNavClick('play-history')} history={gameHistory} setHistory={setGameHistory} isEditing={isEditing} />}

      <Footer />
    </div>
  );
}

export default App;
