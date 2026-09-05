"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Gauge, Check, RefreshCw } from "lucide-react";

interface IdeaPreset {
  id: string;
  title: string;
  category: string;
  tam: number;
  moat: number;
  economics: number;
  timeToMVP: string;
  verdict: string;
  summary: string;
}

const PRESETS: IdeaPreset[] = [
  {
    id: "freight-quote",
    title: "AI Instant Freight Broker Quoting",
    category: "Logistics Tech",
    tam: 9.2,
    moat: 8.4,
    economics: 9.6,
    timeToMVP: "12 days",
    verdict: "A+ High Margin B2B",
    summary: "Replaces 4-hour manual freight broker email threads with instant deterministic pricing via LLM extraction and live rate APIs.",
  },
  {
    id: "inventory-optimizer",
    title: "Dead-Stock Arbitrage Engine for D2C",
    category: "Commerce Operations",
    tam: 8.6,
    moat: 7.9,
    economics: 9.1,
    timeToMVP: "16 days",
    verdict: "High Velocity SaaS",
    summary: "Scans Shopify SKUs with >90-day aging, automatically generates discounted bundle campaigns and liquidation distribution paths.",
  },
  {
    id: "customs-compliance",
    title: "Automated HS-Code Tariff Classifier",
    category: "Regulatory Tech",
    tam: 8.9,
    moat: 9.1,
    economics: 9.4,
    timeToMVP: "21 days",
    verdict: "Deep Defensibility Moat",
    summary: "Vision-based bill-of-lading scanner that cross-references WCO HS code changes to prevent 15%+ border tariff penalties.",
  },
];

export function IdeaValidatorWidget() {
  const [selected, setSelected] = useState(PRESETS[0]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSelect = (preset: IdeaPreset) => {
    if (preset.id === selected.id) return;
    setAnalyzing(true);
    setTimeout(() => {
      setSelected(preset);
      setAnalyzing(false);
    }, 250);
  };

  return (
    <div className="w-full bg-[#060709] border border-white/10 p-5 overflow-hidden flex flex-col gap-4 text-xs font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span className="text-white font-semibold tracking-widest uppercase text-[10px]">
            VENTURE FEASIBILITY ENGINE
          </span>
        </div>
        <span className="text-[9px] text-zinc-300 border border-white/15 px-2 py-0.5 uppercase tracking-wider font-mono">
          DETERMINISTIC EVALUATION
        </span>
      </div>

      {/* Selector Pills */}
      <div className="flex flex-col gap-2">
        <span className="text-[9px] text-zinc-500 uppercase tracking-widest">SELECT VENTURE THESIS:</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelect(preset)}
              className={`p-2.5 text-left transition-all border cursor-pointer ${
                selected.id === preset.id
                  ? "bg-white text-black border-white"
                  : "bg-black/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
              }`}
            >
              <div className={`text-[9px] uppercase tracking-wider font-mono ${selected.id === preset.id ? "text-zinc-700 font-bold" : "text-zinc-500"}`}>
                {preset.category}
              </div>
              <div className={`text-[11px] font-sans font-semibold line-clamp-1 mt-0.5 ${selected.id === preset.id ? "text-black" : "text-zinc-200"}`}>
                {preset.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scoring Display */}
      {analyzing ? (
        <div className="py-10 flex flex-col items-center justify-center gap-2 text-zinc-400">
          <RefreshCw className="h-4 w-4 animate-spin text-white" />
          <span className="text-[10px] uppercase font-mono tracking-widest">Evaluating unit economics & TAM...</span>
        </div>
      ) : (
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {/* Summary Box */}
          <div className="p-3.5 bg-black/60 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white font-sans uppercase tracking-tight">{selected.title}</span>
              <span className="px-2 py-0.5 border border-white/20 bg-white/10 text-white font-mono text-[9px] uppercase tracking-wider font-bold">
                {selected.verdict}
              </span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed font-light">
              {selected.summary}
            </p>
          </div>

          {/* Metric Ratings */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/5 border border-white/10 p-2.5 flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">MARKET TAM</span>
              <span className="text-sm font-bold text-white font-sans mt-0.5">{selected.tam}</span>
              <div className="w-full bg-white/10 h-1 mt-1.5 overflow-hidden">
                <div className="bg-white h-full" style={{ width: `${selected.tam * 10}%` }} />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-2.5 flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">DEFENSIBILITY</span>
              <span className="text-sm font-bold text-white font-sans mt-0.5">{selected.moat}</span>
              <div className="w-full bg-white/10 h-1 mt-1.5 overflow-hidden">
                <div className="bg-white h-full" style={{ width: `${selected.moat * 10}%` }} />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-2.5 flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">UNIT MARGIN</span>
              <span className="text-sm font-bold text-white font-sans mt-0.5">{selected.economics}</span>
              <div className="w-full bg-white/10 h-1 mt-1.5 overflow-hidden">
                <div className="bg-white h-full" style={{ width: `${selected.economics * 10}%` }} />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-2.5 flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider">TIME-TO-MVP</span>
              <span className="text-sm font-bold text-white font-sans mt-0.5">{selected.timeToMVP}</span>
              <span className="text-[9px] text-zinc-400 font-sans mt-1">High Velocity</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
