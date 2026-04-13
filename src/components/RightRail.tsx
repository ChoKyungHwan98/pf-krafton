import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface RightRailProps {
  view: string;
  onNavClick: (id: string) => void;
  activeSection: string;
}

export const RightRail = ({ view, onNavClick, activeSection }: RightRailProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sections = [
    { id: 'about', label: '01' },
    { id: 'projects', label: '02' },
    { id: 'skills', label: '03' },
    { id: 'play-history', label: '04' },
    { id: 'contact', label: '05' }
  ];

  useEffect(() => {
    const handleScroll = () => { setIsVisible(window.pageYOffset > 500); };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      {view === 'home' && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-6 print:hidden">
          <div className="w-px h-24 bg-zinc-200"></div>
          <div className="flex flex-col gap-5">
            {sections.map(section => {
              const isActive = activeSection === section.id;
              return (
                <button key={section.id} onClick={() => onNavClick(section.id)} className="group relative flex items-center justify-center w-6 h-6" aria-label={`Scroll to ${section.id}`}>
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#0047BB] scale-150' : 'bg-zinc-300 group-hover:bg-zinc-400'}`}></div>
                  <span className={`absolute right-8 text-[10px] font-mono tracking-widest transition-all duration-300 ${isActive ? 'text-[#0047BB] font-bold opacity-100 translate-x-0' : 'text-zinc-400 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                    {section.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="w-px h-24 bg-zinc-200"></div>
          <div className="absolute top-full mt-6">
            <AnimatePresence>
              {isVisible && (
                <motion.button initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  onClick={scrollToTop} className="group w-8 h-8 flex items-center justify-center border border-black/10 bg-white hover:bg-zinc-50 hover:border-[#0047BB] transition-all rounded-full shadow-sm" aria-label="Back to top">
                  <ArrowUp className="w-3 h-3 text-zinc-500 group-hover:text-[#0047BB] group-hover:-translate-y-0.5 transition-all" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl flex items-center justify-center text-[#2C2C2C] hover:bg-zinc-50 hover:border-[#0047BB] transition-all shadow-md ${view === 'home' ? 'xl:hidden' : ''} print:hidden`}>
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
