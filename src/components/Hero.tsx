import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { EditableText } from './EditableText';

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
  <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-[120px] overflow-hidden bg-[#FDFDFB] border-b border-black/10">
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    
    <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mt-12">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-[55%] flex flex-col items-start text-left"
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

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="hidden lg:flex lg:w-1/2 justify-end relative"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-full bg-gradient-to-tr from-[#0047BB]/10 to-transparent blur-[80px] rounded-full mix-blend-multiply opacity-50"></div>
        
        <div className="relative w-full max-w-[520px] aspect-video sm:aspect-[4/3] lg:aspect-[16/10] mt-4 z-10 rounded-[1.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-black/5 bg-zinc-900 flex flex-col group hover:shadow-[0_20px_60px_rgba(128,0,32,0.15)] transition-shadow duration-500">
           <div className="h-10 bg-[#1A1A1A] border-b border-white/5 flex items-center px-4 gap-2 text-white shrink-0">
             <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
             <div className="flex-1 text-center font-mono text-[10px] text-zinc-400 uppercase tracking-widest mr-8">INDEX_TRAILER.mp4</div>
           </div>
           
           <div className="flex-1 relative bg-black">
             <video 
               src="https://cdn.pixabay.com/video/2021/08/11/84687-588328639_tiny.mp4" 
               autoPlay loop muted playsInline 
               className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
             />
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
             <div className="absolute inset-x-0 bottom-0 p-6 xl:p-8 flex items-end justify-between pointer-events-none">
               <div>
                 <span className="text-white/60 font-mono text-[10px] tracking-widest uppercase mb-2 block">00 . INITIALIZE</span>
                 <h3 className="text-white font-display font-medium text-2xl xl:text-3xl leading-tight">
                   The Master <br/><span className="font-bold text-[#f2aab8]">Blueprint.</span>
                 </h3>
               </div>
               
               <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1"><path d="M8 5v14l11-7z" /></svg>
               </div>
             </div>
           </div>
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
