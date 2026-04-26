import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Crown, Star, Trophy, CheckCircle2 } from 'lucide-react';
import { ALL_GAMES } from '../data/games';

interface CinematicIntroProps {
  onComplete: () => void;
}

const GENRE_MAP: Record<string, string[]> = {
  'RPG': ['RPG'],
  '어드벤처': ['어드벤처', '노벨', '공포', '로그라이크', '메트로배니아', '비주얼 노벨'],
  '퍼즐': ['퍼즐', '퀴즈', '캐주얼'],
  '액션': ['액션', '난투', '대전', '배틀로얄', '격투', '런앤건', '플랫폼', '런게임', '생존'],
  '전략': ['전략', 'AOS', 'RTS', 'CCG', 'TCG', '디펜스'],
  '시뮬레이션': ['시뮬레이션', '스포츠', '레이싱', '경영', 'AR', '수면', '보드게임', '소셜'],
  '슈팅': ['슈팅', 'FPS', 'TPS', '히어로슈터'],
  '리듬': ['리듬']
};

const CHART_DATA = [
  { label: 'RPG', score: 99, angle: 0 },
  { label: '어드벤처', score: 92, angle: 45 },
  { label: '퍼즐', score: 88, angle: 90 },
  { label: '액션', score: 85, angle: 135 },
  { label: '전략', score: 82, angle: 180 },
  { label: '시뮬레이션', score: 87, angle: 225 },
  { label: '슈팅', score: 45, angle: 270 },
  { label: '리듬', score: 98, angle: 315 },
];

const getScore = (g: any) => {
  let score = 0;
  
  // 1. 최애 (Favorite)
  if (g.isFavorite) score += 1000000000;
  if (g.yearsPlayed) score += g.yearsPlayed * 1000000;
  
  // 2. 특별 (Special Features)
  if (g.flag && !g.flag.includes('시간') && !g.flag.includes('년')) {
    score += 10000000;
  }

  // 3. 업적 (Perfect Cleared)
  if (g.isPerfectCleared) score += 1000000;

  // 4. 플레이타임 (Playtime Descending)
  let hours = 0;
  if (g.flag && g.flag.includes('시간')) {
    const match = g.flag.match(/\d+/);
    if (match) hours = parseInt(match[0], 10);
  }
  score += hours * 10;
  
  // 5. 클리어 (Cleared)
  if (g.isCleared) score += 1;
  
  return score;
};

const sortedGames = [...ALL_GAMES].sort((a, b) => getScore(b) - getScore(a));

const getFallbackGradient = (genre: string) => {
  const g = genre.toLowerCase();
  if (g.includes('rpg')) return 'from-blue-600/40 to-indigo-900/80';
  if (g.includes('액션') || g.includes('난투')) return 'from-red-600/40 to-rose-900/80';
  if (g.includes('전략') || g.includes('aos') || g.includes('rts')) return 'from-emerald-600/40 to-teal-900/80';
  if (g.includes('슈팅') || g.includes('fps')) return 'from-zinc-600/40 to-slate-900/80';
  if (g.includes('리듬')) return 'from-purple-600/40 to-fuchsia-900/80';
  if (g.includes('퍼즐') || g.includes('캐주얼')) return 'from-amber-500/40 to-orange-800/80';
  if (g.includes('레이싱') || g.includes('스포츠')) return 'from-cyan-600/40 to-blue-800/80';
  return 'from-zinc-400/40 to-zinc-800/80';
};

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

  const pcConsoleGames = ALL_GAMES.filter(g => g.category === 'Pc' || g.category === 'PC' || g.category === 'Console');
  const mobileGames = ALL_GAMES.filter(g => g.category === 'Mobile');
  
  const highlightTitles = ["메이플스토리", "DARK SOULS™ III", "무기미도", "osu!"];
  const highlightGames = highlightTitles.map(t => ALL_GAMES.find(g => g.title === t)).filter(Boolean);

  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();
    const preventKey = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };
    
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKey as EventListener, { passive: false });

    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKey as EventListener);
    };
  }, []);

  const dur = Math.max(1.2, (contentHeight - vh) / 5000);

  const svgSize = 420;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const getPt = (value: number, angleDeg: number, size: number) => {
    const r = (value / 100) * (size / 2 - 40);
    const param = (angleDeg - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(param)},${cy + r * Math.sin(param)}`;
  };
  const polygonPoints = CHART_DATA.map(d => getPt(d.score, d.angle, svgSize)).join(' ');
  const bgPolygons = [20, 40, 60, 80, 100].map(level => {
    return CHART_DATA.map(d => getPt(level, d.angle, svgSize)).join(' ');
  });

  const renderContent = () => (
    <motion.section className="min-h-screen bg-transparent pt-28 pb-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-24 lg:mb-32">
          {/* Radar Chart Section */}
          <div className="bg-white border border-black/5 rounded-4xl p-10 md:p-12 shadow-sm flex flex-col items-center justify-center min-h-[480px]">
            <h3 className="font-bold text-xl text-zinc-500 tracking-tight self-start mb-8">장르별 숙련도 차트</h3>
            <div className="relative" style={{ width: svgSize, height: svgSize }}>
              <svg width={svgSize} height={svgSize} className="overflow-visible block mx-auto">
                {bgPolygons.map((pts, i) => (
                  <polygon key={i} points={pts} fill="none" stroke="#E5E7EB" strokeWidth="1" />
                ))}
                {CHART_DATA.map((d, i) => (
                  <line key={i} x1={cx} y1={cy} x2={getPt(100, d.angle, svgSize).split(',')[0]} y2={getPt(100, d.angle, svgSize).split(',')[1]} stroke="#E5E7EB" strokeWidth="1" />
                ))}
                <polygon points={polygonPoints} fill="rgba(0, 71, 187, 0.15)" stroke="#0047BB" strokeWidth="2.5" />
                {CHART_DATA.map((d, i) => {
                  const [px, py] = getPt(d.score, d.angle, svgSize).split(',');
                  return (
                    <circle key={`pt-${i}`} cx={px} cy={py} r="4" fill="#0047BB" stroke="#0047BB" strokeWidth="0" />
                  );
                })}
                {CHART_DATA.map((d, i) => {
                  const [lx, ly] = getPt(115, d.angle, svgSize).split(',');
                  return (
                    <g key={i} transform={`translate(${lx}, ${ly})`}>
                      <text x="0" y="0" textAnchor="middle" alignmentBaseline="middle" className="font-bold text-[13px] tracking-tight fill-zinc-400">{d.label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Stats Section - 최애 게임 중심 */}
          <div className="flex flex-col gap-6">
            {/* 전문 분야 Box */}
            <div className="bg-linear-to-r from-[#0047BB]/10 to-transparent border border-[#0047BB]/20 rounded-3xl p-6 md:px-10 md:py-8 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <Star className="w-6 h-6 text-[#0047BB]" />
                <h3 className="font-bold text-lg text-[#0047BB] tracking-tight">핵심 전문 분야</h3>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-1.5 bg-white text-[#0047BB] shadow-sm rounded-full text-sm font-black tracking-widest border border-black/5">RPG</span>
                <span className="px-4 py-1.5 bg-white text-[#0047BB] shadow-sm rounded-full text-sm font-black tracking-widest border border-black/5">리듬</span>
              </div>
            </div>

            <div className="bg-white border border-black/5 rounded-4xl p-10 md:p-12 shadow-sm flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <Crown className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-xl text-zinc-500 tracking-tight">주요 플레이 이력</h3>
              </div>
              <ul className="space-y-5">
                {highlightGames.map((g: any, i: number) => (
                  <li key={g.id} className="flex items-center gap-4">
                    {/* 썸네일 */}
                    <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-md shadow-amber-400/10">
                      {g.image ? (
                        <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full bg-linear-to-br ${getFallbackGradient(g.genre)}`} />
                      )}
                      {i === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Crown className="w-5 h-5 text-amber-400" />
                        </div>
                      )}
                    </div>
                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-[#2C2C2C] text-base truncate">{g.title}</span>
                        <span className="text-[10px] text-zinc-400 font-bold shrink-0">{g.genre}</span>
                      </div>
                      {g.flag && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-black rounded-full tracking-tight">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {g.flag}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#0047BB] text-white border border-[#0047BB] rounded-3xl p-8 md:p-10 shadow-sm">
                <span className="block font-bold text-blue-200 text-lg mb-3">PC/콘솔</span>
                <span className="text-4xl md:text-5xl font-black">{pcConsoleGames.length}종</span>
              </div>
              <div className="bg-white border border-black/5 rounded-3xl p-8 md:p-10 shadow-sm">
                <span className="block font-bold text-zinc-400 text-lg mb-3">모바일</span>
                <span className="text-4xl md:text-5xl font-black text-[#2C2C2C]">{mobileGames.length}종</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-black/10 gap-4">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            게임 상세 플레이 이력
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8 opacity-60 pointer-events-none">
          <button className="px-4 py-2 rounded-full text-[13px] font-bold transition-all bg-[#0047BB] text-white shadow-md">전체</button>
          {Object.keys(GENRE_MAP).map(genre => (
            <button key={genre} className="px-4 py-2 rounded-full text-[13px] font-bold transition-all bg-zinc-100 text-zinc-500">{genre}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedGames.map((game) => (
            <div
              key={game.id}
              className={`relative h-[140px] rounded-2xl overflow-hidden shadow-sm ${
                game.isFavorite
                  ? 'border-2 border-amber-400/70 ring-2 ring-amber-400/20 shadow-amber-400/10'
                  : game.isPerfectCleared
                  ? 'border-2 border-fuchsia-400/70 ring-2 ring-fuchsia-400/20 shadow-fuchsia-400/10'
                  : game.isCleared
                  ? 'border-2 border-emerald-400/70 ring-2 ring-emerald-400/20 shadow-emerald-400/10'
                  : 'border border-black/5'
              }`}
            >
              <div className={`absolute inset-0 ${game.image ? 'bg-zinc-900' : `bg-linear-to-br ${getFallbackGradient(game.genre)}`}`}>
                {game.image && (
                  <img src={game.image} alt={game.title} crossOrigin="anonymous" className="w-full h-full object-cover opacity-60" style={{ objectPosition: game.position || 'center', objectFit: (game.size as any) || 'cover' }} />
                )}
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              {game.isFavorite && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-amber-400/0 via-amber-400 to-amber-400/0" />
              )}
              {game.isPerfectCleared && !game.isFavorite && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-fuchsia-400/0 via-fuchsia-400 to-fuchsia-400/0" />
              )}
              {game.isCleared && !game.isFavorite && !game.isPerfectCleared && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0" />
              )}

              <div className="relative h-full z-10 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-white bg-white/20 backdrop-blur-md px-2 py-0.5 rounded tracking-widest uppercase">{game.genre}</span>
                    {game.flag && !game.flag.includes('시간') && !game.flag.includes('년') && (
                      <span className="flex items-center justify-center bg-amber-500 text-white w-4 h-4 rounded-full shadow-md shadow-amber-500/30" title={game.flag}>
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </span>
                    )}
                  </div>
                    <div className="flex items-center gap-1.5">
                      {game.isFavorite && (
                        <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-400/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span className="text-[9px] font-bold text-amber-300">최애 게임</span>
                        </div>
                      )}
                      {game.isPerfectCleared && !game.isFavorite && (
                        <div className="flex items-center gap-1 bg-fuchsia-500/20 border border-fuchsia-400/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          <Trophy className="w-3 h-3 text-fuchsia-400" />
                          <span className="text-[9px] font-bold text-fuchsia-300">100% 완료</span>
                        </div>
                      )}
                      {game.isCleared && !game.isFavorite && !game.isPerfectCleared && (
                        <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-[9px] font-bold text-emerald-300">클리어</span>
                        </div>
                      )}
                      <span className="text-[9px] font-bold text-white/50 border border-white/20 px-1.5 py-0.5 rounded uppercase">
                        {game.category === 'Pc' || game.category === 'PC' || game.category === 'Console' ? 'PC/CON' : 'MOBILE'}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-base md:text-lg leading-tight mb-1 drop-shadow-sm line-clamp-2">{game.title}</h4>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-[10px] font-bold text-white/60 truncate max-w-[55%]">{game.company}</span>
                  {game.flag ? (
                    <span className="flex items-center gap-1 text-[10px] font-black text-amber-300 drop-shadow-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                      {game.flag}
                    </span>
                  ) : game.playTime ? (
                    <span className="text-[10px] font-black text-yellow-400 drop-shadow-md">{game.playTime}</span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-full min-h-screen z-[2000] overflow-hidden bg-bg-main bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-blend-multiply"
    >
      {contentHeight === 0 && (
        <div ref={contentRef} style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden', width: '100%' }}>
          {renderContent()}
        </div>
      )}

      <AnimatePresence>
        {contentHeight > 0 && (
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', willChange: 'transform' }}
            initial={{ y: -contentHeight + vh }}
            animate={{ y: 0 }}
            transition={{ duration: dur, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 300);
            }}
          >
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
