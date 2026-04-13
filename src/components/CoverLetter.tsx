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
              <article className="relative w-full pl-8 md:pl-16 pb-20 md:pb-32" id={`intro-${idx}`}>
                {isEditing && (
                  <button onClick={() => { if (confirm("삭제하시겠습니까?")) { const n = [...(data.selfIntroductions || [])]; n.splice(idx, 1); setData({...data, selfIntroductions: n}); }}}
                    className="absolute -top-4 right-0 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg" title="삭제">
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="absolute -left-[19px] md:-left-[24px] top-0 w-9 h-9 md:w-11 md:h-11 bg-white border-[3px] border-[#0047BB]/20 rounded-full flex items-center justify-center text-[#0047BB] font-mono font-bold text-xs md:text-sm shadow-sm ring-4 ring-white">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                <div className="mb-8 md:mb-10">
                  <h3 className="text-[28px] md:text-[36px] lg:text-[40px] font-display font-black text-[#1A1A1A] leading-[1.3] tracking-tighter break-keep">
                    <EditableText value={intro.logline} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].logline = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} multiline />
                  </h3>
                </div>

                <div className="max-w-[760px] text-[#333F48] leading-[1.9] text-[15px] md:text-[17px] font-medium tracking-[-0.01em] [&_p]:mb-12 md:[&_p]:mb-16 [&_p]:break-keep [&_blockquote_p]:!mb-0 [&_p:first-of-type]:text-[17px] md:[&_p:first-of-type]:text-[19px] [&_p:first-of-type]:font-semibold [&_p:first-of-type]:mb-10 md:[&_p:first-of-type]:mb-12 [&_p:first-of-type]:border-b [&_p:first-of-type]:border-[#0047BB]/10 [&_p:first-of-type]:pb-6 [&_strong]:text-[#111] [&_strong]:font-extrabold [&_strong]:bg-[linear-gradient(to_top,#0047BB33_40%,transparent_40%)] [&_strong]:px-1 [&_blockquote]:border-l-[5px] [&_blockquote]:border-[#0047BB] [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-blue-50/70 [&_blockquote]:to-transparent [&_blockquote]:py-8 md:[&_blockquote]:py-10 [&_blockquote]:px-8 md:[&_blockquote]:px-12 [&_blockquote]:font-black [&_blockquote]:not-italic [&_blockquote]:text-[22px] md:[&_blockquote]:text-[28px] [&_blockquote]:leading-[1.5] [&_blockquote]:text-[#0047BB] [&_blockquote]:my-14 md:[&_blockquote]:my-20 [&_blockquote]:rounded-r-2xl [&_ul]:grid md:[&_ul]:grid-cols-4 [&_ul]:gap-3 md:[&_ul]:gap-5 [&_ul]:my-14 md:[&_ul]:my-16 [&_ul]:pl-0 [&_ul>li]:list-none [&_ul>li]:relative [&_ul>li]:px-7 md:[&_ul>li]:px-8 [&_ul>li]:py-7 md:[&_ul>li]:py-8 [&_ul>li]:bg-white [&_ul>li]:border [&_ul>li]:border-[#0047BB]/10 [&_ul>li]:rounded-2xl [&_ul>li]:shadow-[0_4px_20px_-4px_rgba(0,71,187,0.05)] md:[&_ul>li:not(:last-child)::after]:content-[''] md:[&_ul>li:not(:last-child)::after]:absolute md:[&_ul>li:not(:last-child)::after]:-right-[14px] md:[&_ul>li:not(:last-child)::after]:top-1/2 md:[&_ul>li:not(:last-child)::after]:-translate-y-1/2 md:[&_ul>li:not(:last-child)::after]:border-t-[2.5px] md:[&_ul>li:not(:last-child)::after]:border-r-[2.5px] md:[&_ul>li:not(:last-child)::after]:border-zinc-300 md:[&_ul>li:not(:last-child)::after]:w-[10px] md:[&_ul>li:not(:last-child)::after]:h-[10px] md:[&_ul>li:not(:last-child)::after]:rotate-45 [&_ul>li_strong]:text-[#0047BB] [&_ul>li_strong]:font-black [&_ul>li_strong]:text-[15px] md:[&_ul>li_strong]:text-[17px] [&_ul>li_strong]:block [&_ul>li_strong]:mb-2.5 [&_ul>li_strong]:bg-none [&_ul>li_strong]:px-0 [&_ul>li_em]:not-italic [&_ul>li_em]:text-[13px] md:[&_ul>li_em]:text-[14px] [&_ul>li_em]:text-zinc-500 [&_ul>li_em]:leading-[1.6] [&_ul>li_em]:block">
                  <EditableText value={intro.content} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].content = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                </div>

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
