import React from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

const s = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] as any },
});

export const MobileMore = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        minHeight: '100dvh',
        background: '#FDFCF8',
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
        backgroundBlendMode: 'multiply',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 80,
      }}
    >
      {/* 상단 파란 라인 (Home과 통일) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#0047BB', zIndex: 2 }} />

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

        {/* ── B: 메인 콘텐츠 영역 (flex-1, 세로 중앙 정렬) ── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 24,
          paddingBottom: 24,
        }}>

          {/* ── B-1: 텍스트 덩어리 ── */}
          <div>
            <motion.div {...s(1)}>

              <h1 style={{
                fontSize: 'clamp(2.75rem, 12.5vw, 3.5rem)',
                fontWeight: 900,
                color: '#1A2332',
                letterSpacing: '-0.046em',
                lineHeight: 1.02,
                margin: 0,
                wordBreak: 'keep-all',
              }}>
                저는<br />준비되었습니다
              </h1>
            </motion.div>

            <motion.div {...s(2)} style={{ marginTop: 16 }}>
              <p style={{
                fontSize: 13,
                color: '#71717a',
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
                wordBreak: 'keep-all',
              }}>
                새로운 프로젝트나 협업 제안은 언제나 환영합니다.<br />
                아래 이메일로 연락주시면 빠르게 회신드리겠습니다.
              </p>
              
              <div style={{ marginTop: 16 }}>
                <a
                  href="mailto:ckh980624@gmail.com"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px',
                    background: 'rgba(0,71,187,0.06)',
                    color: '#0047BB',
                    fontSize: 13, fontWeight: 800,
                    borderRadius: 8,
                    textDecoration: 'none',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <Mail strokeWidth={2.5} style={{ width: 14, height: 14 }} />
                  ckh980624@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── B-2: 텍스트↔하단 사이 호흡 간격 (44px) ── */}
          <div style={{ height: 44 }} />

          {/* ── B-3: 마무리 문구 (기존 버튼 위치) ── */}
          <motion.div {...s(3)}>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', marginBottom: 20 }} />
            <p style={{
              textAlign: 'center',
              fontSize: 13,
              color: '#a1a1aa',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.5,
              wordBreak: 'keep-all'
            }}>
              해당 사이트는 AI를 활용하여 제작하였습니다.
            </p>
            <p style={{
              textAlign: 'center',
              fontSize: 10,
              color: '#d4d4d8',
              fontWeight: 500,
              letterSpacing: '0.04em',
              marginTop: 12
            }}>
              © 2026 KYUNGHWAN CHO
            </p>
          </motion.div>
        </div>

        {/* 하단 안전 패딩 */}
        <div style={{ height: 20, flexShrink: 0 }} />
      </div>
    </motion.div>
  );
};
