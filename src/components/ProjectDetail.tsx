import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Edit2, Play, Calendar, Tag, ChevronDown, List as ListIcon, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EditableText } from './EditableText';
import type { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  isEditing: boolean;
  onSaveContent: (content: string) => void;
}

export const ProjectDetail = ({ project, onBack, isEditing, onSaveContent }: ProjectDetailProps) => {
  const headings = project.content.match(/^##\s+(.*)/gm)?.map(h => h.replace(/^##\s+/, '')) || [];
  const generateId = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-가-힣]/g, '');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto w-full">
        <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors mb-8 group font-sans tracking-tight text-sm uppercase font-bold">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Project List
        </button>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="bg-white border border-black/5 rounded-3xl overflow-hidden shadow-sm relative group">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat bg-[size:100px_100px]" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}></div>
              <div className="aspect-[21/9] w-full relative border-b border-black/5 bg-zinc-100 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 z-10 w-[80%]">
                  <div className="flex gap-2 mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-[11px] font-bold tracking-widest text-white uppercase">{project.category}</span>
                    {project.status && <span className={`px-3 py-1 rounded-md text-[11px] font-bold tracking-widest text-white uppercase shadow-sm ${project.status === '미출시' ? 'border border-white/30 bg-black/40 backdrop-blur-md text-zinc-300' : 'bg-[#0047BB] shadow-lg shadow-[#0047BB]/30'}`}>{project.status}</span>}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight drop-shadow-md leading-tight">{project.title}</h1>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                {isEditing ? (
                  <div className="flex flex-col h-full min-h-[500px]">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200">
                      <div className="flex items-center gap-2 text-[#0047BB] font-bold"><Edit2 className="w-4 h-4" /> 마크다운 편집 모드</div>
                      <span className="text-xs text-zinc-500 font-mono">* 지원 문법: # 제목, **강조**, - 목록, [링크](url)</span>
                    </div>
                    <textarea value={project.content} onChange={(e) => onSaveContent(e.target.value)}
                      className="flex-1 w-full p-6 bg-[#FAFAFA] border border-black/10 rounded-xl focus:outline-none focus:border-[#0047BB] font-mono text-sm leading-relaxed text-[#2C2C2C] resize-y shadow-inner h-[500px]"
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
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm flex flex-col">
              <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-6 flex items-center gap-3 border-b border-black/5 pb-4"><ListIcon className="w-5 h-5 text-[#0047BB]" /> Project Info</h3>
              <div className="space-y-6">
                <div><span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> ROLE</span><p className="font-bold text-[#2C2C2C] text-[15px]">{project.category}</p></div>
                <div><span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-2"><Play className="w-3.5 h-3.5" /> STATUS</span><div className={`inline-flex px-2.5 py-1 rounded text-[11px] font-bold tracking-tight ${project.status === '미출시' ? 'bg-zinc-100 text-zinc-500 border border-zinc-200' : 'bg-[#0047BB]/10 text-[#0047BB] border border-[#0047BB]/20'}`}>{project.status}</div></div>
                <div><span className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> TAGS</span><div className="flex flex-wrap gap-2">{project.tags.map((tag, idx) => (<span key={idx} className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-bold text-zinc-600">#{tag}</span>))}</div></div>
              </div>
            </div>
            {headings.length > 0 && (
              <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm print:hidden sticky top-[100px]">
                <h3 className="text-xl font-display font-bold text-[#2C2C2C] mb-6 flex items-center gap-3 border-b border-black/5 pb-4"><ScrollText className="w-5 h-5 text-[#0047BB]" /> Contents</h3>
                <nav className="flex flex-col gap-3 relative">
                  <div className="absolute left-1.5 top-2 bottom-2 w-px bg-zinc-100 z-0"></div>
                  {headings.map((heading, idx) => (
                    <a key={idx} href={`#${generateId(heading)}`} className="text-[14px] text-zinc-500 hover:text-[#0047BB] font-medium transition-colors flex items-center gap-3 group relative z-10 py-1">
                      <div className="w-3 h-3 rounded-full bg-white border-2 border-zinc-200 group-hover:border-[#0047BB] transition-colors shrink-0"></div>
                      <span className="line-clamp-1">{heading}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
