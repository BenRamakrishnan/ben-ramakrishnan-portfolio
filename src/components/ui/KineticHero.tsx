"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, Layers, Compass, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SystemsPerspectiveToggle, useSystemsPerspective } from "@/components/ui/SystemsPerspectiveToggle";

const FOCAL_TERMS = [
  "SUPPLY CHAIN FRICTION",
  "ALGORITHMIC DISPATCH",
  "MARKET GAP ARBITRAGE",
  "DETERMINISTIC SOFTWARE",
];

export function KineticHero() {
  const { mode } = useSystemsPerspective();
  const [focalIndex, setFocalIndex] = useState(0);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const termInterval = setInterval(() => {
      setFocalIndex((prev) => (prev + 1) % FOCAL_TERMS.length);
    }, 2800);
    return () => clearInterval(termInterval);
  }, []);

  return (
    <section id="home" className="w-full min-h-[96svh] pt-24 pb-16 flex flex-col justify-between relative scroll-mt-20">
      
      {/* 1. TOP TELEMETRY RIBBON */}
      <div className="container max-w-7xl px-4 md:px-8 mx-auto w-full pt-4 pb-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 select-none">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white font-semibold tracking-[0.2em] uppercase text-[10px]">
            BEN RAMAKRISHNAN // MONOGRAPH
          </span>
          <span className="hidden sm:inline text-zinc-700">/</span>
          <span className="hidden sm:inline text-zinc-400 text-[10px] tracking-wider">
            12.9716° N, 77.5946° E
          </span>
        </div>

        <div className="flex items-center gap-6 text-[10px] tracking-wider">
          <div className="hidden md:flex items-center gap-2 text-zinc-400">
            <span className="text-zinc-600">CHRONO:</span>
            <span className="text-white font-medium">{timeString || "12:00:00 IST"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-600">DISCIPLINE:</span>
            <span className="px-2 py-0.5 border border-white/15 text-white text-[9px] font-mono tracking-widest uppercase">
              ACTIVE ATELIER
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HERO STAGE */}
      <div className="container max-w-7xl px-4 md:px-8 mx-auto w-full my-auto py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: MASSIVE EDITORIAL TYPOGRAPHY & MANIFESTO */}
          <div className="lg:col-span-8 flex flex-col space-y-8 text-left">
            
            {/* High-Fashion Category Stamp */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 border border-white/15 text-white font-medium text-[10px] tracking-widest uppercase bg-white/5">
                FOLIO // 2026
              </span>
              <span className="text-zinc-400 text-[11px] tracking-wider uppercase">
                Supply Chain Economics × Systems Architecture
              </span>
            </div>

            {/* JUUN.J Inspired Architectural & Italic Serif Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-[5.4rem] font-bold tracking-tight text-white font-display leading-[0.93] uppercase">
                DECONSTRUCTING
                <br />
                <span className="font-editorial italic font-light tracking-tight text-zinc-200 capitalize text-5xl sm:text-7xl md:text-8xl xl:text-[6.2rem] pr-3 inline-block transform -translate-y-1">
                  operational
                </span>
                <span className="text-white">FRICTION</span>
                <br />
                <span className="text-white">INTO DIGITAL LEVERAGE.</span>
              </h1>

              {/* Minimalist Focal Term Ticker */}
              <div className="h-9 overflow-hidden flex items-center pt-2">
                <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.25em] mr-3">
                  SYSTEM CORE:
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={FOCAL_TERMS[focalIndex]}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="inline-flex items-center px-2.5 py-0.5 border border-white/20 text-white font-mono text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase bg-white/5"
                  >
                    {FOCAL_TERMS[focalIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Core Narrative / Manifesto */}
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-sans font-normal"
            >
              {mode === "business" ? (
                <>
                  <strong className="font-semibold text-white">B.Com in Logistics & Supply Chain.</strong> I deconstruct freight dispatch volatility, inventory aging cycles, and SMB unit margin leakages before architecting the deterministic software engines that recover lost capital.
                </>
              ) : (
                <>
                  <strong className="font-semibold text-white">Full-Stack Systems Architect.</strong> I engineer production-grade Next.js 16 architectures, heuristic routing solvers, and AI validation engines with uncompromising performance boundaries.
                </>
              )}
            </motion.p>

            {/* High-Fashion Actions */}
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="#projects"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-mono font-bold tracking-[0.15em] uppercase text-black bg-white hover:bg-zinc-200 transition-all shadow-md"
                    data-cursor="EXPLORE"
                  >
                    <span>EXPLORE ARCHIVE</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="#about"
                    className="inline-flex items-center px-6 py-3.5 text-xs font-mono font-medium tracking-[0.15em] uppercase text-zinc-300 hover:text-white border border-white/15 hover:border-white/40 transition-all bg-white/5"
                    data-cursor="VIEW"
                  >
                    THE NARRATIVE
                  </Link>
                </div>
              </div>

              {/* Perspective Dual Switcher Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-t border-white/5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
                  PERSPECTIVE LENS:
                </span>
                <SystemsPerspectiveToggle />
              </div>
            </div>

          </div>

          {/* RIGHT: THE ARCHITECTURAL LOOKBOOK PORTRAIT */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm">
              
              {/* Architectural Framing Crosshairs */}
              <div className="absolute -top-3 -left-3 text-zinc-700 font-mono text-xs select-none">+</div>
              <div className="absolute -top-3 -right-3 text-zinc-700 font-mono text-xs select-none">+</div>
              <div className="absolute -bottom-3 -left-3 text-zinc-700 font-mono text-xs select-none">+</div>
              <div className="absolute -bottom-3 -right-3 text-zinc-700 font-mono text-xs select-none">+</div>

              {/* Main Blueprint Specular Capsule */}
              <div 
                className="lookbook-frame p-4 relative overflow-hidden group shadow-2xl border border-white/15 bg-[#090A0E]"
                data-cursor="PORTRAIT"
              >
                {/* Top Blueprint Title */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-b border-white/10 pb-2.5 mb-3">
                  <span className="tracking-widest uppercase">PLATE 01 // ARCHIVE</span>
                  <span className="text-zinc-300 font-semibold tracking-wider">SPECIMEN</span>
                </div>

                {/* Portrait Frame */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-black border border-white/10">
                  <Image
                    src="/ben-portrait.jpg"
                    alt="Ben Ramakrishnan - Principal Systems Architect"
                    fill
                    priority
                    className="object-cover object-center grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  
                  {/* High-Fashion Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent opacity-85" />

                  {/* Corner Coordinates */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300 tracking-wider">
                    BEN_RAMAKRISHNAN.RAW
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono bg-black/85 backdrop-blur-md px-3 py-1.5 border border-white/10 text-zinc-200">
                    <span className="tracking-wider uppercase">PORTFOLIO EDITION</span>
                    <span className="text-white flex items-center gap-1 font-semibold">
                      <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                      AUTHENTICATED
                    </span>
                  </div>
                </div>

                {/* Telemetry Footnote */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] font-mono">
                  <div className="p-2 border border-white/10 bg-white/5">
                    <span className="text-zinc-500 block text-[9px] tracking-wider uppercase">THESIS</span>
                    <span className="text-white font-medium mt-0.5 block tracking-tight">Logistics × Code</span>
                  </div>
                  <div className="p-2 border border-white/10 bg-white/5">
                    <span className="text-zinc-500 block text-[9px] tracking-wider uppercase">VELOCITY</span>
                    <span className="text-white font-medium mt-0.5 block tracking-tight">Production Build</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM TICKER RIBBON */}
      <div className="container max-w-7xl px-4 md:px-8 mx-auto w-full pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs">
          <span className="text-zinc-600 uppercase tracking-widest">SELECTED WORKS:</span>
          <span className="text-white font-medium">01. Routing Engine</span>
          <span className="text-zinc-700">/</span>
          <span className="text-white font-medium">02. Market Gap Engine</span>
          <span className="text-zinc-700">/</span>
          <span className="text-white font-medium">03. Venture Validator</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-zinc-400 text-[10px] tracking-widest uppercase">
          <span>SCROLL TO DISCOVER ARCHIVE ↓</span>
        </div>
      </div>

    </section>
  );
}
