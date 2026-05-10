import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Mail, Calendar, MapPin, Shield, Download, Wrench } from 'lucide-react';
import { PdfTemplate } from '../PdfTemplate';
import { renderToStaticMarkup } from 'react-dom/server';
import { BRAND_ICONS } from '../icons/BrandIcons';
import type { ResumeData } from '../../types';

interface Props { data: ResumeData; }
type InnerTab = 'resume' | 'cover-letter';

/* ── HTML 태그 포함 여부 확인 ── */
const hasHtmlTags = (text: string) => /<[a-zA-Z][^>]*>/.test(text);

/* ── 로그라인 렌더러: HTML 태그 포함 시 dangerouslySetInnerHTML, 아닌 경우 **볼드** → 파란 Bold ── */
const renderLogline = (text: string): React.ReactNode => {
  if (hasHtmlTags(text)) {
    // HTML span 태그가 포함된 경우: **...** 마크다운을 파란색 span으로 정제하고 HTML로 렌더링
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<span style="color:#0047BB;font-weight:900">$1</span>')
      .replace(/\\n|\n/g, '<br/>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return text.trim().split(/\n/).map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {parts.map((p, j) => {
          if (p.startsWith('**') && p.endsWith('**')) {
            return <span key={j} style={{ color: '#0047BB', fontWeight: 900 }}>{p.slice(2, -2)}</span>;
          }
          return <span key={j}>{p}</span>;
        })}
      </React.Fragment>
    );
  });
};

/* ── 인라인 볼드 렌더러: **볼드** → 파란 하이라이트 ── */
const renderInline = (line: string): React.ReactNode => {
  const parts = line.split(/(\*\*.*?\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} style={{
          fontWeight: 800, color: '#0047BB',
          background: 'rgba(0,71,187,0.09)',
          padding: '1px 3px', borderRadius: 3,
        }}>{p.slice(2, -2)}</strong>
      );
    }
    return <span key={i}>{p}</span>;
  });
};

/* ── HTML 엔티티(&lt; &gt; &amp;) 디코딩 ── */
const decodeHtmlEntities = (text: string): string =>
  text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/* ── 본문 렌더러: \n\n → 단락 분리, HTML span 태그 포함 시 dangerouslySetInnerHTML, 아닌 경우 **볼드** 인라인 하이라이트 ── */
const BodyText = ({ text, style }: { text: string; style?: React.CSSProperties }) => {
  // HTML 엔티티 디코딩, \r 정제, 마크다운 > 블록쿠오트 표시자 제거
  const decoded = decodeHtmlEntities(text).replace(/\r/g, '').replace(/^>\s?/gm, '');
  const pStyle: React.CSSProperties = {
    fontSize: 13.5, color: '#2d2d2d', lineHeight: 1.95,
    letterSpacing: '-0.01em', wordBreak: 'keep-all',
    overflowWrap: 'break-word', WebkitFontSmoothing: 'antialiased',
    ...style,
  };

  if (hasHtmlTags(decoded)) {
    // HTML span 태그를 포함한 본문: **...**  마크다운 변환 후 dangerouslySetInnerHTML
    const html = decoded
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:800;color:#0047BB;background:rgba(0,71,187,0.09);padding:1px 3px;border-radius:3px">$1</strong>')
      .replace(/\n{2,}/g, '</p><p style="font-size:13.5px;color:#2d2d2d;line-height:1.95;letter-spacing:-0.01em;word-break:keep-all;overflow-wrap:break-word;margin:0 0 14px">')
      .replace(/\n/g, '<br/>');
    return (
      <p style={{ ...pStyle, margin: 0 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // 일반 텍스트: 이중 \n\n 단락 분리
  const paragraphs = decoded.split(/\n{2,}/);
  return (
    <>
      {paragraphs.map((para, pi) => {
        const lines = para.split(/\n/);
        return (
          <p key={pi} style={{ ...pStyle, margin: pi < paragraphs.length - 1 ? '0 0 14px' : 0 }}>
            {lines.map((line, li) => (
              <React.Fragment key={li}>
                {li > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
};

/* ── 호환성: 기존 renderBody 유지 ── */
const renderBody = (text: string): React.ReactNode => <BodyText text={text} />;

/* ── 수치/볼드 하이라이트 ── */
const Highlight = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*.*?\*\*|\d+(?:[,.\d]*)?(?:%|초|인|배|종|명|개|번|회|일|년|월|점|ms|s|x)?)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return <strong key={i} style={{ fontWeight: 900, color: '#1A2332' }}>{p.slice(2, -2)}</strong>;
        } else if (/^\d/.test(p) && p.length > 0) {
          return <strong key={i} style={{ fontWeight: 800, color: '#0047BB' }}>{p}</strong>;
        }
        return <span key={i}>{p}</span>;
      })}
    </>
  );
};

/* ── 개별 카드 아코디언 ── */
const AccordionCard = ({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      border: '1px solid rgba(0,0,0,0.07)',
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent', fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 900, color: '#1A2332', textTransform: 'uppercase', letterSpacing: '0.34em' }}>
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight strokeWidth={2.5} style={{ width: 14, height: 14, color: '#0047BB' }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 20px 20px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── 경력 아이템 ── */
const ExpItem = ({ exp, isLast }: { exp: any; isLast: boolean }) => (
  <div style={{ display: 'flex', gap: 14, paddingBottom: isLast ? 0 : 32 }}>
    {/* 타임라인 */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 8, flexShrink: 0 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#0047BB', marginTop: 4, flexShrink: 0, boxShadow: '0 0 0 2px rgba(0,71,187,0.15)' }} />
      {!isLast && <div style={{ width: 1, flexGrow: 1, background: 'rgba(0,71,187,0.12)', marginTop: 5 }} />}
    </div>
    {/* 내용 */}
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* 기간 */}
      <span style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#0047BB', letterSpacing: '0.04em', marginBottom: 5 }}>
        {exp.period}
      </span>
      {/* 프로젝트 타이틀 */}
      <h4 style={{ fontSize: 15, fontWeight: 900, color: '#1A2332', letterSpacing: '-0.03em', lineHeight: 1.25, marginBottom: 8 }}>
        {exp.title}
      </h4>
      {/* 통합 메타바: description + teamSize */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        background: '#f4f4f5', border: '1px solid #e4e4e7',
        borderRadius: 7, marginBottom: 11, overflow: 'hidden',
      }}>
        <div style={{
          padding: '7px 12px', fontSize: 12, fontWeight: 700, color: '#0047BB',
          lineHeight: 1.5, wordBreak: 'keep-all', flex: '1 1 auto',
        }}>
          {exp.description}
        </div>
        {exp.teamSize && (
          <>
            <div style={{ width: 1, alignSelf: 'stretch', background: '#e4e4e7', flexShrink: 0 }} />
            <div style={{ padding: '7px 12px', fontSize: 11, fontWeight: 600, color: '#71717a', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {exp.teamSize}
            </div>
          </>
        )}
      </div>
      {/* 세부 항목 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {exp.details.map((d: string, j: number) => (
          <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, marginTop: 8, border: '1.5px solid #0047BB', background: 'transparent' }} />
            <span style={{ fontSize: 12, color: '#4a4a4a', lineHeight: 1.85, wordBreak: 'keep-all', fontWeight: 500 }}>
              <Highlight text={d} />
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const MobileResume = ({ data }: Props) => {
  const [innerTab, setInnerTab] = useState<InnerTab>('resume');

  const handleDownload = () => {
    const htmlString = renderToStaticMarkup(<PdfTemplate data={data} />);
    const printWindow = window.open('', '_blank', 'width=900,height=1200');
    if (!printWindow) { alert('팝업 차단이 활성화되어 있습니다.'); return; }
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(n => n.outerHTML).join('\n');
    printWindow.document.open();
    printWindow.document.write(`<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>조경환_게임기획자_포트폴리오</title>${styles}<style>@page{size:A4 portrait;margin:0;}body{margin:0;background:#f8f9fa;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}.pdf-page{page-break-after:always;break-after:page;}.pdf-page:last-child{page-break-after:auto;break-after:auto;}</style></head><body>${htmlString}</body></html>`);
    printWindow.document.close();
    printWindow.onload = () => {
      Promise.all([printWindow.document.fonts.ready, ...Array.from(printWindow.document.images).map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; }))]).then(() => { printWindow.focus(); printWindow.print(); });
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        minHeight: '100dvh',
        background: '#FDFCF8',
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        backgroundBlendMode: 'multiply',
        paddingBottom: 80,
      }}
    >
      {/* ── Sticky 헤더 ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(253,252,248,0.96)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '14px 20px 12px',
      }}>
        <div style={{ marginBottom: 11 }}>
          <span style={{ display: 'block', fontSize: 9, fontWeight: 900, letterSpacing: '0.38em', color: '#0047BB', textTransform: 'uppercase', marginBottom: 2 }}>Documents</span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A2332', letterSpacing: '-0.03em', lineHeight: 1 }}>이력서</h2>
        </div>
        {/* 내부 탭 */}
        <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.05)', borderRadius: 10, padding: 3, gap: 2 }}>
          {(['resume', 'cover-letter'] as InnerTab[]).map(tab => {
            const isOn = innerTab === tab;
            return (
              <button key={tab} onClick={() => setInnerTab(tab)} style={{
                padding: '6px 14px', fontSize: 11.5, fontWeight: 800,
                borderRadius: 8, border: 'none',
                background: isOn ? '#fff' : 'transparent',
                color: isOn ? '#0047BB' : '#a1a1aa',
                boxShadow: isOn ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                cursor: 'pointer', transition: 'all 0.18s',
                letterSpacing: '-0.01em', fontFamily: 'inherit',
                WebkitTapHighlightColor: 'transparent',
              }}>
                {tab === 'resume' ? '이력서' : '자기소개서'}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {innerTab === 'resume' ? (
          <motion.div key="resume"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
            style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {/* ── 프로필 카드 ── */}
            <div style={{
              background: '#fff', borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.07)',
              borderTop: '3px solid #0047BB',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              padding: '18px 20px',
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                {/* 프로필 사진 */}
                {data.image && (
                  <img
                    src={data.image} alt={data.name}
                    style={{ width: 90, height: 'auto', display: 'block', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 3px 10px rgba(0,0,0,0.10)', flexShrink: 0, objectFit: 'contain' }}
                  />
                )}
                {/* 이름/직함/연락처 */}
                <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#1A2332', letterSpacing: '-0.045em', marginBottom: 5, lineHeight: 1 }}>{data.name}</h3>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#0047BB', marginBottom: 12, letterSpacing: '-0.01em', lineHeight: 1.4 }}>{data.role}</p>
                  {/* 연락처 — PC 기준 2열 그리드 (전화번호 제외) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', marginTop: 2 }}>
                    {/* 이메일 */}
                    {data.email && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,71,187,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Mail strokeWidth={2} style={{ width: 11, height: 11, color: '#0047BB' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: 8, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 1 }}>Email</span>
                          <span style={{ fontSize: 10.5, color: '#1A2332', fontWeight: 600, wordBreak: 'break-all' }}>{data.email}</span>
                        </div>
                      </div>
                    )}
                    {/* 생년월일 */}
                    {data.birthDate && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,71,187,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Calendar strokeWidth={2} style={{ width: 11, height: 11, color: '#0047BB' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: 8, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 1 }}>생년월일</span>
                          <span style={{ fontSize: 10.5, color: '#1A2332', fontWeight: 600 }}>{data.birthDate}</span>
                        </div>
                      </div>
                    )}
                    {/* 주소 */}
                    {data.address && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,71,187,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <MapPin strokeWidth={2} style={{ width: 11, height: 11, color: '#0047BB' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: 8, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 1 }}>주소</span>
                          <span style={{ fontSize: 10.5, color: '#1A2332', fontWeight: 600 }}>{data.address}</span>
                        </div>
                      </div>
                    )}
                    {/* 병역 */}
                    {data.military && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,71,187,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Shield strokeWidth={2} style={{ width: 11, height: 11, color: '#0047BB' }} />
                        </div>
                        <div>
                          <span style={{ display: 'block', fontSize: 8, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 1 }}>병역</span>
                          <span style={{ fontSize: 10.5, color: '#1A2332', fontWeight: 600 }}>{data.military.branch} {data.military.rank} {data.military.status}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {data.summary && (
                <p style={{
                  fontSize: 12.5, color: '#52525b', lineHeight: 1.95,
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                  paddingTop: 14, marginTop: 14,
                  letterSpacing: '-0.01em', wordBreak: 'keep-all',
                }}>
                  {data.summary.replace(/\*\*/g, '')}
                </p>
              )}
            </div>

            {/* ── 각 항목 개별 카드 아코디언 ── */}

            {/* 경력 사항 */}
            <AccordionCard title="경력 사항" defaultOpen={false}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {data.experience.map((exp, i) => (
                  <ExpItem key={i} exp={exp} isLast={i === data.experience.length - 1} />
                ))}
              </div>
            </AccordionCard>

            {/* 학력 */}
            <AccordionCard title="학력" defaultOpen={false}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ paddingLeft: 12, borderLeft: '2px solid rgba(0,71,187,0.15)' }}>
                    <h4 style={{ fontSize: 13.5, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.02em', marginBottom: 3 }}>{edu.title}</h4>
                    <span style={{ display: 'block', fontSize: 10.5, fontWeight: 700, color: '#a1a1aa', marginBottom: 6, letterSpacing: '0.02em' }}>{edu.period}</span>
                    <p style={{ fontSize: 12, color: '#52525b', lineHeight: 1.75 }}>{edu.description}</p>
                    {edu.details.map((d, j) => (
                      <p key={j} style={{ fontSize: 11, color: '#a1a1aa', marginTop: 4, letterSpacing: '-0.005em' }}>▸ {d}</p>
                    ))}
                  </div>
                ))}
              </div>
            </AccordionCard>

            {/* 자격증 */}
            {data.certificates && data.certificates.length > 0 && (
              <AccordionCard title="자격증 / 어학" defaultOpen={false}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {data.certificates.map((cert, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '11px 0',
                      borderBottom: i < (data.certificates?.length ?? 0) - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.02em' }}>{cert.name}</span>
                      <div style={{ textAlign: 'right' }}>
                        {cert.score && <span style={{ display: 'block', fontSize: 13.5, fontWeight: 900, color: '#0047BB' }}>{cert.score}점</span>}
                        <span style={{ fontSize: 10, color: '#a1a1aa' }}>{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionCard>
            )}

            {/* 군복무 */}
            {data.military && (
              <AccordionCard title="군복무" defaultOpen={false}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: '#1A2332', marginBottom: 5, letterSpacing: '-0.02em' }}>{data.military.branch}</p>
                  <p style={{ fontSize: 12, color: '#71717a', letterSpacing: '-0.01em' }}>{data.military.role} · {data.military.rank} · {data.military.status}</p>
                </div>
              </AccordionCard>
            )}

            {/* 보유 역량/툴 — PC ResumeTools와 동일한 3그룹 구조 + 브랜드 아이콘 */}
            {data.tools && data.tools.length > 0 && (
              <AccordionCard title="보유 역량 / 툴" defaultOpen={false}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                  {/* Group 1: Documentation & Office */}
                  {data.tools.filter(t => ['Excel','PowerPoint','Word','Notion'].includes(t.name)).length > 0 && (
                    <div>
                      <h4 style={{
                        fontSize: 8.5, fontWeight: 900, color: '#0047BB',
                        letterSpacing: '0.38em', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(0,71,187,0.10)',
                        paddingBottom: 6, marginBottom: 12,
                      }}>Documentation &amp; Office</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                        {data.tools.filter(t => ['Excel','PowerPoint','Word','Notion'].includes(t.name)).map((tool, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <div style={{ flexShrink: 0, paddingTop: 1, color: '#1A2332' }}>
                              {BRAND_ICONS[tool.name] || <Wrench style={{ width: 18, height: 18, color: '#a1a1aa' }} />}
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.01em' }}>{tool.name}</span>
                              <p style={{ fontSize: 10.5, color: '#71717a', lineHeight: 1.45, margin: 0, marginTop: 1 }}>{tool.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Group 2: AI Assistants */}
                  {data.tools.filter(t => ['ChatGPT','Claude','Gemini','Antigravity'].includes(t.name)).length > 0 && (
                    <div>
                      <h4 style={{
                        fontSize: 8.5, fontWeight: 900, color: '#0047BB',
                        letterSpacing: '0.38em', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(0,71,187,0.10)',
                        paddingBottom: 6, marginBottom: 12,
                      }}>AI Assistants</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                        {data.tools.filter(t => ['ChatGPT','Claude','Gemini','Antigravity'].includes(t.name)).map((tool, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <div style={{ flexShrink: 0, paddingTop: 1, color: '#1A2332' }}>
                              {BRAND_ICONS[tool.name] || <Wrench style={{ width: 18, height: 18, color: '#a1a1aa' }} />}
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.01em' }}>{tool.name}</span>
                              <p style={{ fontSize: 10.5, color: '#71717a', lineHeight: 1.45, margin: 0, marginTop: 1 }}>{tool.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Group 3: Creative & Engine */}
                  {data.tools.filter(t => ['Figma','Unity'].includes(t.name)).length > 0 && (
                    <div>
                      <h4 style={{
                        fontSize: 8.5, fontWeight: 900, color: '#0047BB',
                        letterSpacing: '0.38em', textTransform: 'uppercase',
                        borderBottom: '1px solid rgba(0,71,187,0.10)',
                        paddingBottom: 6, marginBottom: 12,
                      }}>Creative &amp; Engine</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
                        {data.tools.filter(t => ['Figma','Unity'].includes(t.name)).map((tool, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <div style={{ flexShrink: 0, paddingTop: 1, color: '#1A2332' }}>
                              {BRAND_ICONS[tool.name] || <Wrench style={{ width: 18, height: 18, color: '#a1a1aa' }} />}
                            </div>
                            <div>
                              <span style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.01em' }}>{tool.name}</span>
                              <p style={{ fontSize: 10.5, color: '#71717a', lineHeight: 1.45, margin: 0, marginTop: 1 }}>{tool.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </AccordionCard>
            )}

          </motion.div>
        ) : (
          <motion.div key="cover-letter"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 16px 0' }}
          >
            {data.selfIntroductions?.map((si, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 20,
                border: '1px solid rgba(0,0,0,0.07)',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                {/* Q 헤더: 좌=Q번호, 우=navTitle index */}
                <div style={{
                  background: '#0047BB',
                  padding: '12px 18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontSize: 22, fontWeight: 900, color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'inherit',
                  }}>
                    Q{i + 1}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.04em', textAlign: 'right', maxWidth: '55%', lineHeight: 1.3,
                  }}>
                    {si.navTitle}
                  </span>
                </div>

                {/* 로그라인: PC와 동일한 대형 타이포 */}
                <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <p style={{
                    fontSize: 20, fontWeight: 900, color: '#1A2332',
                    letterSpacing: '-0.04em', lineHeight: 1.35, margin: 0,
                  }}>
                    {renderLogline(si.logline)}
                  </p>
                </div>

                {/* 본문 */}
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column' }}>
                  {[si.hook, si.body].filter(Boolean).map((text, j) => (
                    <BodyText key={j} text={text!} />
                  ))}
                </div>

                {/* PullQuote: 블록쿼오트 스타일 */}
                {si.pullQuote && (
                  <div style={{
                    margin: '0 16px 16px',
                    padding: '14px 16px',
                    borderLeft: '3px solid rgba(0,71,187,0.4)',
                    background: 'rgba(0,71,187,0.04)',
                    borderRadius: '0 10px 10px 0',
                  }}>
                    <p style={{
                      fontSize: 14.5, fontWeight: 700, color: '#1A2332',
                      lineHeight: 1.6, margin: 0, letterSpacing: '-0.02em', wordBreak: 'keep-all',
                    }}>
                      {si.pullQuote}
                    </p>
                  </div>
                )}

                {/* Highlights: 핵심 수치 그리드 */}
                {si.highlights && si.highlights.filter(h => h.bold).length > 0 && (
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: 8, padding: '0 16px 16px',
                  }}>
                    {si.highlights.filter(h => h.bold).map((hl, hi) => (
                      <div key={hi} style={{
                        padding: '12px 14px',
                        background: 'rgba(0,71,187,0.04)',
                        border: '1px solid rgba(0,71,187,0.12)',
                        borderRadius: 12,
                      }}>
                        <strong style={{ display: 'block', fontSize: 14, fontWeight: 900, color: '#0047BB', marginBottom: 4 }}>
                          {hl.bold}
                        </strong>
                        <em style={{ display: 'block', fontSize: 10.5, color: '#71717a', fontStyle: 'normal', lineHeight: 1.45 }}>
                          {hl.em}
                        </em>
                      </div>
                    ))}
                  </div>
                )}

                {/* Closing */}
                {si.closing && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: 14 }}>
                    <BodyText text={si.closing} />
                  </div>
                )}

                {/* Q5 하드코딩 Part 2 — PC CoverLetter.tsx와 동일 */}
                {i === 4 && (
                  <div style={{ borderTop: '1.5px solid rgba(0,0,0,0.06)' }}>
                    {/* Part 2 로그라인 — Q 본문 로그라인과 동일한 구조 */}
                    <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                      <p style={{
                        fontSize: 20, fontWeight: 900, color: '#1A2332',
                        letterSpacing: '-0.04em', lineHeight: 1.35, margin: 0,
                      }}>
                        AI는 단순한 도구가 아닌,<br />
                        <span style={{ color: '#0047BB' }}>가장 빠른 검증 수단입니다.</span>
                      </p>
                    </div>
                    {/* Part 2 본문 — Q 본문 섹션과 동일한 패딩·타이포 */}
                    <div style={{ padding: '16px 20px 20px' }}>
                      <BodyText text={[
                        '**도로시아 프로젝트**를 진행하며, 저는 기획서만으로는 재미를 검증할 수 없다고 생각했습니다. 기획자가 상상하는 재미와 실제로 플레이할 때의 재미는 다르기 때문입니다.',
                        '그래서 **AI를 활용**하여 직접 플레이 가능한 **프로토타입**을 만들었습니다. 기획 의도대로 시스템을 구현했고, 각 요소들을 조작할 수 있는 형태로 빠르게 제작했습니다.',
                        '이 프로토타입을 프로그래머에게 전달했을 때, 팀의 **방향성이 흔들리지 않았습니다**. 문서로는 각자 다르게 상상할 수 있는 \'재미\'를, 모두가 같은 화면에서 확인할 수 있었기 때문입니다.',
                        'AI는 단순한 도구가 아니라, 기획자의 의도를 가장 빠르게 검증할 수 있는 수단이라고 생각합니다.',
                      ].join('\n\n')} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
