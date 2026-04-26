import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { ALL_GAMES } from '../data/games';

interface PlayHistoryProps {
  onViewAll?: () => void;
  // We keep the props signature to prevent App.tsx from breaking if it passes unused props
  isEditing?: boolean;
  history?: any;
  setHistory?: any;
}

export const PlayHistory = ({ onViewAll }: PlayHistoryProps) => {
  const allGamesCount = ALL_GAMES.length;

  const DASHBOARD_HIGHLIGHTS = {
    pc: [
      { id: 'pc1', title: '메이플스토리', genre: 'RPG', highlight: '15년 플레이', image: './images/games/maple_kr.jpg' },
      { id: 'pc2', title: 'OSU!', genre: '리듬', highlight: '전세계 1000위 달성', image: './images/games/osu_manual.png' },
      { id: 'pc3', title: '메이플스토리 월드', genre: '캐주얼', highlight: '출시 경험 有', image: './images/games/maple_worlds_manual.jpg' },
    ],
    console: [
      { id: 'con1', title: '포켓몬스터 시리즈', genre: 'RPG', highlight: '레이팅 2000점대', image: './images/games/pokemon_logo.jpg' },
      { id: 'con2', title: '다크소울 3', genre: '액션 RPG', highlight: '430시간 플레이', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/capsule_616x353.jpg', position: 'center 20%', size: 'cover' },
      { id: 'con3', title: '역전재판 시리즈', genre: '법정배틀', highlight: '법학과 진학의 계기', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/787480/capsule_616x353.jpg' },
    ],
    mobile: [
      { id: 'mob1', title: '무기미도', genre: '타워디펜스', highlight: '상위 랭커', image: './images/games/ptn.jpg' },
      { id: 'mob2', title: '삼국지 천하포무', genre: '역사 전략', highlight: '300시간 플레이', image: './images/games/three_kingdoms.png', position: 'top' },
      { id: 'mob3', title: '하스스톤', genre: 'TCG', highlight: '전설 등급 달성', image: './images/games/hearthstone.webp' },
    ]
  };

  const renderSection = (category: string, items: any[], icon: React.ReactNode) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0047BB]/10 rounded-xl flex items-center justify-center text-[#0047BB] shrink-0">
          {icon}
        </div>
        <h3 className="font-display font-bold text-lg md:text-xl text-[#2C2C2C]">{category}</h3>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ 
              delay: idx * 0.1,
              scale: { type: 'spring', stiffness: 300, damping: 20 }
            }}
            className="relative h-[110px] md:h-[130px] rounded-2xl overflow-hidden shadow border border-black/10 flex items-end p-4 md:p-5 bg-[#2C2C2C]"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ 
                backgroundImage: `url('${item.image}')`,
                backgroundSize: item.size || (item.image.includes('logo') && !item.image.includes('pokemon') ? 'contain' : 'cover'),
                backgroundRepeat: 'no-repeat',
                backgroundPosition: item.position || 'center'
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />
            
            {/* Content */}
            <div className="relative z-10 w-full flex flex-col justify-end">
              <span className="inline-block px-1.5 md:px-2 py-0.5 md:py-1 bg-[#0047BB] text-white! text-[9px] md:text-[10px] font-bold rounded mb-1.5 md:mb-2 tracking-wider w-fit">
                {item.genre}
              </span>
              <h4 className="text-white! font-bold text-base md:text-lg mb-0.5 md:mb-1 truncate">{item.title}</h4>
              <p className="text-zinc-300! text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2">
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-yellow-400" />
                {item.highlight}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="play-history" className="pt-[100px] pb-[80px] lg:pt-[120px] lg:pb-[100px] px-6 md:px-12 relative min-h-screen flex flex-col justify-center bg-transparent">
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full">
        <div className="mb-12 flex flex-col lg:flex-row justify-between lg:items-end gap-6 border-b border-black/10 pb-8">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">04. 플레이 이력</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col gap-1 items-start mt-2">
              <span className="text-xl md:text-2xl text-zinc-500 font-display font-medium tracking-tight">{allGamesCount}종 이상의</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-[#0047BB] leading-none mt-1">인사이트</span>
            </motion.h2>
          </div>
          <p className="text-zinc-500 text-sm leading-[1.6] lg:text-right font-medium max-w-md break-keep">
            방대한 게임을 플레이한 경험으로 기획자로서의 통찰력을 넓혀왔습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {renderSection("PC / Mainline", DASHBOARD_HIGHLIGHTS.pc, <Monitor className="w-6 h-6" />)}
          {renderSection("Console/Steam", DASHBOARD_HIGHLIGHTS.console, <Gamepad2 className="w-6 h-6" />)}
          {renderSection("Mobile", DASHBOARD_HIGHLIGHTS.mobile, <Smartphone className="w-6 h-6" />)}
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <button onClick={onViewAll}
            className="group py-5 px-10 bg-[#0047BB] text-white rounded-2xl font-bold tracking-widest text-sm hover:bg-[#003A9E] transition-all duration-300 shadow-xl shadow-[#0047BB]/20 flex items-center gap-4 hover:-translate-y-1">
            전체 목록 보기 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
