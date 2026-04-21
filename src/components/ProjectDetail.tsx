import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Edit2, Play, Calendar, Tag, ChevronDown, List as ListIcon, X, ScrollText, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EditableText } from './EditableText';
import { EBookGallery } from './EBookGallery';
import type { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  isEditing: boolean;
  onSaveContent: (content: string) => void;
}

type TabId = 'overview' | 'document' | 'video';

export const ProjectDetail = ({ project, onBack, isEditing, onSaveContent }: ProjectDetailProps) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const headings = project.content.match(/^##\s+(.*)/gm)?.map(h => h.replace(/^##\s+/, '')) || [];
  const generateId = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-가-힣]/g, '');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: '개요' },
    { id: 'document', label: '기획서' },
    { id: 'video', label: '영상' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-transparent pt-6 pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-3 md:py-4 mb-8 -mx-6 px-6 md:-mx-12 md:px-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black tracking-widest text-zinc-300 uppercase truncate">Project Detail</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-0 relative">
          <div className="flex flex-col gap-0 relative">
            {/* Stationery Style Tabs */}
            <div className="flex flex-wrap gap-1.5 px-6 relative z-20 pointer-events-none">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                // Studio stationery palette
                const colorSchemes = [
                  'bg-zinc-100 text-zinc-600 border-zinc-200', // Overview (Zinc)
                  'bg-[#0047BB] text-white border-[#0047BB]', // Document (Brand Blue)
                  'bg-zinc-800 text-white border-zinc-900',  // Video (Charcoal)
                ];
                const scheme = colorSchemes[idx % colorSchemes.length];

                return (
                  <motion.div
                    key={tab.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative group pointer-events-auto"
                  >
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-t-xl border-t border-x font-display font-bold text-[12px] uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 mb-[-1px] relative z-10 ${scheme} ${isActive ? 'translate-y-[-2px] shadow-lg pb-4' : 'hover:translate-y-[-1px]'}`}
                    >
                      {tab.label}
                      {tab.id === 'document' && <ScrollText className="w-3.5 h-3.5 opacity-50" />}
                      {tab.id === 'video' && <Play className="w-3.5 h-3.5 opacity-50" />}
                    </button>
                  </motion.div>
                );
              })}
            </div>
            <div className="bg-white border border-black/5 rounded-b-3xl rounded-tr-3xl overflow-hidden shadow-sm relative group z-10 min-h-[500px]">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat bg-size-[100px_100px]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
              
              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'document' ? (
                  <motion.div
                    key="tab-document"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative w-full bg-[#FDFDFB] p-6 lg:p-10"
                  >
                    <div className="max-w-[900px] mx-auto">
                      <EBookGallery images={project.gallery || [project.image]} />
                    </div>
                  </motion.div>
                ) : activeTab === 'video' ? (
                  <motion.div
                    key="tab-video"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative w-full bg-black flex flex-col"
                  >
                    {project.videoUrl ? (
                      <div className="w-full aspect-video bg-black">
                        {project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                          <iframe
                            src={project.videoUrl.replace('watch?v=', 'embed/').split('&')[0]}
                            className="w-full h-full"
                            allowFullScreen
                            title="Project Video"
                          />
                        ) : (
                          <video src={project.videoUrl} controls className="w-full h-full" />
                        )}
                      </div>
                    ) : (
                      <div className="w-full aspect-video flex flex-col items-center justify-center text-zinc-500 bg-zinc-900">
                        <Play className="w-12 h-12 mb-4 opacity-20" />
                        <p>등록된 영상이 없습니다.</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col w-full"
                  >
                    {/* Overview Header Image */}
                    <div className="aspect-21/9 w-full relative border-b border-black/5 bg-zinc-100 overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 z-10 w-[90%] max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight drop-shadow-md leading-tight">{project.title}</h1>
                      </div>
                    </div>
                    
                    {/* Horizontal Metadata Bar */}
                    <div className="border-b border-black/5 bg-zinc-50/80 backdrop-blur-sm">
                      <div className="max-w-4xl mx-auto w-full px-8 py-6 flex flex-col md:flex-row gap-8 justify-between">
                        <div className="flex gap-8 flex-wrap">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Tag className="w-3 h-3" /> ROLE</span>
                            <span className="font-bold text-[#2C2C2C] text-[15px]">{project.category}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Play className="w-3 h-3" /> STATUS</span>
                            <span className={`inline-flex px-2.5 py-1 rounded text-[11px] font-bold tracking-tight ${project.status === '미출시' ? 'bg-zinc-200 text-zinc-600' : 'bg-[#0047BB]/10 text-[#0047BB]'}`}>{project.status}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Tag className="w-3 h-3" /> TAGS</span>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.map((tag, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-[11px] font-bold text-zinc-600">#{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inline Table of Contents */}
                    {!isEditing && headings.length > 0 && (
                      <div className="max-w-4xl mx-auto w-full px-8 pt-12">
                        <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <h3 className="text-sm font-display font-bold text-[#2C2C2C] mb-4 flex items-center gap-2 border-b border-black/5 pb-3">
                            <ListIcon className="w-4 h-4 text-[#0047BB]" /> Contents
                          </h3>
                          <nav className="flex flex-wrap gap-x-8 gap-y-3">
                            {headings.map((heading, idx) => (
                              <a key={idx} href={`#${generateId(heading)}`} className="text-[13px] text-zinc-500 hover:text-[#0047BB] font-medium transition-colors flex items-center gap-2 group">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 group-hover:bg-[#0047BB] transition-colors"></span>
                                {heading}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                    )}
                    
                    {/* Overview Content */}
                    <div className="p-8 lg:p-12 max-w-4xl mx-auto w-full">
                      {isEditing ? (
                        <div className="flex flex-col h-full min-h-[500px]">
                          <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200">
                            <div className="flex items-center gap-2 text-[#0047BB] font-bold"><Edit2 className="w-4 h-4" /> 마크다운 편집 모드</div>
                            <span className="text-xs text-zinc-500 font-mono">* 지원 문법: # 제목, **강조**, - 목록, [링크](url)</span>
                          </div>
                          <textarea value={project.content} onChange={(e) => onSaveContent(e.target.value)}
                            className="flex-1 w-full p-6 bg-bg-main border border-black/10 rounded-xl focus:outline-none focus:border-[#0047BB] font-mono text-sm leading-relaxed text-[#2C2C2C] resize-y shadow-inner h-[500px]"
                            placeholder="프로젝트 상세 내용을 마크다운으로 입력하세요..." />
                        </div>
                      ) : (
                        <div className="prose prose-zinc prose-lg max-w-none text-[#2C2C2C] leading-loose
                          prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#2C2C2C]
                          prose-h1:text-3xl prose-h1:mb-8 prose-h1:pb-6 prose-h1:border-b prose-h1:border-black/5
                          prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-[#0047BB]
                          prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8
                          prose-p:mb-6 prose-p:text-[16px] prose-p:leading-relaxed prose-p:text-zinc-600
                          prose-strong:text-[#2C2C2C] prose-strong:font-bold prose-strong:bg-[#0047BB]/5 prose-strong:px-1
                          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-zinc-600
                          prose-li:my-2 prose-li:leading-relaxed
                          prose-blockquote:border-l-4 prose-blockquote:border-[#0047BB] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-500 prose-blockquote:bg-zinc-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                          prose-a:text-[#0047BB] prose-a:no-underline hover:prose-a:underline">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>


        </div>
      </div>
    </motion.div>
  );
};
