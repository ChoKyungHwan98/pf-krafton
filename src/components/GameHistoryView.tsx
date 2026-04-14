import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Monitor, Smartphone, Gamepad2 } from 'lucide-react';
import { ALL_GAMES } from '../data/games';
import type { GameHistory } from '../types';

interface GameHistoryViewProps {
  onBack: () => void;
  // Included props to avoid breaking App.tsx injection
  history?: GameHistory;
  setHistory?: (h: GameHistory) => void;
  isEditing?: boolean;
}

export const GameHistoryView = ({ onBack }: GameHistoryViewProps) => {
  const [activeTab, setActiveTab] = useState<'PC' | 'Mobile' | 'Console'>('PC');
  
  const currentTabGames = ALL_GAMES.filter(g => g.category === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.02 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const chipVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="pt-[160px] pb-[120px] px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors mb-6 group font-sans tracking-tight text-sm uppercase font-bold">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 대시보드로 돌아가기
          </button>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter text-[#2C2C2C] leading-tight">
             플레이 이력
          </h2>
          <p className="mt-4 text-zinc-400 text-sm font-medium max-w-xl">
            아래 리스트는 플레이한 게임의 일부이며, 실제 플레이 이력은 {ALL_GAMES.length}종 이상입니다.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white border border-black/5 p-4 rounded-2xl shadow-sm md:ml-auto">
          <div className="text-center px-4 border-r border-black/5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Analzyed</span>
            <span className="text-2xl font-display font-bold text-[#0047BB]">{ALL_GAMES.length}</span>
          </div>
          <div className="text-center px-4 border-r border-black/5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">PC/Console</span>
            <span className="text-2xl font-display font-bold text-[#2C2C2C]">
              {ALL_GAMES.filter(g => g.category === 'PC' || g.category === 'Console').length}
            </span>
          </div>
          <div className="text-center px-4">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Mobile</span>
            <span className="text-2xl font-display font-bold text-[#2C2C2C]">
               {ALL_GAMES.filter(g => g.category === 'Mobile').length}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-zinc-50 border border-black/5 rounded-3xl p-6 md:p-10 shadow-inner min-h-[600px]">
        
        <div className="flex flex-wrap gap-4 mb-10 pb-6 border-b border-black/5 justify-center md:justify-start sticky top-[100px] z-20 bg-zinc-50/90 backdrop-blur-md pt-2">
          {[{id: 'PC', label: 'PC / Mainline', icon: Monitor},
            {id: 'Console', label: 'Console / Others', icon: Gamepad2},
            {id: 'Mobile', label: 'Mobile', icon: Smartphone}].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as 'PC'|'Console'|'Mobile')}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-base tracking-tight transition-all duration-300 \${activeTab === tab.id ? 'bg-[#0047BB] text-white shadow-xl shadow-[#0047BB]/20 -translate-y-1' : 'bg-white text-zinc-500 border border-black/5 hover:border-black/10 hover:bg-zinc-100 hover:-translate-y-0.5'}`}>
              <tab.icon className={`w-5 h-5 \${activeTab === tab.id ? 'text-white' : 'text-zinc-400'}`} />
              {tab.label}
              <span className={`ml-3 px-3 py-1 rounded-full text-[11px] \${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-zinc-100 text-[#0047BB]'}`}>
                 {ALL_GAMES.filter(g => g.category === tab.id).length}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div variants={containerVariants} initial="hidden" animate="show" exit="exit" key={activeTab}
            className="flex flex-wrap gap-3 md:gap-4 content-start">
            {currentTabGames.map((game, i) => (
              <motion.div key={game.id + '-' + i} variants={chipVariants}
                className="flex flex-col group relative bg-white border border-black/5 px-5 py-4 rounded-xl shadow-sm hover:shadow-lg hover:border-[#0047BB]/30 transition-all duration-300">
                 <span className="text-[10px] font-bold text-[#0047BB] uppercase tracking-widest mb-1.5">{game.genre}</span>
                 <div className="flex items-center gap-3">
                    <span className="font-bold text-[#2C2C2C] text-base group-hover:text-[#0047BB] transition-colors">{game.title}</span>
                    {game.company && <span className="text-[11px] text-zinc-400 font-medium px-2 py-1 bg-zinc-50 rounded border border-black/5">{game.company}</span>}
                 </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
      </div>
    </motion.section>
  );
};
