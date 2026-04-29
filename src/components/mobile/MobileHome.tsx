import React from 'react';
import { motion } from 'motion/react';
import type { MobileTab } from './MobileNavBar';

interface Props {
  onTabChange: (tab: MobileTab) => void;
}

const s = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] as any },
});

const DUST = [
  { x:'8%',  y:'9%',  w:5.2, h:0.9, r:18  },
  { x:'80%', y:'6%',  w:1.8, h:1.8, r:0   },
  { x:'55%', y:'30%', w:3.5, h:0.8, r:68  },
  { x:'18%', y:'52%', w:1.6, h:1.6, r:0   },
  { x:'88%', y:'41%', w:4.2, h:0.9, r:135 },
  { x:'34%', y:'72%', w:1.9, h:1.9, r:0   },
  { x:'70%', y:'80%', w:5.5, h:0.8, r:52  },
  { x:'6%',  y:'85%', w:1.5, h:1.5, r:0   },
  { x:'46%', y:'90%', w:3.0, h:0.7, r:95  },
  { x:'62%', y:'18%', w:2.2, h:2.2, r:0   },
];

const PAPERS = [
  { x:'72%', y:'5%',  w:30, h:44, r:16,  isGrid:true  },
  { x:'2%',  y:'58%', w:26, h:38, r:-20, isGrid:false },
  { x:'81%', y:'64%', w:34, h:50, r:-10, isGrid:true  },
];

export const MobileHome = ({ onTabChange }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        height: 'calc(100dvh - 60px)',
        background: '#FDFCF8',
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        backgroundBlendMode: 'multiply',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 파티클 */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0 }}>
        {DUST.map((d, i) => (
          <motion.div key={i}
            style={{ position:'absolute', left:d.x, top:d.y, width:d.w, height:d.h,
              opacity:0.18, borderRadius: d.w===d.h ? '50%' : '2px', background:'#71717a' }}
            animate={{ x:[0,(i%2?1:-1)*20,0], y:[0,(i%3-1)*28,0] }}
            transition={{ duration:20+i*2.1, repeat:Infinity, ease:'easeInOut', delay:-i*2.0 }}
          />
        ))}
        {PAPERS.map((p, i) => (
          <motion.div key={`p${i}`}
            style={{ position:'absolute', left:p.x, top:p.y, width:p.w, height:p.h,
              opacity:0.08, borderRadius:2, border:'1px solid rgba(0,0,0,0.09)',
              background: p.isGrid ? '#fff' : '#FDFCF8',
              backgroundImage: p.isGrid
                ? 'linear-gradient(to right,rgba(0,0,0,0.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.05) 1px,transparent 1px)'
                : 'none',
              backgroundSize: p.isGrid ? '4px 4px' : undefined,
            }}
            animate={{ x:[0,(i%2?1:-1)*35,0], y:[0,(i%3-1)*48,0], rotate:[p.r, p.r+18] }}
            transition={{ duration:32+i*6, repeat:Infinity, ease:'linear', delay:-i*7 }}
          />
        ))}
      </div>

      {/* 상단 파란 라인 */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'#0047BB', zIndex:2 }} />

      {/* ── 전체 레이아웃 래퍼 ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 20px 0',   /* 상단 44px (상태바 안전), 좌우 20px */
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── A: 이름 + 역할 (좌측 상단, 고정) ── */}
        <motion.div {...s(0)} style={{ flexShrink: 0 }}>
          <h1 style={{
            fontSize: 'clamp(1.85rem, 7.5vw, 2.3rem)',
            fontWeight: 900,
            color: '#1A2332',
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: 5,
            wordBreak: 'keep-all',
          }}>
            조경환
          </h1>
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#0047BB',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            게임 기획자 지망생
          </p>
        </motion.div>

        {/* ── B: 메인 콘텐츠 영역 (flex-1, 세로 중앙 정렬, py-6 방어 패딩) ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',   /* 세로 중앙 */
          paddingTop: 24,             /* py-6: 콘텐츠가 로고에 바짝 붙지 않게 */
          paddingBottom: 24,
        }}>

          {/* ── B-1: 텍스트 덩어리 ── */}
          <div>
            <motion.div {...s(1)}>
              <p style={{
                fontSize: 'clamp(1.1rem, 4.8vw, 1.3rem)',
                fontWeight: 700,
                color: '#a1a1aa',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: 4,
                wordBreak: 'keep-all',
              }}>
                기획의도를 알고,
              </p>
              <p style={{
                fontSize: 'clamp(2.75rem, 12.5vw, 3.5rem)',
                fontWeight: 900,
                color: '#1A2332',
                letterSpacing: '-0.046em',
                lineHeight: 1.02,
                margin: 0,
                wordBreak: 'keep-all',
              }}>
                목차를 쓸 줄<br />아는 기획자
              </p>
            </motion.div>

            <motion.div {...s(2)} style={{ marginTop: 16 }}>
              <p style={{
                fontSize: 13,
                color: '#71717a',
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
                wordBreak: 'keep-all',
              }}>
                법학의 논리 구조를 게임 기획에 적용합니다.<br />
                기획 의도가 흔들리지 않는 뼈대를 설계합니다.
              </p>
            </motion.div>
          </div>

          {/* ── B-2: 텍스트↔버튼 사이 호흡 간격 (40~48px) ── */}
          <div style={{ height: 44 }} />

          {/* ── B-3: 버튼 그룹 ── */}
          <motion.div {...s(3)}>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', marginBottom: 16 }} />

            {/* 이력서 보기 */}
            <button
              onClick={() => onTabChange('resume')}
              style={{
                width: '100%',
                display: 'block',
                textAlign: 'left',
                padding: '14px 20px',
                background: '#0047BB',
                color: '#fff',
                fontWeight: 800,
                fontSize: 15,
                borderRadius: 13,
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,71,187,0.22), 0 1px 2px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                letterSpacing: '-0.02em',
                marginBottom: 10,
                WebkitTapHighlightColor: 'transparent',
                fontFamily: 'inherit',
              }}
              onTouchStart={e => (e.currentTarget.style.opacity = '0.88')}
              onTouchEnd={e => (e.currentTarget.style.opacity = '1')}
            >
              이력서 보기
            </button>

            {/* 포트폴리오 보기 */}
            <button
              onClick={() => onTabChange('portfolio')}
              style={{
                width: '100%',
                display: 'block',
                textAlign: 'left',
                padding: '13px 20px',
                background: 'transparent',
                color: '#1A2332',
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 13,
                border: '1.5px solid rgba(0,71,187,0.18)',
                cursor: 'pointer',
                letterSpacing: '-0.02em',
                WebkitTapHighlightColor: 'transparent',
                fontFamily: 'inherit',
              }}
              onTouchStart={e => (e.currentTarget.style.opacity = '0.6')}
              onTouchEnd={e => (e.currentTarget.style.opacity = '1')}
            >
              포트폴리오 보기
            </button>
          </motion.div>
        </div>

        {/* 하단 안전 패딩 */}
        <div style={{ height: 20, flexShrink: 0 }} />
      </div>
    </motion.div>
  );
};
