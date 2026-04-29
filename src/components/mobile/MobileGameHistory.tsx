import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Star, Trophy, CheckCircle2 } from 'lucide-react';
import { ALL_GAMES } from '../../data/games';

const GENRE_MAP: Record<string, string[]> = {
  'RPG': ['RPG'],
  '어드벤처': ['어드벤처', '노벨', '공포', '로그라이크', '메트로배니아', '비주얼 노벨'],
  '퍼즐': ['퍼즐', '퀴즈', '캐주얼'],
  '액션': ['액션', '난투', '대전', '배틀로얄', '격투', '런앤건', '플랫폼', '런게임', '생존'],
  '전략': ['전략', 'AOS', 'RTS', 'CCG', 'TCG', '디펜스'],
  '시뮬레이션': ['시뮬레이션', '스포츠', '레이싱', '경영', 'AR', '수면', '보드게임', '소셜'],
  '슈팅': ['슈팅', 'FPS', 'TPS', '히어로슈터'],
  '리듬': ['리듬'],
};

// PC와 동일한 레이더 데이터
const CHART_DATA = [
  { label: 'RPG',    score: 99, angle: 0 },
  { label: '어드벤처', score: 92, angle: 45 },
  { label: '퍼즐',   score: 88, angle: 90 },
  { label: '액션',   score: 85, angle: 135 },
  { label: '전략',   score: 82, angle: 180 },
  { label: '시뮬',   score: 87, angle: 225 },
  { label: '슈팅',   score: 45, angle: 270 },
  { label: '리듬',   score: 98, angle: 315 },
];

const getScore = (g: any) => {
  let s = 0;
  if (g.isFavorite) s += 1e9;
  if (g.yearsPlayed) s += g.yearsPlayed * 1e6;
  if (g.flag && !g.flag.includes('시간') && !g.flag.includes('년')) s += 1e7;
  if (g.isPerfectCleared) s += 1e6;
  const m = g.flag?.match(/\d+/);
  if (g.flag?.includes('시간') && m) s += parseInt(m[0]) * 10;
  if (g.isCleared) s += 1;
  return s;
};

const sortedGames = [...ALL_GAMES].sort((a, b) => getScore(b) - getScore(a));
const pcConsoleGames = ALL_GAMES.filter(g => g.category === 'Pc' || g.category === 'PC' || g.category === 'Console');
const mobileGames = ALL_GAMES.filter(g => g.category === 'Mobile');
const HIGHLIGHT_TITLES = ['메이플스토리', 'DARK SOULS™ III', '무기미도', 'osu!'];
const highlightGames = HIGHLIGHT_TITLES.map(t => ALL_GAMES.find(g => g.title === t)).filter(Boolean) as any[];
const GENRE_FILTER_KEYS = Object.keys(GENRE_MAP);

const getFallback = (genre: string) => {
  const g = genre?.toLowerCase() ?? '';
  if (g.includes('rpg')) return 'linear-gradient(135deg,#1e3a8a,#1d4ed8)';
  if (g.includes('리듬')) return 'linear-gradient(135deg,#581c87,#a21caf)';
  if (g.includes('액션')) return 'linear-gradient(135deg,#7f1d1d,#dc2626)';
  if (g.includes('전략')) return 'linear-gradient(135deg,#14532d,#16a34a)';
  if (g.includes('슈팅')) return 'linear-gradient(135deg,#1c1917,#78716c)';
  if (g.includes('퍼즐')) return 'linear-gradient(135deg,#78350f,#d97706)';
  return 'linear-gradient(135deg,#27272a,#52525b)';
};

const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button onClick={onClick} style={{
    padding: '7px 14px', borderRadius: 99,
    fontSize: 11.5, fontWeight: 700,
    background: active ? '#0047BB' : '#fff',
    color: active ? '#fff' : '#71717a',
    border: active ? 'none' : '1px solid rgba(0,0,0,0.09)',
    boxShadow: active ? '0 3px 10px rgba(0,71,187,0.22)' : '0 1px 3px rgba(0,0,0,0.04)',
    cursor: 'pointer', whiteSpace: 'nowrap' as const,
    WebkitTapHighlightColor: 'transparent',
    transition: 'all 0.18s', fontFamily: 'inherit',
  }}>{label}</button>
);

const card = {
  background: '#fff', borderRadius: 20,
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
};

export const MobileGameHistory = () => {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(24);

  const filteredGames = sortedGames.filter(g => {
    if (!activeGenre) return true;
    const kws = GENRE_MAP[activeGenre] || [activeGenre];
    return kws.some(kw => g.genre?.toLowerCase().includes(kw.toLowerCase()));
  });
  const displayedGames = filteredGames.slice(0, displayLimit);

  // SVG 레이더 차트 (모바일 최적화 사이즈)
  const svgSize = 260;
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const getPt = (value: number, angleDeg: number) => {
    const r = (value / 100) * (svgSize / 2 - 30);
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
  };
  const polygonPoints = CHART_DATA.map(d => getPt(d.score, d.angle)).join(' ');
  const bgPolygons = [20, 40, 60, 80, 100].map(level =>
    CHART_DATA.map(d => getPt(level, d.angle)).join(' ')
  );

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
        padding: '14px 20px 14px',
      }}>
        <span style={{ display: 'block', fontSize: 9, fontWeight: 900, letterSpacing: '0.38em', color: '#0047BB', textTransform: 'uppercase', marginBottom: 3 }}>Gaming DNA</span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A2332', letterSpacing: '-0.03em', lineHeight: 1 }}>플레이 이력</h2>
      </div>

      <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* ── 핵심 전문 분야 배너 (PC 동일 스타일) ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,71,187,0.10) 0%, transparent 100%)',
          border: '1px solid rgba(0,71,187,0.18)',
          borderRadius: 20,
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Star strokeWidth={2} style={{ width: 15, height: 15, color: '#0047BB' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0047BB', letterSpacing: '-0.01em' }}>핵심 전문 분야</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['RPG', '리듬'].map(tag => (
              <span key={tag} style={{
                fontSize: 12, fontWeight: 900, color: '#0047BB',
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                padding: '4px 13px', borderRadius: 99,
                letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* ── 통계 + 레이더 차트 ── */}
        <div style={{ ...card, padding: '18px 18px' }}>
          {/* 통계 수치 — PC 카드 스타일 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
            <div style={{
              background: '#0047BB', borderRadius: 16, padding: '14px 16px',
            }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>PC / 콘솔</span>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {pcConsoleGames.length}<span style={{ fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>종</span>
              </span>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 16, padding: '14px 16px',
            }}>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#a1a1aa', marginBottom: 6 }}>모바일</span>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#1A2332', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {mobileGames.length}<span style={{ fontSize: '1rem', fontWeight: 700, color: '#a1a1aa' }}>종</span>
              </span>
            </div>
          </div>

          {/* SVG 레이더 차트 (DNA) */}
          <span style={{ display: 'block', fontSize: 9, fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.38em', marginBottom: 12 }}>장르별 숙련도 — DNA</span>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width={svgSize} height={svgSize} style={{ overflow: 'visible' }}>
              {/* 배경 폴리곤 */}
              {bgPolygons.map((pts, i) => (
                <polygon key={i} points={pts} fill="none" stroke="#E5E7EB" strokeWidth="1" />
              ))}
              {/* 축 라인 */}
              {CHART_DATA.map((d, i) => {
                const [x2, y2] = getPt(100, d.angle).split(',');
                return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="#E5E7EB" strokeWidth="1" />;
              })}
              {/* DNA 폴리곤 */}
              <motion.polygon
                initial={{ strokeDasharray: '0,2000' }}
                animate={{ strokeDasharray: '2000,0' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                points={polygonPoints}
                fill="rgba(0,71,187,0.15)"
                stroke="#0047BB"
                strokeWidth="2"
              />
              {/* 포인트 */}
              {CHART_DATA.map((d, i) => {
                const [px, py] = getPt(d.score, d.angle).split(',');
                const isOn = activeGenre === d.label || (d.label === '시뮬' && activeGenre === '시뮬레이션');
                return (
                  <g key={i}>
                    <circle cx={px} cy={py} r="4" fill={isOn ? '#fff' : '#0047BB'} stroke="#0047BB" strokeWidth={isOn ? '2' : '0'} />
                  </g>
                );
              })}
              {/* 레이블 */}
              {CHART_DATA.map((d, i) => {
                const [lx, ly] = getPt(118, d.angle).split(',');
                const isOn = activeGenre === d.label || (d.label === '시뮬' && activeGenre === '시뮬레이션');
                return (
                  <text
                    key={i}
                    x={lx} y={ly}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{
                      fontSize: 10, fontWeight: isOn ? 900 : 700,
                      fill: isOn ? '#0047BB' : '#a1a1aa',
                      fontFamily: 'inherit',
                    }}
                  >{d.label}</text>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ── 주요 플레이 이력 (PC 앰버 스타일) ── */}
        <div style={{ ...card, padding: '18px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <Crown strokeWidth={1.8} style={{ width: 15, height: 15, color: '#f59e0b' }} />
            <span style={{ fontSize: 9, fontWeight: 900, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.38em' }}>주요 플레이 이력</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {highlightGames.map((g: any, i: number) => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  position: 'relative', flexShrink: 0, width: 50, height: 50, borderRadius: 14, overflow: 'hidden',
                  border: '2px solid rgba(245,158,11,0.55)',
                  boxShadow: '0 3px 10px rgba(245,158,11,0.18)',
                }}>
                  {g.image ? <img src={g.image} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : <div style={{ width: '100%', height: '100%', background: getFallback(g.genre) }} />}
                  {i === 0 && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.28)' }}><Crown strokeWidth={2} style={{ width: 14, height: 14, color: '#fbbf24' }} /></div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</span>
                    <span style={{ fontSize: 9.5, color: '#a1a1aa', fontWeight: 700, flexShrink: 0 }}>{g.genre}</span>
                  </div>
                  {g.flag && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '2px 8px', borderRadius: 99,
                      background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
                      fontSize: 10.5, fontWeight: 800, color: '#d97706',
                    }}>
                      <Star strokeWidth={0} style={{ width: 9, height: 9, fill: '#f59e0b', flexShrink: 0 }} />
                      {g.flag}
                    </span>
                  )}
                </div>
                {g.yearsPlayed && <span style={{ flexShrink: 0, fontWeight: 900, color: '#0047BB', fontSize: 15, letterSpacing: '-0.03em' }}>{g.yearsPlayed}년</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── 전체 이력 헤더 + 필터 ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: '0 2px' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#1A2332', letterSpacing: '-0.02em' }}>
              게임 상세 플레이 이력{activeGenre && <span style={{ color: '#0047BB', marginLeft: 6 }}>— {activeGenre}</span>}
            </h3>
            {activeGenre && (
              <button onClick={() => { setActiveGenre(null); setDisplayLimit(24); }}
                style={{ fontSize: 11, fontWeight: 700, color: '#a1a1aa', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                해제 ✕
              </button>
            )}
          </div>
          <div style={{ overflowX: 'auto', margin: '0 -14px', padding: '0 14px 4px' }}>
            <div style={{ display: 'flex', gap: 6, width: 'max-content' }}>
              <FilterChip label="전체" active={!activeGenre} onClick={() => { setActiveGenre(null); setDisplayLimit(24); }} />
              {GENRE_FILTER_KEYS.map(g => (
                <FilterChip key={g} label={g} active={activeGenre === g} onClick={() => { setActiveGenre(g === activeGenre ? null : g); setDisplayLimit(24); }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── 게임 카드 그리드 (PC 배지 동기화) ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeGenre ?? 'all'}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}
          >
            {displayedGames.map((game, index) => (
              <motion.div key={game.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.25) }}
                style={{
                  position: 'relative', height: 130, borderRadius: 16, overflow: 'hidden',
                  border: game.isFavorite ? '2px solid rgba(251,191,36,0.65)'
                    : game.isPerfectCleared ? '2px solid rgba(167,139,250,0.65)'
                    : game.isCleared ? '2px solid rgba(52,211,153,0.65)'
                    : '1px solid rgba(0,0,0,0.09)',
                  boxShadow: game.isFavorite ? '0 4px 16px rgba(251,191,36,0.15)' : '0 2px 8px rgba(0,0,0,0.07)',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: game.image ? '#18181b' : getFallback(game.genre) }}>
                  {game.image && <img src={game.image} alt={game.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: (game as any).size || 'cover', opacity: 0.65, objectPosition: (game as any).position || 'center' }} />}
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
                {/* 상단 컬러 라인 */}
                {game.isFavorite && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#fbbf24,transparent)' }} />}
                {game.isPerfectCleared && !game.isFavorite && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#a78bfa,transparent)' }} />}
                {game.isCleared && !game.isFavorite && !game.isPerfectCleared && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#34d399,transparent)' }} />}

                <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: 9, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {/* 상단: 장르 + 배지 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: '#fff', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)', padding: '2px 6px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.03em', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.genre}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                      {game.isFavorite && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(245,158,11,0.22)', border: '1px solid rgba(245,158,11,0.35)', padding: '1px 5px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>
                          <Crown strokeWidth={2} style={{ width: 8, height: 8, color: '#fbbf24' }} />
                          <span style={{ fontSize: 7.5, fontWeight: 800, color: '#fcd34d' }}>최애</span>
                        </div>
                      )}
                      {game.isPerfectCleared && !game.isFavorite && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(167,139,250,0.22)', border: '1px solid rgba(167,139,250,0.35)', padding: '1px 5px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>
                          <Trophy strokeWidth={2} style={{ width: 8, height: 8, color: '#a78bfa' }} />
                          <span style={{ fontSize: 7.5, fontWeight: 800, color: '#c4b5fd' }}>100%</span>
                        </div>
                      )}
                      {game.isCleared && !game.isFavorite && !game.isPerfectCleared && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(52,211,153,0.22)', border: '1px solid rgba(52,211,153,0.35)', padding: '1px 5px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>
                          <CheckCircle2 strokeWidth={2} style={{ width: 8, height: 8, color: '#34d399' }} />
                          <span style={{ fontSize: 7.5, fontWeight: 800, color: '#6ee7b7' }}>클리어</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* 하단: 제목 + flag */}
                  <div>
                    <h4 style={{ fontSize: 12.5, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{game.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '55%' }}>{game.company}</span>
                      {game.flag && <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 9.5, fontWeight: 800, color: '#fbbf24' }}><Star strokeWidth={0} style={{ width: 9, height: 9, fill: '#fbbf24', flexShrink: 0 }} />{game.flag}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {displayLimit < filteredGames.length && (
          <button onClick={() => setDisplayLimit(p => p + 24)} style={{
            width: '100%', padding: '14px 0',
            background: '#0047BB', color: '#fff',
            fontSize: 12, fontWeight: 800, letterSpacing: '0.1em',
            borderRadius: 14, border: 'none',
            boxShadow: '0 4px 14px rgba(0,71,187,0.25)',
            cursor: 'pointer', fontFamily: 'inherit',
            WebkitTapHighlightColor: 'transparent',
          }}>
            LOAD MORE ({filteredGames.length - displayLimit} REMAINING)
          </button>
        )}
      </div>
    </motion.div>
  );
};
