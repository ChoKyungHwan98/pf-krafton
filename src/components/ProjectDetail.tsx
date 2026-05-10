import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FileText, Tag, Calendar, X, LayoutGrid, HelpCircle, ExternalLink, Sparkles, Calculator, MousePointer2, ChevronRight, ArrowLeft, ArrowRight, RotateCw, Lock, MoreVertical, Minus, Square, Rocket, Users, UserCheck, Trophy } from 'lucide-react';
import type { Project } from '../types';
import { EBookGallery } from './EBookGallery';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  isEditing?: boolean;
  onSaveContent?: (content: string) => void;
}

type TabType = 'overview' | 'document' | 'scenario' | 'video' | 'link' | 'simulator' | 'prototype' | 'gantt';

export const ProjectDetail = ({ project, onBack, isEditing, onSaveContent }: ProjectDetailProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentPage, setCurrentPage] = useState(0);
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; show: boolean; color: string }[] = [
    { id: 'overview', label: '개요', icon: <LayoutGrid className="w-3.5 h-3.5" />, show: true, color: '#0047BB' },
    { id: 'document', label: project.documentLabel || '기획서', icon: <FileText className="w-3.5 h-3.5" />, show: !!(project.gallery || project.pdfUrl), color: '#059669' },
    { id: 'scenario', label: '시나리오 기획서', icon: <FileText className="w-3.5 h-3.5" />, show: !!project.scenarioGallery, color: '#D97706' },
    { id: 'prototype', label: '프로토타입', icon: <Sparkles className="w-3.5 h-3.5" />, show: !!project.prototypeUrl, color: '#7C3AED' },
    { id: 'video', label: '플레이 영상', icon: <Play className="w-3.5 h-3.5" />, show: !!project.videoUrl, color: '#EA580C' },
    { id: 'link', label: '링크', icon: <ExternalLink className="w-3.5 h-3.5" />, show: !!project.externalUrl && !project.hideExternalTab, color: '#2563EB' },
    { id: 'simulator', label: '시뮬레이터', icon: <Calculator className="w-3.5 h-3.5" />, show: !!(project.simulatorUrl || project.hasSimulator || project.simulatorVideoUrl), color: '#DC2626' },
    { id: 'gantt', label: '간트차트', icon: <Calendar className="w-3.5 h-3.5" />, show: !!project.ganttUrl, color: '#10B981' },
  ];

  const visibleTabs = tabs.filter(t => t.show);

  const galleryImages = activeTab === 'scenario' && project.scenarioGallery ? project.scenarioGallery : (project.gallery || [project.image]);

  const theme = {
    bg: 'bg-white',
    text: 'text-zinc-900',
    border: 'border-zinc-200',
    accent: '#0047BB'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
      className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden rounded-xl shadow-2xl border border-zinc-200"
    >
      {/* Windows 11 Edge/Chrome Style Browser Window Chrome */}
      <div className="shrink-0 flex flex-col bg-[#90959E] relative z-50">
        {/* Tab Bar & Window Controls Layer */}
        <div className="h-12 flex items-end px-2 pt-2 relative">
          {/* Tabs */}
          <div className="flex items-end gap-1 z-10 overflow-x-auto no-scrollbar">
            {visibleTabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const shimmerDelay = `${idx * 0.9}s`;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setCurrentPage(0); }}
                  className={`
                    relative h-10 px-5 flex items-center gap-2.5 rounded-t-[9px]
                    transition-all duration-150 min-w-[160px] max-w-[220px]
                    border-x border-t border-b-0
                    ${isActive
                      ? 'bg-white z-20 border-zinc-300'
                      : 'tab-shimmer bg-[#C4C7CC] border-[#A8ABB2] hover:bg-[#D0D3D8]'
                    }
                  `}
                  style={{
                    boxShadow: isActive ? `inset 0 3px 0 0 ${tab.color}` : undefined,
                    animationDelay: !isActive ? shimmerDelay : undefined,
                  }}
                >
                  <span
                    style={{ color: isActive ? tab.color : undefined }}
                    className={`flex shrink-0 ${isActive ? '' : 'text-zinc-700'}`}
                  >
                    {tab.icon}
                  </span>
                  <span
                    style={{ color: isActive ? tab.color : undefined }}
                    className={`text-[13px] tracking-tight truncate ${isActive ? 'font-black' : 'font-semibold text-zinc-700'}`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          <div className="flex-1" />
          
          {/* Windows Window Controls */}
          <div className="absolute top-0 right-0 h-8 flex items-start z-20">
            <button className="w-11 h-8 flex items-center justify-center hover:bg-black/5 transition-colors text-zinc-700">
              <Minus className="w-4 h-4" />
            </button>
            <button className="w-11 h-8 flex items-center justify-center hover:bg-black/5 transition-colors text-zinc-700">
              <Square className="w-3.5 h-3.5" />
            </button>
            <button onClick={onBack} className="w-11 h-8 flex items-center justify-center hover:bg-[#E81123] hover:text-white transition-colors text-zinc-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Address Bar Layer */}
        <div className="h-10 bg-white flex items-center px-2 gap-2 border-b border-zinc-200">
          <div className="flex items-center gap-1">
            <button onClick={onBack} className="w-7 h-7 rounded-md hover:bg-black/5 flex items-center justify-center text-zinc-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-md hover:bg-black/5 flex items-center justify-center text-zinc-400 transition-colors cursor-not-allowed">
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-7 h-7 rounded-md hover:bg-black/5 flex items-center justify-center text-zinc-600 transition-colors">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* URL Input */}
          <div className="flex-1 h-7 bg-[#F1F3F4] rounded-full flex items-center px-3 gap-2 border border-transparent hover:border-zinc-300 transition-colors group cursor-text">
            <Lock className="w-3 h-3 text-zinc-500 shrink-0" />
            <span className="text-[12px] text-zinc-800 font-medium font-sans flex-1 truncate">
              portfolio.local <span className="text-zinc-400">/</span> {project.roles[0].toLowerCase().replace(/ /g, '-')} <span className="text-zinc-400">/</span> {project.title.toLowerCase().replace(/ /g, '-')}
            </span>
          </div>

          {/* Extensions/Profile */}
          <div className="flex items-center gap-1 px-1">
            <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center border border-zinc-300 overflow-hidden shrink-0">
              <div className="w-3 h-3 bg-zinc-400 rounded-full mt-1" />
            </div>
            <button className="w-7 h-7 rounded-md hover:bg-black/5 flex items-center justify-center text-zinc-600 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Maximized Space */}
      <div className="flex-1 flex flex-col min-h-0 bg-white relative">
        <AnimatePresence mode="wait">
          {activeTab === 'document' || activeTab === 'scenario' ? (
            <motion.div key={`tab-${activeTab}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden bg-zinc-950 relative"
            >
              {(activeTab === 'scenario' ? project.scenarioGallery : project.gallery) ? (
                <EBookGallery images={galleryImages} currentIndex={currentPage} onPageChange={setCurrentPage} maxScale={project.id === 1 ? 100 : 88} />
              ) : project.pdfUrl ? (
                <iframe 
                  src={`${project.pdfUrl}#toolbar=0`} 
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-zinc-400 font-sans font-black text-xs uppercase tracking-widest">
                  기획서가 준비 중입니다.
                </div>
              )}
              
              {(activeTab === 'scenario' ? project.scenarioGallery : project.gallery) && (
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none z-50">
                  <div className="pointer-events-auto flex flex-col items-start gap-3">
                    {/* Page Counter Pill (Top) */}
                    <div className="flex items-center gap-4 px-5 py-2.5 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl text-white cursor-default transition-all hover:bg-black/50">
                      <span className="text-sm font-black tracking-widest">{String(currentPage + 1).padStart(2, '0')}</span>
                      <div className="w-px h-3.5 bg-white/20" />
                      <span className="text-[11px] font-bold text-white/50 tracking-widest">{String(galleryImages.length).padStart(2, '0')} Pages</span>
                    </div>

                    {/* View All Pages Button (Bottom) */}
                    <button
                      onClick={() => setShowThumbnailGrid(true)}
                      className="flex items-center gap-3 px-6 py-3.5 bg-[#0047BB] text-white rounded-2xl shadow-2xl shadow-[#0047BB]/30 hover:scale-105 active:scale-95 transition-all font-sans font-black text-[11px] uppercase tracking-[0.3em]"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      전체 페이지 보기
                    </button>
                  </div>

                  <div className="pointer-events-auto flex flex-col items-end gap-4">
                    {/* Help Tooltip */}
                    <div className="group relative">
                      <div className="absolute bottom-full right-0 mb-6 w-72 p-6 bg-black/95 backdrop-blur-2xl rounded-4xl text-white text-[12px] leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center gap-3 mb-4 text-[#0047BB] font-black tracking-widest uppercase text-[10px]">
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          조작 가이드
                        </div>
                        <ul className="space-y-2.5 text-zinc-300 font-medium">
                          <li className="flex justify-between items-center bg-white/5 p-2 rounded-lg"><span>마우스 휠</span> <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white">이동</span></li>
                          <li className="flex justify-between items-center bg-white/5 p-2 rounded-lg"><span>Ctrl + 휠</span> <span className="text-[10px] bg-[#0047BB] px-1.5 py-0.5 rounded text-white">확대/축소</span></li>
                          <li className="flex justify-between items-center bg-white/5 p-2 rounded-lg"><span>드래그</span> <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white">화면 이동</span></li>
                        </ul>
                      </div>
                      <button className="w-14 h-14 rounded-full bg-white text-[#0047BB] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-black/5">
                        <HelpCircle className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : activeTab === 'link' ? (
            <motion.div key="tab-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 bg-zinc-950"
            >
              <div className="max-w-4xl w-full flex flex-col items-center gap-8">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <a 
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-md h-20 bg-[#0047BB] text-white rounded-2xl flex items-center justify-center gap-4 hover:bg-[#003799] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-[#0047BB]/30 group/btn"
                >
                  <span className="text-2xl font-black tracking-tight">시작하기</span>
                  <ExternalLink className="w-7 h-7 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ) : activeTab === 'gantt' ? (
            <motion.div key="tab-gantt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 bg-zinc-950"
            >
              <div className="max-w-xl w-full flex flex-col items-center gap-8 text-center bg-zinc-900/50 p-12 rounded-3xl border border-white/10 shadow-2xl">
                <div className="w-24 h-24 bg-[#10B981]/10 rounded-3xl flex items-center justify-center shadow-inner border border-[#10B981]/20">
                  <Calendar className="w-12 h-12 text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-4">프로젝트 간트차트</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    노션(Notion)의 강력한 보안 정책으로 인해<br />
                    사이트 내부 직접 표시가 제한되어 있습니다.
                  </p>
                  <p className="text-zinc-500 text-sm mt-4">
                    아래 버튼을 클릭하시면 새 창에서 전체 화면으로 쾌적하게 확인하실 수 있습니다.
                  </p>
                </div>
                <a 
                  href={project.ganttUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 px-10 py-5 bg-[#10B981] hover:bg-[#059669] text-white rounded-2xl font-bold tracking-tight shadow-xl shadow-[#10B981]/20 flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group"
                >
                  <ExternalLink className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span className="text-xl">새 탭에서 노션 간트차트 보기</span>
                </a>
              </div>
            </motion.div>
          ) : activeTab === 'prototype' ? (
            <motion.div key="tab-prototype" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Subtle dot grid */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} 
              />

              {/* Left Side: Info */}
              <div className="w-full lg:w-[380px] p-10 lg:p-14 relative z-10 flex flex-col justify-center gap-8 border-r border-white/5 bg-zinc-900/30 backdrop-blur-md">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0047BB]" />
                    <span className="text-[10px] font-black text-[#0047BB] uppercase tracking-[0.3em]">Rapid Prototyping</span>
                  </div>
                  <h3 className="text-4xl font-black text-white mb-5 leading-[1.1] tracking-tighter">
                    바이브코딩<br />
                    <span className="text-zinc-400">프로토타입</span>
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    기획의 핵심 메카니즘을 플레이어블 버전으로 신속하게 구현하여,{' '}
                    <strong className="text-white">수치 밸런스와 조작감</strong>을 즉각적으로 검증합니다.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    { title: "바이브코딩", desc: "자연어 기반 신속 구현" },
                    { title: "유저 경험", desc: "실제 유저와 동일한 플레이 경험" },
                    { title: "로직 검증", desc: "복잡한 수치 공식 즉시 확인" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-zinc-700 group-hover:bg-[#0047BB] transition-colors rounded-full" />
                        <div>
                          <div className="text-xs font-black text-white mb-0.5 uppercase tracking-wider">{item.title}</div>
                          <div className="text-[11px] text-zinc-500 font-medium">{item.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 rounded-xl bg-[#0047BB]/10 border border-[#0047BB]/20 flex flex-col items-start relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket className="w-16 h-16" /></div>
                  <div className="text-[10px] text-[#0047BB] font-black uppercase tracking-[0.2em] mb-2 relative z-10">제작 소요 시간</div>
                  <div className="text-lg font-black text-white tracking-tight relative z-10">아이디어에서 실행까지</div>
                  <div className="text-xl font-black text-[#0047BB] mt-1 relative z-10">24시간 이내</div>
                </div>
              </div>

              {/* Right Side: Phone Frame */}
              <div className="flex-1 flex items-center justify-center p-6 lg:p-10 relative">
                <div className="relative group">
                  {/* Phone glow */}
                  <div className="absolute inset-0 bg-[#0047BB]/10 rounded-[3rem] blur-[60px] group-hover:bg-[#0047BB]/20 transition-all duration-700" />
                  
                  <div className="relative w-[360px] h-[620px] bg-[#0a0a0a] rounded-[3.5rem] shadow-2xl border-8 border-zinc-800 ring-1 ring-white/10 overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                      <div className="w-6 h-1 bg-white/5 rounded-full" />
                    </div>

                    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
                      <div className="scale-[0.78] origin-center">
                        <iframe 
                          src={project.prototypeUrl}
                          className="w-[450px] h-[750px] border-0"
                          title="Prototype Viewer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Hint */}
                <div className="absolute bottom-10 right-10 flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 animate-bounce">
                  <MousePointer2 className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">화면을 직접 조작해보세요</span>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'simulator' ? (
            <motion.div key="tab-simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-8 bg-zinc-900"
            >
              <div className="flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl relative group border border-white/5">
                <iframe 
                  src={project.simulatorVideoUrl?.includes('youtu.be/') ? project.simulatorVideoUrl.replace('youtu.be/', 'youtube.com/embed/') : project.simulatorVideoUrl?.replace('watch?v=', 'embed/')} 
                  className="w-full h-full border-0" 
                  allowFullScreen 
                />
              </div>
            </motion.div>
          ) : activeTab === 'video' ? (
            <motion.div key="tab-video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-8 bg-zinc-900"
            >
              <div className="flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl relative group border border-white/5">
                <iframe src={project.videoUrl?.includes('youtu.be/') ? project.videoUrl.replace('youtu.be/', 'youtube.com/embed/') : project.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full border-0" allowFullScreen />
              </div>
            </motion.div>
          ) : (
            <motion.div key="tab-overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#1B2838]"
            >
              {/* Steam-style Hero Banner — compact */}
              <div className="relative h-[160px] w-full shrink-0 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1B2838 0%, rgba(27,40,56,0.5) 55%, transparent 100%)' }} />

                {/* Top-left: role badges */}
                <div className="absolute top-4 left-6 flex flex-wrap gap-2">
                  {project.roles.map(role => (
                    <span key={role} className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest">{role}</span>
                  ))}
                </div>

                {/* Bottom: title only */}
                <div className="absolute bottom-0 left-0 right-0 px-7 pb-4">
                  <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-xl">{project.title}</h1>
                </div>
              </div>

              {/* Steam-style Main Layout: Video Left + Info Right — fills remaining height */}
              <div className="flex flex-row flex-1 min-h-0">

                {/* LEFT: Video fills the height */}
                <div className="flex-1 flex flex-col bg-[#1B2838] px-6 py-5 gap-3 min-w-0 min-h-0">
                  {/* YouTube Embed — flex-1 to fill */}
                  <div className="flex-1 min-h-0 rounded-sm overflow-hidden shadow-2xl border border-white/10 bg-black">
                    {project.overviewVideoUrl ? (
                      <iframe
                        src={
                          project.overviewVideoUrl.includes('youtu.be/')
                            ? project.overviewVideoUrl.replace('youtu.be/', 'youtube.com/embed/')
                            : project.overviewVideoUrl.replace('watch?v=', 'embed/')
                        }
                        className="w-full h-full border-0"
                        allowFullScreen
                        title={`${project.title} 영상`}
                      />
                    ) : project.externalUrl ? (
                      <div className="w-full h-full relative overflow-hidden">
                        {/* Full image */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
                        {/* CTA at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-8">
                          <a
                            href={project.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-8 py-3.5 rounded font-black text-white text-[13px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-2xl"
                            style={{ background: 'linear-gradient(135deg, #1a9fff 0%, #0d6fd4 100%)' }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            지금 플레이하기
                          </a>
                          <p className="text-white/50 text-[11px] font-medium">Gemini 플랫폼에서 실행됩니다</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm font-medium">
                        영상이 없습니다
                      </div>
                    )}
                  </div>

                  {/* Short blurb under video */}
                  <p className="shrink-0 text-[13px] text-[#c6d4df] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* RIGHT: Steam-style Info Panel */}
                <div className="w-[280px] shrink-0 bg-[#16202D] border-l border-white/10 flex flex-col p-5 gap-4 overflow-hidden">

                  {/* Key art thumbnail */}
                  <div className="w-full rounded-sm overflow-hidden border border-white/10 shadow-lg shrink-0">
                    <img src={project.image} alt={project.title} className="w-full object-cover" style={{ maxHeight: '130px' }} />
                  </div>

                  <div className="h-px bg-white/10 shrink-0" />

                  {/* Info rows */}
                  <div className="flex flex-col gap-3.5">
                    {/* Team Size */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#66c0f4]" />
                        <span className="text-[11px] font-black text-[#66c0f4] uppercase tracking-[0.15em]">팀 규모</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#c6d4df] leading-snug pl-5">
                        {project.stats?.teamSize ?? '—'}
                      </span>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Key Role */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#66c0f4]" />
                        <span className="text-[11px] font-black text-[#66c0f4] uppercase tracking-[0.15em]">주요 역할</span>
                      </div>
                      <span className="text-[13px] font-semibold text-[#c6d4df] leading-snug pl-5">
                        {project.stats?.myRole ?? '—'}
                      </span>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Achievement */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-[#90ee90]" />
                        <span className="text-[11px] font-black text-[#90ee90] uppercase tracking-[0.15em]">주요 성과</span>
                      </div>
                      <span className="text-[13px] font-bold text-[#90ee90] leading-snug pl-5">
                        {project.stats?.achievement ?? '—'}
                      </span>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Tags */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[11px] font-black text-[#8f98a0] uppercase tracking-[0.12em]">이 게임의 인기 태그</span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map(tag => (
                          <span key={tag}
                            className="px-2.5 py-1 rounded text-[#c6d4df] text-[11px] font-semibold cursor-default transition-colors"
                            style={{ background: '#1B2838', border: '1px solid #4b6a8a' }}
                          >
                            {tag.replace('#', '')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnail Grid Overlay */}
      <AnimatePresence>
        {showThumbnailGrid && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-120 bg-[#1A1A1A]/95 backdrop-blur-3xl p-16 flex flex-col"
          >
            <div className="flex items-center justify-between mb-16">
              <div className="flex flex-col">
                <span className="text-[#0047BB] text-[12px] font-black tracking-[0.5em] uppercase mb-3">Navigation</span>
                <h3 className="text-white text-5xl font-black tracking-tighter">전체 페이지 개요</h3>
              </div>
              <button
                onClick={() => setShowThumbnailGrid(false)}
                className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:rotate-90 border border-white/10"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-6 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-10">
                {galleryImages.map((img, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                    onClick={() => {
                      setCurrentPage(i);
                      setShowThumbnailGrid(false);
                    }}
                    className={`group relative aspect-3/4 rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:scale-110 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] ${i === currentPage ? 'border-[#0047BB] shadow-[0_0_40px_rgba(0,71,187,0.5)]' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <img src={img} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-opacity duration-500 ${i === currentPage ? 'bg-[#0047BB]/20' : 'bg-black/60 opacity-0 group-hover:opacity-100'}`} />
                    <div className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 rounded-xl bg-black/80 backdrop-blur-md text-white text-[12px] font-black border border-white/10">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="shrink-0 mt-12 text-center text-white/20 text-[11px] font-black tracking-[0.5em] uppercase">
              {galleryImages.length} Pages Overview • Selection: Page {currentPage + 1}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
