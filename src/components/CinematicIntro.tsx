import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import { ALL_GAMES } from '../data/games';

interface CinematicIntroProps {
  onComplete: () => void;
}

const SCROLL_SPEED = 2400; // px per second

const getFallbackGradient = (genre: string) => {
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
  const [animDuration, setAnimDuration] = useState(0);
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;

  useEffect(() => {
    if (!captureRef.current) return;

    // Give React one tick to finish rendering the hidden grid
    const id = setTimeout(async () => {
      if (!captureRef.current) return;
      try {
        const canvas = await html2canvas(captureRef.current, {
          useCORS: true,
          scale: 1,
          logging: false,
          backgroundColor: '#FDFCF8',
          imageTimeout: 0,
        });
        const url = canvas.toDataURL('image/jpeg', 0.75);
        const scrollDistance = canvas.height - viewportHeight;
        const dur = Math.max(4, scrollDistance / SCROLL_SPEED);
        setAnimDuration(dur);
        setScreenshot({ url, height: canvas.height });
        // onComplete fires after scroll animation ends + small buffer
        setTimeout(onComplete, dur * 1000 + 300);
      } catch {
        onComplete();
      }
    }, 80);

    return () => clearTimeout(id);
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
      {/* ── 캡처용 숨긴 그리드 (화면 아래 배치) ── */}
      {!screenshot && (
        <div
          ref={captureRef}
          style={{
            position: 'fixed',
            top: '200vh',
            left: 0,
            width: '100vw',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            backgroundColor: '#FDFCF8',
          }}
        >
          {ALL_GAMES.map((game) => (
            <div
              key={game.id}
              style={{
                height: 140,
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                backgroundColor: game.image ? '#18181b' : getFallbackGradient(game.genre),
              }}
            >
              {game.image && (
                <img
                  src={game.image}
                  alt=""
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                  crossOrigin="anonymous"
                />
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />
              <div style={{ position: 'relative', height: '100%', zIndex: 1, padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 8, fontWeight: 900, color: 'white', background: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{game.genre}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '2px 4px', borderRadius: 4, textTransform: 'uppercase' }}>
                    {game.category === 'Pc' || game.category === 'PC' || game.category === 'Console' ? 'PC/CON' : 'MOB'}
                  </span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.3, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{game.title}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{game.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 스크롤 애니메이션 (캡처 완료 후) ── */}
      {screenshot && (
        <motion.img
          src={screenshot.url}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', display: 'block' }}
          initial={{ y: screenshot.height - viewportHeight }}
          animate={{ y: 0 }}
          transition={{ duration: animDuration, ease: 'linear' }}
        />
      )}

      {/* 상단/하단 페이드 */}
      <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #FDFCF8, transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, #FDFCF8, transparent)' }} />

      {/* Gaming DNA 오버레이 */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 520px 270px at center, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.5) 55%, transparent 80%)' }}
      />
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
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-full h-full bg-blue-500"
            />
          </div>
          <span className="text-blue-500 font-mono text-xs font-bold">{ALL_GAMES.length}+</span>
        </div>
        <div className="h-px w-24 bg-blue-500 mt-4" />
      </motion.div>
    </motion.div>
  );
};
