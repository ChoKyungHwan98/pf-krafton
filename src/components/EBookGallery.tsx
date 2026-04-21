import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EBookGalleryProps {
  images: string[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '60%' : '-60%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '60%' : '-60%',
    opacity: 0,
  }),
};

export const EBookGallery = ({ images }: EBookGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!images || images.length === 0) return null;

  const paginate = (newDirection: number) => {
    const next = currentIndex + newDirection;
    if (next >= 0 && next < images.length) {
      setDirection(newDirection);
      setCurrentIndex(next);
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  return (
    <div className="w-full flex flex-col items-center gap-6 select-none">
      {/* Page counter */}
      {images.length > 1 && (
        <div className="flex items-center gap-3">
          <div className="px-5 py-2 bg-[#1A1A1A] rounded-full text-white text-[11px] font-black tracking-[0.3em] flex items-center gap-2.5 shadow-lg">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{String(images.length).padStart(2, '0')}</span>
          </div>
          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#0047BB] w-4' : 'bg-zinc-300 hover:bg-zinc-400'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image viewer with side arrows */}
      <div className="relative w-full group/viewer">
        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(-1)}
            disabled={!hasPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-black/5 flex items-center justify-center transition-all duration-300 ${
              hasPrev
                ? 'bg-white text-[#0047BB] hover:scale-110 hover:-translate-x-[calc(50%+4px)] cursor-pointer opacity-0 group-hover/viewer:opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(1)}
            disabled={!hasNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(0,71,187,0.3)] flex items-center justify-center transition-all duration-300 ${
              hasNext
                ? 'bg-[#0047BB] text-white hover:scale-110 hover:translate-x-[calc(50%+4px)] cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <motion.div
              animate={hasNext ? { x: [0, 5, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronRight className="w-7 h-7" />
            </motion.div>
          </button>
        )}

        {/* Image - constrained to viewport so full page is always visible */}
        <div className="overflow-hidden rounded-2xl border border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-zinc-50 flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
              className="w-full"
            >
              <img
                src={images[currentIndex]}
                alt={`기획서 ${currentIndex + 1}페이지`}
                className="w-full object-contain block"
                style={{ maxHeight: 'calc(100vh - 160px)' }}
                referrerPolicy="no-referrer"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation for mobile / always-visible */}
      {images.length > 1 && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => paginate(-1)}
            disabled={!hasPrev}
            className="px-5 py-2.5 rounded-full bg-white border border-black/8 text-zinc-500 font-bold text-sm shadow-sm hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> 이전
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={!hasNext}
            className="px-5 py-2.5 rounded-full bg-[#0047BB] text-white font-bold text-sm shadow-md hover:bg-[#0038a0] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            다음 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
