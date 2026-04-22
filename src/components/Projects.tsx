import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { EditableText } from './EditableText';
import { ProjectCard } from './ProjectCard';
import type { Project } from '../types';

interface ProjectsProps {
  onProjectClick: (p: Project) => void;
  isEditing: boolean;
  projects: Project[];
  setProjects: (p: Project[]) => void;
  limit?: number;
  setView?: (v: any) => void;
}

export const Projects = ({ onProjectClick, isEditing, projects, setProjects, limit, setView }: ProjectsProps) => {
  const [featuredId, setFeaturedId] = useState<number | null>(null);
  const actualFeaturedId = featuredId || (projects[0] ? projects[0].id : null);
  const displayedProjects = limit ? projects.slice(0, limit) : projects;
  
  const topProjects = limit ? [...displayedProjects].sort((a, b) => {
    if (a.id === actualFeaturedId) return -1;
    if (b.id === actualFeaturedId) return 1;
    return 0;
  }) : displayedProjects;

  return (
    <section id="projects" className="py-[120px] lg:py-[160px] px-6 md:px-12 relative min-h-screen flex flex-col justify-center bg-transparent overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[32px_32px]"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className={`flex flex-col ${limit ? 'lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start' : ''}`}>
          
          {/* Header Area (Left Sidebar on Desktop if limit is set) */}
          <div className={`${limit ? 'lg:col-span-4 lg:sticky lg:top-32' : 'flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 border-b border-black/5 pb-6'}`}>
            <div>
              <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-3">
                <span className="text-[#0047BB] font-sans text-[11px] font-black tracking-[0.3em] uppercase">02. 프로젝트 이력</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-1 items-start mt-2">
                <span className="text-xl md:text-2xl text-zinc-400 font-display font-medium tracking-tight">실전으로 증명한</span>
                <span className="text-5xl md:text-6xl font-display font-black tracking-tighter text-[#1A1A1A] leading-[0.9] drop-shadow-sm">결과물</span>
              </motion.h2>
            </div>
            <div className={`flex flex-col items-start gap-4 ${limit ? 'mt-8' : 'md:items-end self-end mb-1'}`}>
              <motion.p initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className={`text-zinc-500 text-sm font-medium leading-relaxed max-w-[280px] ${limit ? 'border-l-2 border-[#0047BB]/10 pl-4' : 'md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#0047BB]/10 pl-4 md:pl-0 md:pr-4'}`}>
                시스템 기획 및 프로토타입 개발 결과물입니다.
              </motion.p>
              {limit && setView && (
                <button onClick={() => setView('portfolio')}
                  className="group flex items-center gap-2 text-[#0047BB] font-bold text-[10px] uppercase tracking-[0.2em] hover:text-[#1A1A1A] transition-colors bg-[#0047BB]/5 hover:bg-[#0047BB]/10 px-4 py-2.5 rounded-full mt-2">
                  전체 찾아보기 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Project List Area (Right Side on Desktop if limit is set) */}
          <div className={`${limit ? 'lg:col-span-8 mt-12 lg:mt-0' : 'w-full'}`}>
            {limit ? (
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {topProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layoutId={`project-card-${project.id}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => onProjectClick(project)}
                      className="group relative bg-white border border-black/5 hover:border-[#0047BB]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl overflow-hidden cursor-pointer flex flex-col sm:flex-row transition-all duration-300"
                    >
                      {/* Left: Thumbnail (16:9) */}
                      <div className="relative w-full sm:w-[240px] md:w-[280px] shrink-0 aspect-[16/9] sm:aspect-auto sm:h-full bg-zinc-100 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                        
                        {/* Status Badge */}
                        {project.status && (
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-tight shadow-sm leading-none backdrop-blur-md ${project.status === '미출시' ? 'bg-black/60 text-white' : 'bg-[#0047BB] text-white'}`}>
                              {project.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Info Area */}
                      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between min-w-0 bg-white group-hover:bg-[#F8FAFC] transition-colors duration-300">
                        <div>
                          {/* Roles Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {project.roles && project.roles.map(role => (
                              <span key={role} className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200">
                                {role}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-black text-lg md:text-xl text-[#1A1A1A] group-hover:text-[#0047BB] transition-colors mb-2 line-clamp-1 truncate w-full">
                            <EditableText value={project.title} onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].title = v; setProjects(p); }} isEditing={isEditing} />
                          </h3>

                          {/* Description */}
                          <p className="text-zinc-500 text-xs md:text-sm leading-relaxed line-clamp-2 w-full font-medium">
                            <EditableText value={project.description || ""} onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].description = v; setProjects(p); }} isEditing={isEditing} />
                          </p>
                        </div>

                        {/* Bottom: Tags & CTA */}
                        <div className="mt-5 pt-4 border-t border-black/5 flex items-end justify-between gap-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map((tag, tIdx) => (
                              <span key={tIdx} className="text-[10px] font-bold text-zinc-400 bg-transparent px-1">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <div className="shrink-0 w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center text-zinc-400 group-hover:bg-[#0047BB] group-hover:border-[#0047BB] group-hover:text-white transition-all duration-300 shadow-sm">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="w-full relative group/gallery">
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 px-6 md:px-12 -mx-6 md:-mx-12 items-stretch hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {projects.map((project, idx) => (
                    <div key={project.id} className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-[380px] lg:w-[420px] flex transform transition-transform duration-500 hover:-translate-y-2">
                      <ProjectCard project={project} idx={idx} isEditing={isEditing} projects={projects} setProjects={setProjects} onProjectClick={onProjectClick} layout="default" />
                    </div>
                  ))}
                  {/* Spacer for last item to scroll into center comfortably */}
                  <div className="shrink-0 w-[10vw] md:w-[20vw]" />
                </div>
                
                {/* Scroll Hints (Gradients) */}
                <div className="absolute top-0 right-0 h-full w-24 bg-linear-to-l from-[#FDFDFB] to-transparent pointer-events-none hidden md:block z-10" />
                <div className="absolute top-0 left-0 h-full w-24 bg-linear-to-r from-[#FDFDFB] to-transparent pointer-events-none hidden md:block z-10" />
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-400 font-medium text-xs tracking-widest uppercase">
                  <span className="hidden md:block">←</span>
                  <span>Swipe to explore</span>
                  <span className="hidden md:block">→</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
