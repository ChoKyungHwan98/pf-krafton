import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Monitor, Smartphone, Gamepad2 } from 'lucide-react';
import { ALL_GAMES } from '../data/games';
import { EditableText } from './EditableText';
import type { GameHistory } from '../types';

interface GameHistoryViewProps {
  onBack: () => void;
  history: GameHistory;
  setHistory: (h: GameHistory) => void;
  isEditing: boolean;
}

export const GameHistoryView = ({ onBack, history, setHistory, isEditing }: GameHistoryViewProps) => {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="pt-[160px] pb-[120px] px-6 md:px-12 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors mb-6 group font-sans tracking-tight text-sm uppercase font-bold">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Home
          </button>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest font-bold">DOC. 04</span>
            <div className="w-12 h-px bg-zinc-300"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter text-[#2C2C2C] leading-tight">
             All Play History
          </h2>
          <p className="mt-4 text-zinc-500 text-lg font-medium max-w-xl">
            플레이 경험과 데이터 분석을 기반으로 최신 트렌드를 파악하고 시스템 기획의 영감을 얻는 레퍼런스 목록입니다.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white border border-black/5 p-4 rounded-2xl shadow-sm md:ml-auto">
          <div className="text-center px-4 border-r border-black/5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total</span>
            <span className="text-2xl font-display font-bold text-[#0047BB]">{ALL_GAMES.length}</span>
          </div>
          <div className="text-center px-4 border-r border-black/5">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">PC/Console</span>
            <span className="text-2xl font-display font-bold text-[#2C2C2C]">
              {ALL_GAMES.filter(g => g.platform === 'Steam' || g.platform?.includes('온라인') || g.platform === '패키지').length}
            </span>
          </div>
          <div className="text-center px-4">
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Mobile</span>
            <span className="text-2xl font-display font-bold text-[#2C2C2C]">
               {ALL_GAMES.filter(g => g.platform === '모바일').length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'PC & Online', icon: <Monitor className="w-5 h-5 text-[#0047BB]" />, items: ALL_GAMES.filter(g => g.platform === 'Steam' || g.platform?.includes('온라인')) },
          { title: 'Mobile', icon: <Smartphone className="w-5 h-5 text-[#0047BB]" />, items: ALL_GAMES.filter(g => g.platform === '모바일') },
          { title: 'Console & Package', icon: <Gamepad2 className="w-5 h-5 text-[#0047BB]" />, items: ALL_GAMES.filter(g => g.platform === '패키지' || (!g.platform?.includes('온라인') && g.platform !== '모바일' && g.platform !== 'Steam')) }
        ].map((section, sIdx) => (
          <div key={sIdx} className="bg-white border border-black/5 rounded-3xl p-6 lg:p-8 shadow-sm h-fit">
            <div className="flex flex-col mb-6 pb-4 border-b border-black/5">
              <div className="flex items-center gap-3 text-[#2C2C2C] mb-2">
                 <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-black/5 shadow-sm text-[#0047BB] shrink-0">
                   {section.icon}
                 </div>
                 <span className="font-display font-bold tracking-tight text-xl">{section.title}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                 <span className="px-3 py-1 bg-zinc-100 rounded-lg font-mono text-xs font-bold text-[#0047BB]">{section.items.length} TITLES</span>
              </div>
            </div>

            <div className="space-y-1 mt-4 h-[500px] overflow-y-auto pr-2 styled-scrollbar">
               {section.items.map((game, idx) => (
                 <div key={idx} className="group relative flex flex-col p-3 border-b border-black/5 hover:border-[#0047BB]/20 hover:bg-zinc-50 transition-colors rounded-lg">
                   <div className="flex items-start justify-between min-w-0 pr-2">
                     <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-white bg-zinc-600 px-2 py-0.5 rounded uppercase tracking-widest shrink-0">{game.genre}</span>
                     </div>
                     {game.hours ? (
                       <span className="font-mono text-[11px] text-[#0047BB] font-bold shrink-0">{game.hours}h+</span>
                     ) : (
                       <span className="font-mono text-[11px] text-zinc-400 font-bold shrink-0">{game.playTime}</span>
                     )}
                   </div>
                   <div className="mt-2">
                     <h4 className="font-bold text-sm text-[#2C2C2C]">
                       {game.title}
                     </h4>
                     {game.brand && (
                       <span className="text-[11px] text-zinc-500 font-medium block mt-1">{game.brand}</span>
                     )}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
