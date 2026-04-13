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
        <div className="max-w-[1100px] mx-auto w-full">
        <div className="flex items-start gap-10 xl:gap-14">

          {/* 메인 타임라인 */}
          <div className="relative border-l-[3px] border-[#0047BB]/15 flex-1 min-w-0">
          {data.selfIntroductions.map((intro, idx) => (
            <React.Fragment key={idx}>
              <article className="relative w-full pl-8 md:pl-16 pb-[80px] md:pb-[120px] scroll-mt-24 md:scroll-mt-[140px]" id={`intro-${idx}`}>
                {isEditing && (
                  <button onClick={() => { if (confirm("삭제하시겠습니까?")) { const n = [...(data.selfIntroductions || [])]; n.splice(idx, 1); setData({...data, selfIntroductions: n}); }}}
                    className="absolute -top-4 right-0 z-20 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg" title="삭제">
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="absolute -left-[19px] md:-left-[24px] top-[50px] md:top-[68px] lg:top-[72px] w-9 h-9 md:w-11 md:h-11 bg-white border-[3px] border-[#0047BB]/30 rounded-full flex items-center justify-center text-[#0047BB] font-mono font-bold text-xs md:text-sm shadow-md ring-4 ring-white">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* 배경 카드 */}
                <motion.div 
                  initial={{ opacity: 0, y: 60 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-3xl border border-zinc-100 shadow-[0_8px_40px_-12px_rgba(0,71,187,0.08)] px-8 md:px-12 lg:px-14 pt-10 md:pt-14 pb-12 md:pb-16 mt-2"
                >

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 md:mb-10"
                  >
                    <h3 className="text-[32px] md:text-[42px] lg:text-[48px] font-display font-black text-[#1A1A1A] leading-[1.3] tracking-tighter break-keep [&_p]:m-0 [&_p]:leading-[1.3] [&_strong]:text-[#0047BB] [&_strong]:font-black text-opacity-90">
                      <EditableText value={intro.logline} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].logline = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                    </h3>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[800px] mx-auto text-[#333F48] leading-[1.85] text-[15px] md:text-[17px] font-medium tracking-[-0.01em] [&_p]:mb-4 md:[&_p]:mb-5 [&_hr]:border-none [&_hr]:h-3 md:[&_hr]:h-4 [&_hr]:m-0 [&_hr]:p-0 [&_p]:break-keep [&_blockquote_p]:!mb-0 [&_strong]:text-[#0047BB] [&_strong]:font-extrabold [&_strong]:bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] [&_strong]:px-[3px] [&_strong]:rounded-sm [&_blockquote]:border-l-[5px] [&_blockquote]:border-[#0047BB] [&_blockquote]:bg-gradient-to-r [&_blockquote]:from-blue-50/80 [&_blockquote]:to-blue-50/10 [&_blockquote]:py-8 md:[&_blockquote]:py-10 [&_blockquote]:px-8 md:[&_blockquote]:px-12 [&_blockquote]:font-black [&_blockquote]:not-italic [&_blockquote]:text-[22px] md:[&_blockquote]:text-[28px] lg:[&_blockquote]:text-[32px] [&_blockquote]:leading-[1.5] [&_blockquote]:text-[#0047BB] [&_blockquote]:my-10 md:[&_blockquote]:my-12 [&_blockquote]:rounded-r-2xl [&_ul]:grid md:[&_ul]:grid-cols-4 [&_ul]:gap-3 md:[&_ul]:gap-4 [&_ul]:my-10 md:[&_ul]:my-12 [&_ul]:pl-0 [&_ul>li]:list-none [&_ul>li]:relative [&_ul>li]:px-4 md:[&_ul>li]:px-5 [&_ul>li]:py-5 md:[&_ul>li]:py-6 [&_ul>li]:bg-[#F8F9FF] [&_ul>li]:border [&_ul>li]:border-[#0047BB]/15 [&_ul>li]:rounded-2xl [&_ul>li]:shadow-[0_4px_20px_-4px_rgba(0,71,187,0.08)] [&_ul>li]:break-normal md:[&_ul>li:not(:last-child)::after]:content-[''] md:[&_ul>li:not(:last-child)::after]:absolute md:[&_ul>li:not(:last-child)::after]:-right-[14px] md:[&_ul>li:not(:last-child)::after]:top-1/2 md:[&_ul>li:not(:last-child)::after]:-translate-y-1/2 md:[&_ul>li:not(:last-child)::after]:border-t-[2.5px] md:[&_ul>li:not(:last-child)::after]:border-r-[2.5px] md:[&_ul>li:not(:last-child)::after]:border-[#0047BB]/40 md:[&_ul>li:not(:last-child)::after]:w-[10px] md:[&_ul>li:not(:last-child)::after]:h-[10px] md:[&_ul>li:not(:last-child)::after]:rotate-45 [&_ul>li_strong]:text-[#0047BB] [&_ul>li_strong]:font-black [&_ul>li_strong]:text-[15px] md:[&_ul>li_strong]:text-[18px] [&_ul>li_strong]:block [&_ul>li_strong]:mb-2 [&_ul>li_strong]:bg-none [&_ul>li_strong]:px-0 [&_ul>li_em]:not-italic [&_ul>li_em]:text-[13px] md:[&_ul>li_em]:text-[14px] [&_ul>li_em]:text-[#555F6B] [&_ul>li_em]:leading-[1.5] [&_ul>li_em]:block [&_ul>li_em]:mt-2 [&_ul>li_em]:break-keep"
                  >
                    <EditableText value={intro.content} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].content = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                  </motion.div>

                  {/* 섹션 0 전용: 인라인 타이포그래픽 대비 */}
                  {idx === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-[800px] mx-auto mt-2 mb-8 text-[#333F48] leading-[1.9] text-[16px] md:text-[18px] font-medium tracking-[-0.01em] break-keep"
                    >
                      <p className="mb-4 md:mb-5">
                        그 자리에서 확신했습니다.{' '}
                        법학이{' '}
                        <span className="inline-flex items-baseline gap-[2px] mx-[2px]">
                          <span className="text-[30px] md:text-[40px] font-black text-zinc-300 leading-none">−</span>
                          <span className="text-[15px] md:text-[17px] font-semibold text-zinc-400">에서</span>
                          <span className="text-[30px] md:text-[40px] font-black text-zinc-400 leading-none">0</span>
                        </span>
                        으로 되돌리는 일이라면, 게임은{' '}
                        <span className="inline-flex items-baseline gap-[2px] mx-[2px]">
                          <span className="text-[30px] md:text-[40px] font-black text-zinc-500 leading-none">0</span>
                          <span className="text-[15px] md:text-[17px] font-semibold text-zinc-500">에서</span>
                          <span className="text-[38px] md:text-[52px] font-black text-[#0047BB] leading-none">+</span>
                        </span>
                        가 되는 경험을 만든다는 것을.{' '}
                        저도 누군가의 하루를 움직이는 사람이 되고 싶었습니다.
                      </p>
                      <p className="text-[15px] md:text-[17px]">
                        법학을 공부하며 배운 것이 있습니다. 모든 제도는 입법{' '}
                        <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[3px] rounded-sm">'의도'</strong>를 바탕으로{' '}
                        <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[3px] rounded-sm">'구조화'</strong>되며, 사회라는 하나의{' '}
                        <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[3px] rounded-sm">'시스템'</strong>으로 작동한다는 것입니다.
                        저는 이 원리가{' '}
                        <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[3px] rounded-sm">게임 기획의 본질</strong>과 같다고 믿습니다.
                      </p>
                      <p className="mt-4 md:mt-5 text-[15px] md:text-[17px] font-bold text-[#1A1A1A]">
                        저는 그 <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[3px] rounded-sm">+를 설계하는 기획자</strong>가 되겠습니다.
                      </p>
                    </motion.div>
                  )}


                </motion.div>

                {/* 섹션 사이 희미한 구분선 (마지막 항목 제외) */}
                {idx < (data.selfIntroductions || []).length - 1 && (
                  <div className="absolute bottom-10 left-8 md:left-16 right-0 h-px bg-gradient-to-r from-[#0047BB]/10 via-[#0047BB]/5 to-transparent" />
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

          {/* INDEX 사이드바 */}
          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden xl:block sticky top-40 w-44 shrink-0"
          >
            <div className="flex flex-col gap-6 border-l-[2px] border-[#0047BB]/10 pl-6 py-2">
              <div className="text-xs font-black tracking-[0.2em] text-[#0047BB]/60 mb-2">INDEX</div>
              {data.selfIntroductions.map((intro, idx) => (
                <a 
                  key={idx} 
                  href={`#intro-${idx}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`intro-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[14px] font-medium text-zinc-400 hover:text-[#0047BB] transition-colors relative group block"
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute -left-[29px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0047BB] transition-opacity"/>
                  {String(idx + 1).padStart(2, '0')}. {intro.navTitle || '섹션 ' + (idx + 1)}
                </a>
              ))}
            </div>
          </motion.aside>

        </div>
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
