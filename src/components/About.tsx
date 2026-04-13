import React from 'react';
import { EditableText } from './EditableText';

interface AboutProps {
  isEditing: boolean;
  content: any;
  setContent: (c: any) => void;
}

export const About = ({ isEditing, content, setContent }: AboutProps) => (
  <section id="about" className="pt-[120px] lg:pt-[160px] pb-[240px] lg:pb-[320px] px-6 md:px-12 relative border-t border-black/5 min-h-[110vh] flex flex-col justify-start bg-[#FAFAFA] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    
    <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col">
      <div className="mb-8 grid lg:grid-cols-2 gap-6 items-end border-b border-black/5 pb-6">
        <div>
          <span className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">01. 소개</span>
          <h2 className="flex flex-col gap-1 items-start mt-2">
            <span className="text-xl md:text-2xl text-zinc-400 font-display font-medium tracking-tight">논리와 감성으로,</span>
            <span className="text-5xl md:text-6xl lg:text-[5rem] font-display font-black tracking-tighter text-[#2C2C2C] leading-none">0 에서 +로</span>
          </h2>
        </div>
        <p className="text-zinc-500 text-sm leading-[1.6] lg:text-right font-medium">프로젝트의 뼈대를 세우고 재미의 본질을 설계하는 핵심 철학입니다.</p>
      </div>
      
      <div className="space-y-12 text-zinc-600 font-medium text-lg lg:text-xl leading-[2] pt-8 max-w-4xl mx-auto w-full">
        <div className="relative pl-8 border-l-[3px] border-black/10 hover:border-[#0047BB] transition-colors duration-500 group">
          <div className="absolute -left-[9px] top-2 w-4 h-4 bg-white border-[3px] border-black/10 rounded-full group-hover:border-[#0047BB] transition-colors duration-500"></div>
          <EditableText value={content.p1} onSave={(v) => setContent({...content, p1: v})} isEditing={isEditing} multiline />
        </div>
        <div className="relative pl-8 border-l-[3px] border-black/10 hover:border-[#0047BB] transition-colors duration-500 group">
          <div className="absolute -left-[9px] top-2 w-4 h-4 bg-white border-[3px] border-black/10 rounded-full group-hover:border-[#0047BB] transition-colors duration-500"></div>
          <EditableText value={content.p2} onSave={(v) => setContent({...content, p2: v})} isEditing={isEditing} multiline />
        </div>
      </div>
    </div>
  </section>
);
