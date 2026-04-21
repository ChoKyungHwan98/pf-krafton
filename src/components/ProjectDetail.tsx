import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, FileText, Layout, ScrollText, ExternalLink, Calendar, Tag, User } from 'lucide-react';
import type { Project } from '../types';
import { EBookGallery } from './EBookGallery';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

type TabType = 'overview' | 'document' | 'video';

export const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentPage, setCurrentPage] = useState(0);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '개요', icon: <Layout className="w-3.5 h-3.5" /> },
    { id: 'document', label: '기획서', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'video', label: '영상', icon: <Play className="w-3.5 h-3.5" /> },
  ];

  const galleryImages = project.gallery || [project.image];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex-1 flex flex-col min-h-0 bg-transparent"
    >
      {/* Minimized Header */}
      <div className="shrink-0 flex items-center justify-between px-6 pt-3 pb-1 border-b border-black/5 bg-zinc-50/50">
        <span className="text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase">Project Detail</span>
      </div>

      {/* Tabs + Content */}
      <div className="flex-1 flex flex-col min-h-0 px-0 pb-0">
        {/* Tab bar - Integrated Counter */}
        <div className="shrink-0 flex items-center justify-between px-4 pt-2 relative z-20">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const colorSchemes = {
                overview: isActive ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-zinc-100/50 border-transparent text-zinc-500 hover:bg-zinc-100',
                document: isActive ? 'bg-[#0047BB] border-[#0047BB] text-white' : 'bg-zinc-100/50 border-transparent text-zinc-500 hover:bg-zinc-100',
                video: isActive ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white' : 'bg-zinc-100/50 border-transparent text-zinc-500 hover:bg-zinc-100',
              };

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-t-lg border-t border-x font-display font-bold text-[11px] uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 mb-[-1px] relative z-10 ${colorSchemes[tab.id]} ${isActive ? 'translate-y-[-1px] shadow-md pb-3' : 'hover:translate-y-[-1px]'}`}
                >
                  {tab.label}
                  {tab.id === 'document' && <ScrollText className="w-3.5 h-3.5 opacity-50" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {activeTab === 'document' && galleryImages.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pt-0"
              >
                <div className="flex items-center gap-8 bg-[#0047BB] px-10 py-3 rounded-full shadow-[0_10px_30px_rgba(0,71,187,0.3)] border-2 border-white/30 backdrop-blur-md">
                  <div className="text-[16px] font-black tracking-[0.3em] text-white flex items-center gap-4">
                    <span className="drop-shadow-md">{String(currentPage + 1).padStart(2, '0')}</span>
                    <span className="w-8 h-[2px] bg-white/40 rounded-full"></span>
                    <span className="text-white/50">{String(galleryImages.length).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 mt-3 h-1.5 w-48 justify-center">
                  {galleryImages.map((_, i) => (
                    <div
                      key={i}
                      className={`h-full rounded-full transition-all duration-500 ${i === currentPage ? 'bg-[#0047BB] w-10 shadow-[0_0_10px_rgba(0,71,187,0.5)]' : 'bg-zinc-200 w-2'}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right side spacer to balance the flex */}
          <div className="w-[100px] hidden md:block"></div>
        </div>

        {/* Tab card - fills remaining height */}
        <div className="flex-1 flex flex-col min-h-0 bg-white border-t border-black/5 shadow-sm relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'document' ? (
              <motion.div
                key="tab-document"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white"
              >
                <div className="w-full flex-1 min-h-0">
                  <EBookGallery 
                    images={galleryImages} 
                    onPageChange={setCurrentPage}
                    initialIndex={currentPage}
                  />
                </div>
              </motion.div>
            ) : activeTab === 'video' ? (
              <motion.div
                key="tab-video"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-8 bg-zinc-900"
              >
                <div className="flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl relative group">
                  <iframe
                    src={project.videoUrl?.replace('watch?v=', 'embed/')}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tab-overview"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 overflow-y-auto"
              >
                <div className="max-w-4xl mx-auto p-8 md:p-12">
                  <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-12 shadow-xl group">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">{project.title}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                      <section>
                        <h3 className="text-lg font-black text-zinc-900 mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#0047BB]" /> 기획 의도 및 핵심 내용
                        </h3>
                        <div className="prose prose-zinc max-w-none text-zinc-600 leading-relaxed whitespace-pre-wrap">
                          {project.content}
                        </div>
                      </section>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                        <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-6">Project Metadata</h4>
                        <div className="space-y-5">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                              <Tag className="w-4 h-4 text-[#0047BB]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Category</p>
                              <p className="text-sm font-bold text-zinc-900">{project.category}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                              <Calendar className="w-4 h-4 text-[#0047BB]" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Status</p>
                              <p className="text-sm font-bold text-zinc-900">{project.status}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
