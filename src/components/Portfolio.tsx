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
          
          {/* Main Project Grid (Left Area) - High Density 2 Columns */}
          <div className="flex-1 order-2 lg:order-1 min-w-0">
            <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group relative flex flex-row bg-white hover:bg-[#F8FAFF] rounded-2xl overflow-hidden border border-black/5 cursor-pointer transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Compact Thumbnail (Left) */}
                    <div className="w-[160px] lg:w-[200px] overflow-hidden relative bg-zinc-100 shrink-0 aspect-[4/3] lg:aspect-auto">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-transparent opacity-60"></div>
                      
                      {project.status && (
                        <div className="absolute top-3 left-3 z-10">
                          <div className={`px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest border backdrop-blur-md shadow-sm ${
                            project.status === '미출시'
                              ? 'bg-black/20 text-white border-white/20'
                              : 'bg-[#0047BB] text-white border-[#0047BB]'
                          }`}>
                            {project.status}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Compact Content (Right) */}
                    <div className="p-4 lg:p-6 flex-1 flex flex-col min-w-0">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.roles.map((role) => (
                          <span key={role} className="text-[8px] font-black text-[#0047BB] uppercase tracking-[0.1em] px-2 py-0.5 bg-[#0047BB]/5 rounded-md border border-[#0047BB]/10">
                            {role}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-base lg:text-lg font-display font-black tracking-tight text-[#1A1A1A] group-hover:text-[#0047BB] transition-colors leading-tight truncate">
                          {project.title}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-[#0047BB] transition-colors shrink-0" />
                      </div>

                      <p className="text-zinc-500 text-[12px] leading-snug mb-4 line-clamp-1 font-medium">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 border border-black/5 px-2 py-1 rounded-md">
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
