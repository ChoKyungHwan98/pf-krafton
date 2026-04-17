import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Mail, Phone, GraduationCap, Award, Briefcase, Wrench, Figma, User } from 'lucide-react';
import type { ResumeData } from '../types';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  Word: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.17 6.43l7.33-1.07v13.28l-7.33-1.07V6.43zm8.33-1.25V18.82l7.33 1.07V4.11L12.5 5.18zM6.5 8.79l1.19.12.8 4.23.95-4.23h1.05l.93 4.23.77-4.23 1.25.12-1.39 6.27h-1.12l-.98-4.32-.98 4.32H8l-1.5-6.51z"/></svg>,
  PowerPoint: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.18 6.48l7.32-1.07v13.2l-7.32-1.07V6.48zm8.32-1.32v13.68l7.32 1.07V4.09L12.5 5.16zM8.38 8.81h2.24c1.17 0 1.95.73 1.95 1.83 0 1.1-.78 1.83-1.95 1.83H9.4v3.23H8.38V8.81zm1.02.83v2.09h1.16c.55 0 .9-.36.9-.99 0-.64-.35-1.1-.9-1.1H9.4z"/></svg>,
  Excel: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.18 6.48l7.32-1.07v13.2l-7.32-1.07V6.48zm8.32-1.32v13.68l7.32 1.07V4.09L12.5 5.16zm-5.74 3.73l1.14.15.82 2.37.89-2.37h1.02l-1.36 3.19 1.48 3.32h-1.14l-1.01-2.43-1 2.43H6.42l1.52-3.32-1.42-3.34z"/></svg>,
  Notion: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.459 4.208c-.755 0-1.282.49-1.282 1.17v13.244c0 .679.527 1.17 1.282 1.17h15.082c.755 0 1.282-.491 1.282-1.17V5.378c0-.68-.527-1.17-1.282-1.17H4.459zM2.8 5.378c0-1.27 1.013-2.301 2.261-2.301h13.878C20.187 3.077 21.2 4.108 21.2 5.378v13.244c0 1.27-1.013 2.301-2.261 2.301H5.06A2.28 2.28 0 012.8 18.622V5.378zm5.553 10.603V8.895l4.896 6.945V8.125h1.196v7.856l-4.896-6.945v6.945H8.353z"/></svg>,
  Figma: <Figma className="w-3.5 h-3.5" />,
  Unity: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M12 1.41l10.59 6.1v12.2L12 25.82 1.41 19.71V7.51zM12 3.8L3.8 8.53v9.42l8.2 4.71 8.2-4.71V8.53zM12 12.35l7-4.04-1.26-2.18-5.38 3.1-6.19-4.88-1.56 1.94 4.86 3.82-4.48 2.58L6.2 14.8l5.8-3.35z"/></svg>,
};

export const PdfTemplate = React.forwardRef<HTMLDivElement, { data: ResumeData }>(({ data }, ref) => {
  return (
    <div ref={ref} className="bg-[#f8f9fa] w-[210mm] text-left shrink-0 pb-10 font-sans">
      
      {/* 1. 이력서 페이지 */}
      <div className="pdf-page bg-[#f8f9fa] w-[210mm] p-[12mm] min-h-[297mm]">
        {/* TOP PROFILE BOX */}
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-black/5 mb-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border border-black/5 shrink-0">
                <img src="https://picsum.photos/seed/profile/400/400" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" />
              </div>
              <div>
                <h1 className="text-[28px] font-display font-black text-[#2C2C2C] tracking-tight mb-1">{data.name}</h1>
                <p className="text-[#0047BB] font-bold font-mono tracking-widest text-[11px] uppercase mb-3">{data.role}</p>
                <div className="space-y-1 text-zinc-500">
                  <div className="flex items-center gap-2 text-[12px] font-medium"><Mail className="w-3.5 h-3.5" /> {data.email}</div>
                  <div className="flex items-center gap-2 text-[12px] font-medium"><Phone className="w-3.5 h-3.5" /> {data.phone}</div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-black/5"></div>

            <div>
              <h3 className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-2 flex items-center gap-1.5">
                <User className="w-3 h-3" /> 한줄 소개
              </h3>
              <div className="text-[14px] text-[#2C2C2C] leading-relaxed font-bold break-keep mb-4 [&_strong]:text-[#0047BB]">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.summary}</ReactMarkdown>
              </div>

              {data.tools && data.tools.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {data.tools.map((tool, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-zinc-50 rounded-md text-[10px] font-bold text-zinc-600 border border-black/5 flex items-center gap-1">
                      {TOOL_ICONS[tool.name] || <Wrench className="w-3 h-3" />}
                      {tool.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM COLUMNS */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-5 flex flex-col gap-6">
            {/* Education */}
            <section className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5 h-full">
              <h3 className="text-[15px] font-bold mb-4 flex items-center gap-2 text-[#2C2C2C]">
                <GraduationCap className="text-[#0047BB] w-4 h-4" /> 학력 및 교육
              </h3>
              <div className="space-y-5">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-black/10">
                    <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-none bg-zinc-300"></div>
                    <div className="flex flex-col mb-1.5">
                      <h4 className="font-bold text-[13px] text-[#2C2C2C] leading-snug">{edu.title}</h4>
                      <span className="text-[9px] font-mono text-zinc-400 mt-0.5">{edu.period}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 leading-relaxed mb-1.5">{edu.description}</div>
                    <ul className="text-[9px] text-zinc-500 space-y-1 list-none m-0 p-0">
                      {edu.details.map((detail, dIdx) => <li key={dIdx} className="relative pl-2.5"><span className="absolute left-0 top-[3px] w-[3px] h-[3px] bg-zinc-300 rounded-full"></span>{detail}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Certificates */}
            <section className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <h3 className="text-[15px] font-bold mb-4 flex items-center gap-2 text-[#2C2C2C]">
                <Award className="text-[#0047BB] w-4 h-4" /> 자격증
              </h3>
              <div className="flex flex-col gap-2">
                {data.certificates?.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-zinc-50/50 rounded-lg border border-black/5">
                    <h4 className="font-bold text-[11px] text-[#2C2C2C]">{cert.name}</h4>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] text-zinc-400 font-medium">취득 연도</span>
                      <span className="text-[10px] font-mono font-bold text-[#0047BB] leading-none">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Experience */}
          <div className="col-span-7">
            <section className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5 h-full">
              <h3 className="text-[15px] font-bold mb-6 flex items-center gap-2 text-[#2C2C2C]">
                <Briefcase className="text-[#0047BB] w-4 h-4" /> 프로젝트 경험
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-[2px] border-[#0047BB]/20">
                    <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0047BB] border-2 border-white shadow-sm"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-[14px] text-[#2C2C2C]">{exp.title}</h4>
                      <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full shrink-0">{exp.period}</span>
                    </div>
                    <div className="text-[11px] text-[#0047BB] font-semibold mb-2 bg-[#0047BB]/5 inline-block px-2 py-1 rounded border border-[#0047BB]/10">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{exp.description}</ReactMarkdown>
                    </div>
                    <ul className="text-[11px] text-zinc-600 space-y-1.5 list-none leading-relaxed m-0 p-0">
                      {exp.details.map((detail, dIdx) => (
                        <li key={dIdx} className="relative pl-3">
                          <span className="absolute left-0 top-1.5 w-[3px] h-[3px] bg-zinc-300 rounded-full"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* 2. 자기소개서 (섹션별로 1페이지씩) */}
      {data.selfIntroductions?.map((intro, idx) => (
        <div key={`intro-${idx}`} className="html2pdf__page-break pdf-page bg-[#f8f9fa] w-[210mm] p-[14mm] min-h-[297mm]">
          <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm px-10 pt-12 pb-14 h-full">
            <div className="mb-6">
              <h3 className="text-[28px] font-display font-black text-[#1A1A1A] leading-[1.3] tracking-tighter break-keep [&_p]:m-0 [&_p]:leading-[1.3] [&_strong]:text-[#0047BB] [&_strong]:font-black text-opacity-90">
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro.logline}</ReactMarkdown>
              </h3>
            </div>

            <div className="text-[#333F48] leading-[1.85] text-[13px] font-medium tracking-[-0.01em] [&_p]:mb-4 [&_hr]:border-none [&_hr]:h-3 [&_hr]:m-0 [&_hr]:p-0 [&_p]:break-keep [&_blockquote_p]:!mb-0 [&_strong]:text-[#0047BB] [&_strong]:font-extrabold [&_strong]:bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] [&_strong]:px-[3px] [&_strong]:rounded-sm [&_blockquote]:border-l-[4px] [&_blockquote]:border-[#0047BB] [&_blockquote]:bg-blue-50/20 [&_blockquote]:py-6 [&_blockquote]:px-6 [&_blockquote]:font-black [&_blockquote]:not-italic [&_blockquote]:text-[18px] [&_blockquote]:leading-[1.5] [&_blockquote]:text-[#0047BB] [&_blockquote]:my-6 [&_blockquote]:rounded-r-xl [&_ul]:grid [&_ul]:grid-cols-4 [&_ul]:gap-3 [&_ul]:my-6 [&_ul]:pl-0 [&_ul>li]:list-none [&_ul>li]:relative [&_ul>li]:px-3 [&_ul>li]:py-4 [&_ul>li]:bg-[#F8F9FF] [&_ul>li]:border [&_ul>li]:border-[#0047BB]/15 [&_ul>li]:rounded-xl [&_ul>li]:shadow-sm [&_ul>li]:break-normal [&_ul>li:not(:last-child)::after]:content-[''] [&_ul>li:not(:last-child)::after]:absolute [&_ul>li:not(:last-child)::after]:-right-[10px] [&_ul>li:not(:last-child)::after]:top-1/2 [&_ul>li:not(:last-child)::after]:-translate-y-1/2 [&_ul>li:not(:last-child)::after]:border-t-[2px] [&_ul>li:not(:last-child)::after]:border-r-[2px] [&_ul>li:not(:last-child)::after]:border-[#0047BB]/40 [&_ul>li:not(:last-child)::after]:w-[7px] [&_ul>li:not(:last-child)::after]:h-[7px] [&_ul>li:not(:last-child)::after]:rotate-45 [&_ul>li_strong]:text-[#0047BB] [&_ul>li_strong]:font-black [&_ul>li_strong]:text-[13px] [&_ul>li_strong]:block [&_ul>li_strong]:mb-1.5 [&_ul>li_strong]:bg-none [&_ul>li_strong]:px-0 [&_ul>li_em]:not-italic [&_ul>li_em]:text-[10px] [&_ul>li_em]:text-[#555F6B] [&_ul>li_em]:leading-[1.5] [&_ul>li_em]:block [&_ul>li_em]:mt-1.5 [&_ul>li_em]:break-keep">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro.content}</ReactMarkdown>
            </div>

            {/* 섹션 0 전용 추가 타이포그래피 (14년의 꿈을 포기한 계기) */}
            {idx === 0 && (
              <div className="mt-2 mb-8 text-[#333F48] leading-[1.9] text-[13px] font-medium tracking-[-0.01em] break-keep">
                <p className="mb-4">
                  그 자리에서 확신했습니다.{' '}
                  법학이{' '}
                  <span className="inline-flex items-baseline gap-[2px] mx-[2px]">
                    <span className="text-[20px] font-black text-zinc-300 leading-none">−</span>
                    <span className="text-[12px] font-semibold text-zinc-400">에서</span>
                    <span className="text-[20px] font-black text-zinc-400 leading-none">0</span>
                  </span>
                  으로 되돌리는 일이라면, 게임은{' '}
                  <span className="inline-flex items-baseline gap-[2px] mx-[2px]">
                    <span className="text-[20px] font-black text-zinc-500 leading-none">0</span>
                    <span className="text-[12px] font-semibold text-zinc-500">에서</span>
                    <span className="text-[26px] font-black text-[#0047BB] leading-none">+</span>
                  </span>
                  가 되는 경험을 만든다는 것을.{' '}
                  저도 누군가의 하루를 움직이는 사람이 되고 싶었습니다.
                </p>
                <p className="text-[13px]">
                  법학을 공부하며 배운 것이 있습니다. 모든 제도는 입법{' '}
                  <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[2px] rounded-sm">'의도'</strong>를 바탕으로{' '}
                  <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[2px] rounded-sm">'구조화'</strong>되며, 사회라는 하나의{' '}
                  <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[2px] rounded-sm">'시스템'</strong>으로 작동한다는 것입니다.
                  저는 이 원리가{' '}
                  <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[2px] rounded-sm">게임 기획의 본질</strong>과 같다고 믿습니다.
                </p>
                <p className="mt-4 text-[13px] font-bold text-[#1A1A1A]">
                  저는 그 <strong className="text-[#0047BB] font-extrabold bg-[linear-gradient(to_top,rgba(0,71,187,0.18)_50%,transparent_50%)] px-[2px] rounded-sm">+를 설계하는 기획자</strong>가 되겠습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

PdfTemplate.displayName = 'PdfTemplate';
