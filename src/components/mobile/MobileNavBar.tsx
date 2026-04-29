import React from 'react';
import { motion } from 'motion/react';
import { Home, FolderOpen, FileText, Gamepad2, MoreHorizontal } from 'lucide-react';

export type MobileTab = 'home' | 'portfolio' | 'resume' | 'game-history' | 'more';

interface Props {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

const TABS: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
  { id: 'home',         label: '홈',     icon: <Home        strokeWidth={1.8} className="w-[22px] h-[22px]" /> },
  { id: 'portfolio',    label: 'Works',  icon: <FolderOpen  strokeWidth={1.8} className="w-[22px] h-[22px]" /> },
  { id: 'resume',       label: '이력서', icon: <FileText    strokeWidth={1.8} className="w-[22px] h-[22px]" /> },
  { id: 'game-history', label: '게이밍DNA', icon: <Gamepad2   strokeWidth={1.8} className="w-[22px] h-[22px]" /> },
  { id: 'more',         label: '더보기', icon: <MoreHorizontal strokeWidth={1.8} className="w-[22px] h-[22px]" /> },
];

export const MobileNavBar = ({ activeTab, onTabChange }: Props) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(253, 252, 248, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <div className="flex items-stretch" style={{ height: 60 }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center gap-[3px] transition-all duration-150 active:opacity-60"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* 활성 도트 인디케이터 */}
              {isActive && (
                <motion.div
                  layoutId="tab-dot"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-[#0047BB]"
                  transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                />
              )}

              <motion.span
                animate={{ color: isActive ? '#0047BB' : '#6b7280', scale: isActive ? 1.05 : 1 }}
                transition={{ duration: 0.18 }}
              >
                {tab.icon}
              </motion.span>

              <span
                className="text-[10px] font-bold leading-none tracking-tight"
                style={{ color: isActive ? '#0047BB' : '#6b7280' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* iOS safe-area */}
      <div style={{ height: 'env(safe-area-inset-bottom)' }} />
    </nav>
  );
};
