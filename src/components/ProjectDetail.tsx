import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FileText, Layout, Tag, Calendar, ScrollText } from 'lucide-react';
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

  const getBookmarkTheme = () => {
    switch (activeTab) {
      case 'overview': return { bg: 'bg-white', text: 'text-zinc-900', border: 'border-zinc-200', dot: 'bg-zinc-400' };
      case 'document': return { bg: 'bg-[#0047BB]', text: 'text-white', border: 'border-white/30', dot: 'bg-[#0047BB]' };
      case 'video': return { bg: 'bg-[#1A1A1A]', text: 'text-white', border: 'border-white/20', dot: 'bg-black' };
      default: return { bg: 'bg-[#0047BB]', text: 'text-white', border: 'border-white/30', dot: 'bg-[#0047BB]' };
    }
  };

  const theme = getBookmarkTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex-1 flex flex-col min-h-0 bg-transparent"
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-8 pt-6 pb-2 bg-transparent">
        <span className="text-[11px] font-black tracking-[0.4em] text-zinc-300 uppercase">Project Detail</span>
      </div>

      {/* Tabs + Content */}
      <div className="flex-1 flex flex-col min-h-0 px-0 pb-0">
        <div className="shrink-0 flex items-center justify-between px-4 pt-2 relative z-20">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const colorSchemes = {
                overview: isActive 
                  ? 'bg-white border-zinc-300 text-zinc-900 shadow-lg scale-105 z-30' 
                  : 'bg-white/60 border-zinc-200 text-zinc-500 hover:bg-white hover:text-zinc-900 z-10',
                document: isActive 
                  ? 'bg-[#0047BB] border-[#0047BB] text-white shadow-[0_10px_20px_rgba(0,71,187,0.3)] scale-105 z-30' 
                  : 'bg-[#0047BB]/40 border-[#0047BB]/20 text-white/70 hover:bg-[#0047BB]/60 hover:text-white z-10',
                video: isActive 
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-lg scale-105 z-30' 
                  : 'bg-[#1A1A1A]/40 border-[#1A1A1A]/20 text-white/50 hover:bg-[#1A1A1A]/60 hover:text-white z-10',
              };

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-t-xl border-t border-x font-display font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 -mb-px relative ${colorSchemes[tab.id]} ${isActive ? 'pb-5 -translate-y-1' : 'pb-2.5'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            <motion.div 
              key={`bookmark-${activeTab}`}
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pt-0"
            >
              <div className={`flex items-center gap-8 ${theme.bg} px-10 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] border-2 ${theme.border} backdrop-blur-md transition-all duration-500`}>
                <div className={`text-[16px] font-black tracking-[0.3em] ${theme.text} flex items-center gap-4`}>
                  {activeTab === 'document' ? (
                    <>
                      <span className="drop-shadow-md">{String(currentPage + 1).padStart(2, '0')}</span>
                      <span className="w-8 h-[2px] bg-white/40 rounded-full"></span>
                      <span className="text-white/50">{String(galleryImages.length).padStart(2, '0')}</span>
                    </>
                  ) : activeTab === 'overview' ? (
                    <span className="text-[12px] uppercase tracking-[0.5em]">Project Overview</span>
                  ) : (
                    <span className="text-[12px] uppercase tracking-[0.5em]">Video Content</span>
                  )}
                </div>
              </div>
              
              {activeTab === 'document' && galleryImages.length > 1 && (
                <div className="flex gap-1.5 mt-3 h-2 w-64 justify-center items-center group/dots">
                  {galleryImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 hover:scale-150 ${i === currentPage ? `${theme.dot} w-10 shadow-lg` : 'bg-zinc-200 w-2 hover:bg-zinc-400'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="w-[100px] hidden md:block"></div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 bg-white border-t border-black/5 shadow-sm relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'document' ? (
              <motion.div key="tab-document" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col min-h-0 overflow-hidden bg-white"
              >
                <div className="w-full flex-1 min-h-0">
                  <EBookGallery images={galleryImages} currentIndex={currentPage} onPageChange={setCurrentPage} />
                </div>
              </motion.div>
            ) : activeTab === 'video' ? (
              <motion.div key="tab-video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col p-8 bg-zinc-900"
              >
                <div className="flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl relative group">
                  <iframe src={project.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full border-0" allowFullScreen />
                </div>
              </motion.div>
            ) : (
              <motion.div key="tab-overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 overflow-y-auto bg-[#FCFCFA]"
              >
                <div className="max-w-4xl mx-auto p-10 md:p-16">
                  <div className="relative h-[400px] rounded-4xl overflow-hidden mb-16 shadow-2xl group border border-black/5">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                      <div className="flex flex-wrap gap-2.5 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-sm">#{tag}</span>
                        ))}
                      </div>
                      <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tighter drop-shadow-lg">{project.title}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="md:col-span-2 space-y-12">
                      <section className="relative">
                        <div className="absolute -left-6 top-0 w-1 h-full bg-[#0047BB]/10 rounded-full" />
                        <h3 className="text-2xl font-black text-[#1A1A1A] mb-8 flex items-center gap-3 tracking-tight">
                          <FileText className="w-6 h-6 text-[#0047BB]" /> 기획 의도 및 핵심 내용
                        </h3>
                        <div className="prose prose-zinc prose-lg max-w-none text-zinc-800 leading-[1.8] whitespace-pre-wrap font-medium">
                          {project.content}
                        </div>
                      </section>
                    </div>

                    <div className="space-y-8">
                      <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm sticky top-0">
                        <h4 className="text-[12px] font-black text-[#0047BB] uppercase tracking-[0.3em] mb-10 border-b border-zinc-100 pb-4">Project Metadata</h4>
                        <div className="space-y-8">
                          <div className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                              <Tag className="w-5 h-5 text-[#0047BB]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Category</p>
                              <p className="text-lg font-black text-[#1A1A1A]">{project.category}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-5">
                            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                              <Calendar className="w-5 h-5 text-[#0047BB]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Status</p>
                              <p className="text-lg font-black text-[#1A1A1A]">{project.status}</p>
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
