import React, { useState, useEffect } from 'react';
import { FileText, FolderOpen, Gamepad2, Lock, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PasswordModal } from './PasswordModal';

interface NavbarProps {
  setView: (v: 'home' | 'resume' | 'project-detail' | 'portfolio' | 'all-projects' | 'game-history') => void;
  currentView: string;
  onNavClick: (id: string) => void;
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  activeSection: string;
}

export const Navbar = ({ setView, currentView, onNavClick, isEditing, setIsEditing, activeSection }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavClick(id);
    setIsMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isEditing) {
      setIsEditing(false);
      alert("관리자 모드가 비활성화되었습니다.");
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordConfirm = (pw: string) => {
    if (pw === '9806') {
      setIsEditing(true);
      setIsPasswordModalOpen(false);
      alert("관리자 모드가 활성화되었습니다. 내용을 클릭하여 수정하세요.");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const navContainerClass = scrolledPastHero ? 'py-4' : 'py-8';
  const navBgClass = scrolledPastHero
    ? 'bg-white/85 backdrop-blur-2xl border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
    : 'bg-transparent border border-transparent';

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-all duration-500 pointer-events-none print:hidden ${navContainerClass}`}>
        <nav className={`pointer-events-auto w-[98%] max-w-[1440px] rounded-full transition-all duration-500 flex items-center justify-between px-6 lg:px-10 py-3 lg:py-3.5 ${navBgClass}`}>
          
          <div className="flex shrink-0 items-center gap-3 md:gap-4 cursor-pointer group" onClick={(e) => handleLinkClick(e, 'hero-top')}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0047BB] to-[#500014] text-white flex items-center justify-center font-display font-black tracking-tighter text-base md:text-lg shadow-lg shadow-[#0047BB]/30 transition-transform group-hover:scale-105">
              조
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold tracking-tight text-[16px] md:text-[18px] text-[#2C2C2C] group-hover:text-[#0047BB] transition-colors leading-none">조경환</span>
              <span className="text-[10px] md:text-[11px] font-mono tracking-widest uppercase text-zinc-500 mt-1.5 leading-none hidden sm:block">Game Designer</span>
            </div>
            {isEditing && (
              <span className="ml-3 px-2 py-1 bg-[#0047BB]/10 border border-[#0047BB]/30 rounded text-[10px] text-[#0047BB] font-bold uppercase tracking-wider">
                Edit
              </span>
            )}
          </div>

          <div className="hidden lg:flex items-center justify-center gap-2 mx-6">
            {[
              { id: 'about', label: '소개', num: '01' },
              { id: 'projects', label: '프로젝트', num: '02' },
              { id: 'skills', label: '핵심역량', num: '03' },
              { id: 'play-history', label: '플레이 이력', num: '04' }
            ].map(({ id, label, num }) => (
              <a 
                key={id}
                href={`#${id}`}
                onClick={(e) => handleLinkClick(e, id)}
                className={`relative px-5 py-3 rounded-full text-[15px] font-bold transition-all flex items-center gap-2.5 group overflow-hidden ${activeSection === id ? 'text-[#0047BB] bg-[#0047BB]/5 ' : 'text-zinc-500  hover:text-[#2C2C2C]  hover:bg-zinc-100 '}`}
              >
                <span className={`text-[12px] font-mono uppercase tracking-widest transition-colors duration-300 ${activeSection === id ? 'text-[#0047BB]/70' : 'text-zinc-400'}`}>{num}</span>
                <span className="tracking-wide">{label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 shrink-0">
            <div className="hidden xl:flex bg-zinc-100/80 p-1.5 rounded-full border border-black/5 shadow-inner">
              {[
                { key: 'resume', label: '이력서', icon: React.createElement(FileText, { className: "w-4 h-4" }) },
                { key: 'portfolio', label: '포트폴리오', icon: React.createElement(FolderOpen, { className: "w-4 h-4" }) },
                { key: 'game-history', label: '플레이 이력', icon: React.createElement(Gamepad2, { className: "w-4 h-4" }) },
              ].map(item => (
                <button key={item.key} onClick={() => { setView(item.key as any); window.scrollTo(0,0); }} 
                  className={`w-[125px] py-2.5 rounded-full text-[14px] font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${currentView === item.key ? 'bg-white text-[#0047BB] shadow-md' : 'text-zinc-500 hover:text-[#2C2C2C] hover:bg-white hover:shadow-sm'}`}>
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="hidden xl:block w-px h-8 bg-black/10 mx-1.5"></div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleAdminClick}
                className="w-12 h-12 rounded-full transition-all flex items-center justify-center hover:bg-zinc-100 text-zinc-500 hover:text-[#2C2C2C]"
                title="Admin Mode"
              >
                <Lock className={`w-[18px] h-[18px] ${isEditing ? 'text-[#0047BB]' : 'opacity-80'}`} />
              </button>
              
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 text-[#2C2C2C] ml-1">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-white/90 flex items-center justify-center pt-20 pb-10"
          >
            <div className="w-[90%] max-w-md bg-white border border-black/5 p-8 rounded-3xl shadow-2xl flex flex-col gap-8 max-h-[90vh] overflow-y-auto">
              
              <div className="bg-zinc-50 rounded-2xl p-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 mb-2">Documents</span>
                {[
                  { key: 'resume', label: '이력서 보기', icon: React.createElement(FileText, { className: "w-4 h-4" }) },
                  { key: 'portfolio', label: '포트폴리오 갤러리', icon: React.createElement(FolderOpen, { className: "w-4 h-4" }) },
                  { key: 'game-history', label: '플레이 이력 보기', icon: React.createElement(Gamepad2, { className: "w-4 h-4" }) },
                ].map(item => (
                  <button key={item.key} onClick={() => { setView(item.key as any); setIsMenuOpen(false); window.scrollTo(0,0); }} 
                    className={`text-left font-bold text-[14px] flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${currentView === item.key ? 'bg-white text-[#0047BB] shadow-sm' : 'text-zinc-600 hover:bg-[#0047BB] hover:text-white hover:shadow-lg hover:-translate-y-1'}`}>
                    <span className="transition-transform group-hover:scale-110">{item.icon}</span> {item.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 px-4 mb-1">Navigation</span>
                {[
                  { id: 'about', label: '소개', num: '01' },
                  { id: 'projects', label: '프로젝트', num: '02' },
                  { id: 'skills', label: '핵심역량', num: '03' },
                  { id: 'contact', label: '문의하기', num: '04' }
                ].map(({ id, label, num }) => (
                  <a key={id} href={`#${id}`} onClick={(e) => handleLinkClick(e, id)}
                    className="group relative font-bold flex items-center gap-4 py-3 px-4 rounded-xl text-[#2C2C2C] hover:bg-zinc-50 transition-colors">
                    <span className="text-xs font-mono opacity-40 text-zinc-500 group-hover:text-[#0047BB] transition-colors">{num}</span>
                    <span className="text-base tracking-wide">{label}</span>
                  </a>
                ))}
              </div>
              
              <button onClick={() => setIsMenuOpen(false)} className="mt-auto w-full py-4 rounded-xl bg-zinc-100 text-zinc-600 font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
                닫기 <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isPasswordModalOpen && (
        <PasswordModal isOpen={isPasswordModalOpen} onConfirm={handlePasswordConfirm} onClose={() => setIsPasswordModalOpen(false)} />
      )}
    </>
  );
};
