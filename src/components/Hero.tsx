import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { EditableText } from './EditableText';
import { HeroBlueprintAnimation } from './HeroBlueprintAnimation';

interface HeroProps {
  onPortfolioClick: () => void;
  onResumeClick: () => void;
  isEditing: boolean;
  content: any;
  setContent: (c: any) => void;
  aboutContent: any;
  setAboutContent: (c: any) => void;
}

export const Hero = ({ onPortfolioClick, onResumeClick, isEditing, content, setContent, aboutContent, setAboutContent }: HeroProps) => (
  <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-[120px] overflow-hidden bg-[#FDFCF8] border-b border-black/10">
    {/* Full-bleed Analog Video Background */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-end">
      {/* 
        임시 비디오 URL입니다. 
        원하시는 '책 넘기는 영상'의 URL(mp4)을 구하셔서 아래 src에 넣어주세요.
      */}
      <video 
        src="https://cdn.pixabay.com/video/2021/08/11/84687-588328639_tiny.mp4" 
        autoPlay loop muted playsInline 
        className="w-[120%] lg:w-[80%] h-full object-cover mix-blend-multiply opacity-20 sepia-[.3] object-right"
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF8] via-[#FDFCF8]/90 to-transparent"></div>
      
      {/* Subtle Analog Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-overlay"></div>
    </div>
    
    <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mt-12">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-[60%] flex flex-col items-start text-left"
      >
        <h1 className="mb-8 flex flex-col items-start gap-4">
          <div className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-zinc-500 tracking-tight">
            <EditableText value={content.titleLine1 || "기획의도를 알고"} onSave={(v) => setContent({...content, titleLine1: v})} isEditing={isEditing} />
          </div>
          <div className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-[#1A2332] tracking-[-0.04em] leading-[1.05] break-keep">
            <EditableText value={content.titleLine2 || "목차를 쓸줄 아는 기획자"} onSave={(v) => setContent({...content, titleLine2: v})} isEditing={isEditing} />
          </div>
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-xl">
          <EditableText value={content.description} onSave={(v) => setContent({...content, description: v})} isEditing={isEditing} multiline />
        </p>
        
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4 w-full sm:w-auto">
          <motion.button 
            whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
            onClick={onResumeClick}
            className="px-10 py-5 bg-[#0047BB] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#A10028] transition-all duration-500 text-sm tracking-widest w-full sm:w-auto rounded-full uppercase shadow-lg shadow-[#0047BB]/20 hover:shadow-xl"
          >
            이력서 보기 <ChevronRight className="w-4 h-4" />
          </motion.button>
          <motion.button 
            whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
            onClick={onPortfolioClick}
            className="px-10 py-5 bg-white border border-zinc-200 text-zinc-600 font-bold hover:border-zinc-300 hover:text-[#1A2332] hover:bg-zinc-50 transition-all duration-500 flex items-center justify-center gap-3 text-sm tracking-widest w-full sm:w-auto rounded-full uppercase shadow-sm hover:shadow-md"
          >
            포트폴리오 보기 <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Scroll to explore</span>
      <div className="w-[1px] h-16 bg-zinc-200 relative overflow-hidden">
        <motion.div animate={{ y: [-64, 64] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute top-0 left-0 w-full h-1/2 bg-[#0047BB]" />
      </div>
    </motion.div>
  </section>
);
