import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ScrollText, Mail, Phone, User, GraduationCap, Award, Briefcase, Plus, X, Wrench } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';
import { EditableText } from './EditableText';
import type { ResumeData } from '../types';

interface ResumeProps {
  setView: (v: any) => void;
  isEditing: boolean;
  data: ResumeData;
  setData: (d: ResumeData) => void;
}

export const Resume = ({ setView, isEditing, data, setData }: ResumeProps) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printRef.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    
    const element = printRef.current;
    const origLeft = element.style.left;
    const origTop = element.style.top;
    const origZIndex = element.style.zIndex;
    const origPosition = element.style.position;

    element.style.position = 'absolute';
    element.style.left = '0px';
    element.style.top = '0px';
    element.style.zIndex = '-9999';
    element.style.visibility = 'visible';

    try {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: 'Resume_Portfolio.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, windowWidth: 800 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: 'css' }
      };
      
      const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
      
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = 'Resume.pdf';
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 5000);

    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('PDF 생성에 실패했습니다. 다시 시도해 주세요.');
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
        className="pt-32 pb-12 md:pt-[160px] md:pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <button onClick={() => setView('home')} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors group font-sans tracking-tight text-sm font-bold">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> RETURN TO HOME
          </button>
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={handleDownload}
            disabled={isGeneratingPdf}
            className="px-8 py-4 bg-white border border-black/10 rounded-xl text-[#2C2C2C] font-bold flex items-center justify-center gap-3 hover:border-[#0047BB] hover:text-[#0047BB] transition-all duration-300 text-sm tracking-widest shadow-sm w-full sm:w-auto disabled:opacity-50">
            {isGeneratingPdf ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-[#0047BB] border-t-transparent rounded-full" /> PDF 생성 중...</>
            ) : (
              <><ScrollText className="w-4 h-4 text-[#0047BB]" /> PDF 다운로드</>
            )}
          </motion.button>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 mb-8 transition-colors">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border border-black/5 shadow-sm shrink-0">
                <img src="https://picsum.photos/seed/profile/400/400" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-[#2C2C2C] tracking-tight mb-1">
                  <EditableText value={data.name} onSave={(v) => setData({...data, name: v})} isEditing={isEditing} />
                </h1>
                <p className="text-[#0047BB] font-bold font-mono tracking-widest text-xs uppercase mb-4">
                  <EditableText value={data.role} onSave={(v) => setData({...data, role: v})} isEditing={isEditing} />
                </p>
                <div className="flex items-center gap-3 text-sm text-zinc-600 font-medium">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <EditableText value={data.email} onSave={(v) => setData({...data, email: v})} isEditing={isEditing} />
                </div>
                <div className="hidden print:flex items-center gap-3 text-sm text-zinc-600 mt-1">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <EditableText value={data.phone} onSave={(v) => setData({...data, phone: v})} isEditing={isEditing} />
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-px h-24 bg-black/10 self-center shrink-0"></div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase mb-3 flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> 자기소개
              </h3>
              <div className="text-sm text-zinc-600 leading-relaxed font-medium">
                <EditableText value={data.summary} onSave={(v) => setData({...data, summary: v})} isEditing={isEditing} markdown={true} />
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setView('cover-letter')}
          className="group relative bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#0047BB]/30 mb-8"
        >
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0047BB] to-[#500014] opacity-80 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 ml-2">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-black/5 flex items-center justify-center group-hover:bg-[#0047BB]/5 transition-colors">
                <ScrollText className="w-5 h-5 text-[#0047BB]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="hidden md:flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold tracking-widest text-[#0047BB]">자기소개서</span>
              </div>
              <h3 className="text-lg md:text-[22px] font-bold text-[#2C2C2C] tracking-tight leading-snug group-hover:text-[#0047BB] transition-colors line-clamp-2">
                "{(data.selfIntroductions?.[0]?.logline || '자기소개서를 확인해주세요.').replace(/\*\*/g, '').replace(/  \n/g, ' ')}"
              </h3>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 transition-colors">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-[#2C2C2C]">
                <GraduationCap className="w-5 h-5" /> 학력 및 교육
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
                    <ul className="text-[11px] text-zinc-500 space-y-1 list-disc list-inside">
                      {edu.details.map((detail, dIdx) => <li key={dIdx}>{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 transition-colors">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-[#2C2C2C]">
                <Award className="text-[#0047BB] w-5 h-5" /> 자격 및 수상
              </h3>
              <div className="space-y-3">
                {data.awards.map((award, idx) => (
                  <div key={idx} className="p-4 bg-zinc-50 rounded-xl border-l-3 border-l-[#0047BB] border-y border-r border-black/5">
                    <h4 className="font-bold text-sm mb-0.5 text-[#2C2C2C]">
                      <EditableText value={award.title} onSave={(v) => { const a = [...data.awards]; a[idx].title = v; setData({...data, awards: a}); }} isEditing={isEditing} />
                    </h4>
                    <p className="text-[11px] text-zinc-500">{award.organization} · {award.year}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 transition-colors">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-[#2C2C2C]">
                <Wrench className="text-[#0047BB] w-5 h-5" /> 사용 가능한 툴
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {data.tools?.map((tool, idx) => (
                  <div key={idx} className="group relative">
                    <span className="inline-block px-3.5 py-1.5 bg-zinc-50 border border-black/5 text-[#2C2C2C] font-bold text-[13px] rounded-lg cursor-default hover:bg-[#0047BB] hover:text-white hover:border-[#0047BB] hover:shadow-md transition-all duration-300">
                      <EditableText value={tool.name} onSave={(v) => { const t = [...(data.tools||[])]; t[idx].name = v; setData({...data, tools: t}); }} isEditing={isEditing} />
                    </span>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 pointer-events-none">
                      <div className="bg-[#2C2C2C] text-white text-[11px] p-3 rounded-xl shadow-xl border border-white/10 leading-relaxed font-medium text-center">
                        <EditableText value={tool.description} onSave={(v) => { const t = [...(data.tools||[])]; t[idx].description = v; setData({...data, tools: t}); }} isEditing={isEditing} />
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2C2C2C] rotate-45 border-b border-r border-white/10"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-7">
            <section className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 transition-colors h-full">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-[#2C2C2C]">
                <Briefcase className="text-[#0047BB] w-5 h-5" /> 프로젝트 경험
              </h3>
              <div className="space-y-7">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-[#0047BB]/30">
                    <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-[#0047BB] border-2 border-white"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-base text-[#2C2C2C]">
                        <EditableText value={exp.title} onSave={(v) => { const e = [...data.experience]; e[idx].title = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                        <EditableText value={exp.period} onSave={(v) => { const e = [...data.experience]; e[idx].period = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                      </span>
                    </div>
                    <div className="text-sm text-[#0047BB] font-medium mb-3">
                      <EditableText value={exp.description} onSave={(v) => { const e = [...data.experience]; e[idx].description = v; setData({...data, experience: e}); }} isEditing={isEditing} markdown={true} />
                    </div>
                    <ul className="text-xs text-zinc-500 space-y-1.5 list-disc list-inside leading-relaxed">
                      {exp.details.map((detail, dIdx) => <li key={dIdx}>{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.section>

      <div ref={printRef} style={{ position: 'absolute', left: '-99999px', top: 0, width: '210mm', background: '#fff', color: '#000', fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", fontSize: '12px', lineHeight: '1.6' }}>
        <div style={{ padding: '28px 32px 16px', minHeight: '290mm' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #000', paddingBottom: '14px', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>{data.name}</h1>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#666', letterSpacing: '3px', textTransform: 'uppercase', margin: '4px 0 0' }}>{data.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
