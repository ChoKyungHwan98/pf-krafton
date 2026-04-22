import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
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
      <div className="relative w-full h-full flex flex-col justify-end p-6 lg:p-8">
        <div className={`absolute inset-0 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'} transition-opacity duration-500`}>
          <img src={project.image} alt={project.title} className={`w-full h-full object-cover ${isInactive ? 'object-top' : ''}`} referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        
        {isEditing && (
          <button onClick={(e) => { e.stopPropagation(); if (confirm("이 프로젝트를 삭제하시겠습니까?")) { setProjects(projects.filter(p => p.id !== project.id)); }}}
            className="absolute top-4 right-4 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg" title="삭제">
            <X className="w-4 h-4" />
          </button>
        )}

        <div className={`relative z-10 transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 lg:opacity-100 lg:translate-y-0'}`}>
          <div className={`flex gap-2 mb-4 ${isActive ? 'flex-wrap items-center' : 'flex-col items-start'}`}>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-sans font-bold text-[#2C2C2C] tracking-tight rounded-md w-fit">
              <EditableText value={project.roles ? project.roles.join(', ') : ''} onSave={(v) => { const p = [...projects]; p[idx].roles = v.split(',').map(s=>s.trim()); setProjects(p); }} isEditing={isEditing} />
            </div>
            {project.status && (
              <div className={`px-3 py-1.5 text-[11px] font-sans font-bold tracking-tight rounded-md w-fit border backdrop-blur-sm ${project.status === '미출시' ? 'bg-zinc-800/80 text-zinc-300 border-zinc-600' : 'bg-[#0047BB] text-white border-[#0047BB] shadow-lg shadow-[#0047BB]/30'}`}>
                <EditableText value={project.status} onSave={(v) => { const p = [...projects]; p[idx].status = v; setProjects(p); }} isEditing={isEditing} />
              </div>
            )}
          </div>
          <h3 className={`font-bold text-white mb-2 ${isActive ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'} line-clamp-2`}>
            <EditableText value={project.title} onSave={(v) => { const p = [...projects]; p[idx].title = v; setProjects(p); }} isEditing={isEditing} />
          </h3>
          
          {isActive && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4">
              <p className="text-zinc-300 line-clamp-2 mb-6 text-sm lg:text-base">
                <EditableText value={project.description} onSave={(v) => { const p = [...projects]; p[idx].description = v; setProjects(p); }} isEditing={isEditing} multiline />
              </p>
              <button onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
                className="px-6 py-3 bg-white text-[#2C2C2C] font-bold text-xs tracking-widest hover:bg-[#0047BB] hover:text-white transition-colors flex items-center gap-2 rounded-full uppercase w-fit">
                기획서 보기 <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="group relative bg-white border border-black/5 rounded-3xl overflow-hidden hover:border-black/10 hover:shadow-xl transition-all duration-500 flex flex-col">
      {isEditing && (
        <button onClick={(e) => { e.stopPropagation(); if (confirm("삭제하시겠습니까?")) { setProjects(projects.filter(p => p.id !== project.id)); }}}
          className="absolute top-4 right-4 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg" title="삭제">
          <X className="w-4 h-4" />
        </button>
      )}
      <div className="overflow-hidden relative bg-zinc-100 shrink-0 aspect-[16/10] border-b border-black/5">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" referrerPolicy="no-referrer" />
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <div className="bg-white/90 backdrop-blur-sm border border-black/10 rounded-md px-3 py-1.5 text-[11px] font-sans font-bold text-[#2C2C2C] tracking-tight shadow-sm w-fit">
            <EditableText value={project.roles ? project.roles.join(', ') : ''} onSave={(v) => { const p = [...projects]; p[idx].roles = v.split(',').map(s=>s.trim()); setProjects(p); }} isEditing={isEditing} />
          </div>
          {project.status && (
            <div className={`border rounded-md px-3 py-1.5 text-[11px] font-sans font-bold tracking-tight shadow-sm w-fit backdrop-blur-sm ${project.status === '미출시' ? 'bg-zinc-100/90 text-zinc-500 border-zinc-200' : 'bg-[#0047BB] text-white border-[#0047BB] shadow-md shadow-[#0047BB]/20'}`}>
              <EditableText value={project.status} onSave={(v) => { const p = [...projects]; p[idx].status = v; setProjects(p); }} isEditing={isEditing} />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between p-8">
        <div>
          <h3 className="text-xl font-bold mb-3 text-[#2C2C2C] group-hover:text-[#0047BB] transition-colors line-clamp-1">
            <EditableText value={project.title} onSave={(v) => { const p = [...projects]; p[idx].title = v; setProjects(p); }} isEditing={isEditing} />
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">
            <EditableText value={project.description} onSave={(v) => { const p = [...projects]; p[idx].description = v; setProjects(p); }} isEditing={isEditing} multiline />
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(0, 3).map((tag, tagIdx) => (
              <span key={tagIdx} className="text-[10px] font-sans font-bold px-2 py-1 bg-zinc-50 border border-zinc-200 rounded-md text-zinc-500 flex items-center gap-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onProjectClick(project); }}
          className="w-full relative overflow-hidden group/btn py-4 bg-white border border-black/10 text-[#2C2C2C] font-bold text-xs tracking-widest transition-all duration-500 flex items-center justify-center gap-2 uppercase rounded-xl hover:shadow-[0_4px_16px_rgba(128,0,32,0.15)] hover:border-[#0047BB]">
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-500 group-hover/btn:text-white">기획서 보기 <ArrowRight className="w-4 h-4" /></span>
          <div className="absolute inset-0 bg-[#0047BB] scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-500" />
        </button>
      </div>
    </motion.div>
  );
};
