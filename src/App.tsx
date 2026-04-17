import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Portfolio } from './components/Portfolio';
import { Skills } from './components/Skills';
import { PlayHistory } from './components/PlayHistory';
import { Resume } from './components/Resume';
import { PrintTemplate } from './components/PrintTemplate';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { RightRail } from './components/RightRail';
import { ProjectDetail } from './components/ProjectDetail';
import { GameHistoryView } from './components/GameHistoryView';
import { motion } from 'motion/react';
import { FileText, FolderOpen, Gamepad2 } from 'lucide-react';

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
    description: "법학의 치밀한 논리 구조를 게임 시스템 기획에 적용합니다.\n기획 의도가 흔들리지 않는 튼튼한 뼈대를 설계하여,\n어떤 변수에도 대응할 수 있는 견고한 재미를 구축합니다."
  }, 'hero_content');
  const [aboutContent, setAboutContent, aboutLoaded] = useEditableContent({
    p1: "저는 7년간 법학을 전공하며 **'기획 의도를 먼저 정립하고 그것을 관통하는 목차를 설계하는 훈련'**을 반복했습니다.\n\n법학 답안지 작성에서 단련된 이 구조적 사고는 이제 **복잡한 시스템 기획과 정밀한 밸런싱을 설계하는 강력한 무기**가 되었습니다.",
    p2: "법학이 '-에서 0으로 되돌리는 일'이었다면, 게임은 누군가의 하루를 **'0에서 +가 되는 경험'**으로 만드는 일입니다.\n탄탄한 시스템의 논리적 뼈대 위에서, 유저의 마음에 즐거움이라는 감성을 채워넣는 기획자가 되겠습니다."
  }, 'about_content');

  const isDataLoaded = resumeLoaded && projectsLoaded && portfolioLoaded && gameHistoryLoaded && heroLoaded && aboutLoaded;

  // Section Observer
  useEffect(() => {
    if (view !== 'home') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
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
      if (id === 'hero-top') { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveSection(''); return; }
      const element = document.getElementById(id);
      if (element) { element.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); }
    }, 100);
  };

  const handleBack = () => {
    if (view === 'resume' || view === 'cover-letter') { setResumeTab('resume'); handleNavClick('hero-top'); }
    else if (view === 'portfolio') { setTargetProjectId(null); handleNavClick('projects'); }
    else if (view === 'game-history') handleNavClick('play-history');
    else if (view === 'project-detail') handleNavClick('projects');
    else handleNavClick('hero-top');
  };

  // ── Navbar Slots ──────────────────────────────────────────────
  // 공통 pill 단일 탭
  const makeSinglePillTab = (label: string) => (
    <div className="flex items-center bg-zinc-200/50 p-1 rounded-full border border-black/5 shadow-inner">
      <div className="px-6 py-2.5 rounded-full bg-[#0047BB] text-white text-sm font-extrabold tracking-tight shadow-md">
        {label}
      </div>
    </div>
  );

  // 컨텍스트 이동 버튼
  const makeNavBtn = (label: string, icon: React.ReactNode, target: typeof view) => (
    <button
      key={label}
      onClick={() => { setView(target); window.scrollTo(0, 0); }}
      className="w-[125px] py-2.5 rounded-full text-[14px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 text-zinc-500 hover:text-[#2C2C2C] hover:bg-white hover:shadow-sm"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const resumeIcon = <FileText className="w-3.5 h-3.5" />;
  const portfolioIcon = <FolderOpen className="w-3.5 h-3.5" />;
  const dnaIcon = <Gamepad2 className="w-3.5 h-3.5" />;

  // pdfButton 삭제됨
  // centerSlot
  const centerSlot = (() => {
    if (view === 'resume' || view === 'cover-letter') {
      return (
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
      );
    }
    if (view === 'portfolio') return makeSinglePillTab('포트폴리오');
    if (view === 'game-history') return makeSinglePillTab('게이밍 DNA');
    return undefined;
  })();

  // rightActionSlot은 Navbar 내부에서 모든 화면에 동일하게 보이도록 직접 렌더링되므로 속성을 넘기지 않음

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
    <>
    <div className="min-h-screen font-sans selection:bg-[#0047BB]/20 text-[#2C2C2C] bg-[#FAFAFA]">
      <Navbar
        setView={setView}
        currentView={view}
        onNavClick={handleNavClick}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        activeSection={activeSection}
        onBack={view !== 'home' ? handleBack : undefined}
        centerSlot={centerSlot}
        isGeneratingPdf={isGeneratingPdf}
      />
      <RightRail view={view} onNavClick={handleNavClick} activeSection={activeSection} />

      {view === 'home' && (
        <main>
          <Hero onPortfolioClick={() => setView('portfolio')} onResumeClick={() => setView('resume')} isEditing={isEditing} content={heroContent} setContent={setHeroContent} aboutContent={aboutContent} setAboutContent={setAboutContent} />
          <About isEditing={isEditing} content={aboutContent} setContent={setAboutContent} />
          <Projects onProjectClick={(p) => { setTargetProjectId(p.id); setView('portfolio'); }} isEditing={isEditing} projects={projectsData} setProjects={setProjectsData} limit={3} setView={setView} />
          <Skills isEditing={isEditing} skills={skillsData} setSkills={setSkillsData} />
          <PlayHistory isEditing={isEditing} history={gameHistory} setHistory={setGameHistory} onViewAll={() => { setView('game-history'); window.scrollTo(0, 0); }} />
          <Contact />
        </main>
      )}

      {(view === 'resume' || view === 'cover-letter') && (
        <Resume
          setView={setView}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
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

    </>
  );
}

export default App;
