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
    {/* Subtle dot grid */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-size-[28px_28px]" />
    <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0047BB]/20 to-transparent" />

    <div className="max-w-7xl mx-auto w-full relative z-10">

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-black/5 pb-6">
        <div>
          <span className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">01. 소개</span>
          <h2 className="flex flex-col gap-1 items-start mt-2">
            <span className="text-2xl md:text-3xl text-zinc-600 font-display font-medium tracking-tight">논리와 감성으로,</span>
            <span className="flex items-baseline gap-2 leading-none mt-1">
              <span className="text-[72px] md:text-[90px] lg:text-[110px] font-display font-black tracking-tighter text-zinc-400 leading-none">0</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-zinc-600">에서</span>
              <span className="text-[82px] md:text-[100px] lg:text-[124px] font-display font-black tracking-tighter text-[#0047BB] leading-none drop-shadow-[0_0_32px_rgba(0,71,187,0.22)]">+</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-zinc-600">로</span>
            </span>
          </h2>
        </div>
        <p className="text-zinc-500 text-sm leading-[1.7] md:text-right font-medium max-w-xs md:max-w-[260px]">
          프로젝트의 뼈대를 세우고<br />재미의 본질을 설계하는 핵심 철학입니다.
        </p>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-stretch">

        {/* LEFT: editorial body copy */}
        <div className="flex flex-col justify-between gap-8">

          <div className="flex flex-col gap-7">
            {/* P1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-5"
            >
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#0047BB]/25 rounded-full" />
              <div className="text-[17px] md:text-[19px] lg:text-[21px] text-[#111111] leading-[1.9] font-semibold tracking-[-0.01em] break-keep">
                <EditableText value={content.p1} onSave={(v) => setContent({ ...content, p1: v })} isEditing={isEditing} markdown />
              </div>
            </motion.div>

            {/* P2 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14px] md:text-[15px] lg:text-[16px] text-zinc-500 leading-loose font-medium tracking-[-0.005em] break-keep"
            >
              <EditableText value={content.p2} onSave={(v) => setContent({ ...content, p2: v })} isEditing={isEditing} markdown />
            </motion.div>
          </div>

          {/* Bottom: closing statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#0047BB]/10 pt-6"
          >
            <p className="text-[11px] font-black tracking-[0.2em] text-[#0047BB]/50 uppercase mb-3">핵심 철학</p>
            <p className="text-[15px] md:text-[16px] text-[#111111] font-bold leading-[1.75] break-keep">
              저도 누군가의 하루를 움직이는,<br />
              <span className="text-[#0047BB] font-black">그 +를 설계하는 기획자</span>가 되겠습니다.
            </p>
          </motion.div>
        </div>

        {/* RIGHT: stat cards */}
        <div className="flex flex-col gap-3">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] px-6 py-6 flex items-center gap-6 group hover:border-[#0047BB]/20 hover:shadow-[0_6px_24px_-6px_rgba(0,71,187,0.12)] transition-all duration-300 flex-1"
          >
            <div className="flex items-center gap-1 shrink-0 leading-none w-[72px] justify-center">
              <span className="text-[36px] font-black text-zinc-400 leading-none group-hover:text-zinc-500 transition-colors duration-300">0</span>
              <span className="text-[16px] font-black text-zinc-300 mx-0.5">→</span>
              <span className="text-[44px] font-black text-[#0047BB] leading-none drop-shadow-[0_0_10px_rgba(0,71,187,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(0,71,187,0.4)] transition-all duration-300">+</span>
            </div>
            <div className="w-px self-stretch bg-black/5 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-[0.16em] text-[#0047BB]/60 uppercase mb-1.5">재미 설계</p>
              <p className="text-[14px] text-zinc-600 font-semibold leading-[1.6] break-keep">0에서 플러스가 되는<br />경험을 만드는 기획자</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] px-6 py-6 flex items-center gap-6 group hover:border-[#0047BB]/20 hover:shadow-[0_6px_24px_-6px_rgba(0,71,187,0.12)] transition-all duration-300 flex-1"
          >
            <div className="shrink-0 w-[72px] flex items-baseline justify-center gap-0.5 leading-none">
              <span className="text-[44px] font-black text-[#1A2332] leading-none group-hover:text-[#0047BB] transition-colors duration-300">3</span>
              <span className="text-[18px] font-black text-zinc-400 leading-none">건+</span>
            </div>
            <div className="w-px self-stretch bg-black/5 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-[0.16em] text-[#0047BB]/60 uppercase mb-1.5">프로젝트 기획</p>
              <p className="text-[14px] text-zinc-600 font-semibold leading-[1.6] break-keep">시스템 · 밸런스 · 레벨<br />처음부터 끝까지 단독 설계</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] px-6 py-6 flex items-center gap-6 group hover:border-[#0047BB]/20 hover:shadow-[0_6px_24px_-6px_rgba(0,71,187,0.12)] transition-all duration-300 flex-1"
          >
            <div className="flex items-center gap-1 shrink-0 leading-none w-[72px] justify-center">
              <span className="text-[36px] font-black text-zinc-400 leading-none group-hover:text-zinc-500 transition-colors duration-300">A</span>
              <span className="text-[16px] font-black text-zinc-300 mx-0.5">→</span>
              <span className="text-[36px] font-black text-[#1A2332] leading-none group-hover:text-[#0047BB] transition-colors duration-300">Z</span>
            </div>
            <div className="w-px self-stretch bg-black/5 shrink-0" />
            <div>
              <p className="text-[10px] font-black tracking-[0.16em] text-[#0047BB]/60 uppercase mb-1.5">전체 기획 담당</p>
              <p className="text-[14px] text-zinc-600 font-semibold leading-[1.6] break-keep">아이디어 발굴부터<br />출시 전략까지 전담</p>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  </section>
);
