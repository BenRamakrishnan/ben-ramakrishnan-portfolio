"use client";

import React from "react";

export function AtmosphericEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none">
      {/* 1. Base Dark Ground with Spatial Grid */}
      <div className="absolute inset-0 bg-[#07080B] spatial-grid opacity-70" />

      {/* 2. Architectural Coordinate Lines & Crosshairs */}
      <div className="absolute inset-0 opacity-25">
        {/* Horizontal hairline guide */}
        <div className="absolute top-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Subtle vertical hairline axis */}
        <div className="absolute top-0 bottom-0 left-[15%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="absolute top-0 bottom-0 right-[15%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
      </div>

      {/* 3. Deep Atmospheric Light Fields (JUUN.J Monochromatic Studio Lighting) */}
      {/* Top Hero Ambient Specular Glow (Subtle Platinum & Silver) */}
      <div 
        className="absolute -top-[15%] right-[5%] w-[850px] h-[650px] rounded-full blur-[140px] opacity-35 will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 80%)",
        }}
      />

      {/* Mid Page Atmospheric Bloom (Muted Atelier Light) */}
      <div 
        className="absolute top-[38%] -left-[10%] w-[900px] h-[750px] rounded-full blur-[160px] opacity-25 will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 60%, transparent 85%)",
        }}
      />

      {/* Lower Page Field Bloom (Studio Monograph Light) */}
      <div 
        className="absolute top-[72%] right-[10%] w-[800px] h-[700px] rounded-full blur-[150px] opacity-25 will-change-transform pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 80%)",
        }}
      />

      {/* 4. Film Texture / Noise Grain */}
      <div 
        className="absolute inset-0 opacity-[0.022] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
