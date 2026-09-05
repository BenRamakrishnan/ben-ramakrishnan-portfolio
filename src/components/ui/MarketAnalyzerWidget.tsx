"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, AlertCircle, ArrowUpRight } from "lucide-react";

interface SectorData {
  id: string;
  name: string;
  sentiment: number;
  gapScore: number;
  searchVolume: string;
  unmetDemand: string;
  competitors: string;
  keyPainPoints: string[];
}

const SECTORS: SectorData[] = [
  {
    id: "cold-storage",
    name: "SMB Cold Storage",
    sentiment: 88,
    gapScore: 9.4,
    searchVolume: "+142% YoY",
    unmetDemand: "High (74%)",
    competitors: "Low / Fragmented",
    keyPainPoints: ["Lack of modular micro-storage", "High minimum contract commitments", "Zero real-time temp API access"],
  },
  {
    id: "fleet-saas",
    name: "Sub-5 Fleet Tracking",
    sentiment: 82,
    gapScore: 8.7,
    searchVolume: "+98% YoY",
    unmetDemand: "Med-High (62%)",
    competitors: "Enterprise Only",
    keyPainPoints: ["Expensive enterprise lock-in", "Complex hardware requirements", "No simple WhatsApp dispatch interface"],
  },
  {
    id: "customs-ai",
    name: "Cross-Border Tariffs",
    sentiment: 91,
    gapScore: 9.1,
    searchVolume: "+210% YoY",
    unmetDemand: "Extreme (86%)",
    competitors: "Manual Brokers",
    keyPainPoints: ["Harmonized code classification errors", "Surprise demurrage fees", "Opaque port compliance cycles"],
  },
];

export function MarketAnalyzerWidget() {
  const [activeSector, setActiveSector] = useState(SECTORS[0]);

  return (
    <div className="w-full bg-[#060709] border border-white/10 p-5 overflow-hidden flex flex-col gap-4 text-xs font-mono select-none">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-white" />
          <span className="text-white font-semibold tracking-widest uppercase text-[10px]">
            MARKET ARBITRAGE SCANNER
          </span>
        </div>
        <span className="text-[9px] text-zinc-500 flex items-center gap-1 font-mono uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span> PIPELINE ACTIVE
        </span>
      </div>

      {/* Sector Switcher Tabs */}
      <div className="flex gap-1.5 p-1 bg-black/60 border border-white/10 overflow-x-auto">
        {SECTORS.map((sector) => (
          <button
            key={sector.id}
            onClick={() => setActiveSector(sector)}
            className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider whitespace-nowrap transition-all flex-1 text-center cursor-pointer ${
              activeSector.id === sector.id
                ? "bg-white text-black font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {sector.name}
          </button>
        ))}
      </div>

      {/* Dynamic Data Panel */}
      <motion.div
        key={activeSector.id}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-3"
      >
        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 border border-white/10 p-2.5">
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider">GAP RATING</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-white font-sans">{activeSector.gapScore}</span>
              <span className="text-[9px] text-zinc-500">/ 10</span>
            </div>
            <span className="text-[9px] text-zinc-300 font-sans mt-0.5 block font-medium">Profit Pool High</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5">
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider">DEMAND TRAJECTORY</span>
            <div className="text-base font-bold text-white font-sans mt-0.5">{activeSector.searchVolume}</div>
            <span className="text-[9px] text-zinc-300 font-sans mt-0.5 block flex items-center gap-0.5">
              Unmet: {activeSector.unmetDemand}
            </span>
          </div>

          <div className="bg-white/5 border border-white/10 p-2.5">
            <span className="text-[9px] text-zinc-500 uppercase tracking-wider">LANDSCAPE</span>
            <div className="text-sm font-semibold text-white font-sans mt-0.5 line-clamp-1">
              {activeSector.competitors}
            </div>
            <span className="text-[9px] text-zinc-400 font-sans mt-0.5 block">Niche Void</span>
          </div>
        </div>

        {/* Extracted Friction Signals */}
        <div className="bg-black/60 border border-white/10 p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-white/10 pb-2">
            <span className="flex items-center gap-1.5 text-white uppercase tracking-wider font-mono text-[9px]">
              <AlertCircle className="h-3 w-3 text-white" />
              IDENTIFIED FRICTION SIGNALS ({activeSector.keyPainPoints.length})
            </span>
            <span className="text-zinc-400 font-mono text-[9px] tracking-wider uppercase">POLARITY: {activeSector.sentiment}%</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {activeSector.keyPainPoints.map((pain, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300 font-sans font-light">
                <span className="text-zinc-500 font-mono mt-0.5 text-[9px]">0{idx + 1}.</span>
                <span>{pain}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
