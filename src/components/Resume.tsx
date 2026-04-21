import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollText, Mail, Phone, GraduationCap, Award, Briefcase, Wrench, Figma, User, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EditableText } from './EditableText';
import { CoverLetter } from './CoverLetter';
import { PrintTemplate } from './PrintTemplate';
import { PdfTemplate } from './PdfTemplate';
import { renderToStaticMarkup } from 'react-dom/server';
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
  setIsEditing: (v: boolean) => void;
  data: ResumeData;
  setData: (d: ResumeData) => void;
  activeTab: 'resume' | 'cover-letter';
  setActiveTab: (tab: 'resume' | 'cover-letter') => void;
  isGeneratingPdf: boolean;
  setIsGeneratingPdf: (v: boolean) => void;
}

export const Resume = ({ setView, onBack, isEditing, setIsEditing, data, setData, activeTab, isGeneratingPdf, setIsGeneratingPdf }: ResumeProps) => {

  const handleDownload = () => {
    // 1) React Component를 순수 HTML 문자열로 렌더링
    const htmlString = renderToStaticMarkup(<PdfTemplate data={data} />);

    // 2) 새 창 열기 (격리된 환경)
    const printWindow = window.open('', '_blank', 'width=900,height=1200');
    if (!printWindow) {
      alert('팝업 차단이 활성화되어 있습니다. 팝업을 허용해주세요.');
      return;
    }

    // 3) 현재 페이지의 스타일시트 복사
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(node => node.outerHTML)
      .join('\n');

    // 4) HTML 주입
    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="utf-8">
          <title>조경환_게임기획자_포트폴리오</title>
          ${styles}
          <style>
            @page { 
              size: A4 portrait; 
              margin: 0; 
            }
            body { 
              margin: 0; 
              background: #f8f9fa;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .pdf-page { 
              page-break-after: always; 
              break-after: page; 
            }
            .pdf-page:last-child { 
              page-break-after: auto; 
              break-after: auto; 
            }
          </style>
        </head>
        <body>
          ${htmlString}
        </body>
      </html>
    `);
    printWindow.document.close();

    // 5) 리소스 로드(폰트 및 이미지) 대기 후 인쇄
    printWindow.onload = () => {
      Promise.all([
        printWindow.document.fonts.ready,
        ...Array.from(printWindow.document.images).map(img =>
          img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
        )
      ]).then(() => {
        printWindow.focus();
        printWindow.print();
      });
    };

    // 6) 인쇄 후 새 창 닫기
    const handleAfterPrint = () => {
      printWindow.close();
      printWindow.removeEventListener('afterprint', handleAfterPrint);
    };
    printWindow.addEventListener('afterprint', handleAfterPrint);
  };


  // Navbar PDF 버튼 → CustomEvent 수신
  React.useEffect(() => {
    const handler = () => handleDownload();
    window.addEventListener('triggerPdfDownload', handler);
    return () => window.removeEventListener('triggerPdfDownload', handler);
  }, [activeTab, data]);

  return (
    <>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="pt-28 pb-12 md:pb-20 px-6 md:px-12 max-w-[1300px] mx-auto w-full min-h-screen flex flex-col relative">

        <AnimatePresence mode="wait">
          {activeTab === 'resume' ? (
            /* ========================================================= */
            /* RESUME TAB (Top Profile + Bottom Grid)                    */
            /* ========================================================= */
            <motion.div 
              key="resume"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[1080px] mx-auto bg-white shadow-[0_40px_120px_rgba(0,0,0,0.1)] border border-black/5 rounded-sm overflow-hidden flex flex-col"
            >
              {/* 1. EDITORIAL HEADER SECTION */}
              <header className="flex flex-col md:flex-row items-center md:items-start gap-12 p-10 lg:p-16 bg-[#FAFAFA] border-b border-zinc-100">
                {/* Vertical Portrait Frame */}
                <div className="relative shrink-0">
                  <div className="w-52 h-[260px] lg:w-60 lg:h-[300px] rounded-sm overflow-hidden border border-black/10 shadow-xl">
                    <img 
                      src={data.image || "https://picsum.photos/seed/profile/600/800"} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#0047BB] rounded-sm flex items-center justify-center text-white font-mono text-[10px] font-black tracking-widest shadow-lg">
                    PRFL
                  </div>
                </div>

                {/* Identity & Summary */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-2">
                  <h1 className="text-5xl lg:text-[68px] font-display font-bold text-[#1A1A1A] tracking-tighter leading-tight mb-4">
                    <EditableText value={data.name} onSave={(v) => setData({...data, name: v})} isEditing={isEditing} />
                  </h1>
                  <p className="text-[#0047BB] font-black font-mono tracking-[0.4em] text-xs md:text-sm uppercase mb-8 pb-1 border-b-2 border-[#0047BB]">
                    <EditableText value={data.role} onSave={(v) => setData({...data, role: v})} isEditing={isEditing} />
                  </p>
                  
                  <div className="max-w-2xl text-[16px] lg:text-[18px] text-[#2C2C2C] leading-[1.8] font-medium [&_strong]:text-[#0047BB] [&_strong]:font-bold break-keep italic opacity-90">
                    <EditableText value={data.summary} onSave={(v) => setData({...data, summary: v})} isEditing={isEditing} markdown={true} />
                  </div>

                  {/* Contact Quick List */}
                  <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 text-[13px] text-zinc-500 font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#0047BB]" strokeWidth={2.5} />
                      <span className="lowercase">
                        <EditableText value={data.email} onSave={(v) => setData({...data, email: v})} isEditing={isEditing} />
                      </span>
                    </div>
                    {data.birthDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#0047BB]" strokeWidth={2.5} />
                        <span>{data.birthDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* 2. MAIN CONTENT GRID (High Legibility) */}
              <div className="grid lg:grid-cols-12 gap-0">
                
                {/* LEFT COLUMN (Sidebar info) */}
                <aside className="lg:col-span-4 p-10 lg:p-14 border-r border-zinc-100 bg-[#FCFCFC]">
                  <div className="flex flex-col gap-16">
                    {/* Education */}
                    <section>
                      <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-[#1A1A1A]">
                        <GraduationCap className="text-[#0047BB] w-5 h-5" /> 학력 및 교육
                      </h3>
                      <div className="space-y-10">
                        {data.education.map((edu, idx) => (
                          <div key={idx} className="relative pl-6 border-l-2 border-[#0047BB]/20">
                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-none bg-[#0047BB]/40"></div>
                            <div className="flex flex-col gap-1.5 mb-3">
                              <h4 className="font-bold text-[16px] text-[#1A1A1A] leading-snug">
                                <EditableText value={edu.title} onSave={(v) => { const e = [...data.education]; e[idx].title = v; setData({...data, education: e}); }} isEditing={isEditing} />
                              </h4>
                              <span className="text-[11px] font-mono font-bold text-zinc-400">
                                <EditableText value={edu.period} onSave={(v) => { const e = [...data.education]; e[idx].period = v; setData({...data, education: e}); }} isEditing={isEditing} />
                              </span>
                            </div>
                            <div className="text-[12px] text-zinc-600 leading-relaxed mb-3 font-medium">
                              <EditableText value={edu.description} onSave={(v) => { const e = [...data.education]; e[idx].description = v; setData({...data, education: e}); }} isEditing={isEditing} markdown={true} />
                            </div>
                            <ul className="text-[11px] text-zinc-500 space-y-1.5 list-none">
                              {edu.details.map((detail, dIdx) => <li key={dIdx} className="relative pl-3"><span className="absolute left-0 top-1.5 w-1 h-1 bg-zinc-300 rounded-full"></span>{detail}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Certificates */}
                    <section>
                      <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-[#1A1A1A]">
                        <Award className="text-[#0047BB] w-5 h-5" /> 자격증
                      </h3>
                      <div className="flex flex-col gap-3">
                        {data.certificates && data.certificates.map((cert, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-sm shadow-sm">
                            <div className="flex flex-col gap-0.5">
                              <h4 className="font-bold text-[14px] text-[#1A1A1A]">
                                <EditableText value={cert.name} onSave={(v) => { const c = [...(data.certificates||[])]; c[idx].name = v; setData({...data, certificates: c}); }} isEditing={isEditing} />
                              </h4>
                              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-tighter">{cert.date}</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0047BB]/30"></div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </aside>

                {/* RIGHT COLUMN (Main details) */}
                <main className="lg:col-span-8 p-10 lg:p-14 bg-white">
                  {/* Project Experience */}
                  <section>
                    <h3 className="text-xl font-bold mb-10 flex items-center gap-3 text-[#1A1A1A]">
                      <Briefcase className="text-[#0047BB] w-6 h-6" /> 프로젝트 경험
                    </h3>
                    <div className="space-y-16">
                      {data.experience.map((exp, idx) => (
                        <div key={idx} className="relative pl-10 border-l-[3px] border-[#0047BB]/10">
                          <div className="absolute -left-[10px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-[#0047BB] shadow-sm"></div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <h4 className="font-bold text-2xl text-[#1A1A1A] tracking-tight">
                              <EditableText value={exp.title} onSave={(v) => { const e = [...data.experience]; e[idx].title = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                            </h4>
                            <span className="text-[11px] font-mono font-black text-zinc-400 bg-zinc-50 px-3 py-1 rounded-sm border border-zinc-100">
                              <EditableText value={exp.period} onSave={(v) => { const e = [...data.experience]; e[idx].period = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                            </span>
                          </div>

                          <div className="text-[15px] text-[#0047BB] font-bold mb-6 bg-[#0047BB]/5 inline-block px-4 py-2 rounded-sm border-l-4 border-[#0047BB]">
                            <EditableText value={exp.description} onSave={(v) => { const e = [...data.experience]; e[idx].description = v; setData({...data, experience: e}); }} isEditing={isEditing} markdown={true} />
                          </div>

                          <ul className="text-[15px] text-[#4A4A4A] space-y-4 list-none leading-relaxed font-medium">
                            {exp.details.map((detail, dIdx) => (
                              <li key={dIdx} className="relative pl-6">
                                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 border border-[#0047BB] rounded-full"></span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Technical Proficiency - Categorized for Clarity */}
                  {data.tools && data.tools.length > 0 && (
                    <section className="mt-12 pt-12 border-t border-zinc-100">
                      <h3 className="text-xl font-bold mb-10 flex items-center gap-3 text-[#1A1A1A]">
                        <Wrench className="text-[#0047BB] w-6 h-6" /> 기술 역량 및 도구
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                        {/* Group 1: Documentation & Office */}
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-[#0047BB] tracking-[0.4em] uppercase border-b border-[#0047BB]/10 pb-2 mb-4">DOCUMENTATION & OFFICE</h4>
                          <div className="space-y-4">
                            {data.tools.filter(t => ["Excel", "PowerPoint", "Word", "Notion"].includes(t.name)).map((tool, idx) => (
                              <div key={idx} className="flex flex-col gap-1">
                                <div className="flex items-center gap-2.5">
                                  <div className="text-[#1A1A1A]">{TOOL_ICONS[tool.name] || <Wrench className="w-3.5 h-3.5" />}</div>
                                  <span className="text-[14px] font-bold text-[#1A1A1A]">{tool.name}</span>
                                </div>
                                <p className="text-[12px] text-zinc-500 font-medium pl-6 leading-relaxed">{tool.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Group 2: Creative & Engine */}
                        <div className="space-y-6">
                          <h4 className="text-[10px] font-black text-[#0047BB] tracking-[0.4em] uppercase border-b border-[#0047BB]/10 pb-2 mb-4">CREATIVE & ENGINE</h4>
                          <div className="space-y-4">
                            {data.tools.filter(t => ["Figma", "Unity"].includes(t.name)).map((tool, idx) => (
                              <div key={idx} className="flex flex-col gap-1">
                                <div className="flex items-center gap-2.5">
                                  <div className="text-[#1A1A1A]">{TOOL_ICONS[tool.name] || <Wrench className="w-3.5 h-3.5" />}</div>
                                  <span className="text-[14px] font-bold text-[#1A1A1A]">{tool.name}</span>
                                </div>
                                <p className="text-[12px] text-zinc-500 font-medium pl-6 leading-relaxed">{tool.description}</p>
                              </div>
                            ))}
                            {/* Remaining tools (like AI) */}
                            <h4 className="text-[10px] font-black text-[#0047BB] tracking-[0.4em] uppercase border-b border-[#0047BB]/10 pb-2 mb-4 mt-8">AI ASSISTANTS</h4>
                            <div className="grid grid-cols-2 gap-4">
                              {data.tools.filter(t => ["ChatGPT", "Claude", "Gemini", "Antigravity"].includes(t.name)).map((tool, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#0047BB]/30" />
                                  <span className="text-[13px] font-bold text-[#1A1A1A]">{tool.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </main>
              </div>
            </motion.div>
          ) : (
            /* ========================================================= */
            /* COVER LETTER TAB (Only the content takes full width/focus)*/
            /* ========================================================= */
            <motion.div 
              key="cover-letter"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <CoverLetter setView={setView} isEditing={isEditing} data={data} setData={setData} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

    </>
  );
};
