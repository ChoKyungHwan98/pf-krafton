/**
 * PdfTemplate.tsx
 * 100% INLINE STYLES — NO TAILWIND CLASSES
 * This is critical: html2canvas (used by html2pdf.js) crashes on Tailwind 4's
 * oklch() / color-mix(in oklab) computed values. All colors must be hex or rgba.
 */
import React from 'react';
import type { ResumeData } from '../types';

/* ─── design tokens ─────────────────────────────────────────────── */
const BLUE        = '#0047BB';
const DARK        = '#1A1A1A';
const BODY        = '#333F48';
const MUTED       = '#71717A';
const FAINT       = '#A1A1AA';
const LIGHTER     = '#D4D4D8';
const BG          = '#f8f9fa';
const WHITE       = '#ffffff';
const CARD_BORDER = 'rgba(0,0,0,0.06)';
const BLUE_FAINT  = 'rgba(0,71,187,0.06)';
const BLUE_BORDER = 'rgba(0,71,187,0.15)';
const PAGE: React.CSSProperties = {
  width: '210mm',
  height: '297mm',
  boxSizing: 'border-box',
  background: BG,
  fontFamily: "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
  fontSize: '12px',
  color: DARK,
  pageBreakAfter: 'always',
  breakAfter: 'page',
  overflow: 'hidden',
};

/* ─── inline markdown & html renderer ────────────────────────────── */
function inlineRender(text: string): React.ReactNode {
  const nodes: React.ReactNode[] = [];
  const clean = text.replace(/\n/g, ' ');
  
  // Match **bold**, <strong>bold</strong>, and <span...>text</span>
  const rx = /(\*\*(.*?)\*\*|<strong>(.*?)<\/strong>|<span[^>]*>(.*?)<\/span>)/g;
  
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = rx.exec(clean))) {
    if (m.index > last) nodes.push(clean.slice(last, m.index));
    
    if (m[2] || m[3]) {
      // Bold (Recursively render to catch nested spans!)
      nodes.push(<strong key={k++} style={{ color: BLUE, fontWeight: 800 }}>{inlineRender(m[2] || m[3])}</strong>);
    } else if (m[4]) {
      // Span (e.g., -, 0, +)
      const content = m[4];
      const isPlus = content === '+';
      nodes.push(
        <span key={k++} style={{ 
          fontSize: '16px', 
          fontWeight: 900, 
          color: isPlus ? BLUE : '#999',
          margin: '0 2px'
        }}>
          {content}
        </span>
      );
    }
    
    last = m.index + m[0].length;
  }
  if (last < clean.length) nodes.push(clean.slice(last));
  return nodes.length === 1 && typeof nodes[0] === 'string' ? nodes[0] : nodes;
}

/* ─── paragraphs renderer ────────────────────────────────────────── */
function renderParagraphs(text: string): React.ReactNode {
  if (!text) return null;
  return text.split('\n\n').map((p, i) => (
    <p key={i} style={{ margin: '0 0 12px', lineHeight: 1.85, fontSize: '13px', color: BODY, wordBreak: 'keep-all' }}>
      {inlineRender(p)}
    </p>
  ));
}

/* ─── pullQuote renderer ─────────────────────────────────────────── */
function renderPullQuote(text?: string): React.ReactNode {
  if (!text) return null;
  return (
    <div style={{ borderLeft: `3px solid ${BLUE_BORDER}`, background: '#F8F9FF', padding: '16px 24px', margin: '24px 0', borderRadius: '0 12px 12px 0' }}>
      <span style={{ fontWeight: 700, fontSize: '14px', color: BODY }}>{text}</span>
    </div>
  );
}

/* ─── highlights renderer (Horizontal for single column) ──────────── */
function renderHighlightsHorizontal(items?: { bold: string; em: string }[]): React.ReactNode {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '24px 0' }}>
      {items.map((item, j) => (
        <div key={j} style={{ background: '#F8F9FF', border: `1px solid ${BLUE_BORDER}`, borderRadius: '12px', padding: '16px 14px' }}>
          <div style={{ fontWeight: 800, fontSize: '12px', color: BLUE, marginBottom: '6px' }}>{item.bold}</div>
          <div style={{ fontSize: '11px', color: MUTED, lineHeight: 1.5, wordBreak: 'keep-all' }}>{item.em}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── logline renderer (Refined) ─────────────────────────────────── */
function renderLogline(logline: string): React.ReactNode {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
       {logline.trim().split(/\s*\n\s*/).map((line, i) => {
          const isBold = line.startsWith('**') && line.endsWith('**');
          return (
            <div key={i} style={{ fontSize: '26px', fontWeight: 900, lineHeight: 1.25, color: isBold ? BLUE : DARK, letterSpacing: '-0.8px', wordBreak: 'keep-all' }}>
              {isBold ? line.slice(2, -2) : line}
            </div>
          );
       })}
    </div>
  );
}

/* ─── tool SVG paths ─────────────────────────────────────────────── */
const TOOL_PATHS: Record<string, string> = {
  Word:        'M4.17 6.43l7.33-1.07v13.28l-7.33-1.07V6.43zm8.33-1.25V18.82l7.33 1.07V4.11L12.5 5.18zM6.5 8.79l1.19.12.8 4.23.95-4.23h1.05l.93 4.23.77-4.23 1.25.12-1.39 6.27h-1.12l-.98-4.32-.98 4.32H8l-1.5-6.51z',
  PowerPoint:  'M4.18 6.48l7.32-1.07v13.2l-7.32-1.07V6.48zm8.32-1.32v13.68l7.32 1.07V4.09L12.5 5.16zM8.38 8.81h2.24c1.17 0 1.95.73 1.95 1.83 0 1.1-.78 1.83-1.95 1.83H9.4v3.23H8.38V8.81zm1.02.83v2.09h1.16c.55 0 .9-.36.9-.99 0-.64-.35-1.1-.9-1.1H9.4z',
  Excel:       'M4.18 6.48l7.32-1.07v13.2l-7.32-1.07V6.48zm8.32-1.32v13.68l7.32 1.07V4.09L12.5 5.16zm-5.74 3.73l1.14.15.82 2.37.89-2.37h1.02l-1.36 3.19 1.48 3.32h-1.14l-1.01-2.43-1 2.43H6.42l1.52-3.32-1.42-3.34z',
  Notion:      'M4.459 4.208c-.755 0-1.282.49-1.282 1.17v13.244c0 .679.527 1.17 1.282 1.17h15.082c.755 0 1.282-.491 1.282-1.17V5.378c0-.68-.527-1.17-1.282-1.17H4.459zM2.8 5.378c0-1.27 1.013-2.301 2.261-2.301h13.878C20.187 3.077 21.2 4.108 21.2 5.378v13.244c0 1.27-1.013 2.301-2.261 2.301H5.06A2.28 2.28 0 012.8 18.622V5.378zm5.553 10.603V8.895l4.896 6.945V8.125h1.196v7.856l-4.896-6.945v6.945H8.353z',
  Figma:       'M8 13c0 1.657 1.343 3 3 3s3-1.343 3-3v-3H8v3zm3-11c-1.657 0-3 1.343-3 3s1.343 3 3 3V2zm-3 6c-1.657 0-3 1.343-3 3s1.343 3 3 3V8zm9 3c0-1.657-1.343-3-3-3v6c1.657 0 3-1.343 3-3zM8 2a3 3 0 000 6h3V2H8z',
  Unity:       'M12 3.8L3.8 8.53v9.42l8.2 4.71 8.2-4.71V8.53zM12 12.35l7-4.04-1.26-2.18-5.38 3.1-6.19-4.88-1.56 1.94 4.86 3.82-4.48 2.58L6.2 14.8l5.8-3.35z',
};

const ToolBadge: React.FC<{ name: string }> = ({ name }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', background: '#FAFAFA', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: '#52525B' }}>
    {TOOL_PATHS[name] && (
      <svg viewBox="0 0 24 24" width="12" height="12" style={{ fill: '#52525B', flexShrink: 0 }}>
        <path d={TOOL_PATHS[name]} />
      </svg>
    )}
    {name}
  </span>
);

/* ─── PAGE 1: RESUME ─────────────────────────────────────────────── */
const ResumePage: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div style={{ ...PAGE, padding: '12mm 14mm', display: 'flex', flexDirection: 'column', background: WHITE }} className="pdf-page">

    {/* ── 1. Editorial Header ── */}
    <header style={{ 
      display: 'flex', 
      gap: '32px', 
      background: '#FAFAFA', 
      border: '1px solid rgba(0,0,0,0.06)', 
      borderRadius: '2px', 
      padding: '32px', 
      marginBottom: '24px' 
    }}>
      {/* Portrait */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ 
          width: '140px', 
          height: '180px', 
          borderRadius: '2px', 
          overflow: 'hidden', 
          border: '1px solid rgba(0,0,0,0.1)', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
        }}>
          <img src={resumeData.image || "https://picsum.photos/seed/profile/600/800"} alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-10px', 
          right: '-10px', 
          width: '32px', 
          height: '32px', 
          background: BLUE, 
          color: WHITE, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '8px', 
          fontWeight: 900, 
          fontFamily: 'monospace' 
        }}>
          PRFL
        </div>
      </div>

      {/* Identity & Summary */}
      <div style={{ flex: 1, paddingTop: '4px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: DARK, letterSpacing: '-2px', margin: '0 0 4px', lineHeight: 1 }}>
          {data.name}
        </h1>
        <p style={{ 
          fontSize: '10px', 
          fontWeight: 900, 
          color: BLUE, 
          letterSpacing: '4px', 
          textTransform: 'uppercase', 
          margin: '0 0 16px', 
          borderBottom: `2px solid ${BLUE}`, 
          display: 'inline-block', 
          paddingBottom: '2px' 
        }}>
          {data.role}
        </p>
        <div style={{ fontSize: '13.5px', fontWeight: 600, color: BODY, lineHeight: 1.7, fontStyle: 'italic', wordBreak: 'keep-all', marginBottom: '16px', opacity: 0.9 }}>
          {data.summary}
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: MUTED, fontWeight: 700, textTransform: 'uppercase' }}>
          <span>✉ {data.email.toLowerCase()}</span>
          <span>☎ {data.phone}</span>
          {data.birthDate && <span>🗓 {data.birthDate}</span>}
        </div>
      </div>
    </header>

    {/* ── 2. Body Columns ── */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '32px', flex: 1 }}>
      
      {/* Sidebar: Education + Certs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: DARK, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: BLUE }}></span> 학력 및 교육
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.education.map((edu, i) => (
              <div key={i} style={{ paddingLeft: '12px', borderLeft: `2px solid ${BLUE_FAINT}` }}>
                <div style={{ fontWeight: 800, fontSize: '12px', color: DARK, lineHeight: 1.3, marginBottom: '2px' }}>{edu.title}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '9px', color: FAINT, fontWeight: 700, marginBottom: '6px' }}>{edu.period}</div>
                <div style={{ fontSize: '10.5px', color: BODY, lineHeight: 1.5, marginBottom: '4px' }}>{edu.description}</div>
                {edu.details && edu.details.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '12px', listStyleType: 'disc', fontSize: '9.5px', color: MUTED }}>
                    {edu.details.map((detail, dIdx) => (
                      <li key={dIdx} style={{ marginBottom: '2px' }}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: DARK, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: BLUE }}></span> 자격증
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.certificates && data.certificates.map((cert, i) => (
              <div key={i} style={{ padding: '10px 12px', background: '#FAFAFA', border: `1px solid ${CARD_BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '11.5px', color: DARK }}>{cert.name}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: BLUE, fontWeight: 700 }}>{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Main: Experience + Tools */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: DARK, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: BLUE }}></span> 프로젝트 경험
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ paddingLeft: '16px', borderLeft: `3px solid ${BLUE_FAINT}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', color: DARK, margin: 0 }}>{exp.title}</h4>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: MUTED, background: '#F4F4F5', padding: '2px 6px', borderRadius: '2px' }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: BLUE, background: BLUE_FAINT, padding: '4px 8px', borderRadius: '2px', display: 'inline-block', marginBottom: '8px', borderLeft: `3px solid ${BLUE}` }}>
                  {exp.description}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {exp.details.map((d, j) => (
                    <li key={j} style={{ paddingLeft: '12px', position: 'relative', fontSize: '11px', color: BODY, marginBottom: '5px', lineHeight: 1.6 }}>
                      <span style={{ position: 'absolute', left: 0, top: '7px', width: '3px', height: '3px', background: FAINT, borderRadius: '50%' }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Section - Categorized */}
        <section style={{ borderTop: `1px solid ${CARD_BORDER}`, paddingTop: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: DARK, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: BLUE }}></span> 기술 역량 및 도구
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '8px', fontWeight: 900, color: BLUE, letterSpacing: '2px', borderBottom: `1px solid ${BLUE_FAINT}`, paddingBottom: '4px', marginBottom: '10px' }}>DOCUMENTATION</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.tools.filter(t => ["Excel", "PowerPoint", "Word", "Notion"].includes(t.name)).map((t, i) => <ToolBadge key={i} name={t.name} />)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '8px', fontWeight: 900, color: BLUE, letterSpacing: '2px', borderBottom: `1px solid ${BLUE_FAINT}`, paddingBottom: '4px', marginBottom: '10px' }}>AI & CREATIVE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.tools.filter(t => !["Excel", "PowerPoint", "Word", "Notion"].includes(t.name)).map((t, i) => (
                  <span key={i} style={{ fontSize: '10px', fontWeight: 800, color: DARK }}>• {t.name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

/* ─── PAGES 2-4: COVER LETTER ────────────────────────────────────── */
type IntroItem = NonNullable<ResumeData['selfIntroductions']>[0];

const CoverPage: React.FC<{ intro: IntroItem; idx: number; isLast: boolean; data: ResumeData }> = ({ intro, idx, isLast, data }) => {
  const number = String(idx + 1).padStart(2, '0');

  return (
    <div style={{
      ...PAGE,
      padding: '16mm 20mm',
      display: 'flex',
      flexDirection: 'column',
      pageBreakAfter: isLast ? 'auto' : 'always',
      breakAfter: isLast ? 'auto' : 'page',
      background: WHITE,
    }} className="pdf-page">

      {/* Header: Number & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: `1px solid ${BLUE_BORDER}`, background: BLUE_FAINT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontWeight: 900, fontSize: '14px', color: BLUE }}>
          {number}
        </div>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${BLUE_BORDER}, transparent)` }}></div>
      </div>

      {/* Logline */}
      <div style={{ borderLeft: `4px solid ${BLUE}`, paddingLeft: '16px', marginBottom: '36px' }}>
         {renderLogline(intro.logline)}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderParagraphs(intro.hook)}
        
        {intro.highlights && renderHighlightsHorizontal(intro.highlights)}

        {intro.pullQuote && (
          <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
             {renderPullQuote(intro.pullQuote)}
          </div>
        )}

        {intro.body && (
          <div style={{ marginTop: '12px' }}>
            {renderParagraphs(intro.body)}
          </div>
        )}

        {intro.closing && (
          <div style={{ marginTop: '12px' }}>
            {renderParagraphs(intro.closing)}
          </div>
        )}
      </div>

      {/* Footer */}
      {isLast && (
        <div style={{ marginTop: '30px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: MUTED }}>{data.name} / {data.role}</span>
          <span style={{ fontSize: '9px', color: FAINT }}>© 2026. ALL RIGHTS RESERVED.</span>
        </div>
      )}
    </div>
  );
};

/* ─── MAIN EXPORT ────────────────────────────────────────────────── */
export const PdfTemplate = React.forwardRef<HTMLDivElement, { data: ResumeData }>(
  ({ data }, ref) => (
    <div ref={ref} style={{ width: '210mm', fontFamily: "'Pretendard', 'Noto Sans KR', 'Malgun Gothic', sans-serif" }}>
      <ResumePage data={data} />
      {(data.selfIntroductions || []).map((intro, i, arr) => (
        <CoverPage key={i} intro={intro} idx={i} isLast={i === arr.length - 1} data={data} />
      ))}
    </div>
  )
);
PdfTemplate.displayName = 'PdfTemplate';
