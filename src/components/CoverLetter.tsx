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
      className="pt-32 pb-20 md:pt-[160px] px-6 md:px-12 max-w-3xl mx-auto w-full">
      
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
        <div className="flex flex-col gap-16 md:gap-24 items-center">
          {data.selfIntroductions.map((intro, idx) => (
            <React.Fragment key={idx}>
              <article className="relative w-full max-w-[760px] mx-auto">
                {isEditing && (
                  <button onClick={() => { if (confirm("삭제하시겠습니까?")) { const n = [...(data.selfIntroductions || [])]; n.splice(idx, 1); setData({...data, selfIntroductions: n}); }}}
                    className="absolute -top-4 -right-4 md:right-0 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg" title="삭제">
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-4 mb-8 md:mb-10 opacity-60">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#0047BB]/15 flex items-center justify-center text-[#0047BB]/60 font-mono font-bold text-xs md:text-sm bg-[#0047BB]/[0.04]">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#0047BB]/10 to-transparent"></div>
                </div>

                <div className="border-l-4 border-[#0047BB] pl-5 md:pl-7 mb-10 md:mb-12">
                  <h3 className="text-[26px] md:text-4xl lg:text-[42px] font-display font-black text-[#1A1A1A] leading-[1.25] tracking-tighter break-keep">
                    <EditableText value={intro.logline} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].logline = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} multiline />
                  </h3>
                </div>

                <div className="text-[#333F48] leading-[1.85] md:leading-[1.9] text-[15px] md:text-[17px] font-medium tracking-[-0.01em] [&>p]:mb-11 md:[&>p]:mb-14 [&>p]:break-keep [&>p:first-of-type]:text-[17px] md:[&>p:first-of-type]:text-[19px] [&>p:first-of-type]:font-semibold [&>p:first-of-type]:mb-9 md:[&>p:first-of-type]:mb-10 [&>p:first-of-type]:text-[#333F48] [&>p:first-of-type]:border-b [&>p:first-of-type]:border-[#0047BB]/10 [&>p:first-of-type]:pb-6 [&_strong]:text-[#111] [&_strong]:font-extrabold [&_strong]:bg-[linear-gradient(to_top,#0047BB33_40%,transparent_40%)] [&_strong]:px-1 [&>blockquote]:border-l-[3px] [&>blockquote]:border-[#0047BB]/25 [&>blockquote]:bg-[#F2F0EB]/60 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:italic [&>blockquote]:text-[#76787A] [&>blockquote]:my-8 [&>blockquote]:rounded-r-lg [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-6 [&_ul]:mb-8 [&_ul>li]:mb-3 [&_ul>li]:pl-2 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-6 [&_ol]:mb-8 [&_ol>li]:mb-3 [&_ol>li]:pl-2">
                  <EditableText value={intro.content} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].content = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                </div>
              </article>

              {idx < data.selfIntroductions!.length - 1 && (
                <div className="w-full max-w-[760px] mx-auto flex justify-center py-2 md:py-4 opacity-30">
                  <span className="tracking-[1em] md:tracking-[2em] text-zinc-400 font-bold text-xs md:text-sm">•••</span>
                </div>
              )}
            </React.Fragment>
          ))}

          {isEditing && (
            <button onClick={() => { const n = [...(data.selfIntroductions || [])]; n.push({ logline: "새로운 항목의 로그라인을 입력하세요.", content: "내용을 입력하세요." }); setData({...data, selfIntroductions: n}); }}
              className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors min-h-[200px] cursor-pointer rounded-3xl">
              <Plus className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-zinc-500 font-bold">새 자기소개 항목 추가</span>
            </button>
          )}
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
