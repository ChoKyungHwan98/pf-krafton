import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Monitor, Smartphone, Plus, X, ArrowRight } from 'lucide-react';
import { EditableText } from './EditableText';
import type { GameHistory } from '../types';

interface PlayHistoryProps {
  isEditing: boolean;
  history: GameHistory;
  setHistory: (h: GameHistory) => void;
  onViewAll?: () => void;
}

export const PlayHistory = ({ isEditing, history, setHistory, onViewAll }: PlayHistoryProps) => {
  const allGames = [...(history.pc||[]), ...(history.mobile||[]), ...(history.console||[])];

  const renderDashboardRow = (title: string, icon: React.ReactNode, dataKey: keyof GameHistory) => {
    const items = history[dataKey] || [];
    return (
      <div className="flex flex-col bg-white border border-black/5 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 group/board min-h-[320px]">
        <div className="flex flex-col mb-4 pb-4 border-b border-black/5 group-hover/board:border-black/10 transition-colors">
          <div className="flex items-center gap-3 text-[#2C2C2C] mb-2">
             <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-[#2C2C2C] border border-black/5 group-hover/board:bg-[#0047BB] group-hover/board:text-white transition-colors duration-300 shadow-sm shrink-0">
               {icon}
             </div>
             <span className="font-display font-bold tracking-tight text-xl">{title}</span>
          </div>
          <div className="flex items-center justify-between">
             <span className="px-3 py-1 bg-zinc-100 rounded-lg font-mono text-xs font-bold text-[#0047BB]">{items.length} TITLES</span>
             {isEditing && (
              <button onClick={() => { const h = {...history}; h[dataKey].push({ id: Date.now().toString(), name: "새 항목", hours: 0 }); setHistory(h); }}
                className="w-8 h-8 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors rounded-full text-xs" title="항목 추가">
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-0 flex-1 mt-2">
          {items.slice(0, 3).map((game, idx) => (
            <div key={game.id} className="group relative flex items-center justify-between py-3 px-2 border-b border-black/5 hover:border-[#0047BB]/20 hover:bg-zinc-50 transition-colors h-[56px] flex-none">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 bottom-auto h-[60%] w-[3px] bg-[#0047BB] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r z-10 w-[3px]"></div>
              
              <div className="flex items-center gap-3 min-w-0 pr-4 pl-3 relative z-10">
                 <span className="text-[10px] font-bold text-[#0047BB]/60 group-hover:text-[#0047BB] uppercase tracking-widest shrink-0 truncate w-16">{game.genre}</span>
                 <h4 className="font-bold text-sm text-[#2C2C2C] truncate">
                   <EditableText value={game.title || ""} onSave={(v) => { const h = {...history}; h[dataKey][idx].title = v; setHistory(h); }} isEditing={isEditing} />
                 </h4>
              </div>
              {game.playTime && (
                 <span className="font-mono text-[10px] text-zinc-400 group-hover:text-zinc-600 font-bold shrink-0 relative z-10 pr-2">{game.playTime}</span>
              )}
               {isEditing && (
                  <button onClick={() => { const h = {...history}; h[dataKey].splice(idx, 1); setHistory(h); }} className="text-zinc-300 hover:text-red-500 transition-colors p-1 relative z-20">
                    <X className="w-3 h-3" />
                  </button>
                )}
            </div>
          ))}
          {items.length > 3 && !isEditing && (
            <div className="text-center pt-2 mt-auto">
              <span className="text-[10px] font-bold text-zinc-300 tracking-[0.2em] uppercase">+ {items.length - 3} TITLES HIDDEN</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="play-history" className="py-[120px] lg:py-[160px] px-6 md:px-12 relative min-h-screen flex flex-col justify-center bg-[#FFFFFF] overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full">
        <div className="mb-8 grid lg:grid-cols-2 gap-6 items-end border-b border-black/5 pb-6">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">04. 플레이 이력</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col gap-1 items-start mt-2">
              <span className="text-xl md:text-2xl text-zinc-400 font-display font-medium tracking-tight">방대한 플레이 경험이 만든</span>
              <span className="text-5xl md:text-6xl lg:text-[5rem] font-display font-black tracking-tighter text-[#2C2C2C] leading-none">인사이트</span>
            </motion.h2>
          </div>
          <p className="text-zinc-500 text-sm leading-[1.6] lg:text-right font-medium">플랫폼과 장르를 넘나드는 심층 분석 데이터베이스입니다.</p>
        </div>

        <div className="bg-[#0047BB] text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 w-full border border-black/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] object-cover bg-repeat bg-[size:100px_100px]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="flex items-center gap-4 bg-white/10 px-6 py-4 rounded-2xl backdrop-blur-md w-full md:w-auto justify-center">
               <Gamepad2 className="w-6 h-6 text-white/90" />
               <div className="text-left">
                  <span className="block text-[10px] font-bold text-white/70 uppercase tracking-widest leading-none mb-1">Total Analyzed</span>
                  <span className="text-3xl font-display font-bold text-white tracking-tight leading-none">{allGames.length}</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 max-w-md text-white/80 font-medium text-[14px] leading-relaxed hidden lg:block text-center md:text-left relative z-10 mx-auto">
             다양한 플랫폼 및 장르 분석을 통해 트렌디한 감각과 심층적인 수준의 역량을 증명합니다.
          </div>

          {!isEditing && onViewAll && (
            <button onClick={onViewAll}
              className="w-full md:w-auto py-4 px-8 bg-white text-[#0047BB] rounded-xl font-bold tracking-widest text-sm uppercase hover:bg-zinc-100 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3 shrink-0 relative z-10 hover:-translate-y-0.5">
              전체 목록 보기 <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 shrink-0">
          {renderDashboardRow("PC / Mainline", React.createElement(Monitor, { className: "w-6 h-6" }), "pc")}
          {renderDashboardRow("Console", React.createElement(Gamepad2, { className: "w-6 h-6" }), "console")}
          {renderDashboardRow("Mobile", React.createElement(Smartphone, { className: "w-6 h-6" }), "mobile")}
        </div>
      </div>
    </section>
  );
};
