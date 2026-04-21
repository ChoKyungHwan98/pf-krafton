import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EBookGalleryProps {
  images: string[];
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '40%' : '-40%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? '40%' : '-40%',
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
    <div className="w-full h-full relative select-none bg-zinc-50/50">
      {/* Floating Counter + dots - moved even higher */}
      {images.length > 1 && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none">
          <div className="px-3 py-1 bg-black/85 backdrop-blur-md rounded-full text-white text-[10px] font-black tracking-[0.2em] flex items-center gap-2 shadow-xl border border-white/10">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/60">{String(images.length).padStart(2, '0')}</span>
          </div>
          <div className="flex gap-1 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#0047BB] w-4' : 'bg-zinc-300/50 hover:bg-zinc-400 w-1.5'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image viewer — fills all available space */}
      <div className="relative w-full h-full group/viewer flex items-center justify-center">
        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(-1)}
            disabled={!hasPrev}
            className={`absolute left-2 md:left-4 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 ${
              hasPrev
                ? 'bg-white text-[#0047BB] border-black/8 hover:scale-110 cursor-pointer opacity-0 group-hover/viewer:opacity-100'
                : 'opacity-0 pointer-events-none border-transparent'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(1)}
            disabled={!hasNext}
            className={`absolute right-2 md:right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              hasNext
                ? 'bg-[#0047BB] text-white border border-[#0047BB] hover:scale-110 cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <motion.div
              animate={hasNext ? { x: [0, 4, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </button>
        )}

        {/* Image - zero padding to maximize size */}
        <div className="h-full w-full flex items-center justify-center overflow-hidden bg-white">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
              src={images[currentIndex]}
              alt={`기획서 ${currentIndex + 1}페이지`}
              className="max-h-full max-w-full object-contain block"
              referrerPolicy="no-referrer"
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
