import React from 'react';
import { motion } from 'motion/react';
import { EditableText } from './EditableText';

interface AboutProps {
  isEditing: boolean;
  content: any;
  setContent: (c: any) => void;
}

export const About = ({ isEditing, content, setContent }: AboutProps) => (
  <section
    id="about"
    className="py-[120px] lg:py-[200px] px-6 md:px-12 relative flex flex-col justify-start bg-transparent overflow-hidden"
  >
    {/* Subtle Background Effects */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[40px_40px]" />
    
    <div className="max-w-[1200px] mx-auto w-full relative z-10">
      
      {/* SECTION LABEL - Centered */}
      <div className="flex justify-center mb-16 lg:mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="inline-flex items-center gap-2 px-5 py-2 border border-black/5 rounded-full bg-white/50 backdrop-blur-sm shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#0047BB] animate-pulse"></span>
          <span className="text-[#0047BB] font-mono text-[11px] font-black tracking-[0.2em] uppercase">01. About Me</span>
        </motion.div>
      </div>

      {/* MASSIVE TYPOGRAPHIC HOOK */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative mb-24 lg:mb-32 w-full mx-auto max-w-5xl"
      >
        {/* Background massive decorative text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-[0.02] pointer-events-none select-none z-0 w-full whitespace-nowrap">
          <span className="text-[120px] md:text-[200px] lg:text-[300px] font-black leading-[0.8] font-display">0 TO +</span>
        </div>

        {/* Editable P1 with Cinematic Typography */}
        <div className="relative z-10 text-[22px] md:text-[32px] lg:text-[42px] leading-[1.6] font-semibold text-zinc-400 tracking-tight break-keep
          [&_p]:m-0
          [&_strong]:text-[#1A1A1A] [&_strong]:font-black [&_strong]:relative [&_strong]:inline-block [&_strong]:z-10
          [&_strong]:after:content-[''] [&_strong]:after:absolute [&_strong]:after:bottom-0 md:[&_strong]:after:bottom-2 [&_strong]:after:left-0 [&_strong]:after:right-0 [&_strong]:after:h-3 md:[&_strong]:after:h-4 [&_strong]:after:bg-[#0047BB]/15 [&_strong]:after:-z-10
        ">
          <EditableText
            value={content.p1}
            onSave={(v) => setContent({ ...content, p1: v })}
            isEditing={isEditing}
            markdown
          />
        </div>
      </motion.div>

      {/* REFINED MESSAGE & BENTO GRID */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        
        {/* Left: Closing Promise */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 justify-center"
        >
          <div className="text-[20px] md:text-[26px] lg:text-[32px] leading-[1.6] font-bold text-[#1A1A1A] break-keep border-l-4 border-[#0047BB] pl-6 md:pl-8 py-2
            [&_p]:m-0 [&_strong]:text-[#0047BB]
          ">
            <EditableText
              value={content.p2} 
              onSave={(v) => setContent({ ...content, p2: v })}
              isEditing={isEditing}
              markdown
            />
          </div>
          <p className="text-zinc-500 font-medium text-sm md:text-base pl-6 md:pl-8">
            단순한 상상을 넘어, 실제로 작동하고 유저가 공감할 수 있는 논리적 기반을 제공합니다.
          </p>
        </motion.div>

        {/* Right: Bento Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="sm:col-span-2 bg-white rounded-[32px] p-8 md:p-10 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#0047BB]/5 rounded-full blur-2xl group-hover:bg-[#0047BB]/10 transition-colors"></div>
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#0047BB]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0047BB] group-hover:scale-110 transition-all duration-500">
                <span className="text-[#0047BB] font-black text-3xl group-hover:text-white transition-colors duration-500">+</span>
              </div>
              <div>
                <p className="text-[12px] font-black tracking-widest text-[#0047BB]/60 uppercase mb-2">재미 설계</p>
                <p className="text-[18px] md:text-[20px] font-bold text-[#1A1A1A] leading-snug tracking-tight">0에서 플러스가 되는<br/>경험을 설계합니다</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0047BB] rounded-[32px] p-8 md:p-10 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-end min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8">
              <span className="text-[64px] font-black leading-none opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 block origin-top-right">3</span>
            </div>
            <div className="relative z-10">
              <span className="text-[32px] font-black leading-none block mb-6">3<span className="text-xl opacity-70">건+</span></span>
              <p className="text-[10px] font-black tracking-widest text-white/60 uppercase mb-2">프로젝트 기획</p>
              <p className="text-[15px] font-bold leading-snug">시스템 · 밸런스 · 레벨<br/>단독 설계</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-zinc-900 rounded-[32px] p-8 md:p-10 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-end min-h-[220px] group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
              <span className="text-[64px] font-black leading-none opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 block origin-top-right text-[#0047BB]">A</span>
            </div>
            <div className="relative z-10">
              <span className="text-[32px] font-black leading-none block mb-6 group-hover:text-[#0047BB] transition-colors duration-500">A - Z</span>
              <p className="text-[10px] font-black tracking-widest text-white/50 uppercase mb-2">전체 기획</p>
              <p className="text-[15px] font-bold leading-snug text-zinc-300">아이디어 발굴부터<br/>출시 전략까지</p>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  </section>
);
