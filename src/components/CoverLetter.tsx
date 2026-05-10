import React, { useState, useEffect } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!data.selfIntroductions) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.replace('intro-', ''));
            setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    data.selfIntroductions.forEach((_, idx) => {
      const el = document.getElementById(`intro-${idx}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data.selfIntroductions]);

  return (
    <div className="w-full relative">

      {data.selfIntroductions ? (
        <div className="ml-[4%] xl:ml-[6%] w-full max-w-[1200px]">
        <div className="flex items-start gap-8 xl:gap-12">

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
                  className="bg-white rounded-3xl border border-zinc-100 shadow-[0_8px_40px_-12px_rgba(0,71,187,0.08)] px-8 md:px-10 lg:px-12 pt-10 md:pt-14 pb-12 md:pb-16 mt-2"
                >

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 md:mb-8"
                  >
                    <h3 className="text-[30px] md:text-[40px] lg:text-[44px] xl:text-[46px] font-display font-black text-[#1A1A1A] leading-[1.3] tracking-tighter break-keep [&_p]:m-0 [&_p]:leading-[1.3] [&_strong]:text-[#0047BB] [&_strong]:font-black text-opacity-90">
                      <EditableText value={intro.logline} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].logline = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                    </h3>
                    {/* Ruled line — 에디토리얼 잡지 스타일 */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: 'left' }}
                      className="mt-5 h-px bg-linear-to-r from-[#0047BB]/30 via-[#0047BB]/10 to-transparent"
                    />
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`max-w-[780px] text-[#1C1C1C] leading-[1.9] text-[16.5px] md:text-[18px] font-medium tracking-[-0.01em] [&_p]:mb-5 md:[&_p]:mb-7 [&_p]:break-keep [&_strong]:text-[#0047BB] [&_strong]:font-extrabold [&_strong]:bg-[linear-gradient(to_top,rgba(0,71,187,0.22)_50%,transparent_50%)] [&_strong]:px-[3px] [&_strong]:rounded-sm narrative-card`}
                  >
                    {idx === 0 && (
                      <style dangerouslySetInnerHTML={{__html: `
                        /* 1. Focus Reading Mode */
                        .narrative-card {
                          transition: color 0.4s ease;
                        }
                        .narrative-card:has(strong:hover) p,
                        .narrative-card:has(strong:hover) blockquote,
                        .narrative-card:has(strong:hover) li,
                        .narrative-card:has(strong:hover) em {
                          color: rgba(28, 28, 28, 0.2) !important;
                          transition: color 0.4s ease;
                        }
                        
                        /* Keep strongs fully visible and sharp */
                        .narrative-card:has(strong:hover) strong {
                          color: #0047BB !important;
                          text-shadow: 0 0 1px rgba(0,71,187,0.1);
                        }
                        
                        /* 3. Micro Breadcrumbs (Removed dots as requested) */
                        .narrative-card strong {
                          position: relative;
                          transition: color 0.2s ease;
                          cursor: crosshair;
                        }
                        
                        /* 4. Markdown Blockquote Overrides */
                        .narrative-card blockquote {
                          border-left: 3px solid rgba(0, 71, 187, 0.3) !important;
                          background-color: rgba(248, 249, 255, 0.5) !important;
                          padding: 1.25rem 1.5rem !important;
                          margin: 2rem 0 !important;
                          border-radius: 0 0.75rem 0.75rem 0 !important;
                        }
                        @media (min-width: 768px) {
                          .narrative-card blockquote {
                            padding: 1.5rem 2rem !important;
                          }
                        }
                        .narrative-card blockquote p {
                          font-weight: 700 !important;
                          font-size: 24px !important;
                          line-height: 1.6 !important;
                          color: #333F48 !important;
                          letter-spacing: -0.025em !important;
                          margin-bottom: 0 !important;
                        }
                        @media (min-width: 768px) {
                          .narrative-card blockquote p {
                            font-size: 27px !important;
                          }
                        }
                        
                        /* Hover interactions */
                        .narrative-card strong:hover {
                          color: #002A7A !important;
                        }
                        
                        /* 5. Custom Logline inside Body (H3) */
                        .narrative-card h3 {
                          color: #1A1A1A;
                          font-size: 32px;
                          font-weight: 500;
                          line-height: 1.3;
                          letter-spacing: -0.04em;
                          margin-top: 6rem;
                          margin-bottom: 2.5rem;
                          white-space: pre-wrap;
                        }
                        @media (min-width: 768px) {
                          .narrative-card h3 {
                            font-size: 42px;
                            line-height: 1.25;
                          }
                        }
                        .narrative-card h3 strong {
                          color: #0047BB !important;
                          font-weight: 800 !important;
                          background: none !important;
                          padding: 0 !important;
                          font-size: inherit;
                        }
                      `}} />
                    )}
                    {/* Hook */}
                    {isEditing && <div className="text-xs text-blue-500 font-bold mb-1">도입부 (Hook)</div>}
                    <div className="mb-5 md:mb-7">
                      <EditableText value={intro.hook} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].hook = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                    </div>

                    {/* PullQuote */}
                    {(intro.pullQuote || isEditing) && (
                      <div className="my-10 md:my-12">
                        {isEditing && <div className="text-xs text-blue-500 font-bold mb-1">인용구 (PullQuote)</div>}
                        <blockquote className="border-l-[3px] border-[#0047BB]/30 bg-[#F8F9FF]/50 py-5 md:py-6 px-6 md:px-8 font-bold text-[24px] md:text-[27px] leading-[1.6] text-[#333F48] rounded-r-xl tracking-tight">
                          <EditableText value={intro.pullQuote || ""} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].pullQuote = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={false} />
                        </blockquote>
                      </div>
                    )}

                    {/* Highlights */}
                    {(intro.highlights || isEditing) && (
                      <div className="my-10 md:my-12">
                        {isEditing && <div className="text-xs text-blue-500 font-bold mb-2">핵심 강조 수치 (Highlights) - 삭제는 빈칸으로 저장하세요</div>}
                        <ul className="grid md:grid-cols-4 gap-3 md:gap-4 pl-0">
                          {(intro.highlights || Array(4).fill({ bold: "", em: "" })).map((hl, hlIdx) => (
                            <li key={hlIdx} className="list-none relative px-4 md:px-5 py-5 md:py-6 bg-[#F8F9FF] border border-[#0047BB]/15 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,71,187,0.08)] break-normal md:[&:not(:last-child)]::after:content-[''] md:[&:not(:last-child)]::after:absolute md:[&:not(:last-child)]::after:-right-[14px] md:[&:not(:last-child)]::after:top-1/2 md:[&:not(:last-child)]::after:-translate-y-1/2 md:[&:not(:last-child)]::after:border-t-[2.5px] md:[&:not(:last-child)]::after:border-r-[2.5px] md:[&:not(:last-child)]::after:border-[#0047BB]/40 md:[&:not(:last-child)]::after:w-[10px] md:[&:not(:last-child)]::after:h-[10px] md:[&:not(:last-child)]::after:rotate-45">
                              <strong className="text-[#0047BB] font-black text-[15px] md:text-[18px] block mb-2 px-0 bg-none!">
                                <EditableText value={hl.bold} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; if(!n[idx].highlights) n[idx].highlights = Array(4).fill({bold:"", em:""}); n[idx].highlights![hlIdx] = { ...n[idx].highlights![hlIdx], bold: v }; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={false} />
                              </strong>
                              <em className="not-italic text-[13px] md:text-[14px] text-[#555F6B] leading-normal block mt-2 break-keep">
                                <EditableText value={hl.em} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; if(!n[idx].highlights) n[idx].highlights = Array(4).fill({bold:"", em:""}); n[idx].highlights![hlIdx] = { ...n[idx].highlights![hlIdx], em: v }; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={false} />
                              </em>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Body */}
                    {isEditing && <div className="text-xs text-blue-500 font-bold mb-1">본문 (Body)</div>}
                    <div className="mb-5 md:mb-7">
                      <EditableText value={intro.body} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].body = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                    </div>

                    {/* Closing */}
                    {isEditing ? (
                      <>
                        <div className="text-xs text-blue-500 font-bold mb-1 mt-6">마무리 (Closing)</div>
                        <EditableText value={intro.closing || ""} onSave={(v) => { const n = [...(data.selfIntroductions || [])]; n[idx].closing = v; setData({...data, selfIntroductions: n}); }} isEditing={isEditing} markdown={true} />
                      </>
                    ) : (
                      intro.closing && (
                        <div className="mt-8">
                          <EditableText value={intro.closing || ""} onSave={(v) => {}} isEditing={isEditing} markdown={true} />
                        </div>
                      )
                    )}

                    {/* Hardcoded Q5 Part 2 (AI Prototyping) */}
                    {idx === 4 && !isEditing && (
                      <div className="mt-4 pt-8 border-t-[1.5px] border-zinc-100/80">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          viewport={{ once: true }} 
                          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="mb-8 md:mb-12"
                        >
                          <h3 className="text-[30px] md:text-[40px] lg:text-[44px] xl:text-[46px] font-display font-black! text-[#1A1A1A] leading-[1.3] tracking-tighter break-keep text-opacity-90">
                            AI는 단순한 도구가 아닌,<br/>
                            <span className="text-[#0047BB] font-black!">가장 빠른 검증 수단입니다.</span>
                          </h3>
                          <div className="mt-6 md:mt-8 h-px bg-linear-to-r from-[#0047BB]/30 via-[#0047BB]/10 to-transparent" />
                        </motion.div>

                        <div className="mb-5 md:mb-7">
                          <p className="mb-5 md:mb-7 break-keep"><strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.22)_50%,transparent_50%)] px-[3px] rounded-sm">도로시아 프로젝트</strong>를 진행하며, 저는 기획서만으로는 재미를 검증할 수 없다고 생각했습니다. 기획자가 상상하는 재미와 실제로 플레이할 때의 재미는 다르기 때문입니다.</p>
                          <p className="mb-5 md:mb-7 break-keep">그래서 <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.22)_50%,transparent_50%)] px-[3px] rounded-sm">AI를 활용</strong>하여 직접 플레이 가능한 <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.22)_50%,transparent_50%)] px-[3px] rounded-sm">프로토타입</strong>을 만들었습니다. 기획 의도대로 시스템을 구현했고, 각 요소들을 조작할 수 있는 형태로 빠르게 제작했습니다.</p>
                        </div>

                        <div className="mt-8">
                          <p className="mb-5 md:mb-7 break-keep">이 프로토타입을 프로그래머에게 전달했을 때, 팀의 <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.22)_50%,transparent_50%)] px-[3px] rounded-sm">방향성이 흔들리지 않았습니다</strong>. 문서로는 각자 다르게 상상할 수 있는 '재미'를, 모두가 같은 화면에서 확인할 수 있었기 때문입니다.</p>
                          <p className="mb-5 md:mb-7 break-keep">AI는 단순한 도구가 아니라, 기획자의 의도를 가장 빠르게 검증할 수 있는 수단이라고 생각합니다.</p>
                        </div>
                      </div>
                    )}



                {/* 섹션 사이 희미한 구분선 (마지막 항목 제외) */}
                {idx < (data.selfIntroductions || []).length - 1 && (
                  <div className="absolute bottom-10 left-8 md:left-16 right-0 h-px bg-linear-to-r from-[#0047BB]/10 via-[#0047BB]/5 to-transparent" />
                )}
              </article>



            </React.Fragment>
          ))}

          {isEditing && (
            <button onClick={() => { const n = [...(data.selfIntroductions || [])]; n.push({ navTitle: "새 항목", logline: "새로운 항목의 로그라인을 입력하세요.", hook: "도입부를 입력하세요.", body: "본문을 입력하세요." }); setData({...data, selfIntroductions: n}); }}
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
            <div className="flex flex-col gap-6 border-l-2 border-[#0047BB]/10 pl-6 py-2">
              <div className="text-xs font-black tracking-[0.2em] text-[#0047BB]/60 mb-2">INDEX</div>
              {data.selfIntroductions.map((intro, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <a 
                    key={idx} 
                    href={`#intro-${idx}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`intro-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-[14px] font-medium transition-colors relative group block ${isActive ? 'text-[#0047BB]' : 'text-zinc-400 hover:text-[#0047BB]'}`}
                  >
                    <span className={`absolute -left-[29px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0047BB] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}/>
                    {String(idx + 1).padStart(2, '0')}. {intro.navTitle || '섹션 ' + (idx + 1)}
                  </a>
                );
              })}
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
    </div>
  );
};
