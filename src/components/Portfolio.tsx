import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, ArrowUpRight } from 'lucide-react';
import { EditableText } from './EditableText';
import type { Project } from '../types';

interface PortfolioProps {
  onProjectClick: (p: Project) => void;
  isEditing: boolean;
  projects: Project[];
  setProjects: (p: Project[]) => void;
  setView: (v: any) => void;
}

export const Portfolio = ({ onProjectClick, isEditing, projects, setProjects, setView }: PortfolioProps) => {
  const categories = Array.from(new Set(projects.map(p => p.category)));
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="pt-[160px] pb-[120px] px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors mb-6 group font-sans tracking-tight text-sm uppercase font-bold">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Home
          </button>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest font-bold">DOC. 02</span>
            <div className="w-12 h-px bg-zinc-300"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter text-[#2C2C2C] leading-tight">포트폴리오 갤러리.</h2>
        </div>
      </div>
      <div className="space-y-24">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#2C2C2C] border-b border-black/5 pb-4">
              <FileText className="w-5 h-5 text-[#0047BB]" /> {category}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(p => p.category === category).map((project, idx) => (
                <motion.div key={project.id} whileHover={{ y: -4 }} className="group relative flex flex-col bg-white border border-black/5 rounded-xl overflow-hidden hover:border-black/10 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[16/10] overflow-hidden relative border-b border-black/5 bg-zinc-100">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                    {project.status && (
                      <div className={`absolute top-4 left-4 border rounded-md px-3 py-1 text-[10px] font-sans font-bold tracking-tight shadow-sm ${project.status === '미출시' ? 'bg-zinc-100/90 text-zinc-500 border-zinc-200' : 'bg-[#0047BB]/90 text-white border-[#0047BB]'}`}>
                        <EditableText value={project.status} onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].status = v; setProjects(p); }} isEditing={isEditing} />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h4 className="text-xl font-bold mb-3 text-[#2C2C2C] group-hover:text-[#0047BB] transition-colors">
                      <EditableText value={project.title} onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].title = v; setProjects(p); }} isEditing={isEditing} />
                    </h4>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1">
                      <EditableText value={project.description} onSave={(v) => { const p = [...projects]; const i = p.findIndex(pp => pp.id === project.id); p[i].description = v; setProjects(p); }} isEditing={isEditing} multiline />
                    </p>
                    <button onClick={() => onProjectClick(project)}
                      className="w-full py-4 bg-white border border-black/10 text-[#2C2C2C] font-bold text-xs tracking-widest hover:border-[#0047BB] hover:text-[#0047BB] transition-colors flex items-center justify-center gap-2 uppercase rounded-xl">
                      자세히 보기 <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
