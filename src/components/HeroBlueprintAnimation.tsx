import React from 'react';
import { motion } from 'motion/react';

export const HeroBlueprintAnimation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { 
      pathLength: 1, 
      opacity: 0.5,
      transition: { duration: 2, ease: "easeInOut" } 
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  // Using a 500x300 viewBox coordinate system for perfect scaling
  const startPoints = [
    { y: 80, label: "01. CORE INTENT" },
    { y: 150, label: "02. SYSTEMS" },
    { y: 220, label: "03. BALANCE" }
  ];

  const endNodes = [
    { x: 260, y: 50, label: "META_GAME" },
    { x: 380, y: 100, label: "COMBAT_LOOP" },
    { x: 300, y: 150, label: "ECONOMY" },
    { x: 420, y: 200, label: "USER_EXP" },
    { x: 320, y: 250, label: "RETENTION" }
  ];

  const connections = [
    { start: 0, end: 0 },
    { start: 0, end: 1 },
    { start: 1, end: 1 },
    { start: 1, end: 2 },
    { start: 1, end: 3 },
    { start: 2, end: 2 },
    { start: 2, end: 4 },
    { start: 0, end: 4 }
  ];

  return (
    <div className="absolute inset-0 bg-[#0A0F1C] overflow-hidden font-mono selection:bg-transparent">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,71,187,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,71,187,0.15)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>
      
      {/* Scanning Line Animation */}
      <motion.div 
        animate={{ y: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-[#0047BB]/30 to-transparent w-full z-0"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="absolute inset-0 w-full h-full flex items-center justify-center p-6"
      >
        <svg viewBox="0 0 500 300" className="w-full h-full overflow-visible">
          {/* Connections */}
          {connections.map((conn, i) => {
            const start = startPoints[conn.start];
            const end = endNodes[conn.end];
            const startX = 140; // End of the text box
            const pathData = `M ${startX} ${start.y} C ${startX + 60} ${start.y}, ${end.x - 60} ${end.y}, ${end.x} ${end.y}`;
            return (
              <motion.path 
                key={`path-${i}`}
                d={pathData}
                fill="none"
                stroke="#0047BB"
                strokeWidth="1.5"
                variants={lineVariants}
              />
            );
          })}

          {/* Start Points (Table of Contents) */}
          {startPoints.map((pt, i) => (
            <motion.g key={`start-${i}`} variants={nodeVariants}>
              <rect x="20" y={pt.y - 12} width="110" height="24" rx="4" fill="#0A0F1C" stroke="rgba(0,71,187,0.6)" strokeWidth="1" />
              <text x="30" y={pt.y + 3.5} fill="#0047BB" fontSize="10" fontWeight="bold" letterSpacing="1" fontFamily="monospace">{pt.label}</text>
              <circle cx="140" cy={pt.y} r="3" fill="#0047BB" />
              <circle cx="140" cy={pt.y} r="7" fill="rgba(0,71,187,0.3)" />
            </motion.g>
          ))}

          {/* End Nodes (Systems) */}
          {endNodes.map((node, i) => (
            <motion.g key={`node-${i}`} variants={nodeVariants}>
              <circle cx={node.x} cy={node.y} r="3" fill="#FFFFFF" />
              <circle cx={node.x} cy={node.y} r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x={node.x + 12} y={node.y + 3} fill="rgba(255,255,255,0.8)" fontSize="9" letterSpacing="1" fontFamily="monospace">{node.label}</text>
            </motion.g>
          ))}
          
          {/* Animated Pulses on Nodes */}
          {endNodes.map((node, i) => (
            <motion.circle
              key={`pulse-${i}`}
              cx={node.x} cy={node.y} r="3" fill="none" stroke="#FFFFFF" strokeWidth="1"
              animate={{ r: [3, 16, 3], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Vignette Overlay to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0A0F1C_100%)] pointer-events-none opacity-80"></div>
    </div>
  );
};
