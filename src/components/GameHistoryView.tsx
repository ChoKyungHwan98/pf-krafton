import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Monitor, Smartphone, Gamepad2, Search, BarChart3, Target, LayoutGrid } from 'lucide-react';
import { ALL_GAMES } from '../data/games';
import { GenreRadarChart } from './GenreRadarChart';

interface GameHistoryViewProps {
  onBack: () => void;
}

const CORE_GENRES = [
  { id: 'RPG', label: '역할수행게임', score: 98, color: '#0047BB' },
  { id: 'Rhythm', label: '리듬', score: 95, color: '#8B5CF6' },
  { id: 'Adventure', label: '어드벤처', score: 88, color: '#10B981' },
  { id: 'Puzzle', label: '퍼즐', score: 82, color: '#F59E0B' },
  { id: 'Action', label: '액션', score: 72, color: '#EF4444' },
  { id: 'Strategy', label: '전략', score: 65, color: '#6366F1' },
  { id: 'Simulation', label: '시뮬레이션', score: 45, color: '#EC4899' },
  { id: 'Shooting', label: '슈팅', score: 25, color: '#6B7280' },
];

export const GameHistoryView = ({ onBack }: GameHistoryViewProps) => {
  const [activeTab, setActiveTab] = useState<'전체' | 'PC' | '모바일' | '콘솔'>('전체');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 장르 매핑 로직
  const mapToCoreGenre = (gameGenre: string): string => {
    const genre = gameGenre.toLowerCase();
    if (genre.includes('rpg') || genre.includes('역할수행')) return '역할수행게임';
    if (genre.includes('리듬')) return '리듬';
    if (genre.includes('어드벤처')) return '어드벤처';
    if (genre.includes('퍼즐')) return '퍼즐';
    if (genre.includes('액션') || genre.includes('난투') || genre.includes('플랫폼')) return '액션';
    if (genre.includes('전략') || genre.includes('srpg') || genre.includes('rts') || genre.includes('ccg') || genre.includes('보드')) return '전략';
    if (genre.includes('시뮬레이션') || genre.includes('육성') || genre.includes('건설')) return '시뮬레이션';
    if (genre.includes('슈팅') || genre.includes('fps') || genre.includes('tps') || genre.includes('히어로슈터')) return '슈팅';
    return '기타';
  };

  const filteredGames = useMemo(() => {
    return ALL_GAMES.filter(g => {
      const categoryMap: Record<string, string> = { 'PC': 'PC', 'Mobile': '모바일', 'Console': '콘솔' };
      const matchesTab = activeTab === '전체' || categoryMap[g.category] === activeTab;
      
      const mappedGenre = mapToCoreGenre(g.genre);
      const matchesGenre = !selectedGenre || mappedGenre === selectedGenre;
      
      const matchesSearch = searchQuery === '' || 
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (g.company && g.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        g.genre.toLowerCase().includes(searchQuery.toLowerCase());
        
      return matchesTab && matchesGenre && matchesSearch;
    });
  }, [activeTab, selectedGenre, searchQuery]);

  const stats = {
    total: ALL_GAMES.length,
    pc: ALL_GAMES.filter(g => g.category === 'PC').length,
    console: ALL_GAMES.filter(g => g.category === 'Console').length,
    mobile: ALL_GAMES.filter(g => g.category === 'Mobile').length,
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pt-32 pb-[120px] px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      
      {/* 뒤로가기 바 */}
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 md:py-6 border-y border-black/5 mb-12 -mx-6 px-6 md:-mx-12 md:px-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-[190px] h-[46px] flex items-center justify-center gap-3 bg-zinc-100/80 hover:bg-white hover:shadow-md border border-black/5 rounded-full text-zinc-500 hover:text-[#0047BB] transition-all duration-300 group font-sans tracking-tight text-sm font-bold"
          >
            <motion.div whileHover={{ x: -4 }} className="flex items-center">
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span>메인으로 돌아가기</span>
          </button>
          <div className="hidden sm:flex items-center gap-3 w-[110px]">
            <div className="w-px h-4 bg-black/10 shrink-0"></div>
            <span className="text-[11px] font-black tracking-widest text-zinc-300 uppercase truncate">플레이 통계</span>
          </div>
        </div>
      </div>

      {/* 헤더 섹션 */}
      <div className="mb-16">
        <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter text-[#2C2C2C] leading-tight mb-4">
          플레이 이력 및 장르별 숙련도
        </h2>
        <p className="text-zinc-400 text-sm font-medium">
          기획자로서 쌓아온 방대한 게임 경험을 데이터로 시각화하였습니다. (총 {stats.total}종 이상의 라이브러리 보유)
        </p>
      </div>

      {/* 대시보드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* 왼쪽: 레이더 차트 */}
        <div className="lg:col-span-7 bg-white border border-black/5 rounded-[32px] p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-8 left-8">
            <h3 className="text-lg font-bold text-[#2C2C2C] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0047BB]" />
              장르별 숙련도 DNA
            </h3>
            <p className="text-xs text-zinc-400 mt-1">각 축을 클릭하여 해당 장르의 게임을 필터링하세요.</p>
          </div>
          <div className="py-10">
            <GenreRadarChart data={CORE_GENRES.map(g => ({ genre: g.label, score: g.score }))} />
          </div>
          {selectedGenre && (
            <button 
              onClick={() => setSelectedGenre(null)}
              className="absolute bottom-8 right-8 text-[11px] font-bold text-[#0047BB] bg-[#0047BB]/5 px-4 py-2 rounded-full hover:bg-[#0047BB]/10 transition-colors"
            >
              필터 초기화
            </button>
          )}
        </div>

        {/* 오른쪽: 핵심 인사이트 및 플랫폼 통계 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#0047BB] rounded-[32px] p-8 text-white shadow-xl shadow-[#0047BB]/20 h-full flex flex-col justify-between">
             <div>
               <div className="flex items-center gap-2 mb-6">
                 <Target className="w-5 h-5 text-white/60" />
                 <span className="text-xs font-bold tracking-widest text-white/60">핵심 분석 역량</span>
               </div>
               <div className="space-y-4">
                 <div className="flex items-center justify-between group cursor-pointer" onClick={() => setSelectedGenre('역할수행게임')}>
                   <span className="text-sm font-bold text-white/80">역할수행게임 (RPG)</span>
                   <span className="text-xl font-display font-black">98%</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '98%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-white" />
                 </div>
                 
                 <div className="flex items-center justify-between group cursor-pointer" onClick={() => setSelectedGenre('리듬')}>
                   <span className="text-sm font-bold text-white/80">리듬 게임</span>
                   <span className="text-xl font-display font-black">95%</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-white" />
                 </div>

                 <div className="flex items-center justify-between group cursor-pointer" onClick={() => setSelectedGenre('어드벤처')}>
                   <span className="text-sm font-bold text-white/80">어드벤처</span>
                   <span className="text-xl font-display font-black">88%</span>
                 </div>
                 <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-white" />
                 </div>
               </div>
             </div>
             
             <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[13px] text-white/70 leading-relaxed font-medium">
                  "단순한 플레이를 넘어 시스템의 구조와 재미의 본질을 파악합니다. 특히 RPG와 리듬 게임에서 독보적인 기획 인사이트를 보유하고 있습니다."
                </p>
             </div>
          </div>
          
          <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
               <LayoutGrid className="w-5 h-5 text-zinc-400" />
               <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">분석 플랫폼 비중</span>
             </div>
             <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="block text-2xl font-display font-black text-[#2C2C2C]">{stats.pc + stats.console}</span>
                  <span className="text-[10px] font-bold text-zinc-400">PC/콘솔</span>
                </div>
                <div className="text-center border-x border-black/5">
                  <span className="block text-2xl font-display font-black text-[#2C2C2C]">{stats.mobile}</span>
                  <span className="text-[10px] font-bold text-zinc-400">모바일</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-display font-black text-[#0047BB]">{stats.total}</span>
                  <span className="text-[10px] font-bold text-zinc-400">전체</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 리스트 컨트롤 및 검색 */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-6 mb-10 pb-6 border-b border-black/5 sticky top-[100px] z-20 bg-zinc-50/90 backdrop-blur-md pt-2">
        <div className="flex flex-wrap gap-2">
          {['전체', 'PC', '모바일', '콘솔'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab as any); setSearchQuery(''); setSelectedGenre(null); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-zinc-500 border border-black/5 hover:bg-zinc-100'}`}>
              {tab === 'PC' && <Monitor className="w-3.5 h-3.5" />}
              {tab === '모바일' && <Smartphone className="w-3.5 h-3.5" />}
              {tab === '콘솔' && <Gamepad2 className="w-3.5 h-3.5" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md xl:ml-auto group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-[#0047BB] transition-colors" />
           <input 
             type="text" 
             placeholder="게임 제목, 장르, 제작사 검색..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-white border border-black/5 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium focus:border-[#0047BB]/30 transition-all placeholder:text-zinc-300"
           />
        </div>
      </div>

      {/* 검색 결과 및 리스트 */}
      {selectedGenre && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-xs font-bold text-[#0047BB] bg-[#0047BB]/5 px-3 py-1.5 rounded-lg border border-[#0047BB]/10">
            {selectedGenre} 숙련도 기반 필터링 적용 중
          </span>
          <button onClick={() => setSelectedGenre(null)} className="text-[10px] font-bold text-zinc-400 hover:text-red-500 underline">필터 해제</button>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGames.map((game, i) => (
            <motion.div 
              key={game.id + '-' + i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-black/5 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all h-[100px] flex flex-col justify-between group overflow-hidden relative"
            >
              <div>
                <span className="text-[9px] font-black text-[#0047BB]/50 uppercase tracking-widest block mb-1">{game.genre}</span>
                <h4 className="font-bold text-[#2C2C2C] text-sm group-hover:text-[#0047BB] transition-colors line-clamp-1">{game.title}</h4>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-bold">{game.company || '제작사 미상'}</span>
                {game.playTime && <span className="text-[10px] font-mono text-zinc-300 group-hover:text-[#0047BB] transition-colors">{game.playTime}</span>}
              </div>
              <div className="absolute -bottom-2 -right-2 text-[40px] font-black text-black/[0.01] pointer-events-none group-hover:text-[#0047BB]/[0.02] transition-colors italic">
                {game.category}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredGames.length === 0 && (
        <div className="py-20 text-center">
          <Search className="w-12 h-12 mx-auto mb-4 text-zinc-200" />
          <p className="text-sm font-medium text-zinc-400">검색 결과가 없습니다.</p>
        </div>
      )}
    </motion.section>
  );
};
font-medium">검색 결과가 없습니다.</p>
          </div>
        )}
        
      </div>
    </motion.section>
  );
};
