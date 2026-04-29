import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export const MobileLoadingScreen = ({ onComplete }: Props) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#FDFCF8' }}
    >
      {/* 상단 강조 라인 */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-[#0047BB]"
        style={{ transformOrigin: 'left' }}
      />

      <div className="w-full max-w-[280px] px-8 flex flex-col items-center gap-8">
        {/* 텍스트 블록 */}
        <div className="text-center w-full">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="block text-[9px] font-black tracking-[0.45em] uppercase mb-5"
            style={{ color: '#0047BB' }}
          >
            Game Designer
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tighter leading-none mb-3"
            style={{ fontSize: '3.4rem', color: '#1A2332' }}
          >
            조경환
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="text-xs font-medium tracking-wide"
            style={{ color: '#a1a1aa' }}
          >
            목차를 쓸줄 아는 기획자
          </motion.p>
        </div>

        {/* 프로그레스 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full"
        >
          <div className="w-full h-[1px] rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: '#0047BB' }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
