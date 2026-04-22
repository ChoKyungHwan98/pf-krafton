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
        <div className="bg-white rounded-4xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 p-8 md:p-12 lg:p-16 min-h-[80vh]">

        {/* High-Visibility Bold Filter Bar */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="flex flex-wrap items-center justify-center gap-3 p-3 bg-zinc-100/80 rounded-[2rem] border border-black/5">
            {categories.map((category) => {
              const count = category === '전체' 
                ? projects.length 
                : projects.filter(p => p.roles && p.roles.includes(category)).length;
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-6 py-3 rounded-2xl transition-all duration-300 group flex items-center gap-3 overflow-hidden shadow-sm ${
                    isActive 
                      ? 'bg-[#0047BB] text-white shadow-[#0047BB]/30' 
                      : 'bg-white text-zinc-600 hover:bg-zinc-50 border border-black/5'
                  }`}
                >
                  <span className="relative z-10 text-[15px] font-black uppercase tracking-wider leading-none">
                    {category}
                  </span>
                  <span className={`relative z-10 text-[10px] font-black px-2 py-0.5 rounded-md transition-colors duration-300 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-400'
                  }`}>
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* High-Contrast Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden border-2 border-zinc-100 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#0047BB]/30 hover:shadow-[0_32px_64px_-16px_rgba(0,71,187,0.15)] transition-all duration-500"
              >
                {/* Card Image */}
                <div className="aspect-16/10 overflow-hidden relative bg-zinc-50 border-b border-zinc-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h4 className="text-2xl font-display font-black tracking-tight text-zinc-900 group-hover:text-[#0047BB] transition-colors leading-tight">
                      {project.title}
                    </h4>
                    {project.status && (
                       <span className={`text-[11px] font-black px-4 py-2 rounded-xl border-2 shadow-lg leading-tight text-center min-w-[80px] ${
                         project.status === '미출시' 
                           ? 'bg-zinc-100 text-zinc-500 border-zinc-200 shadow-none' 
                           : 'bg-[#0047BB] text-white border-white/20 shadow-[#0047BB]/20'
                       }`}>
                         {project.status}
                       </span>
                    )}
                  </div>

                  <p className="text-zinc-500 text-[15px] leading-relaxed mb-8 line-clamp-2 font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest bg-zinc-100 px-3 py-1.5 rounded-xl border border-zinc-200">
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
