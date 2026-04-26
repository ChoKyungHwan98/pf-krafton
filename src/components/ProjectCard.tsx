import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X, MousePointer2 } from 'lucide-react';
import { EditableText } from './EditableText';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  idx: number;
  isEditing: boolean;
  projects: Project[];
  setProjects: (p: Project[]) => void;
  onProjectClick: (p: Project) => void;
  layout?: 'default' | 'featured' | 'supporting' | 'accordion-active' | 'accordion-inactive';
}

export const ProjectCard = ({ project, idx, isEditing, projects, setProjects, onProjectClick, layout = 'default' }: ProjectCardProps) => {
  const isActive = layout === 'accordion-active';
  const isInactive = layout === 'accordion-inactive';
  
  if (isActive || isInactive) {
    return (
      <div className="relative w-full h-full flex flex-col justify-end p-6 lg:p-10">
        <div className={`absolute inset-0 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'} transition-opacity duration-700`}>
          <img src={project.image} alt={project.title} className={`w-full h-full object-cover ${isInactive ? 'object-top' : ''}`} referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent"></div>
        </div>
        
        {isEditing && (
          <button onClick={(e) => { e.stopPropagation(); if (confirm("이 프로젝트를 삭제하시겠습니까?")) { setProjects(projects.filter(p => p.id !== project.id)); }}}
            className="absolute top-6 right-6 z-20 p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-xl hover:scale-110" title="삭제">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className={`relative z-10 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 lg:opacity-100 lg:translate-y-0'}`}>
          <div className={`flex gap-2 mb-4 ${isActive ? 'flex-wrap items-center' : 'flex-col items-start'}`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-[10px] font-black text-white tracking-widest uppercase rounded-lg w-fit">
              <EditableText value={project.roles ? project.roles.join(', ') : ''} onSave={(v) => { const p = [...projects]; p[idx].roles = v.split(',').map(s=>s.trim()); setProjects(p); }} isEditing={isEditing} />
            </div>
            {project.status && (
              <div className={`px-3.5 py-1.5 text-[10px] font-black tracking-widest uppercase rounded-lg w-fit border backdrop-blur-md shadow-xl ${project.status === '미출시' ? 'bg-zinc-800/80 text-zinc-300 border-white/10' : 'bg-[#0047BB]/90 text-white border-white/20'}`}>
                <EditableText value={project.status} onSave={(v) => { const p = [...projects]; p[idx].status = v; setProjects(p); }} isEditing={isEditing} />
              </div>
            )}
          </div>
          <h3 className={`font-display font-black text-white mb-3 tracking-tighter leading-[1.1] ${isActive ? 'text-3xl lg:text-5xl' : 'text-xl lg:text-2xl'} line-clamp-2`}>
            <EditableText value={project.title} onSave={(v) => { const p = [...projects]; p[idx].title = v; setProjects(p); }} isEditing={isEditing} />
          </h3>
          
          {isActive && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
              <p className="text-white/70 line-clamp-2 mb-8 text-base lg:text-lg font-medium leading-relaxed max-w-2xl">
                <EditableText value={project.description} onSave={(v) => { const p = [...projects]; p[idx].description = v; setProjects(p); }} isEditing={isEditing} multiline />
              </p>
              <button onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                className="group px-8 py-4 bg-white hover:bg-[#0047BB] text-[#1A1A1A] hover:text-white font-bold text-xs tracking-widest transition-all duration-500 flex items-center gap-3 rounded-full uppercase w-fit shadow-2xl hover:scale-105 active:scale-95">
                기획서 상세 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      onClick={() => onProjectClick(project)}
      className="group relative bg-white border border-zinc-100 rounded-4xl overflow-hidden hover:border-[#0047BB]/20 hover:shadow-[0_40px_80px_-24px_rgba(0,71,187,0.15)] hover:-translate-y-1.5 transition-all duration-700 flex flex-col h-full cursor-pointer"
    >
      {isEditing && (
        <button onClick={(e) => { e.stopPropagation(); if (confirm("삭제하시겠습니까?")) { setProjects(projects.filter(p => p.id !== project.id)); }}}
          className="absolute top-5 right-5 z-30 p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-xl hover:scale-110" title="삭제">
          <X className="w-4 h-4" />
        </button>
      )}
      
      <div className="overflow-hidden relative bg-zinc-900 shrink-0 aspect-[16/9]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 absolute inset-0 grayscale-[30%] opacity-85 group-hover:grayscale-0 group-hover:opacity-100" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
        {/* Role badge on image */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5 text-[9px] font-black text-white/90 tracking-widest uppercase w-fit">
            <EditableText value={project.roles ? project.roles.join(' · ') : ''} onSave={(v) => { const p = [...projects]; p[idx].roles = v.split(/[·,]/).map(s=>s.trim()); setProjects(p); }} isEditing={isEditing} />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 lg:p-8">

        {/* Status — most prominent element */}
        {project.status && (
          <div className={`inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-[12px] font-black tracking-wide mb-4 ${
            project.status === '미출시'
              ? 'bg-zinc-100 text-zinc-500 border border-zinc-200'
              : project.status === '프로토타입'
              ? 'bg-violet-50 text-violet-600 border border-violet-200'
              : 'bg-[#0047BB] text-white shadow-md shadow-[#0047BB]/25'
          }`}>
            {project.status !== '미출시' && project.status !== '프로토타입' && (
              <span className="text-[13px] leading-none">🏆</span>
            )}
            {project.status === '프로토타입' && <span className="text-[13px] leading-none">⚡</span>}
            <EditableText value={project.status} onSave={(v) => { const p = [...projects]; p[idx].status = v; setProjects(p); }} isEditing={isEditing} />
          </div>
        )}

        {/* Role + Title */}
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mb-1">
          {project.roles && project.roles.map(role => (
            <span key={role} className="text-[11px] font-black text-[#0047BB] uppercase tracking-wide">{role}</span>
          ))}
        </div>
        <h3 className="text-[22px] font-display font-black tracking-tight text-zinc-900 group-hover:text-[#0047BB] transition-colors leading-[1.2] mb-4">
          <EditableText value={project.title} onSave={(v) => { const p = [...projects]; p[idx].title = v; setProjects(p); }} isEditing={isEditing} />
        </h3>

        {/* Description */}
        <div className="text-zinc-600 text-[14px] leading-[1.7] mb-5 font-medium">
          <EditableText value={project.description} onSave={(v) => { const p = [...projects]; p[idx].description = v; setProjects(p); }} isEditing={isEditing} multiline markdown={true} />
        </div>

        {/* Key Tasks */}
        {project.keyTasks && project.keyTasks.length > 0 && (
          <div className="mb-5 pb-5 border-b border-zinc-100">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">주요 작업</p>
            <div className="flex flex-wrap gap-1.5">
              {project.keyTasks.map((task, i) => (
                <span key={i} className="text-[12px] font-semibold px-3 py-1.5 bg-[#0047BB]/6 border border-[#0047BB]/12 rounded-lg text-[#0047BB]/75 group-hover:bg-[#0047BB]/12 group-hover:text-[#0047BB] transition-all">
                  {task}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pb-5">
          {project.tags.map((tag, tagIdx) => (
            <span key={tagIdx} className="text-[10px] font-bold px-2.5 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-500 uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between text-[#0047BB] font-bold text-[13px] opacity-70 group-hover:opacity-100 transition-opacity">
          <span>기획서 상세 보기</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
