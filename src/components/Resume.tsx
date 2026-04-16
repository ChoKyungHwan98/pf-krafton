import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ScrollText, Mail, Phone, GraduationCap, Award, Briefcase, Plus, X, Wrench, Figma, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';
import { EditableText } from './EditableText';
import { CoverLetter } from './CoverLetter';
import type { ResumeData } from '../types';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  Word: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 group-hover:text-[#2b579a] transition-colors"><path d="M4.17 6.43l7.33-1.07v13.28l-7.33-1.07V6.43zm8.33-1.25V18.82l7.33 1.07V4.11L12.5 5.18zM6.5 8.79l1.19.12.8 4.23.95-4.23h1.05l.93 4.23.77-4.23 1.25.12-1.39 6.27h-1.12l-.98-4.32-.98 4.32H8l-1.5-6.51z"/></svg>,
  PowerPoint: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 group-hover:text-[#d24726] transition-colors"><path d="M4.18 6.48l7.32-1.07v13.2l-7.32-1.07V6.48zm8.32-1.32v13.68l7.32 1.07V4.09L12.5 5.16zM8.38 8.81h2.24c1.17 0 1.95.73 1.95 1.83 0 1.1-.78 1.83-1.95 1.83H9.4v3.23H8.38V8.81zm1.02.83v2.09h1.16c.55 0 .9-.36.9-.99 0-.64-.35-1.1-.9-1.1H9.4z"/></svg>,
  Excel: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 group-hover:text-[#217346] transition-colors"><path d="M4.18 6.48l7.32-1.07v13.2l-7.32-1.07V6.48zm8.32-1.32v13.68l7.32 1.07V4.09L12.5 5.16zm-5.74 3.73l1.14.15.82 2.37.89-2.37h1.02l-1.36 3.19 1.48 3.32h-1.14l-1.01-2.43-1 2.43H6.42l1.52-3.32-1.42-3.34z"/></svg>,
  Notion: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 group-hover:text-black transition-colors"><path d="M4.459 4.208c-.755 0-1.282.49-1.282 1.17v13.244c0 .679.527 1.17 1.282 1.17h15.082c.755 0 1.282-.491 1.282-1.17V5.378c0-.68-.527-1.17-1.282-1.17H4.459zM2.8 5.378c0-1.27 1.013-2.301 2.261-2.301h13.878C20.187 3.077 21.2 4.108 21.2 5.378v13.244c0 1.27-1.013 2.301-2.261 2.301H5.06A2.28 2.28 0 012.8 18.622V5.378zm5.553 10.603V8.895l4.896 6.945V8.125h1.196v7.856l-4.896-6.945v6.945H8.353z"/></svg>,
  Figma: <Figma className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:text-[#f24e1e] transition-colors" />,
  Unity: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 group-hover:text-black transition-colors"><path d="M12 1.41l10.59 6.1v12.2L12 25.82 1.41 19.71V7.51zM12 3.8L3.8 8.53v9.42l8.2 4.71 8.2-4.71V8.53zM12 12.35l7-4.04-1.26-2.18-5.38 3.1-6.19-4.88-1.56 1.94 4.86 3.82-4.48 2.58L6.2 14.8l5.8-3.35z"/></svg>,
};

interface ResumeProps {
  setView: (v: any) => void;
  onBack: () => void;
  isEditing: boolean;
  data: ResumeData;
  setData: (d: ResumeData) => void;
}

export const Resume = ({ setView, onBack, isEditing, data, setData }: ResumeProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsGeneratingPdf(true);
    const element = printRef.current;
    
    // Temporarily make it visible for PDF generation
    const origPosition = element.style.position;
    const origLeft = element.style.left;
    const origTop = element.style.top;
    const origZIndex = element.style.zIndex;
    
    element.style.position = 'absolute';
    element.style.left = '0';
    element.style.top = '0';
    element.style.zIndex = '-9999';
    
    try {
      const opt = {
        margin: [-8, 0, 0, 0], // Reduce top margin to fix blank page issue
        filename: '조경환_게임기획자_포트폴리오.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation failed', err);
    } finally {
      element.style.position = origPosition;
      element.style.left = origLeft;
      element.style.top = origTop;
      element.style.zIndex = origZIndex;
      setIsGeneratingPdf(false);
    }
  };

  return (
    <>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="pt-28 pb-12 md:pt-36 md:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full min-h-screen flex flex-col">
        
        {/* Utility Bar (Top Navigation) */}
        <div className="sticky top-0 z-[100] flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 md:py-6 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-black/5 mb-8 -mx-6 px-6 md:-mx-12 md:px-12">
          {/* Left: Go Back */}
          <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors group font-sans tracking-tight text-sm font-bold w-[180px]">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 대시보드
          </button>

          {/* Center: Segmented Control */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center bg-zinc-200/50 p-1 rounded-full border border-black/5">
              <button 
                onClick={() => setActiveTab('resume')}
                className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'resume' ? 'text-white' : 'text-zinc-500 hover:text-[#2C2C2C]'}`}
              >
                {activeTab === 'resume' && (
                  <motion.div layoutId="activeTabBadge" className="absolute inset-0 bg-[#0047BB] rounded-full" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">이력서</span>
              </button>
              <button 
                onClick={() => setActiveTab('cover-letter')}
                className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'cover-letter' ? 'text-white' : 'text-zinc-500 hover:text-[#2C2C2C]'}`}
              >
                {activeTab === 'cover-letter' && (
                  <motion.div layoutId="activeTabBadge" className="absolute inset-0 bg-[#0047BB] rounded-full" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">자기소개서</span>
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex justify-end w-[180px]">
            <button onClick={handleDownload} disabled={isGeneratingPdf}
              className="px-5 py-2.5 bg-white border border-black/10 rounded-xl text-[#2C2C2C] font-bold flex items-center justify-center gap-2 hover:border-[#0047BB] hover:text-[#0047BB] transition-all duration-300 text-xs tracking-widest shadow-sm disabled:opacity-50">
              {isGeneratingPdf ? (
                <><span className="animate-spin inline-block w-4 h-4 border-2 border-[#0047BB] border-t-transparent rounded-full" /> ...</>
              ) : (
                <><ScrollText className="w-3.5 h-3.5 text-[#0047BB]" /> PDF 저장</>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Area: Profiler Sidebar + Content Render */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 flex-1">
          
          {/* Left Sidebar: Profile (Persistent) */}
          <div className="lg:col-span-4 shrink-0">
            <div className="sticky top-32 space-y-8">
              {/* Profile Card */}
              <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 transition-colors">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-black/5 shadow-sm mb-6">
                  <img src="https://picsum.photos/seed/profile/400/400" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-[#2C2C2C] tracking-tight mb-2">
                  <EditableText value={data.name} onSave={(v) => setData({...data, name: v})} isEditing={isEditing} />
                </h1>
                <p className="text-[#0047BB] font-bold font-mono tracking-widest text-xs uppercase mb-6">
                  <EditableText value={data.role} onSave={(v) => setData({...data, role: v})} isEditing={isEditing} />
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <EditableText value={data.email} onSave={(v) => setData({...data, email: v})} isEditing={isEditing} />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                    <Phone className="w-4 h-4 text-zinc-400" />
                    <EditableText value={data.phone} onSave={(v) => setData({...data, phone: v})} isEditing={isEditing} />
                  </div>
                </div>
              </div>

              {/* Tools Section (Only visible in Resume Mode ideally, but keeping it persistent adds value to the overview) */}
              <AnimatePresence mode="popLayout">
                {activeTab === 'resume' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5"
                  >
                    <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase mb-4">Core Skills</h3>
                    {data.tools && data.tools.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {data.tools.map((tool, idx) => (
                          <span key={idx} className="group relative px-4 py-2 bg-white rounded-xl text-xs font-bold text-zinc-600 border border-black/5 hover:border-[#0047BB] hover:bg-[#0047BB]/5 hover:text-[#2C2C2C] transition-all cursor-help flex items-center justify-center gap-2 overflow-visible shadow-sm hover:shadow-md">
                            {TOOL_ICONS[tool.name] || <Wrench className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:text-[#0047BB] transition-colors" />}
                            <EditableText value={tool.name} onSave={(v) => { const t = [...(data.tools||[])]; t[idx].name = v; setData({...data, tools: t}); }} isEditing={isEditing} />
                            <Info className="w-3 h-3 text-zinc-400 group-hover:text-[#0047BB] transition-colors" />
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0047BB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:-translate-y-2 group-hover:opacity-100 transition-all z-[100] mb-3 w-max max-w-[320px] bg-[#2C2C2C] border border-white/10 text-white text-xs leading-[1.6] p-3 rounded-xl shadow-xl whitespace-pre-wrap font-medium text-left">
                              <EditableText value={tool.description} onSave={(v) => { const t = [...(data.tools||[])]; t[idx].description = v; setData({...data, tools: t}); }} isEditing={isEditing} />
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-[#2C2C2C] border-t-8 border-x-transparent border-x-8 border-b-0 w-0 h-0"></div>
                            </div>
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Area: Dynamic View (Resume or Cover Letter) */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              {activeTab === 'resume' ? (
                /* Resume Content */
                <motion.div 
                  key="resume"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Summary */}
                  <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-black/5">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-[#2C2C2C]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#0047BB]"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> 
                      소개
                    </h3>
                    <div className="text-[15px] text-zinc-600 leading-[1.8] font-medium break-keep">
                      <EditableText value={data.summary} onSave={(v) => setData({...data, summary: v})} isEditing={isEditing} markdown={true} />
                    </div>
                  </section>

                  {/* Experience */}
                  <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-black/5">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-[#2C2C2C]">
                      <Briefcase className="text-[#0047BB] w-5 h-5" /> 프로젝트 경험
                    </h3>
                    <div className="space-y-10">
                      {data.experience.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 border-l-[3px] border-[#0047BB]/20">
                          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0047BB] border-4 border-white shadow-sm"></div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                            <h4 className="font-bold text-xl text-[#2C2C2C]">
                              <EditableText value={exp.title} onSave={(v) => { const e = [...data.experience]; e[idx].title = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                            </h4>
                            <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full shrink-0">
                              <EditableText value={exp.period} onSave={(v) => { const e = [...data.experience]; e[idx].period = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                            </span>
                          </div>
                          <div className="text-[15px] text-[#0047BB] font-semibold mb-4 bg-[#0047BB]/5 inline-block px-3 py-1.5 rounded-lg border border-[#0047BB]/10">
                            <EditableText value={exp.description} onSave={(v) => { const e = [...data.experience]; e[idx].description = v; setData({...data, experience: e}); }} isEditing={isEditing} markdown={true} />
                          </div>
                          <ul className="text-[14px] text-zinc-600 space-y-2.5 list-none leading-relaxed">
                            {exp.details.map((detail, dIdx) => (
                              <li key={dIdx} className="relative pl-4">
                                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-zinc-300 rounded-full"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Education */}
                    <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5">
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-[#2C2C2C]">
                        <GraduationCap className="text-[#0047BB] w-5 h-5" /> 학력 및 교육
                      </h3>
                      <div className="space-y-6">
                        {data.education.map((edu, idx) => (
                          <div key={idx} className="relative pl-6 border-l-2 border-black/10">
                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-none bg-zinc-300"></div>
                            <div className="flex flex-col gap-1 mb-2">
                              <h4 className="font-bold text-[15px] text-[#2C2C2C] leading-snug">
                                <EditableText value={edu.title} onSave={(v) => { const e = [...data.education]; e[idx].title = v; setData({...data, education: e}); }} isEditing={isEditing} />
                              </h4>
                              <span className="text-[11px] font-mono text-zinc-400">
                                <EditableText value={edu.period} onSave={(v) => { const e = [...data.education]; e[idx].period = v; setData({...data, education: e}); }} isEditing={isEditing} />
                              </span>
                            </div>
                            <div className="text-xs text-zinc-500 leading-relaxed mb-2">
                              <EditableText value={edu.description} onSave={(v) => { const e = [...data.education]; e[idx].description = v; setData({...data, education: e}); }} isEditing={isEditing} markdown={true} />
                            </div>
                            <ul className="text-[11px] text-zinc-500 space-y-1 list-none">
                              {edu.details.map((detail, dIdx) => <li key={dIdx} className="relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-zinc-300 rounded-full"></span>{detail}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Certificates */}
                    <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5">
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-[#2C2C2C]">
                        <Award className="text-[#0047BB] w-5 h-5" /> Certificates
                      </h3>
                      <div className="flex flex-col gap-3">
                        {data.certificates && data.certificates.map((cert, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-zinc-50/50 rounded-2xl border border-black/5 hover:border-[#0047BB]/30 hover:bg-[#0047BB]/5 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm shrink-0">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[#0047BB]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </div>
                            <h4 className="font-bold text-[14px] text-[#2C2C2C]">
                              {cert}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>
              ) : (
                /* Cover Letter Content */
                <motion.div 
                  key="cover-letter"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CoverLetter setView={setView} isEditing={isEditing} data={data} setData={setData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* PDF Generation Print Template */}
      <div ref={printRef} style={{ position: 'absolute', left: '-99999px', top: 0, width: '210mm', background: '#fff', color: '#000', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", fontSize: '12px', lineHeight: '1.6' }}>
        <div style={{ padding: '28px 32px 16px', minHeight: '290mm' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #000', paddingBottom: '14px', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>{data.name}</h1>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '3px', textTransform: 'uppercase', margin: '4px 0 0' }}>{data.role}</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', color: '#555' }}>
              <p style={{ margin: '0 0 4px 0' }}>{data.email}</p>
              <p style={{ margin: '0' }}>{data.phone}</p>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '10px' }}>소개</h2>
            <div style={{ fontSize: '11px', lineHeight: '1.6', color: '#444' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.summary}</ReactMarkdown>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '10px' }}>학력 및 교육</h2>
              {data.education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>{edu.title}</h3>
                    <span style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>{edu.period}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#555', margin: '0 0 4px 0' }}>{edu.description}</p>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '10.5px', color: '#444' }}>
                    {edu.details.map((d, i) => <li key={i} style={{ marginBottom: '2px' }}>{d}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '10px' }}>핵심 기술 및 도구</h2>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#444' }}>
                {data.tools?.map((tool, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    <strong>{tool.name}</strong> - {tool.description}
                  </li>
                ))}
              </ul>
              <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #ccc', paddingBottom: '6px', margin: '20px 0 10px 0' }}>Certificates</h2>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#444' }}>
                {data.certificates?.map((cert, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 800, borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '16px' }}>주요 경험 및 성과</h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, margin: 0 }}>{exp.title}</h3>
                  <span style={{ fontSize: '11px', color: '#666', fontFamily: 'monospace' }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#333', marginBottom: '8px', padding: '4px 8px', background: '#f5f5f5', borderLeft: '3px solid #666' }}>
                   {exp.description}
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#444', lineHeight: '1.7' }}>
                  {exp.details.map((detail, dIdx) => <li key={dIdx} style={{ marginBottom: '4px' }}>{detail}</li>)}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};
