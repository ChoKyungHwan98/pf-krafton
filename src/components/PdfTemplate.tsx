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
      // Bold
      nodes.push(<strong key={k++} style={{ color: BLUE, fontWeight: 800 }}>{m[2] || m[3]}</strong>);
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
  <div style={{ ...PAGE, padding: '14mm 16mm', display: 'flex', flexDirection: 'column' }} className="pdf-page">

    {/* ── Profile Card ── */}
    <div style={{ background: WHITE, borderRadius: '20px', border: `1px solid ${CARD_BORDER}`, padding: '24px 28px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

        {/* Photo */}
        <div style={{ width: '96px', height: '96px', borderRadius: '16px', overflow: 'hidden', border: `1px solid ${CARD_BORDER}`, flexShrink: 0 }}>
          <img src="https://picsum.photos/seed/profile/400/400" alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) opacity(0.8)' }} />
        </div>

        {/* Name + contact */}
        <div style={{ width: '170px', flexShrink: 0 }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: DARK, letterSpacing: '-0.5px', margin: '0 0 6px' }}>{data.name}</h1>
          <p style={{ fontSize: '10.5px', fontWeight: 800, color: BLUE, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px' }}>{data.role}</p>
          <div style={{ fontSize: '11px', color: MUTED, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span>✉ {data.email}</span>
            <span>☎ {data.phone}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', background: 'rgba(0,0,0,0.07)', alignSelf: 'stretch', margin: '0 8px' }} />

        {/* Summary + Tools */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: FAINT, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>한줄 소개</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: DARK, lineHeight: 1.6, wordBreak: 'keep-all', marginBottom: '16px' }}>
            {inlineRender(data.summary)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(data.tools || []).map((t, i) => <ToolBadge key={i} name={t.name} />)}
          </div>
        </div>
      </div>
    </div>

    {/* ── Bottom Grid ── */}
    <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '16px', flex: 1 }}>

      {/* Left: Education + Certs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: WHITE, borderRadius: '20px', border: `1px solid ${CARD_BORDER}`, padding: '20px 24px', flex: 1 }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: DARK, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: BLUE, fontSize: '15px' }}>◎</span> 학력 및 교육
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.education.map((edu, i) => (
              <div key={i} style={{ paddingLeft: '14px', borderLeft: '2px solid rgba(0,0,0,0.09)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-5px', top: '6px', width: '8px', height: '8px', background: LIGHTER, borderRadius: '2px' }} />
                <div style={{ fontWeight: 800, fontSize: '12.5px', color: DARK, lineHeight: 1.3 }}>{edu.title}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '10px', color: FAINT, margin: '4px 0' }}>{edu.period}</div>
                <div style={{ fontSize: '11px', color: MUTED, marginBottom: '6px', lineHeight: 1.5 }}>{edu.description}</div>
                {edu.details.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '10px', color: MUTED, lineHeight: 1.6 }}>
                    {edu.details.map((d, j) => <li key={j} style={{ marginBottom: '3px' }}>{d}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {data.certificates && (
          <div style={{ background: WHITE, borderRadius: '20px', border: `1px solid ${CARD_BORDER}`, padding: '18px 24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: DARK, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: BLUE, fontSize: '15px' }}>◎</span> 자격증
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.certificates.map((cert, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FAFAFA', borderRadius: '10px', border: `1px solid ${CARD_BORDER}` }}>
                  <span style={{ fontWeight: 800, fontSize: '12px', color: DARK }}>{cert.name}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '9px', color: FAINT }}>취득 연도</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: BLUE }}>{cert.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right: Experience */}
      <div style={{ background: WHITE, borderRadius: '20px', border: `1px solid ${CARD_BORDER}`, padding: '20px 24px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, color: DARK, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: BLUE, fontSize: '15px' }}>◎</span> 프로젝트 경험
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ paddingLeft: '20px', borderLeft: '2px solid rgba(0,71,187,0.2)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-7px', top: '6px', width: '12px', height: '12px', borderRadius: '50%', background: BLUE, border: '2px solid white' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <h4 style={{ fontWeight: 800, fontSize: '14px', color: DARK, margin: 0, lineHeight: 1.3 }}>{exp.title}</h4>
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: FAINT, background: '#F4F4F5', padding: '3px 8px', borderRadius: '20px', flexShrink: 0, marginLeft: '8px' }}>{exp.period}</span>
              </div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: BLUE, padding: '4px 10px', background: BLUE_FAINT, border: `1px solid ${BLUE_BORDER}`, borderRadius: '6px', display: 'inline-block', marginBottom: '10px' }}>
                {exp.description}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {exp.details.map((d, j) => (
                  <li key={j} style={{ paddingLeft: '12px', position: 'relative', fontSize: '11.5px', color: '#4A5568', marginBottom: '6px', lineHeight: 1.6 }}>
                    <span style={{ position: 'absolute', left: 0, top: '7px', width: '4px', height: '4px', background: LIGHTER, borderRadius: '50%' }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
