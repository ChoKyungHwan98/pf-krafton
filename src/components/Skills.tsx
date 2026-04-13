import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { EditableText } from './EditableText';
import type { Skill } from '../types';

interface SkillsProps {
  isEditing: boolean;
  skills: Skill[];
  setSkills: (s: Skill[]) => void;
}

export const Skills = ({ isEditing, skills, setSkills }: SkillsProps) => {
  return (
    <section id="skills" className="py-[120px] lg:py-[160px] px-6 md:px-12 relative min-h-screen flex flex-col justify-center bg-[#FAFAFA] overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] object-cover bg-repeat bg-[size:100px_100px]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full bg-white border border-black/5 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="mb-8 grid lg:grid-cols-2 gap-6 items-end border-b border-black/5 pb-6">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">03. 핵심 역량</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col gap-1 items-start mt-2">
              <span className="text-xl md:text-2xl text-zinc-400 font-display font-medium tracking-tight">논리와 구조를 AI로 확장하는</span>
              <span className="text-5xl md:text-6xl lg:text-[5rem] font-display font-black tracking-tighter text-[#2C2C2C] leading-none">기획 역량</span>
            </motion.h2>
          </div>
          <p className="text-zinc-500 text-sm leading-[1.6] lg:text-right font-medium">프로젝트의 성공을 이끄는 실무 중심의 기술적 토대입니다.</p>
        </div>
        
        <div className="flex flex-col w-full flex-1 justify-center">
          {skills.map((skill, idx) => (
            <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="relative group border-b border-black/5 h-[90px] px-6 md:px-8 hover:pl-10 lg:hover:pl-12 transition-all duration-500 overflow-hidden flex flex-row items-center justify-between gap-6 cursor-default bg-transparent">
              
              <motion.div 
                initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#0047BB]/10 to-[#0047BB]/5 z-0 origin-left flex items-center overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(0,0,0,1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,1)_50%,rgba(0,0,0,1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-bg-pan"></div>
              </motion.div>
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#A10028] to-[#0047BB] z-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out shadow-[0_0_15px_rgba(161, 0, 40,0.6)]" />

              <div className="relative z-10 flex items-center gap-6 w-[40%] shrink-0 pr-4">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 text-black/10 group-hover:text-[#0047BB] transition-colors flex items-center justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-lg md:text-2xl font-display font-black text-[#2C2C2C] tracking-tight uppercase group-hover:text-[#0047BB] transition-colors duration-300 truncate w-full">
                  <EditableText value={skill.name} onSave={(v) => { const s = [...skills]; s[idx].name = v; setSkills(s); }} isEditing={isEditing} />
                </h3>
              </div>
              
              <div className="relative z-10 flex-1 flex flex-row items-center justify-between gap-4 shrink-0 pl-2 md:pl-4 border-l border-dashed border-black/10 w-full min-w-0">
                 <p className="text-xs md:text-sm font-medium text-zinc-500 group-hover:text-[#2C2C2C] transition-colors duration-300 line-clamp-1 flex-1">
                   <EditableText value={skill.caption || ""} onSave={(v) => { const s = [...skills]; s[idx].caption = v; setSkills(s); }} isEditing={isEditing} />
                 </p>
                 <div className="flex flex-row items-center gap-3 shrink-0 ml-auto justify-end w-[80px]">
                    <span className="text-[#0047BB] font-bold font-mono text-base md:text-lg transition-colors">{skill.level}%</span>
                 </div>
              </div>

              {isEditing && (
                <button onClick={() => { const s = [...skills]; s.splice(idx, 1); setSkills(s); }}
                  className="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm z-20" title="삭제">
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
