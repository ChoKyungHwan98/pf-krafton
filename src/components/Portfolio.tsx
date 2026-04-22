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
        <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 p-8 md:p-16 min-h-[80vh]">


        {/* Premium Editorial Filter Bar */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="inline-flex flex-wrap items-center justify-center p-2 bg-zinc-100/50 rounded-4xl border border-black/5">
            {categories.map((category) => {
              const count = category === '전체' 
                ? projects.length 
                : projects.filter(p => p.roles && p.roles.includes(category)).length;
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-8 py-3 rounded-[1.75rem] transition-all duration-500 group flex items-center gap-3 overflow-hidden ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-[#1A1A1A]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#0047BB] shadow-[0_10px_25px_-5px_rgba(0,71,187,0.4)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-[13px] font-black uppercase tracking-[0.15em] leading-none transition-transform duration-500 group-hover:scale-105">
                    {category}
                  </span>
                  <span className={`relative z-10 text-[10px] font-black px-2 py-0.5 rounded-md transition-all duration-500 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-zinc-400 group-hover:bg-[#0047BB]/10 group-hover:text-[#0047BB]'
                  }`}>
                    {String(count).padStart(2, '0')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col bg-white rounded-[1.75rem] overflow-hidden border border-black/5 cursor-pointer hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] transition-shadow duration-500"
              >
                {/* Card Image */}
                <div className="aspect-16/11 overflow-hidden relative bg-zinc-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {project.status && (
                    <div className="absolute top-5 left-5 z-10">
                      <div className={`px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest border backdrop-blur-md shadow-sm ${
                        project.status === '미출시'
                          ? 'bg-black/20 text-white border-white/20'
                          : 'bg-[#0047BB] text-white border-[#0047BB]'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  )}

                  {/* Hover icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0047BB] shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                      <MousePointer2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="text-xl font-display font-black tracking-tight text-[#1A1A1A] group-hover:text-[#0047BB] transition-colors leading-tight">
                      <EditableText
                        value={project.title}
                        onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].title = v; setProjects(p); }}
                        isEditing={isEditing}
                      />
                    </h4>
                    <div className="shrink-0 w-9 h-9 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-[#0047BB] group-hover:border-[#0047BB] group-hover:text-white transition-all duration-300 text-zinc-400">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-2 font-medium">
                    <EditableText
                      value={project.description}
                      onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].description = v; setProjects(p); }}
                      isEditing={isEditing}
                      multiline
                    />
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 px-2.5 py-1 rounded-md border border-black/5">
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
