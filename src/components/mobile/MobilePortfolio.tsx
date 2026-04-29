import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MobileProjectDetail } from './MobileProjectDetail';
import type { Project } from '../../types';

interface Props {
  projects: Project[];
}

const ALL_FILTERS = ['전체', '밸런스 기획', '코어 룰 기획', '시스템 기획', 'PM', '프로토타이핑', 'AI 활용'];

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  '구글플레이스토어 출시': { bg: 'rgba(0,71,187,0.08)', color: '#0047BB',        border: '1px solid rgba(0,71,187,0.22)' },
  '메이플월드 출시':       { bg: 'rgba(0,71,187,0.08)', color: '#0047BB',        border: '1px solid rgba(0,71,187,0.22)' },
  '로컬 제작 완료':        { bg: 'rgba(0,0,0,0.05)',    color: '#52525b',        border: '1px solid rgba(0,0,0,0.1)'     },
  '프로토타입':            { bg: 'rgba(0,0,0,0.04)',    color: '#71717a',        border: '1px solid rgba(0,0,0,0.08)'    },
  '제작 완료':             { bg: 'rgba(0,0,0,0.05)',    color: '#52525b',        border: '1px solid rgba(0,0,0,0.1)'     },
};

export const MobilePortfolio = ({ projects }: Props) => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeFilter === '전체'
    ? projects
    : projects.filter(p =>
        p.roles.includes(activeFilter) || p.keyTasks?.includes(activeFilter)
      );

  const handleCardTap = (p: Project) => {
    setSelectedProject(p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* 스크롤바 숨김 CSS */}
      <style>{`
        .mobile-filter-scroll::-webkit-scrollbar { display: none; }
        .mobile-filter-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <AnimatePresence>
        {selectedProject && (
          <MobileProjectDetail
            key="detail"
            project={selectedProject}
            onBack={() => { setSelectedProject(null); window.scrollTo(0, 0); }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
        <div
          className="sticky top-0 z-30"
          style={{
            background: 'rgba(253,252,248,0.96)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
            padding: '14px 20px 12px',
          }}
        >
          <span style={{ display: 'block', fontSize: 9, fontWeight: 900, letterSpacing: '0.38em', color: '#0047BB', textTransform: 'uppercase', marginBottom: 3 }}>
            Portfolio
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1A2332', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 13 }}>
            Works
          </h2>

          {/* 필터 칩 — 스크롤바 숨김 */}
          <div style={{ position: 'relative' }}>
            {/* 우측 페이드 오버레이 */}
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 32, zIndex: 2,
              background: 'linear-gradient(to left, rgba(253,252,248,1) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            <div
              className="mobile-filter-scroll"
              style={{ overflowX: 'auto', margin: '0 -20px', padding: '0 20px' }}
            >
              <div style={{ display: 'flex', gap: 7, width: 'max-content', paddingRight: 32 }}>
                {ALL_FILTERS.map(f => {
                  const isOn = activeFilter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: 99,
                        fontSize: 11.5,
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        background: isOn ? '#0047BB' : '#fff',
                        color: isOn ? '#fff' : '#71717a',
                        border: isOn ? 'none' : '1px solid rgba(0,0,0,0.09)',
                        boxShadow: isOn ? '0 3px 10px rgba(0,71,187,0.22)' : '0 1px 3px rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        WebkitTapHighlightColor: 'transparent',
                        transition: 'all 0.18s',
                        fontFamily: 'inherit',
                      }}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── 프로젝트 목록 — 1단(1열) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              padding: '16px 16px 0',
            }}
          >
            {filtered.map((project, i) => {
              const statusStyle = project.status
                ? (STATUS_STYLE[project.status] ?? { bg: 'rgba(0,0,0,0.04)', color: '#71717a', border: '1px solid rgba(0,0,0,0.08)' })
                : null;

              return (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => handleCardTap(project)}
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    border: '1px solid rgba(0,0,0,0.07)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                    transition: 'transform 0.15s',
                  }}
                  onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.985)')}
                  onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {/* 썸네일 이미지 — 고정 192px, objectFit:cover */}
                  <div style={{ position: 'relative', width: '100%', height: 192, overflow: 'hidden', background: '#e5e7eb' }}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e5e7eb, #d1d5db)' }} />
                    )}
                    {/* 미세 하단 그라데이션 */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)',
                    }} />
                  </div>

                  {/* 카드 본문 — 패딩 넉넉하게 */}
                  <div style={{ padding: '16px 20px 20px' }}>

                    {/* 상태 배지 — 소형화, 제목과 가깝게 (mb-1) */}
                    {statusStyle && project.status && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: 9.5, fontWeight: 700,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: statusStyle.border,
                        padding: '2px 8px',
                        borderRadius: 99,
                        letterSpacing: '0.02em',
                        marginBottom: 4,   /* 배지↔제목: 가깝게 */
                      }}>
                        {project.status}
                      </span>
                    )}

                    {/* 제목 */}
                    <p style={{
                      fontSize: 16, fontWeight: 900, color: '#1A2332',
                      letterSpacing: '-0.03em', lineHeight: 1.25,
                      marginBottom: 6,     /* 제목↔설명: 가깝게 */
                      wordBreak: 'keep-all',
                    }}>
                      {project.title}
                    </p>

                    {/* 한 줄 설명 */}
                    {project.description && (
                      <p style={{
                        fontSize: 12.5, color: '#71717a',
                        lineHeight: 1.62, letterSpacing: '-0.01em',
                        marginBottom: 0,
                        wordBreak: 'keep-all',
                      }}>
                        {project.description}
                      </p>
                    )}

                    {/* 역할 태그 — 설명과 16px 띄워서 그룹 분리 */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 14 }}>
                      {project.roles.map(role => (
                        <span key={role} style={{
                          fontSize: 10.5, fontWeight: 700, color: '#52525b',
                          background: '#f4f4f5',
                          border: '1px solid rgba(0,0,0,0.06)',
                          padding: '4px 9px',
                          borderRadius: 99,
                          letterSpacing: '-0.01em',
                        }}>
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#a1a1aa' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }}>🔍</span>
            <p style={{ fontSize: 13, fontWeight: 600 }}>해당 조건의 프로젝트가 없습니다.</p>
          </div>
        )}
      </motion.div>
    </>
  );
};
