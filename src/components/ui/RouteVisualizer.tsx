"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation, Zap, CheckCircle2, RotateCcw } from "lucide-react";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "depot" | "dropoff";
}

const NODES: Node[] = [
  { id: "origin", name: "Central Hub", x: 20, y: 55, type: "depot" },
  { id: "A", name: "Metro Retail", x: 42, y: 22, type: "dropoff" },
  { id: "B", name: "Port Terminal", x: 78, y: 30, type: "dropoff" },
  { id: "C", name: "East Logistics", x: 82, y: 78, type: "dropoff" },
  { id: "D", name: "Industrial SMB", x: 45, y: 85, type: "dropoff" },
];

export function RouteVisualizer() {
  const [optimized, setOptimized] = useState(true);

  // Standard route: origin -> B -> A -> D -> C -> origin
  const unoptimizedPath = "M 20 55 L 78 30 L 42 22 L 45 85 L 82 78 Z";
  // Optimized TSP route: origin -> A -> B -> C -> D -> origin
  const optimizedPath = "M 20 55 L 42 22 L 78 30 L 82 78 L 45 85 Z";

  return (
    <div className="w-full bg-[#060709] border border-white/10 p-3.5 sm:p-5 overflow-hidden flex flex-col gap-3 sm:gap-4 text-xs font-mono select-none rounded-xl">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white font-semibold tracking-widest uppercase text-[9px] sm:text-[10px]">
            TSP ROUTE OPTIMIZATION CONSOLE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOptimized(!optimized)}
            className={`px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] tracking-widest uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
              optimized
                ? "bg-white text-black font-bold border-white"
                : "bg-white/5 text-zinc-400 border-white/15 hover:text-white"
            }`}
          >
            {optimized ? (
              <>
                <Zap className="h-3 w-3 text-black fill-black" />
                TSP HEURISTIC: ACTIVE
              </>
            ) : (
              <>
                <RotateCcw className="h-3 w-3" />
                STANDARD ROUTE
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full aspect-[16/9] bg-[#030406] border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Ambient Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Dynamic Route Polyline */}
        <svg viewBox="0 0 100 100" className="w-full h-full p-4 relative z-10">
          <motion.path
            d={optimized ? optimizedPath : unoptimizedPath}
            fill="none"
            stroke={optimized ? "#FFFFFF" : "#52525B"}
            strokeWidth="1.6"
            strokeDasharray={optimized ? "none" : "3 3"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Render Nodes */}
          {NODES.map((node) => (
            <g key={node.id} className="cursor-pointer">
              <circle
                cx={node.x}
                cy={node.y}
                r={node.type === "depot" ? 3.5 : 2.5}
                fill={node.type === "depot" ? "#FFFFFF" : optimized ? "#E4E4E7" : "#71717A"}
                stroke="#030406"
                strokeWidth="1"
              />
              <text
                x={node.x + (node.x > 50 ? -4 : 4)}
                y={node.y - 4}
                textAnchor={node.x > 50 ? "end" : "start"}
                fill="#A1A1AA"
                fontSize="3.8"
                fontFamily="inherit"
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Live Route Tag */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] text-zinc-300 flex items-center gap-1.5 tracking-wider uppercase font-mono">
          <Navigation className="h-3 w-3 text-white" />
          <span>5 WAYPOINTS CLUSTERED</span>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
        <div className="bg-white/5 border border-white/10 p-2 sm:p-2.5 flex flex-col">
          <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">TOTAL TRANSIT</span>
          <span className="text-xs sm:text-sm font-bold text-white font-sans mt-0.5">
            {optimized ? "41.8 km" : "68.4 km"}
          </span>
          <span className="text-[8px] sm:text-[9px] text-zinc-300 font-sans mt-0.5 font-medium">
            {optimized ? "↓ 38.8% save" : "Baseline"}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2 sm:p-2.5 flex flex-col">
          <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">FUEL BURN</span>
          <span className="text-xs sm:text-sm font-bold text-white font-sans mt-0.5">
            {optimized ? "5.4 L" : "8.9 L"}
          </span>
          <span className="text-[8px] sm:text-[9px] text-zinc-300 font-sans mt-0.5 font-medium">
            {optimized ? "↓ 3.5L Saved" : "High burn"}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 p-2 sm:p-2.5 flex flex-col">
          <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider">DISPATCH TIME</span>
          <span className="text-xs sm:text-sm font-bold text-white font-sans mt-0.5">
            {optimized ? "46 Mins" : "82 Mins"}
          </span>
          <span className="text-[8px] sm:text-[9px] text-white font-sans mt-0.5 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="h-2.5 w-2.5 text-white" /> Optimal
          </span>
        </div>
      </div>
    </div>
  );
}
