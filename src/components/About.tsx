import React from 'react';
import { motion } from 'motion/react';
import { EditableText } from './EditableText';

interface AboutProps {
  isEditing: boolean;
  content: any;
  setContent: (c: any) => void;
}

const stats = [
  {
    symbol: '0',
    arrow: '→',
    result: '+',
    label: '재미 설계',
    desc: '0에서 플러스가 되는\n경험을 만드는 기획자',
  },
  {
    symbol: '3',
    suffix: '건+',
    label: '프로젝트 기획',
    desc: '시스템 · 밸런스 · 레벨\n처음부터 끝까지 단독 설계',
  },
  {
    symbol: 'A',
    arrow: '→',
    result: 'Z',
    label: '전체 기획 담당',
    desc: '아이디어 발굴부터\n출시 전략까지 전담',
  },
];

export const About = ({ isEditing, content, setContent }: AboutProps) => (
  <section
    id="about"
    className="pt-[100px] lg:pt-[130px] pb-[240px] lg:pb-[320px] px-6 md:px-12 relative border-t border-black/5 min-h-[110vh] flex flex-col justify-start bg-[#FAFAFA] overflow-hidden"
  >
    {/* Subtle dot grid */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />
    {/* Soft top glow */}
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0047BB]/20 to-transparent" />

    <div className="max-w-7xl mx-auto w-full relative z-10">

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-black/5 pb-6">
        <div>
          <span className="text-[#0047BB] font-sans text-[11px] font-bold tracking-widest uppercase mb-3 block">01. 소개</span>
        <h2 className="flex flex-col gap-1 items-start mt-2">
            <span className="text-2xl md:text-3xl text-zinc-400 font-display font-medium tracking-tight">논리와 감성으로,</span>
            {/* Typographic contrast — same style as CoverLetter */}
            <span className="flex items-baseline gap-2 leading-none mt-1">
              <span className="text-[72px] md:text-[90px] lg:text-[110px] font-display font-black tracking-tighter text-zinc-200 leading-none">0</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-zinc-400">에서</span>
              <span className="text-[82px] md:text-[100px] lg:text-[124px] font-display font-black tracking-tighter text-[#0047BB] leading-none drop-shadow-[0_0_32px_rgba(0,71,187,0.22)]">+</span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-zinc-500">로</span>
            </span>
          </h2>
        </div>
        <p className="text-zinc-500 text-sm leading-[1.7] md:text-right font-medium max-w-xs md:max-w-[260px]">
          프로젝트의 뼈대를 세우고<br />재미의 본질을 설계하는 핵심 철학입니다.
        </p>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 lg:gap-16 items-start">

        {/* LEFT: body copy */}
        <div className="flex flex-col gap-6">
          {/* p1 — highlighted intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_24px_-8px_rgba(0,71,187,0.07)] p-7 md:p-10"
          >
            <div className="text-lg md:text-xl lg:text-2xl text-zinc-600 leading-[2] font-medium">
              <EditableText value={content.p1} onSave={(v) => setContent({ ...content, p1: v })} isEditing={isEditing} multiline />
            </div>
          </motion.div>

          {/* p2 — secondary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-[17px] text-zinc-400 leading-[1.95] font-medium pl-1"
          >
            <EditableText value={content.p2} onSave={(v) => setContent({ ...content, p2: v })} isEditing={isEditing} multiline />
          </motion.div>
        </div>

        {/* RIGHT: stat cards */}
        <div className="flex flex-col gap-3">
          {/* Card 1 — "0 → +" typographic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] px-7 py-6 flex items-center gap-6 group hover:border-[#0047BB]/20 hover:shadow-[0_8px_32px_-8px_rgba(0,71,187,0.12)] transition-all duration-300"
          >
            <div className="flex items-baseline gap-1 shrink-0 leading-none">
              <span className="text-[52px] font-black text-zinc-200 leading-none group-hover:text-zinc-300 transition-colors duration-300">0</span>
              <span className="text-[22px] font-black text-zinc-300 mx-1">→</span>
              <span className="text-[60px] font-black text-[#0047BB] leading-none drop-shadow-[0_0_14px_rgba(0,71,187,0.25)] group-hover:drop-shadow-[0_0_24px_rgba(0,71,187,0.4)] transition-all duration-300">+</span>
            </div>
            <div>
              <p className="text-[12px] font-black tracking-[0.14em] text-[#0047BB] uppercase mb-1.5">재미 설계</p>
              <p className="text-[14px] text-zinc-400 font-medium leading-[1.55]">0에서 플러스가 되는<br />경험을 만드는 기획자</p>
            </div>
          </motion.div>

          {/* Card 2 — "3건+" */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] px-7 py-6 flex items-center gap-6 group hover:border-[#0047BB]/20 hover:shadow-[0_8px_32px_-8px_rgba(0,71,187,0.12)] transition-all duration-300"
          >
            <div className="flex items-baseline gap-0.5 shrink-0 leading-none">
              <span className="text-[64px] font-black text-[#2C2C2C] leading-none group-hover:text-[#0047BB] transition-colors duration-300">3</span>
              <span className="text-[28px] font-black text-zinc-400 leading-none">건+</span>
            </div>
            <div>
              <p className="text-[12px] font-black tracking-[0.14em] text-[#0047BB] uppercase mb-1.5">프로젝트 기획</p>
              <p className="text-[14px] text-zinc-400 font-medium leading-[1.55]">시스템 · 밸런스 · 레벨<br />처음부터 끝까지 단독 설계</p>
            </div>
          </motion.div>

          {/* Card 3 — "A → Z" */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] px-7 py-6 flex items-center gap-6 group hover:border-[#0047BB]/20 hover:shadow-[0_8px_32px_-8px_rgba(0,71,187,0.12)] transition-all duration-300"
          >
            <div className="flex items-baseline gap-1 shrink-0 leading-none">
              <span className="text-[50px] font-black text-zinc-300 leading-none group-hover:text-zinc-400 transition-colors duration-300">A</span>
              <span className="text-[22px] font-black text-zinc-300 mx-1">→</span>
              <span className="text-[50px] font-black text-[#2C2C2C] leading-none group-hover:text-[#0047BB] transition-colors duration-300">Z</span>
            </div>
            <div>
              <p className="text-[12px] font-black tracking-[0.14em] text-[#0047BB] uppercase mb-1.5">전체 기획 담당</p>
              <p className="text-[14px] text-zinc-400 font-medium leading-[1.55]">아이디어 발굴부터<br />출시 전략까지 전담</p>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  </section>
);
