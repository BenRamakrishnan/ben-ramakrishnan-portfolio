"use client";

import React from "react";

export function InteractiveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Subtle architectural noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Atmospheric deep glow orbs (CSS-rendered, 0% CPU loop) */}
      <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-amber-500/[0.07] via-amber-500/[0.02] to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px] opacity-40" />
      <div className="absolute top-[70%] -right-[10%] w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[140px] opacity-30" />
    </div>
  );
}
