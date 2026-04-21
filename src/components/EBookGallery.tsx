import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EBookGalleryProps {
  images: string[];
  onPageChange?: (index: number) => void;
  initialIndex?: number;
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

export const EBookGallery = ({ images, onPageChange, initialIndex = 0 }: EBookGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentIndex);
    }
  }, [currentIndex, onPageChange]);

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
    <div className="w-full h-full relative select-none bg-white">
      {/* Image viewer — fills all available space */}
      <div className="relative w-full h-full group/viewer flex items-center justify-center">
        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={() => paginate(-1)}
            disabled={!hasPrev}
            className={`absolute left-4 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 ${
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
            className={`absolute right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
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
