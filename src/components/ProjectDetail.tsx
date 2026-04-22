import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, FileText, Layout, Tag, Calendar, ScrollText, Grid, X, LayoutGrid, HelpCircle, ExternalLink, Sparkles, Calculator, MousePointer2 } from 'lucide-react';
import type { Project } from '../types';
import { EBookGallery } from './EBookGallery';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  isEditing?: boolean;
  onSaveContent?: (content: string) => void;
}

type TabType = 'overview' | 'document' | 'video' | 'link' | 'simulator' | 'prototype';

export const ProjectDetail = ({ project, onBack, isEditing, onSaveContent }: ProjectDetailProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentPage, setCurrentPage] = useState(0);
  const [showThumbnailGrid, setShowThumbnailGrid] = useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode; show: boolean; color: string }[] = [
    { id: 'overview', label: '개요', icon: <LayoutGrid className="w-3.5 h-3.5" />, show: true, color: '#0047BB' },
    { id: 'document', label: '기획서', icon: <FileText className="w-3.5 h-3.5" />, show: !!(project.gallery || project.pdfUrl), color: '#059669' },
    { id: 'prototype', label: '프로토타입', icon: <Sparkles className="w-3.5 h-3.5" />, show: !!project.prototypeUrl, color: '#7C3AED' },
    { id: 'video', label: '플레이 영상', icon: <Play className="w-3.5 h-3.5" />, show: !!project.videoUrl, color: '#EA580C' },
    { id: 'link', label: '링크', icon: <ExternalLink className="w-3.5 h-3.5" />, show: !!project.externalUrl, color: '#2563EB' },
    { id: 'simulator', label: '시뮬레이터', icon: <Calculator className="w-3.5 h-3.5" />, show: !!(project.simulatorUrl || project.hasSimulator || project.simulatorVideoUrl), color: '#DC2626' },
  ];

  const visibleTabs = tabs.filter(t => t.show);

  const galleryImages = project.gallery || [project.image];

  const theme = {
    bg: 'bg-white',
    text: 'text-zinc-900',
    border: 'border-zinc-200',
    accent: '#0047BB'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex-1 flex flex-col min-h-0 bg-zinc-100 overflow-hidden rounded-4xl"
    >
      {/* Premium Editorial Header */}
      <div className="shrink-0 h-16 bg-white border-b border-zinc-100 flex items-center px-8 gap-8 relative z-50">
        {/* Left: Project Identity */}
        <div className="flex items-center gap-4 min-w-[160px]">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] leading-none mb-1">Project</span>
            <span className="text-xs font-bold text-zinc-900 truncate max-w-[120px]">
              {project.title}
            </span>
          </div>
        </div>

        {/* Center: Unified Professional Tabs */}
        <div className="flex-1 flex justify-start gap-2">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ color: isActive ? tab.color : undefined }}
                className={`relative h-11 px-6 rounded-full flex items-center gap-3 transition-all duration-300 font-sans font-black text-[11px] uppercase tracking-[0.1em] group ${
                  isActive 
                    ? '' 
                    : 'text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTabPill" 
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: `${tab.color}15` }} // Slightly more visible 15%
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110 opacity-100' : 'group-hover:scale-110 opacity-70'}`}>
                  {tab.icon}
                </span>
                <span className="relative z-10">{tab.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabDot" 
                    className="w-1.5 h-1.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2" 
                    style={{ backgroundColor: tab.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-4">
          {activeTab === 'document' && (
            <div className="flex items-center gap-3 px-3 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200">
              <span className="text-[10px] font-bold text-zinc-500 tracking-widest">
                {String(currentPage + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </span>
            </div>
          )}
          <div className="w-px h-6 bg-zinc-200 mx-2" />
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 flex items-center justify-center transition-all duration-200 group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Main Content Area - Maximized Space */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#F8F8F6] relative">
        <AnimatePresence mode="wait">
          {activeTab === 'document' ? (
            <motion.div key="tab-document" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden bg-[#F8F8F6] relative"
            >
              {project.gallery ? (
                <EBookGallery images={galleryImages} currentIndex={currentPage} onPageChange={setCurrentPage} />
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
              
              {project.gallery && (
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end pointer-events-none z-50">
                  <div className="pointer-events-auto">
                    <button
                      onClick={() => setShowThumbnailGrid(true)}
                      className="flex items-center gap-3 px-6 py-3.5 bg-[#0047BB] text-white rounded-2xl shadow-2xl shadow-[#0047BB]/30 hover:scale-110 active:scale-95 transition-all font-sans font-black text-[11px] uppercase tracking-[0.3em]"
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
              className="flex-1 flex items-center justify-center p-12 bg-[#F8F8F6]"
            >
              <div className="max-w-2xl w-full">
                <div className="relative group p-1 bg-linear-to-br from-[#6D28D9] via-[#C084FC] to-[#6D28D9] rounded-[3rem] shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />
                  <div className="relative bg-white/80 rounded-[2.8rem] p-12 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-[#6D28D9]/10 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                      <Sparkles className="w-12 h-12 text-[#6D28D9]" />
                    </div>
                    <h3 className="text-4xl font-black text-zinc-900 mb-6 tracking-tight">LLM 시나리오 챗봇 체험</h3>
                    <p className="text-zinc-600 text-lg leading-relaxed mb-12 max-w-md font-medium">
                      NPC와의 자연스러운 대화를 통해 사건의 실마리를 풀어가는 지능형 시나리오 시스템을 직접 경험해 보세요.
                    </p>
                    <a 
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-20 bg-[#6D28D9] text-white rounded-4xl flex items-center justify-center gap-4 hover:bg-[#5B21B6] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-[#6D28D9]/30 group/btn"
                    >
                      <span className="text-xl font-black tracking-tight">시나리오 체험하러 가기</span>
                      <ExternalLink className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'prototype' ? (
            <motion.div key="tab-prototype" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 bg-white relative overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Subtle Architectural Grid */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
              />

              {/* Left Side: Editorial Info */}
              <div className="w-full lg:w-[460px] p-12 lg:p-16 relative z-10 flex flex-col justify-center gap-10 border-r border-zinc-200/60 bg-white">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#0047BB]" />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Development Efficiency</span>
                  </div>
                  <h3 className="text-5xl font-black text-zinc-900 mb-8 leading-[1.05] tracking-tighter">
                    Rapid <br />
                    <span className="text-[#0047BB]">Prototyping</span>
                  </h3>
                  <p className="text-zinc-500 text-base leading-relaxed font-medium">
                    기획의 핵심 메카니즘을 플레이어블 버전으로 신속하게 구현하여, <br/>
                    <strong>수치 밸런스와 조작감</strong>을 즉각적으로 검증합니다.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { title: "Logic Validation", desc: "복잡한 수치 공식의 실시간 계산 검증", icon: <Calculator className="w-4 h-4" /> },
                    { title: "User Experience", desc: "실제 유저 환경과 동일한 조작 피드백", icon: <MousePointer2 className="w-4 h-4" /> },
                    { title: "Iteration", desc: "아이디어에서 실행까지 24시간 이내 구현", icon: <Sparkles className="w-4 h-4" /> }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="group"
                    >
                      <div className="flex gap-5">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#0047BB]/5 group-hover:text-[#0047BB] transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-black text-zinc-900 mb-1 uppercase tracking-wider">{item.title}</div>
                          <div className="text-xs text-zinc-500 font-medium leading-normal">{item.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-10 border-t border-zinc-100">
                  <div className="text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-2">Build Status</div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-zinc-900">Stable Prototype v1.2.0</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Device Showcase */}
              <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-zinc-50 relative">
                <div className="relative">
                  {/* Premium Device Shadow */}
                  <div className="absolute inset-x-10 -bottom-10 h-20 bg-black/10 blur-3xl rounded-full" />
                  
                  <div className="relative w-[340px] h-[680px] bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-12 border-zinc-900 overflow-hidden">
                    {/* Device Hardware Details */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-900 rounded-b-3xl z-20 flex items-center justify-center">
                      <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                    </div>

                    <div className="w-full h-full bg-white overflow-hidden relative">
                      <div className="absolute inset-0 scale-[0.8] origin-center">
                        <iframe 
                          src={project.prototypeUrl}
                          className="w-[425px] h-[850px] border-0"
                          title="Prototype Viewer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interaction Hint */}
                <div className="absolute bottom-12 right-12 flex items-center gap-4 px-6 py-3 bg-white shadow-xl rounded-full border border-zinc-100 animate-bounce">
                  <div className="w-2 h-2 rounded-full bg-[#0047BB]" />
                  <span className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Interactive View</span>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'simulator' ? (
            <motion.div key="tab-simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 bg-white overflow-hidden"
            >
              <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                {/* Left: Calculation Engine (Editor) */}
                <div className="flex-1 border-r border-zinc-100 flex flex-col min-h-0 bg-zinc-50/50">
                  <div className="px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                      </div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-4">Core Engine — Python</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto p-12 font-mono text-[13px] leading-loose text-zinc-500">
                    <pre className="whitespace-pre">
{`# ── 밸런스 검증 로직 (Monte Carlo) ────────────────
def calculate_balance(params):
    # DPS 체인 계산
    atk_spd = (agi0 + upg_agi) * (1 + eq_agi_bonus)
    crit_m = 1 + (crit_tot / 100) * (cd0 + cdmg_upg - 1)
    
    # 몬스터 HP 역산 (TTK 목표 1.35s)
    nhp = tdps * 1.35 * dmg_rate(mnd)
    bhp = tdps * 35.0 * dmg_rate(bsd)
    
    # 지수 성장 곡선 시뮬레이션
    for stage in range(1, 2000):
        hp = nhp * (hpg ** (stage - 1))
        dps = dps_at(stage)
        ttk = hp / dps
        
        # 병목 구간(Bottleneck) 감지
        if ttk > 3.0: 
            return FAIL, "Stage " + stage`}
                    </pre>
                  </div>
                </div>

                {/* Right: Analytical Dashboard */}
                <div className="flex-1 flex flex-col p-12 lg:p-16 items-center justify-center relative overflow-hidden bg-white">
                  <div className="relative z-10 w-full max-w-lg">
                    <div className="mb-12">
                      <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8">
                        <Calculator className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">Analytical Tool</h3>
                      <p className="text-zinc-500 font-medium text-lg">37개 파라미터 기반의 정교한 실시간 수치 시뮬레이션</p>
                    </div>

                    <div className="group relative rounded-3xl overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] border border-zinc-100 bg-zinc-50">
                      {project.simulatorVideoUrl ? (
                        <div className="aspect-video w-full">
                          <iframe
                            src={project.simulatorVideoUrl.replace('watch?v=', 'embed/')}
                            title="Simulator Video"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <img 
                            src="./images/dorothia_simulator_desktop.png" 
                            alt="Simulator Mockup"
                            className="w-full aspect-video object-cover opacity-90"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-zinc-900/40 to-transparent flex flex-col justify-end p-10">
                            {project.simulatorUrl && (
                              <a 
                                href={project.simulatorUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-16 bg-[#0047BB] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#003799] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#0047BB]/20"
                              >
                                <span className="font-black text-sm uppercase tracking-widest">Launch Simulator</span>
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-10 grid grid-cols-2 gap-6">
                      <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-2">Sim Accuracy</div>
                        <div className="text-2xl font-black text-[#0047BB]">99.8%</div>
                      </div>
                      <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-2">Total Iterations</div>
                        <div className="text-2xl font-black text-zinc-900">2,000+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'video' ? (
            <motion.div key="tab-video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-8 bg-zinc-900"
            >
              <div className="flex-1 rounded-2xl overflow-hidden bg-black shadow-2xl relative group border border-white/5">
                <iframe src={project.videoUrl?.replace('watch?v=', 'embed/')} className="w-full h-full border-0" allowFullScreen />
              </div>
            </motion.div>
          ) : (
            <motion.div key="tab-overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto bg-[#F8F8F6] custom-scrollbar"
            >
              <div className="max-w-5xl mx-auto p-12 md:p-20">
                <div className="relative h-[450px] rounded-[3rem] overflow-hidden mb-20 shadow-2xl group border border-black/5">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[11px] font-black uppercase tracking-widest shadow-sm">#{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black text-white mb-4 leading-[0.9] tracking-tighter drop-shadow-2xl">{project.title}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                  <div className="md:col-span-2 space-y-16">
                    <section className="relative">
                      <div className="absolute -left-10 top-0 w-1.5 h-full bg-[#0047BB] opacity-20 rounded-full" />
                      <h3 className="text-3xl font-black text-[#1A1A1A] mb-10 flex items-center gap-4 tracking-tight">
                        <FileText className="w-8 h-8 text-[#0047BB]" /> 기획 의도 및 핵심 내용
                      </h3>
                      <div className="prose prose-zinc prose-xl max-w-none text-zinc-800 leading-[1.8] whitespace-pre-wrap font-medium">
                        {project.content}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-12">
                    <div className="bg-white rounded-[3rem] p-12 border border-black/5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.1)] sticky top-10 overflow-hidden group/meta">
                      <div className="absolute top-0 left-0 w-2 h-full bg-[#0047BB]" />
                      <div className="relative z-10">
                        <h4 className="text-[14px] font-black text-[#0047BB] uppercase tracking-[0.4em] mb-14 flex items-center gap-3">
                          <span className="w-10 h-px bg-[#0047BB]/20" />
                          Metadata
                        </h4>
                        <div className="space-y-12">
                          <div className="flex items-start gap-7 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#0047BB]/5 border border-[#0047BB]/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#0047BB] group-hover:text-white group-hover:scale-110">
                              <Tag className="w-6 h-6 text-[#0047BB] transition-colors group-hover:text-white" />
                            </div>
                            <div className="min-w-0 flex-1 pt-2">
                              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2 leading-none">Category</p>
                              <p className="text-2xl font-black text-[#1A1A1A] tracking-tight group-hover:text-[#0047BB] transition-colors">{project.category}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-7 group">
                            <div className="w-14 h-14 rounded-2xl bg-[#0047BB]/5 border border-[#0047BB]/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#0047BB] group-hover:text-white group-hover:scale-110">
                              <Calendar className="w-6 h-6 text-[#0047BB] transition-colors group-hover:text-white" />
                            </div>
                            <div className="min-w-0 flex-1 pt-2">
                              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-2 leading-none">Status</p>
                              <p className="text-2xl font-black text-[#1A1A1A] tracking-tight group-hover:text-[#0047BB] transition-colors">{project.status}</p>
                            </div>
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
