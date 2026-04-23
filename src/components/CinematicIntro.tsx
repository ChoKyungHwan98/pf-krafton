import React, { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_GAMES } from '../data/games';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  // 연출에 사용할 무작위 게임 데이터 추출 (약 60개)
  const introItems = useMemo(() => {
    return [...ALL_GAMES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 60);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // 전체 연출 시간 (2.8초)
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-[#0A0A0A] overflow-hidden flex items-center justify-center pointer-events-none"
    >
      {/* 배경 노이즈 및 비네팅 */}
      <div className="absolute inset-0 z-50 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 z-40 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="relative w-full h-full flex justify-around items-center opacity-40">
        {[0, 1, 2, 3, 4].map((col) => (
          <div 
            key={col} 
            className="flex flex-col gap-4"
            style={{
              animation: `scroll-up ${1.5 + col * 0.2}s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards`,
              transform: 'translateY(100%)',
              filter: `blur(${col === 0 || col === 4 ? '4px' : '0px'})`
            }}
          >
            {[...introItems, ...introItems].map((game, idx) => (
              <div 
                key={`${col}-${idx}`}
                className="w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50 flex-shrink-0"
              >
                {game.image ? (
                  <img src={game.image} alt="" className="w-full h-full object-cover opacity-40" />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center p-4">
                    <span className="text-white/20 text-[10px] font-black text-center">{game.title}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 중앙 카운트다운 또는 메시지 */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute z-[100] flex flex-col items-center gap-4"
      >
        <div className="h-px w-24 bg-blue-500" />
        <h2 className="text-white font-display font-black text-4xl md:text-6xl tracking-[0.3em] uppercase drop-shadow-2xl">
          Gaming <span className="text-blue-500">DNA</span>
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 font-mono text-xs tracking-widest uppercase">Analyzing History</span>
          <div className="w-12 h-0.5 bg-zinc-800 overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-full h-full bg-blue-500"
            />
          </div>
          <span className="text-blue-500 font-mono text-xs font-bold">{ALL_GAMES.length}+</span>
        </div>
        <div className="h-px w-24 bg-blue-500" />
      </motion.div>

      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(100%); }
          70% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(-200%); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
};
