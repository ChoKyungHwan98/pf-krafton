import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { EditableText } from './EditableText';
import type { ResumeData } from '../types';

interface CoverLetterProps {
  setView: (v: any) => void;
  isEditing: boolean;
  data: ResumeData;
  setData: (d: ResumeData) => void;
}

export const CoverLetter = ({ setView, isEditing, data, setData }: CoverLetterProps) => {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="pt-32 pb-20 md:pt-[160px] px-6 md:px-12 max-w-7xl mx-auto w-full relative">
      
      <div className="flex items-center justify-between mb-16">
        <button onClick={() => setView('resume')} className="flex items-center gap-2 text-zinc-500 hover:text-[#0047BB] transition-colors group font-sans tracking-tight text-sm font-bold">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 이력서로 돌아가기
        </button>
      </div>

      <div className="text-center mb-16">
        <span className="text-[#0047BB] font-mono text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Cover Letter</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#2C2C2C] tracking-[-0.02em] mb-6">자기소개서</h2>
        <div className="w-16 h-px bg-[#0047BB]/30 mx-auto"></div>
      </div>

      {data.selfIntroductions ? (
        <div className="flex justify-between items-start xl:gap-20">
          <div className="relative border-l-[3px] border-zinc-200/80 ml-2 md:ml-[40px] lg:ml-[80px] w-full max-w-[880px] flex-1">
          {data.selfIntroductions.map((intro, idx) => (
            <React.Fragment key={idx}>
              <article className="relative w-full pl-8 md:pl-16 pb-24 md:pb-36" id={`intro-${idx}`}>
                {isEditing && (
                  <button onClick={() => { if (confirm("삭제하시겠습니까?")) { const n = [...(data.selfIntroductions || [])]; n.splice(idx, 1); setData({...data, selfIntroductions: n}); }}}
                    className="absolute -top-4 right-0 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg" title="삭제">
                    <X className="w-4 h-4" />
                  </button>
                )}

                {/* Timeline node */}
                <div className="absolute -left-[19px] md:-left-[24px] top-0 w-9 h-9 md:w-11 md:h-11 bg-white border-[3px] border-[#0047BB]/20 rounded-full flex items-center justify-center text-[#0047BB] font-mono font-bold text-xs md:text-sm shadow-sm ring-4 ring-white">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Tags (e.g. "7년의 트레이닝", "졸업 논문 96점") */}
                {intro.tags && intro.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {intro.tags.map((tag, ti) => (
                      <span key={ti} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0047BB]/8 border border-[#0047BB]/15 text-[#0047BB] text-xs font-black tracking-wide uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0047BB] inline-block"></span>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Logline */}
                <div className="mb-10 md:mb-12">
                  <h3 className="text-[26px] md:text-[34px] lg:text-[38px] font-display font-black text-[#1A1A1A] leading-[1.25] tracking-tighter break-keep">
                    <EditableText value={intro.logline} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].logline = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} multiline />
                  </h3>
                </div>

                {/* Content body */}
                <div className={`
                  text-[#4A5568] leading-[1.85] md:leading-[1.9] text-[15px] md:text-[16px] font-normal tracking-[-0.005em]
                  [&>p]:mb-8 md:[&>p]:mb-10 [&>p]:break-keep [&>p]:max-w-[680px]
                  [&_strong]:text-[#1a1a1a] [&_strong]:font-bold [&_strong]:not-italic
                  [&>blockquote]:border-l-[5px] [&>blockquote]:border-[#0047BB]
                  [&>blockquote]:bg-gradient-to-r [&>blockquote]:from-[#EEF3FF] [&>blockquote]:to-transparent
                  [&>blockquote]:py-6 md:[&>blockquote]:py-8
                  [&>blockquote]:px-7 md:[&>blockquote]:px-10
                  [&>blockquote]:font-black [&>blockquote]:italic
                  [&>blockquote]:text-[20px] md:[&>blockquote]:text-[26px]
                  [&>blockquote]:text-[#0047BB]
                  [&>blockquote]:my-10 md:[&>blockquote]:my-14
                  [&>blockquote]:rounded-r-2xl [&>blockquote]:shadow-[4px_0_0_0_#0047BB]
                  [&>blockquote>p]:mb-0 [&>blockquote>p]:max-w-none
                  [&_ul]:grid md:[&_ul]:grid-cols-4 [&_ul]:gap-2.5 md:[&_ul]:gap-4
                  [&_ul]:my-10 md:[&_ul]:my-12 [&_ul]:pl-0
                  [&_ul>li]:list-none [&_ul>li]:relative
                  [&_ul>li]:px-5 md:[&_ul>li]:px-6 [&_ul>li]:py-5 md:[&_ul>li]:py-7
                  [&_ul>li]:bg-[#F7F9FF] [&_ul>li]:border [&_ul>li]:border-[#0047BB]/12
                  [&_ul>li]:rounded-2xl [&_ul>li]:shadow-[0_2px_12px_-4px_rgba(0,71,187,0.08)]
                  md:[&_ul>li:not(:last-child)::after]:content-[''] md:[&_ul>li:not(:last-child)::after]:absolute
                  md:[&_ul>li:not(:last-child)::after]:-right-[14px] md:[&_ul>li:not(:last-child)::after]:top-1/2
                  md:[&_ul>li:not(:last-child)::after]:-translate-y-1/2
                  md:[&_ul>li:not(:last-child)::after]:border-t-[2.5px] md:[&_ul>li:not(:last-child)::after]:border-r-[2.5px]
                  md:[&_ul>li:not(:last-child)::after]:border-zinc-300
                  md:[&_ul>li:not(:last-child)::after]:w-[10px] md:[&_ul>li:not(:last-child)::after]:h-[10px]
                  md:[&_ul>li:not(:last-child)::after]:rotate-45
                  [&_ul>li_strong]:text-[#0047BB] [&_ul>li_strong]:font-extrabold
                  [&_ul>li_strong]:text-[15px] md:[&_ul>li_strong]:text-[17px]
                  [&_ul>li_strong]:block [&_ul>li_strong]:mb-1
                  [&_ul>li_strong]:bg-transparent [&_ul>li_strong]:px-0
                `}>
                  <EditableText value={intro.content} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].content = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                </div>

                {/* Step Summary Line (section 2) */}
                {intro.stepSummary && (
                  <div className="max-w-[680px] mt-2 mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#0047BB] shrink-0"></span>
                    <p className="text-[#0047BB] font-black text-[15px] md:text-[16px] tracking-tight">{intro.stepSummary}</p>
                  </div>
                )}

                {/* Metric Infographic (section 3 only) */}
                {intro.metric && (
                  <div className="mt-10 mb-4 max-w-[680px]">
                    <div className="flex items-center gap-0 rounded-2xl overflow-hidden border border-[#0047BB]/15 shadow-[0_4px_24px_-6px_rgba(0,71,187,0.15)]">
                      <div className="flex-1 bg-zinc-100 px-6 py-6 md:px-10 md:py-8 text-center">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">BEFORE</p>
                        <p className="text-[40px] md:text-[52px] font-black text-zinc-500 leading-none">{intro.metric.before}</p>
                        <p className="text-xs text-zinc-400 mt-1">per meeting</p>
                      </div>
                      <div className="bg-[#0047BB] px-4 py-8 md:px-6 md:py-10 flex flex-col items-center justify-center shrink-0">
                        <span className="text-white text-2xl font-black">→</span>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-[#0047BB] to-[#0A3277] px-6 py-6 md:px-10 md:py-8 text-center">
                        <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">AFTER</p>
                        <p className="text-[40px] md:text-[52px] font-black text-white leading-none">{intro.metric.after}</p>
                        <p className="text-xs text-blue-300 mt-1">per meeting</p>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-sm px-4 py-1.5 rounded-full">
                        <span className="text-base">✦</span> {intro.metric.label}
                      </span>
                    </div>
                  </div>
                )}

                {/* Badge */}
                {intro.badge && !intro.metric && (
                  <div className="absolute right-0 bottom-8 md:bottom-14 translate-x-2 md:translate-x-8 rotate-[-3deg] bg-gradient-to-r from-[#0047BB] to-[#0A3277] text-white px-5 py-2.5 flex items-center gap-2 rounded-xl font-black text-sm md:text-base shadow-xl border-4 border-white z-10 hover:rotate-0 transition-transform">
                    <span className="text-[#00D4FF] mr-1">✦</span>
                    {intro.badge}
                  </div>
                )}
              </article>
            </React.Fragment>
          ))}

          {isEditing && (
            <button onClick={() => { const n = [...(data.selfIntroductions || [])]; n.push({ logline: "새로운 항목의 로그라인을 입력하세요.", content: "내용을 입력하세요." }); setData({...data, selfIntroductions: n}); }}
              className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors min-h-[200px] cursor-pointer rounded-3xl w-full">
              <Plus className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-zinc-500 font-bold">새 자기소개 항목 추가</span>
            </button>
          )}
          </div>

          <aside className="hidden xl:block sticky top-40 w-48 shrink-0">
            <div className="flex flex-col gap-6 border-l-[2px] border-[#0047BB]/10 pl-6 py-2">
              <div className="text-xs font-black tracking-[0.2em] text-[#0047BB]/60 mb-2">INDEX</div>
              {data.selfIntroductions.map((intro, idx) => (
                <a key={idx} href={`#intro-${idx}`} className="text-[14px] font-semibold text-zinc-400 hover:text-[#0047BB] transition-colors relative group block">
                  <span className="opacity-0 group-hover:opacity-100 absolute -left-[29px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0047BB] transition-opacity"/>
                  {String(idx + 1).padStart(2, '0')}. {intro.navTitle || '섹션 ' + (idx + 1)}
                </a>
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-black/5 markdown-body">
          {isEditing ? (
            <textarea className="w-full h-[400px] bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-6 text-[#e8e4dc] font-sans text-sm focus:outline-none focus:border-[#0047BB]"
              value={data.selfIntroduction || ''} onChange={(e) => setData({...data, selfIntroduction: e.target.value})} />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.selfIntroduction || ''}</ReactMarkdown>
          )}
        </div>
      )}
    </motion.section>
  );
};
