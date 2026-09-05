"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Briefcase, Cpu } from "lucide-react";

export type PerspectiveMode = "business" | "engineering";

interface PerspectiveContextType {
  mode: PerspectiveMode;
  setMode: (mode: PerspectiveMode) => void;
  toggleMode: () => void;
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined);

export function PerspectiveProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PerspectiveMode>("business");

  const toggleMode = () => {
    setMode((prev) => (prev === "business" ? "engineering" : "business"));
  };

  return (
    <PerspectiveContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </PerspectiveContext.Provider>
  );
}

export function useSystemsPerspective() {
  const context = useContext(PerspectiveContext);
  if (!context) {
    throw new Error("useSystemsPerspective must be used within a PerspectiveProvider");
  }
  return context;
}

export function SystemsPerspectiveToggle({ className }: { className?: string }) {
  const { mode, setMode } = useSystemsPerspective();

  return (
    <div 
      className={`inline-flex items-center p-1 rounded-2xl bg-[#0B0D12] border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none ${className || ""}`}
      data-cursor="TOGGLE VIEW"
    >
      <button
        onClick={() => setMode("business")}
        className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
          mode === "business" ? "text-amber-300" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        {mode === "business" && (
          <motion.div
            layoutId="perspective-active-pill"
            className="absolute inset-0 rounded-xl bg-amber-500/15 border border-amber-500/40 -z-10 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Briefcase className="h-3.5 w-3.5" />
        <span className="tracking-wide">Business & Economics</span>
      </button>

      <div className="h-4 w-px bg-white/10 mx-1" />

      <button
        onClick={() => setMode("engineering")}
        className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
          mode === "engineering" ? "text-blue-300" : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        {mode === "engineering" && (
          <motion.div
            layoutId="perspective-active-pill"
            className="absolute inset-0 rounded-xl bg-blue-500/15 border border-blue-500/40 -z-10 shadow-[0_0_12px_rgba(59,130,246,0.2)]"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Cpu className="h-3.5 w-3.5" />
        <span className="tracking-wide">Systems Architecture</span>
      </button>
    </div>
  );
}
