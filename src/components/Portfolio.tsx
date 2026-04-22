import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, MousePointer2 } from 'lucide-react';
import { EditableText } from './EditableText';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '../types';

interface PortfolioProps {
  onProjectClick: (p: Project) => void;
  isEditing: boolean;
  projects: Project[];
  setProjects: (p: Project[]) => void;
  setView: (v: any) => void;
  onBack: () => void;
  initialProjectId?: number | null;
}

export const Portfolio = ({ isEditing, projects, setProjects, onBack, initialProjectId }: PortfolioProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (initialProjectId != null) {
      const target = projects.find(p => p.id === initialProjectId);
      if (target) setSelectedProject(target);
    }
    window.scrollTo(0, 0);
  }, [initialProjectId, projects]);

  const categories = ['전체', ...Array.from(new Set(projects.flatMap(p => p.roles)))];
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredProjects = activeCategory === '전체'
    ? projects
    : projects.filter(p => p.roles && p.roles.includes(activeCategory));

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Subtle background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{background: 'rgba(0,71,187,0.04)'}}></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full blur-[100px]" style={{background: 'rgba(80,0,20,0.03)'}}></div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 p-8 md:p-12 lg:p-16 min-h-[80vh] flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Main Project List (Left Area) */}
          <div className="flex-1 order-2 lg:order-1 min-w-0">
            <motion.div layout className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative flex flex-col lg:flex-row bg-white hover:bg-[#F8FAFF] rounded-[2rem] overflow-hidden border border-black/5 cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:translate-x-2"
                  >
                    {/* Horizontal Thumbnail (Left) */}
                    <div className="w-full lg:w-[340px] aspect-video lg:aspect-auto lg:h-full overflow-hidden relative bg-zinc-100 shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                      
                      {project.status && (
                        <div className="absolute top-5 left-5 z-10">
                          <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black tracking-widest border backdrop-blur-md shadow-sm ${
                            project.status === '미출시'
                              ? 'bg-black/20 text-white border-white/20'
                              : 'bg-[#0047BB] text-white border-[#0047BB]'
                          }`}>
                            {project.status}
                          </div>
                        </div>
                      )}

                      {/* Mini Preview Hover Indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/5">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-2xl flex items-center justify-center text-[#0047BB] scale-50 group-hover:scale-100 transition-transform duration-500">
                          <MousePointer2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    {/* Horizontal Content (Center/Right) */}
                    <div className="p-8 lg:p-10 flex-1 flex flex-col min-w-0">
                      <div className="flex items-start justify-between gap-6 mb-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2">
                            {project.roles.map((role) => (
                              <span key={role} className="text-[10px] font-black text-[#0047BB] uppercase tracking-[0.1em] px-2.5 py-1 bg-[#0047BB]/5 rounded-lg border border-[#0047BB]/10">
                                {role}
                              </span>
                            ))}
                          </div>
                          <h4 className="text-2xl lg:text-3xl font-display font-black tracking-tight text-[#1A1A1A] group-hover:text-[#0047BB] transition-colors leading-tight">
                            {project.title}
                          </h4>
                        </div>
                        <div className="shrink-0 w-12 h-12 rounded-2xl border border-black/5 flex items-center justify-center group-hover:bg-[#0047BB] group-hover:border-[#0047BB] group-hover:text-white transition-all duration-300 text-zinc-400 bg-white shadow-sm">
                          <ArrowUpRight className="w-6 h-6" />
                        </div>
                      </div>

                      <p className="text-zinc-500 text-[14px] lg:text-[15px] leading-relaxed mb-8 line-clamp-2 font-medium max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 border border-black/5 px-3 py-1.5 rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        {/* Right Sidebar Filters */}
        <div className="w-full lg:w-[260px] shrink-0 order-1 lg:order-2">
          <div className="sticky top-32">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200">
              <div className="w-1.5 h-5 bg-[#0047BB] rounded-full" />
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">태그별 탐색</span>
            </div>
            <div className="flex flex-col gap-2">
              {categories.map((category) => {
                const count = category === '전체' 
                  ? projects.length 
                  : projects.filter(p => p.roles && p.roles.includes(category)).length;
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative w-full px-5 py-3.5 rounded-2xl transition-all duration-300 group flex items-center justify-between overflow-hidden border ${
                      isActive 
                        ? 'border-[#0047BB]/20 bg-[#0047BB]/5 shadow-sm' 
                        : 'border-transparent hover:bg-black/5 hover:border-black/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBg"
                        className="absolute inset-0 bg-[#0047BB]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className={`relative z-10 text-[13px] font-black uppercase tracking-[0.1em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-900'}`}>
                      {category}
                    </span>
                    <span className={`relative z-10 text-[11px] font-black px-2.5 py-1 rounded-lg transition-colors duration-300 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-zinc-200/50 text-zinc-400 group-hover:bg-zinc-200 group-hover:text-zinc-600'
                    }`}>
                      {String(count).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        </div>
      </motion.section>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-100">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
              <div className="absolute inset-0 flex items-center justify-center p-0 md:p-6 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.97 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                  className="w-[98vw] md:w-[95vw] h-[98vh] md:h-[95vh] max-w-[1600px] bg-bg-main md:rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden relative pointer-events-auto flex flex-col"
                >

                {/* Content - height fills modal, scroll managed per-tab */}
                <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                  <ProjectDetail
                    project={selectedProject}
                    onBack={() => setSelectedProject(null)}
                    isEditing={isEditing}
                    onSaveContent={(c) => {
                      const p = [...projects];
                      const i = p.findIndex(pp => pp.id === selectedProject.id);
                      if (i !== -1) { p[i].content = c; setProjects(p); setSelectedProject({ ...selectedProject, content: c }); }
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
