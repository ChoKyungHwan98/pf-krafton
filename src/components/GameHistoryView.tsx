import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { ALL_GAMES } from '../data/games';

interface GameHistoryViewProps {
  onBack: () => void;
  history?: any;
  setHistory?: any;
  isEditing?: boolean;
}

const GENRE_MAP: Record<string, string[]> = {
  '역할수행(RPG)': ['RPG'],
  '어드벤처': ['어드벤처', '노벨'],
  '퍼즐': ['퍼즐', '퀴즈', '캐주얼'],
  '액션': ['액션', '난투', '대전', '배틀로얄'],
  '전략': ['전략', 'AOS', 'RTS', 'CCG', 'TCG', '디펜스'],
  '시뮬레이션': ['시뮬레이션', '스포츠', '레이싱'],
  '슈팅': ['슈팅', 'FPS', 'TPS', '히어로슈터'],
  '리듬': ['리듬']
};

const CHART_DATA = [
  { label: '역할수행(RPG)', score: 98, angle: 0 },
  { label: '어드벤처', score: 88, angle: 45 },
  { label: '퍼즐', score: 82, angle: 90 },
  { label: '액션', score: 72, angle: 135 },
  { label: '전략', score: 65, angle: 180 },
  { label: '시뮬레이션', score: 85, angle: 225 },
  { label: '슈팅', score: 25, angle: 270 },
  { label: '리듬', score: 95, angle: 315 },
];

export const GameHistoryView = ({ onBack }: GameHistoryViewProps) => {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const pcConsoleGames = ALL_GAMES.filter(g => g.category === 'PC' || g.category === 'Console');
  const mobileGames = ALL_GAMES.filter(g => g.category === 'Mobile');

  const filteredGames = ALL_GAMES.filter(g => {
    let matchesSearch = true;
    if (searchQuery) {
      matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (g.company && g.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (g.genre && g.genre.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    let matchesGenre = true;
    if (activeGenre) {
      const keywords = GENRE_MAP[activeGenre] || [activeGenre];
      matchesGenre = keywords.some(kw => g.genre?.toLowerCase().includes(kw.toLowerCase()));
    }

    return matchesSearch && matchesGenre;
  });

  const getPt = (value: number, angleDeg: number, size: number) => {
    const cx = size / 2;
    const cy = size / 2;
    const r = (value / 100) * (size / 2 - 40); // 40px padding
    const param = (angleDeg - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(param)},${cy + r * Math.sin(param)}`;
  };

  const svgSize = 340;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const maxR = (svgSize / 2) - 40;

  const polygonPoints = CHART_DATA.map(d => getPt(d.score, d.angle, svgSize)).join(' ');
  const bgPolygons = [20, 40, 60, 80, 100].map(level => {
    return CHART_DATA.map(d => getPt(level, d.angle, svgSize)).join(' ');
  });

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-28 pb-32">

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Radar Chart Section */}
          <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <h3 className="font-bold text-lg text-zinc-500 tracking-tight self-start mb-6">장르별 숙련도 차트</h3>
            <div className="relative" style={{ width: svgSize, height: svgSize }}>
              <svg width={svgSize} height={svgSize} className="overflow-visible">
                {/* Background Web */}
                {bgPolygons.map((pts, i) => (
                  <polygon key={i} points={pts} fill="none" stroke="#E5E7EB" strokeWidth="1" />
                ))}
                
                {/* Axes */}
                {CHART_DATA.map((d, i) => (
                  <line key={i} x1={cx} y1={cy} x2={getPt(100, d.angle, svgSize).split(',')[0]} y2={getPt(100, d.angle, svgSize).split(',')[1]} 
                        stroke="#E5E7EB" strokeWidth="1" />
                ))}

                {/* Data Polygon */}
                <motion.polygon 
                  initial={{ strokeDasharray: "0, 2000" }}
                  animate={{ strokeDasharray: "2000, 0" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  points={polygonPoints} fill="rgba(0, 71, 187, 0.15)" stroke="#0047BB" strokeWidth="2.5" 
                />

                {/* Data Points */}
                {CHART_DATA.map((d, i) => {
                  const [px, py] = getPt(d.score, d.angle, svgSize).split(',');
                  return (
                    <circle key={i} cx={px} cy={py} r="4" fill="#0047BB" className="hover:r-6 hover:fill-white hover:stroke-[#0047BB] hover:stroke-2 transition-all cursor-pointer" />
                  );
                })}

                {/* Labels */}
                {CHART_DATA.map((d, i) => {
                  // Push labels slightly outwards
                  const [lx, ly] = getPt(115, d.angle, svgSize).split(',');
                  const isActive = activeGenre === d.label;
                  return (
                    <g key={i} 
                       onClick={() => setActiveGenre(isActive ? null : d.label)}
                       className="cursor-pointer group"
                       transform={`translate(${lx}, ${ly})`}>
                      <text x="0" y="0" 
                            textAnchor="middle" 
                            alignmentBaseline="middle" 
                            className={`font-bold transition-all text-[13px] tracking-tight ${isActive ? 'fill-[#0047BB] text-[15px]' : 'fill-zinc-400 group-hover:fill-zinc-700'}`}>
                        {d.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="text-xs text-zinc-400 mt-4 text-center font-medium">라벨을 클릭하면 해당 장르의 게임만 필터링됩니다.</p>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col gap-4">
            <div className="bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-lg text-zinc-500 tracking-tight mb-8">플레이 요약 통계</h3>
              <ul className="space-y-6">
                <li className="flex items-center justify-between border-b border-black/5 pb-4">
                  <span className="font-bold text-[#2C2C2C]">총 플레이</span>
                  <span className="font-black text-[#0047BB] text-xl">{ALL_GAMES.length}종 이상</span>
                </li>
                <li className="flex items-center justify-between border-b border-black/5 pb-4">
                  <span className="font-bold text-[#2C2C2C]">주력 플랫폼</span>
                  <span className="font-bold text-zinc-600 text-lg">PC / 콘솔</span>
                </li>
                <li className="flex items-center justify-between border-b border-black/5 pb-4">
                  <span className="font-bold text-[#2C2C2C]">최장 플레이</span>
                  <span className="font-bold text-zinc-600 text-lg">메이플스토리 (15년)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-bold text-[#2C2C2C]">전문 분야</span>
                  <span className="font-bold text-[#0047BB] text-lg bg-[#0047BB]/10 px-3 py-1 rounded-md">RPG / 리듬</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0047BB] text-white border border-[#0047BB] rounded-2xl p-6 shadow-sm">
                <span className="block font-bold text-blue-200 mb-2">PC/콘솔</span>
                <span className="text-3xl font-black">{pcConsoleGames.length}종</span>
              </div>
              <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
                <span className="block font-bold text-zinc-400 mb-2">모바일</span>
                <span className="text-3xl font-black text-[#2C2C2C]">{mobileGames.length}종</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
            게임 상세 플레이 이력 {activeGenre && <span className="text-[#0047BB] before:content-['|'] before:text-zinc-300 before:mr-3 before:font-light">{activeGenre} 검색 결과</span>}
          </h2>
          {activeGenre && (
            <button onClick={() => setActiveGenre(null)} className="text-sm font-bold text-zinc-400 hover:text-red-500 flex items-center gap-1 transition-colors">
              <Filter className="w-4 h-4" /> 필터 해제
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredGames.slice(0, 100).map((game) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={game.id} 
                className="bg-white border border-black/5 rounded-2xl p-5 hover:border-[#0047BB]/20 hover:shadow-lg transition-all group flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-[#0047BB] bg-[#0047BB]/10 px-2 py-0.5 rounded tracking-wide line-clamp-1 max-w-[70%]">
                      {game.genre}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400 border border-zinc-200 px-1.5 py-0.5 rounded">
                      {game.category === 'PC' || game.category === 'Console' ? 'PC/콘솔' : '모바일'}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#2C2C2C] text-lg leading-tight mb-3 group-hover:text-[#0047BB] transition-colors">{game.title}</h4>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-bold text-zinc-500 truncate max-w-[60%]">
                    {game.company}
                  </span>
                  {game.playTime && (
                    <span className="text-[11px] font-bold text-[#0047BB] truncate">
                      {game.playTime}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-zinc-400 bg-white rounded-3xl border border-black/5">
            <Search className="w-10 h-10 mb-4 opacity-20" />
            <p className="font-bold text-lg">해당 조건의 게임이 없습니다.</p>
          </div>
        )}
        
        {filteredGames.length > 100 && (
          <div className="py-8 text-center mt-4">
             <p className="text-zinc-400 font-bold text-sm tracking-tight">상위 100개의 결과만 표시됩니다.</p>
          </div>
        )}

      </div>
    </motion.section>
  );
};
