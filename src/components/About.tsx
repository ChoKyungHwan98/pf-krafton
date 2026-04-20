import React from 'react';
import { motion } from 'motion/react';
import { EditableText } from './EditableText';

interface AboutProps {
  isEditing: boolean;
  content: any;
  setContent: (c: any) => void;
}

export const About = ({ isEditing, content, setContent }: AboutProps) => (
  <section
    id="about"
    className="pt-[100px] lg:pt-[130px] pb-24 lg:pb-32 px-6 md:px-12 relative flex flex-col justify-start bg-transparent overflow-hidden"
  >
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-size-[28px_28px]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0047BB]/20 to-transparent" />

    <div className="max-w-7xl mx-auto w-full relative z-10">

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-black/5 pb-8">
        <div>
          <span className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">01. 소개</span>
          <h2 className="flex flex-col gap-1 items-start mt-2">
            <span className="text-2xl md:text-3xl text-zinc-500 font-display font-medium tracking-tight">논리와 감성으로,</span>
            <span className="flex items-baseline gap-2 leading-none mt-1">
              <span className="text-[72px] md:text-[90px] lg:text-[110px] font-display font-black tracking-tighter text-zinc-400 leading-none">0</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-zinc-500">에서</span>
              <span className="text-[82px] md:text-[100px] lg:text-[124px] font-display font-black tracking-tighter text-[#0047BB] leading-none drop-shadow-[0_0_32px_rgba(0,71,187,0.22)]">+</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-zinc-500">로</span>
            </span>
          </h2>
        </div>
        <p className="text-zinc-400 text-sm leading-[1.8] md:text-right font-medium max-w-[240px]">
          프로젝트의 뼈대를 세우고<br />재미의 본질을 설계하는 핵심 철학입니다.
        </p>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-12 lg:gap-16 items-stretch">

        {/* LEFT */}
        <div className="flex flex-col justify-between gap-8">
          <div className="flex flex-col gap-6">

            {/* P1 — 핵심 주장, bold → 파란색 하이라이트 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={[
                'text-[17px] md:text-[19px] lg:text-[21px]',
                'text-[#1A1A1A] leading-[1.95] font-semibold tracking-[-0.01em] break-keep',
                '[&_strong]:text-[#0047BB] [&_strong]:font-black',
              ].join(' ')}
            >
              <EditableText value={content.p1} onSave={(v) => setContent({ ...content, p1: v })} isEditing={isEditing} markdown />
            </motion.div>

            {/* Thin separator */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ transformOrigin: 'left' }}
              className="h-px bg-linear-to-r from-black/8 to-transparent"
            />

            {/* P2 — 맥락 설명, bold → 살짝 강조 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={[
                'text-[14px] md:text-[15px] lg:text-[16px]',
                'text-zinc-500 leading-[1.9] font-medium tracking-[-0.005em] break-keep',
                '[&_strong]:text-zinc-700 [&_strong]:font-bold',
              ].join(' ')}
            >
              <EditableText value={content.p2} onSave={(v) => setContent({ ...content, p2: v })} isEditing={isEditing} markdown />
            </motion.div>
          </div>

          {/* Bottom: 핵심 철학 — 감성적 클로징 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#0047BB]/12 pt-6"
          >
            <p className="text-[10px] font-black tracking-[0.22em] text-[#0047BB]/45 uppercase mb-3">핵심 철학</p>
            <p className="text-[15px] md:text-[16px] lg:text-[17px] text-[#1A1A1A] font-semibold leading-[1.8] break-keep">
              저도 누군가의 하루를 움직이는,<br />
              <span className="text-[#0047BB] font-black">그 +를 설계하는 기획자</span>가 되겠습니다.
            </p>
          </motion.div>
        </div>

        {/* RIGHT: stat cards — 숫자 임팩트 복구 + 가독성 개선 */}
        <div className="flex flex-col gap-3">

          {/* Card 1 — 0 → + (가장 중요, 약간 강조) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-[#0047BB]/12 shadow-[0_4px_24px_-6px_rgba(0,71,187,0.1)] px-7 py-6 flex items-center gap-6 group hover:border-[#0047BB]/25 hover:shadow-[0_8px_32px_-6px_rgba(0,71,187,0.16)] transition-all duration-300 flex-1"
          >
            <div className="flex items-center gap-0.5 shrink-0 leading-none w-[80px] justify-center">
              <span className="text-[44px] font-black text-zinc-300 leading-none">0</span>
              <span className="text-[18px] font-black text-zinc-300 mx-0.5">→</span>
              <span className="text-[56px] font-black text-[#0047BB] leading-none drop-shadow-[0_0_12px_rgba(0,71,187,0.25)] group-hover:drop-shadow-[0_0_24px_rgba(0,71,187,0.4)] transition-all duration-300">+</span>
            </div>
            <div className="w-px self-stretch bg-black/6 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-[0.18em] text-[#0047BB]/55 uppercase mb-1.5">재미 설계</p>
              <p className="text-[14px] lg:text-[15px] text-zinc-600 font-semibold leading-[1.65] break-keep">0에서 플러스가 되는<br />경험을 만드는 기획자</p>
            </div>
          </motion.div>

          {/* Card 2 — 3건+ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.05)] px-7 py-6 flex items-center gap-6 group hover:border-[#0047BB]/18 hover:shadow-[0_6px_24px_-6px_rgba(0,71,187,0.1)] transition-all duration-300 flex-1"
          >
            <div className="shrink-0 w-[80px] flex items-baseline justify-center gap-0.5 leading-none">
              <span className="text-[52px] font-black text-[#1A2332] leading-none group-hover:text-[#0047BB] transition-colors duration-300">3</span>
              <span className="text-[20px] font-black text-zinc-400 leading-none">건+</span>
            </div>
            <div className="w-px self-stretch bg-black/6 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-[0.18em] text-[#0047BB]/55 uppercase mb-1.5">프로젝트 기획</p>
              <p className="text-[14px] lg:text-[15px] text-zinc-600 font-semibold leading-[1.65] break-keep">시스템 · 밸런스 · 레벨<br />처음부터 끝까지 단독 설계</p>
            </div>
          </motion.div>

          {/* Card 3 — A → Z */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.05)] px-7 py-6 flex items-center gap-6 group hover:border-[#0047BB]/18 hover:shadow-[0_6px_24px_-6px_rgba(0,71,187,0.1)] transition-all duration-300 flex-1"
          >
            <div className="flex items-center gap-0.5 shrink-0 leading-none w-[80px] justify-center">
              <span className="text-[42px] font-black text-zinc-300 leading-none group-hover:text-zinc-400 transition-colors duration-300">A</span>
              <span className="text-[18px] font-black text-zinc-300 mx-0.5">→</span>
              <span className="text-[42px] font-black text-[#1A2332] leading-none group-hover:text-[#0047BB] transition-colors duration-300">Z</span>
            </div>
            <div className="w-px self-stretch bg-black/6 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-[0.18em] text-[#0047BB]/55 uppercase mb-1.5">전체 기획 담당</p>
              <p className="text-[14px] lg:text-[15px] text-zinc-600 font-semibold leading-[1.65] break-keep">아이디어 발굴부터<br />출시 전략까지 전담</p>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  </section>
);
