import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import { ALL_GAMES } from '../data/games';

const COLS = 4;
const PLACEHOLDER_SPEEDS = [3.6, 4.4, 3.0, 4.0];

interface CinematicIntroProps {
  onComplete: () => void;
}

const SCROLL_SPEED = 2400; // px/s

// Same chart data as GameHistoryView
const CHART_DATA = [
  { label: 'RPG', score: 99, angle: 0 },
  { label: '어드벤처', score: 92, angle: 45 },
  { label: '퍼즐', score: 88, angle: 90 },
  { label: '액션', score: 85, angle: 135 },
  { label: '전략', score: 82, angle: 180 },
  { label: '시뮬레이션', score: 87, angle: 225 },
  { label: '슈팅', score: 45, angle: 270 },
  { label: '리듬', score: 98, angle: 315 },
];

const SVG_SIZE = 300;
const cx = SVG_SIZE / 2;
const cy = SVG_SIZE / 2;

const getPt = (value: number, angleDeg: number) => {
  const r = (value / 100) * (SVG_SIZE / 2 - 35);
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const polygonPoints = CHART_DATA.map(d => { const p = getPt(d.score, d.angle); return `${p.x},${p.y}`; }).join(' ');
const bgLevels = [20, 40, 60, 80, 100].map(lv =>
  CHART_DATA.map(d => { const p = getPt(lv, d.angle); return `${p.x},${p.y}`; }).join(' ')
);

const getFallbackBg = (genre: string) => {
  const g = genre.toLowerCase();
  if (g.includes('rpg')) return '#1e3a8a';
  if (g.includes('액션') || g.includes('난투')) return '#7f1d1d';
  if (g.includes('전략') || g.includes('aos') || g.includes('rts')) return '#064e3b';
  if (g.includes('슈팅') || g.includes('fps')) return '#1c1917';
  if (g.includes('리듬')) return '#4a044e';
  if (g.includes('퍼즐') || g.includes('캐주얼')) return '#78350f';
  return '#27272a';
};

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [screenshot, setScreenshot] = useState<{ url: string; height: number } | null>(null);
  const [animDuration, setAnimDuration] = useState(6);
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

  // Placeholder columns shown while capture is in progress
  const placeholderColumns = useMemo(() => {
    const shuffled = [...ALL_GAMES].sort(() => Math.random() - 0.5);
    return Array.from({ length: COLS }, (_, i) =>
      shuffled.filter((_, idx) => idx % COLS === i).slice(0, 25)
    );
  }, []);

  const pcCount = ALL_GAMES.filter(g => g.category === 'Pc' || g.category === 'PC' || g.category === 'Console').length;
  const mobileCount = ALL_GAMES.filter(g => g.category === 'Mobile').length;

  useEffect(() => {
    if (!captureRef.current) return;
    const timer = setTimeout(async () => {
      if (!captureRef.current) return;
      try {
        const canvas = await html2canvas(captureRef.current, {
          useCORS: true,
          scale: 0.85,
          logging: false,
          backgroundColor: '#FDFCF8',
          imageTimeout: 0,
          allowTaint: false,
        });
        const url = canvas.toDataURL('image/jpeg', 0.8);
        const scrollDist = canvas.height - viewportHeight;
        const dur = Math.max(5, scrollDist / SCROLL_SPEED);
        setAnimDuration(dur);
        setScreenshot({ url, height: canvas.height });
        setTimeout(onComplete, dur * 1000 + 400);
      } catch {
        onComplete();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [onComplete, viewportHeight]);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      className="fixed inset-0 z-[2000] overflow-hidden pointer-events-none"
      style={{ backgroundColor: '#FDFCF8' }}
    >
      {/* ── 캡처 중 placeholder: 카드 컬럼 스크롤 ── */}
      {!screenshot && (
        <div className="absolute inset-0 flex gap-3 px-3">
          {placeholderColumns.map((games, ci) => (
            <div key={ci} className="flex-1 overflow-hidden">
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '8px',
                animation: `scrollUp ${PLACEHOLDER_SPEEDS[ci]}s linear forwards`,
                willChange: 'transform',
                opacity: ci === 0 || ci === COLS - 1 ? 0.5 : 0.85,
              }}>
                {games.map((game, idx) => (
                  <div key={idx} style={{ height: 120, flexShrink: 0, position: 'relative', borderRadius: 16, overflow: 'hidden', backgroundColor: game.image ? '#18181b' : getFallbackBg(game.genre) }}>
                    {game.image && <img src={game.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} loading="lazy" />}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
                    <div style={{ position: 'relative', height: '100%', zIndex: 1, padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 8, fontWeight: 900, color: 'white', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, letterSpacing: '0.1em', textTransform: 'uppercase', width: 'fit-content' }}>{game.genre}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: 'white', fontSize: 13, lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{game.title}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{game.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 캡처용 숨긴 레이아웃 (GameHistoryView 동일 구조) ── */}
      {!screenshot && (
        <div
          ref={captureRef}
          style={{
            position: 'fixed',
            top: '200vh',
            left: 0,
            width: '100vw',
            backgroundColor: '#FDFCF8',
            padding: '112px 48px 120px',
          }}
        >
          {/* Stats + Radar (= video 끝 화면 / 실제 페이지 시작 화면) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 64 }}>
            {/* Radar chart */}
            <div style={{ backgroundColor: 'white', borderRadius: 32, padding: 32, border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#71717a', marginBottom: 16, alignSelf: 'flex-start' }}>장르별 숙련도 차트</div>
              <svg width={SVG_SIZE} height={SVG_SIZE} style={{ overflow: 'visible' }}>
                {bgLevels.map((pts, i) => <polygon key={i} points={pts} fill="none" stroke="#E5E7EB" strokeWidth="1" />)}
                {CHART_DATA.map((d, i) => {
                  const p100 = getPt(100, d.angle);
                  return <line key={i} x1={cx} y1={cy} x2={p100.x} y2={p100.y} stroke="#E5E7EB" strokeWidth="1" />;
                })}
                <polygon points={polygonPoints} fill="rgba(0,71,187,0.15)" stroke="#0047BB" strokeWidth="2.5" />
                {CHART_DATA.map((d, i) => {
                  const p = getPt(d.score, d.angle);
                  return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0047BB" />;
                })}
                {CHART_DATA.map((d, i) => {
                  const lp = getPt(118, d.angle);
                  return (
                    <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontSize: 12, fontWeight: 700, fill: '#a1a1aa', fontFamily: 'inherit' }}>
                      {d.label}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ backgroundColor: 'white', borderRadius: 32, padding: 32, border: '1px solid rgba(0,0,0,0.05)', flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#18181b', marginBottom: 32 }}>플레이 요약 통계</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { label: '총 플레이', value: `${ALL_GAMES.length}종 이상`, blue: true },
                    { label: '주력 플랫폼', value: 'PC / 콘솔', blue: false },
                    { label: '최장 플레이', value: '메이플스토리 (15년)', blue: false },
                    { label: '전문 분야', value: 'RPG / 리듬', chip: true },
                  ].map(({ label, value, blue, chip }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '20px 0' }}>
                      <span style={{ fontWeight: 700, color: '#2C2C2C' }}>{label}</span>
                      {chip ? (
                        <span style={{ backgroundColor: 'rgba(0,71,187,0.1)', color: '#0047BB', fontWeight: 700, fontSize: 16, padding: '4px 12px', borderRadius: 8 }}>{value}</span>
                      ) : (
                        <span style={{ fontWeight: blue ? 900 : 700, fontSize: blue ? 20 : 18, color: blue ? '#0047BB' : '#52525b' }}>{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ backgroundColor: '#0047BB', borderRadius: 24, padding: '24px 28px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>PC/콘솔</div>
                  <div style={{ color: 'white', fontWeight: 900, fontSize: 32 }}>{pcCount}종</div>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: 24, padding: '24px 28px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ color: '#71717a', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>모바일</div>
                  <div style={{ fontWeight: 900, fontSize: 32, color: '#2C2C2C' }}>{mobileCount}종</div>
                </div>
              </div>
            </div>
          </div>

          {/* 게임 카드 그리드 (= video 시작 화면) */}
          <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: 24, marginBottom: 32 }}>
            <h2 style={{ fontWeight: 900, fontSize: 24, color: '#18181b' }}>게임 상세 플레이 이력</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {ALL_GAMES.map((game) => (
              <div key={game.id} style={{ height: 140, borderRadius: 16, overflow: 'hidden', position: 'relative', border: '1px solid rgba(0,0,0,0.05)', backgroundColor: game.image ? '#18181b' : getFallbackBg(game.genre) }}>
                {game.image && (
                  <img src={game.image} alt="" crossOrigin="anonymous"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
                <div style={{ position: 'relative', height: '100%', zIndex: 1, padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 9, fontWeight: 900, color: 'white', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{game.genre}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase' }}>
                      {game.category === 'Pc' || game.category === 'PC' || game.category === 'Console' ? 'PC/CONSOLE' : 'MOBILE'}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: 15, lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{game.title}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{game.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 스크롤 애니메이션 이미지 ── */}
      {screenshot && (
        <motion.img
          src={screenshot.url}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'block' }}
          initial={{ y: screenshot.height - viewportHeight }}
          animate={{ y: 0 }}
          transition={{ duration: animDuration, ease: 'linear' }}
        />
      )}

      {/* 상단/하단 페이드 */}
      <div className="absolute inset-x-0 top-0 h-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #FDFCF8 30%, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-28 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #FDFCF8 30%, transparent)' }} />

      {/* Gaming DNA 오버레이 — 텍스트 주변만 어둡게 */}
      <div className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 380px 180px at center, rgba(4,4,4,0.82) 0%, rgba(4,4,4,0.35) 60%, transparent 85%)' }} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center"
      >
        <div className="h-px w-24 bg-blue-500 mb-4" />
        <h2 className="text-white font-display font-black text-4xl md:text-6xl tracking-[0.3em] uppercase drop-shadow-2xl">
          Gaming <span className="text-blue-500">DNA</span>
        </h2>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-zinc-300 font-mono text-xs tracking-widest uppercase">Analyzing History</span>
          <div className="w-12 h-0.5 bg-zinc-600 overflow-hidden">
            <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-full h-full bg-blue-500" />
          </div>
          <span className="text-blue-500 font-mono text-xs font-bold">{ALL_GAMES.length}+</span>
        </div>
        <div className="h-px w-24 bg-blue-500 mt-4" />
      </motion.div>
    </motion.div>
  );
};
