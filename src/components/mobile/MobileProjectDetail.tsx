import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ExternalLink, BookOpen, Play, Map, ChevronRight, ChevronDown, X, ChevronLeft, Calculator, FileText, Scroll } from 'lucide-react';
import type { Project } from '../../types';

interface Props {
  project: Project;
  onBack: () => void;
}

export const MobileProjectDetail = ({ project, onBack }: Props) => {
  const [popupContent, setPopupContent] = useState<{
    type: 'gallery' | 'iframe' | 'video';
    url?: string;
    images?: string[];
    title: string;
  } | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(false);

  const openGallery = (idx: number) => {
    setGalleryIdx(idx);
    setPopupContent({ type: 'gallery', images: project.gallery, title: project.documentLabel || '기획서' });
  };

  const openScenarioGallery = (idx: number) => {
    if (!project.scenarioGallery) return;
    setGalleryIdx(idx);
    setPopupContent({ type: 'gallery', images: project.scenarioGallery, title: '시나리오 기획서' });
  };

  const renderPopup = () => {
    if (!popupContent) return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          background: '#000', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{popupContent.title}</span>
          <button onClick={() => setPopupContent(null)} style={{ background: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: 99, color: '#fff' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {popupContent.type === 'gallery' && popupContent.images && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={popupContent.images[galleryIdx]} alt={`page ${galleryIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              
              {/* 좌우 네비게이션 */}
              {galleryIdx > 0 && (
                <button onClick={() => setGalleryIdx(i => i - 1)} style={{ position: 'absolute', left: 16, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: 8, borderRadius: 99 }}>
                  <ChevronLeft size={24} />
                </button>
              )}
              {galleryIdx < popupContent.images.length - 1 && (
                <button onClick={() => setGalleryIdx(i => i + 1)} style={{ position: 'absolute', right: 16, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: 8, borderRadius: 99 }}>
                  <ChevronRight size={24} />
                </button>
              )}
              
              <div style={{ position: 'absolute', bottom: 30, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>
                {galleryIdx + 1} / {popupContent.images.length}
              </div>
            </div>
          )}
          {popupContent.type === 'iframe' && popupContent.url && (
            <iframe src={popupContent.url} style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }} />
          )}
          {popupContent.type === 'video' && popupContent.url && (
            <iframe src={popupContent.url.includes('youtu.be/') ? popupContent.url.replace('youtu.be/', 'youtube.com/embed/') : popupContent.url.replace('watch?v=', 'embed/')} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <>
    <AnimatePresence>
      {popupContent && renderPopup()}
    </AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: '#FDFCF8',
        overflowY: 'auto',
        paddingBottom: 80,
      }}
    >
      {/* ── 히어로 이미지 영역 ───────────────────── */}
      <div style={{ position: 'relative', width: '100%', height: 260, background: '#18181b', overflow: 'hidden' }}>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
          />
        )}
        {/* 하단 그라디언트 — 타이틀 가독성 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)',
        }} />
        {/* 상단 비놤 — X 버튼 보호 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 35%)',
        }} />

        {/* 뒤로가기 버튼 — 우측 상단 */}
        <button
          onClick={onBack}
          style={{
            position: 'absolute', top: 16, right: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            borderRadius: 99,
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          <X strokeWidth={2} style={{ width: 16, height: 16 }} />
        </button>

        {/* 제목 / 메타 오버레이 */}
        <div style={{ position: 'absolute', bottom: 20, left: 20, right: 56 }}>
          <h1 style={{
            fontSize: '1.75rem', fontWeight: 900, color: '#fff',
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10,
          }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.roles.map(role => (
              <span key={role} style={{
                fontSize: 10, fontWeight: 800,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                color: 'rgba(255,255,255,0.85)',
                padding: '4px 10px', borderRadius: 99,
                letterSpacing: '0.02em',
              }}>
                {role}
              </span>
            ))}
            {project.status && (
              <span style={{
                fontSize: 10, fontWeight: 800,
                background: '#0047BB',
                color: '#fff',
                padding: '4px 10px', borderRadius: 99,
                letterSpacing: '0.02em',
              }}>
                {project.status}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 메타 정보 바 (3열 수평 그리드) ─────────────────── */}
      {project.stats && (
        <div style={{ background: '#18181b', display: 'flex', alignItems: 'stretch' }}>
          {[
            { label: '팀 규모', value: project.stats.teamSize, accent: false },
            { label: '주요 역할', value: project.stats.myRole, accent: 'blue' as const },
            { label: '주요 성과', value: project.stats.achievement, accent: 'green' as const },
          ].map((item, i) => (
            <div key={item.label} style={{
              flex: 1,
              padding: '16px 12px',
              display: 'flex', flexDirection: 'column', gap: 5,
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 800, lineHeight: 1.3,
                color: item.accent === 'green' ? '#34d399' : item.accent === 'blue' ? '#60a5fa' : '#fff',
                wordBreak: 'keep-all',
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── 개요 (접기/펼치기) ──────────────────────── */}
      <div style={{
        margin: '12px 16px 0',
        background: '#fff',
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setIsDescOpen(v => !v)}
          style={{
            width: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.25em' }}>프로젝트 개요</span>
          <motion.span animate={{ rotate: isDescOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown strokeWidth={2} style={{ width: 16, height: 16, color: '#a1a1aa' }} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isDescOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '0 18px 18px' }}>
                <p style={{ fontSize: 13.5, color: '#3f3f46', lineHeight: 1.9, wordBreak: 'keep-all' }}>{project.description}</p>
                
                {(() => {
                  if (!project.content) return null;
                  const sections: { title: string; items: string[] }[] = [];
                  let cur: { title: string; items: string[] } | null = null;
                  for (const raw of project.content.split('\n')) {
                    const line = raw.trim();
                    if (line.startsWith('### ')) {
                      if (cur) sections.push(cur);
                      cur = { title: line.replace(/^###\s*[\d.]*\s*/, ''), items: [] };
                    } else if (line.startsWith('## ') && !line.match(/^##\s*\d+\.\s*기획 개요/)) {
                      if (cur) sections.push(cur);
                      cur = { title: line.replace(/^##\s*[\d.]*\s*/, ''), items: [] };
                    } else if (line.startsWith('- ') && cur) {
                      cur.items.push(line.slice(2));
                    }
                  }
                  if (cur) sections.push(cur);
                  const withItems = sections.filter(s => s.items.length > 0);
                  if (withItems.length === 0) return null;

                  const highlight = (text: string) => {
                    const parts = text.split(/(\*\*.*?\*\*|\d+(?:\.\d+)?(?:%|초|인|배|종|s|개)?)/g);
                    return parts.map((p, i) => {
                      if (p.startsWith('**') && p.endsWith('**')) {
                        return <strong key={i} style={{ fontWeight: 800, color: '#18181b' }}>{p.slice(2, -2)}</strong>;
                      } else if (/^\d/.test(p)) {
                        return <strong key={i} style={{ background: '#f4f4f5', padding: '2px 5px', borderRadius: 6, color: '#0047BB', fontSize: 12.5, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{p}</strong>;
                      } else {
                        return <span key={i}>{p}</span>;
                      }
                    });
                  };

                  return (
                    <div style={{ marginTop: 18 }}>
                      <span style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 12 }}>주요 설계 내용</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {withItems.map((section, si) => (
                          <div key={si} style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: 12 }}>
                            <p style={{ fontSize: 12, fontWeight: 800, color: '#1A2332', marginBottom: 6 }}>{section.title}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {section.items.map((item, ii) => (
                                <p key={ii} style={{ fontSize: 13, color: '#52525b', lineHeight: 1.6, position: 'relative', paddingLeft: 10, wordBreak: 'keep-all' }}>
                                  <span style={{ position: 'absolute', left: 0, top: 7, width: 3, height: 3, borderRadius: '50%', background: '#d4d4d8' }} />
                                  {highlight(item)}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 태그 ─────────────────────────────────── */}
      {project.tags.length > 0 && (
        <div style={{
          margin: '12px 16px 0',
          background: '#fff',
          borderRadius: 16,
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '14px 18px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <span style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 10 }}>
            태그
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map(tag => {
              const hasHash = tag.startsWith('#');
              const label = hasHash ? tag.slice(1) : tag;
              return (
                <span key={tag} style={{
                  display: 'inline-flex', alignItems: 'baseline', gap: 1,
                  padding: '5px 11px',
                  background: 'rgba(0,71,187,0.07)',
                  borderRadius: 99,
                  border: '1px solid rgba(0,71,187,0.14)',
                }}>
                  {hasHash && (
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: 'rgba(0,71,187,0.45)', marginRight: 1 }}>#</span>
                  )}
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: '#0047BB' }}>{label}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 주요 작업 ─────────────────────────────── */}
      {project.keyTasks && project.keyTasks.length > 0 && (
        <div style={{
          margin: '12px 16px 0',
          background: '#fff',
          borderRadius: 16,
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '14px 18px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <span style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 10 }}>
            주요 작업
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {project.keyTasks.map(task => (
              <span key={task} style={{
                padding: '6px 13px',
                background: '#f4f4f5',
                color: '#3f3f46',
                fontSize: 12, fontWeight: 700,
                borderRadius: 10,
                border: '1px solid rgba(0,0,0,0.05)',
              }}>
                {task}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── 바로가기 (documents + actions) ─────────────────── */}
      <div style={{
        margin: '12px 16px 0',
        background: '#fff',
        borderRadius: 16,
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 18px 8px' }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.3em' }}>자료 및 컨텐츠</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* 기획서 보기 */}
          {project.gallery && project.gallery.length > 0 && (
            <ListButton
              onClick={() => openGallery(0)}
              icon={<FileText strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label={`${project.documentLabel || '기획서'} 보기`}
              sub={`${project.gallery.length}페이지`}
            />
          )}
          {/* 시나리오 기획서 */}
          {project.scenarioGallery && project.scenarioGallery.length > 0 && (
            <ListButton
              onClick={() => openScenarioGallery(0)}
              icon={<Scroll strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label="시나리오 기획서 보기"
              sub={`${project.scenarioGallery.length}페이지`}
            />
          )}
          {/* PDF — gallery가 없을 때만 표시 */}
          {project.pdfUrl && !project.gallery?.length && (
            <ListButton
              onClick={() => setPopupContent({ type: 'iframe', url: project.pdfUrl!, title: project.documentLabel || 'PDF 보기' })}
              icon={<BookOpen strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label={`${project.documentLabel || 'PDF'} 보기`}
            />
          )}
          {/* 프로토타입 */}
          {project.prototypeUrl && (
            <ListButton
              onClick={() => setPopupContent({ type: 'iframe', url: project.prototypeUrl!, title: '프로토타입' })}
              icon={<Play strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label="프로토타입 체험"
            />
          )}
          {/* 시뮬레이터 */}
          {project.simulatorUrl && (
            <ListButton
              onClick={() => setPopupContent({ type: 'iframe', url: project.simulatorUrl!, title: '시뮬레이터' })}
              icon={<Calculator strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label="시뮬레이터 실행"
            />
          )}
          {/* 간트차트 — 외부 링크 */}
          {project.ganttUrl && (
            <ListButton
              onClick={() => {
                if (window.confirm("간트차트는 모바일 환경에서 최적화되지 않았을 수 있습니다.\n새 창에서 외부 페이지로 이동하시겠습니까?")) {
                  window.open(project.ganttUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              icon={<Map strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label="간트차트 보기"
              sub="외부 링크"
            />
          )}
          {/* 영상 보기 */}
          {project.videoUrl && (
            <ListButton
              onClick={() => setPopupContent({ type: 'video', url: project.videoUrl!, title: '영상 보기' })}
              icon={<Play strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label="영상 보기"
              primary
            />
          )}
          {/* 시뮬레이터 영상 */}
          {project.simulatorVideoUrl && (
            <ListButton
              onClick={() => setPopupContent({ type: 'video', url: project.simulatorVideoUrl!, title: '시뮬레이터 영상' })}
              icon={<Play strokeWidth={1.8} style={{ width: 16, height: 16, color: '#0047BB' }} />}
              label="시뮬레이터 영상"
              primary
            />
          )}
          {/* 바로 체험하기 */}
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <ListButton
                onClick={() => {}}
                icon={<ExternalLink strokeWidth={1.8} style={{ width: 16, height: 16, color: '#fff' }} />}
                label="바로 체험하기"
                primary
              />
            </a>
          )}
        </div>
      </div>
    </motion.div>
    </>
  );
};

const ActionButton = ({ onClick, icon, label, primary = false }: {
  onClick: () => void; icon: React.ReactNode; label: string; primary?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px',
      background: primary ? '#0047BB' : '#fff',
      color: primary ? '#fff' : '#1A2332',
      borderRadius: 14,
      border: primary ? 'none' : '1px solid rgba(0,0,0,0.08)',
      fontSize: 13.5, fontWeight: 700,
      boxShadow: primary ? '0 4px 14px rgba(0,71,187,0.25)' : '0 1px 4px rgba(0,0,0,0.04)',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      {icon}
      {label}
    </span>
    <ChevronRight strokeWidth={2} style={{ width: 15, height: 15, opacity: 0.5 }} />
  </button>
);

const ListButton = ({ onClick, icon, label, sub, primary = false }: {
  onClick: () => void; icon: React.ReactNode; label: string; sub?: string; primary?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      display: 'flex', alignItems: 'center',
      padding: '13px 18px',
      background: primary ? 'rgba(0,71,187,0.06)' : 'transparent',
      border: 'none',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      cursor: 'pointer',
      WebkitTapHighlightColor: 'transparent',
      gap: 12,
      textAlign: 'left',
    }}
  >
    <span style={{
      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: primary ? 'rgba(0,71,187,0.12)' : 'rgba(0,71,187,0.08)',
    }}>
      {icon}
    </span>
    <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: primary ? '#0047BB' : '#1A2332' }}>{label}</span>
      {sub && <span style={{ fontSize: 10.5, fontWeight: 600, color: '#a1a1aa' }}>{sub}</span>}
    </span>
    <ChevronRight strokeWidth={2} style={{ width: 14, height: 14, color: '#d4d4d8', flexShrink: 0 }} />
  </button>
);
