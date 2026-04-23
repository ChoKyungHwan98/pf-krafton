import React, { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ALL_GAMES } from '../data/games';

interface CinematicIntroProps {
  onComplete: () => void;
}

const TOTAL_DURATION = 4200;
const COLS = 4;
const CARD_HEIGHT = 120;
const CARD_GAP = 8;
const COL_SPEEDS = [3.6, 4.4, 3.0, 4.0];

const getFallbackGradient = (genre: string) => {
  const g = genre.toLowerCase();
  if (g.includes('rpg')) return 'from-blue-600/40 to-indigo-900/80';
  if (g.includes('액션') || g.includes('난투')) return 'from-red-600/40 to-rose-900/80';
  if (g.includes('전략') || g.includes('aos') || g.includes('rts')) return 'from-emerald-600/40 to-teal-900/80';
  if (g.includes('슈팅') || g.includes('fps')) return 'from-zinc-600/40 to-slate-900/80';
  if (g.includes('리듬')) return 'from-purple-600/40 to-fuchsia-900/80';
  if (g.includes('퍼즐') || g.includes('캐주얼')) return 'from-amber-500/40 to-orange-800/80';
  return 'from-zinc-400/40 to-zinc-800/80';
};

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const columns = useMemo(() => {
    const shuffled = [...ALL_GAMES].sort(() => Math.random() - 0.5);
    return Array.from({ length: COLS }, (_, i) =>
      shuffled.filter((_, idx) => idx % COLS === i)
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[2000] overflow-hidden pointer-events-none"
      style={{
        backgroundColor: '#FDFCF8',
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }}
    >
      {/* 게임 카드 컬럼들 */}
      <div className="absolute inset-0 flex gap-3 px-3">
        {columns.map((games, ci) => (
          <div key={ci} className="flex-1 overflow-hidden">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${CARD_GAP}px`,
                animation: `scrollUp ${COL_SPEEDS[ci]}s linear forwards`,
                willChange: 'transform',
                opacity: ci === 0 || ci === COLS - 1 ? 0.55 : 1,
              }}
            >
              {games.map((game, idx) => (
                <div
                  key={idx}
                  style={{ height: CARD_HEIGHT, flexShrink: 0 }}
                  className={`relative rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-zinc-900 ${!game.image ? `bg-gradient-to-br ${getFallbackGradient(game.genre)}` : ''}`}
                >
                  {game.image && (
                    <div className="absolute inset-0 bg-zinc-900">
                      <img src={game.image} alt="" className="w-full h-full object-cover opacity-60" loading="lazy" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="relative h-full z-10 p-3 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-black text-white bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded tracking-widest uppercase">{game.genre}</span>
                      <span className="text-[8px] font-bold text-white/50 border border-white/20 px-1 py-0.5 rounded uppercase">
                        {game.category === 'Pc' || game.category === 'PC' || game.category === 'Console' ? 'PC/CON' : 'MOB'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm leading-tight line-clamp-1">{game.title}</h4>
                      <p className="text-[9px] font-bold text-white/50 mt-0.5 truncate">{game.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 상단/하단 페이드 - 페이지와 동일한 크림색 */}
      <div className="absolute inset-x-0 top-0 h-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #FDFCF8, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-40 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #FDFCF8, transparent)' }} />

      {/* Gaming DNA 텍스트 가독성을 위한 어두운 방사형 오버레이 */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 500px 260px at center, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.45) 55%, transparent 80%)' }}
      />

      {/* 중앙 Gaming DNA 텍스트 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center"
      >
        <div className="h-px w-24 bg-blue-500 mb-4" />
        <h2 className="text-white font-display font-black text-4xl md:text-6xl tracking-[0.3em] uppercase drop-shadow-2xl">
          Gaming <span className="text-blue-500">DNA</span>
        </h2>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-zinc-300 font-mono text-xs tracking-widest uppercase">
            Analyzing History
          </span>
          <div className="w-12 h-0.5 bg-zinc-600 overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-full h-full bg-blue-500"
            />
          </div>
          <span className="text-blue-500 font-mono text-xs font-bold">
            {ALL_GAMES.length}+
          </span>
        </div>
        <div className="h-px w-24 bg-blue-500 mt-4" />
      </motion.div>

      <style>{`
        @keyframes scrollUp {
          from { transform: translateY(100vh); }
          to   { transform: translateY(-100%); }
        }
      `}</style>
    </motion.div>
  );
};
