import React from 'react';
import { motion } from 'motion/react';

interface GenrePoint {
  genre: string;
  score: number;
}

interface GenreRadarChartProps {
  data: GenrePoint[];
}

export const GenreRadarChart = ({ data }: GenreRadarChartProps) => {
  const size = 320;
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (Math.PI * 2) / data.length;

  // Generate points for the shape
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (d.score / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      label: d.genre,
      score: d.score
    };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Grid lines
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Grid Circles */}
        {gridLevels.map((level, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="currentColor"
            className="text-black/[0.03]"
            strokeWidth="1"
          />
        ))}

        {/* Axis Lines */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-black/[0.05]"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Shape */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d={pathData}
          fill="url(#radarGradient)"
          stroke="#0047BB"
          strokeWidth="2"
          className="drop-shadow-[0_0_8px_rgba(0,71,187,0.3)]"
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="white"
            stroke="#0047BB"
            strokeWidth="1.5"
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 35;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          
          return (
            <g key={i}>
              <text
                x={lx}
                y={ly - 5}
                textAnchor="middle"
                className="text-[11px] font-black fill-zinc-400 uppercase tracking-tighter"
              >
                {p.label}
              </text>
              <text
                x={lx}
                y={ly + 8}
                textAnchor="middle"
                className="text-[13px] font-display font-black fill-[#0047BB]"
              >
                {p.score}
              </text>
            </g>
          );
        })}

        {/* Gradients */}
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0047BB" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0047BB" stopOpacity="0.4" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
