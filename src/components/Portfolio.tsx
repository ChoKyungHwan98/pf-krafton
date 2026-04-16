import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight, X, MousePointer2 } from 'lucide-react';
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

  const categories = Array.from(new Set(projects.map(p => p.category)));

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative">
      {/* Subtle background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{background: 'rgba(0,71,187,0.04)'}}></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full blur-[100px]" style={{background: 'rgba(80,0,20,0.03)'}}></div>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 pt-[140px] pb-[120px] px-6 md:px-12 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-400 hover:text-[#0047BB] transition-all mb-8 group font-mono tracking-[0.2em] text-[11px] uppercase font-black"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-[#0047BB] font-mono text-sm uppercase tracking-[0.3em] font-black">Archive . 02</span>
              <div className="w-16 h-px bg-zinc-200"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-display font-black tracking-tighter text-[#1A1A1A] leading-[0.9] mb-6"
            >
              Portfolio <span className="text-zinc-300">Gallery.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 text-lg font-medium leading-relaxed max-w-xl"
            >
              실전 프로젝트 기반의 시스템 기획, 밸런싱, 레벨 디자인 기록물입니다.
            </motion.p>
          </div>
        </div>

        {/* Project Categories */}
        <div className="space-y-28">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: catIdx * 0.05 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-sm font-black tracking-[0.2em] text-[#1A1A1A] uppercase flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#0047BB]"></div>
                  {category}
                </h3>
                <div className="flex-1 h-px bg-black/5"></div>
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase">
                  {String(projects.filter(p => p.category === category).length).padStart(2, '0')} Projects
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(p => p.category === category).map((project) => (
                  <motion.div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex flex-col bg-white rounded-[1.75rem] overflow-hidden border border-black/5 cursor-pointer hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] transition-shadow duration-500"
                  >
                    {/* Card Image */}
                    <div className="aspect-[16/11] overflow-hidden relative bg-zinc-100">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

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
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100]">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <div className="absolute inset-0 flex items-center justify-center p-0 md:p-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="w-full h-full max-w-5xl bg-[#FAFAFA] md:rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden relative pointer-events-auto flex flex-col"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-[110] w-11 h-11 rounded-full bg-black/10 hover:bg-[#0047BB] hover:text-white text-[#2C2C2C] flex items-center justify-center transition-all duration-200 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto">
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
