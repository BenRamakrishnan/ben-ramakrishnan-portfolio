"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch, Cpu, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { useSystemsPerspective } from "@/components/ui/SystemsPerspectiveToggle";

interface ProjectCaseStudyProps {
  index: string;
  category: string;
  title: string;
  headline: string;
  businessContext: {
    problem: string;
    financialLeakage: string;
    leverageOutcome: string;
    roiMetric: string;
  };
  engineeringContext: {
    systemArchitecture: string;
    algorithmicApproach: string;
    technicalStack: string[];
    performanceMetric: string;
  };
  githubUrl?: string;
  demoUrl?: string;
  interactiveWidget: ReactNode;
  accentColor?: "amber" | "blue" | "emerald";
}

export function ProjectCaseStudy({
  index,
  category,
  title,
  headline,
  businessContext,
  engineeringContext,
  githubUrl = "#",
  demoUrl = "#",
  interactiveWidget,
  accentColor = "amber",
}: ProjectCaseStudyProps) {
  const { mode } = useSystemsPerspective();

  const accentClasses = {
    amber: {
      badge: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      indicator: "bg-amber-400",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    },
    blue: {
      badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      indicator: "bg-blue-400",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    },
    emerald: {
      badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      indicator: "bg-emerald-400",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    },
  }[accentColor];

  return (
    <article className="w-full py-20 border-t border-white/10 first:border-t-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: THE EDITORIAL CASE STUDY NARRATIVE (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Header Metadata */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 border border-white/20 text-white text-[10px] font-semibold tracking-widest uppercase bg-white/5">
              ARCHIVE // {index}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 uppercase tracking-widest text-[10px]">{category}</span>
          </div>

          {/* Title & Core Headline */}
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight uppercase leading-tight">
              {title}
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              {headline}
            </p>
          </div>

          {/* Perspective-Responsive Breakdown (Business vs Engineering) */}
          <AnimatePresence mode="wait">
            {mode === "business" ? (
              <motion.div
                key="business-mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 text-xs font-mono"
              >
                <div className="p-4 border border-white/10 bg-[#090A0E] space-y-1.5">
                  <span className="text-zinc-500 text-[9px] uppercase tracking-widest block flex items-center gap-1.5">
                    <Briefcase className="h-3 w-3 text-zinc-400" />
                    OPERATIONAL INEFFICIENCY
                  </span>
                  <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                    {businessContext.problem}
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-[#090A0E] space-y-1.5">
                  <span className="text-zinc-500 text-[9px] uppercase tracking-widest block">
                    FINANCIAL FRICTION
                  </span>
                  <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                    {businessContext.financialLeakage}
                  </p>
                </div>

                <div className="p-4 border border-white/20 bg-white/5 space-y-1.5">
                  <span className="text-white font-bold text-[9px] uppercase tracking-widest block flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                    CAPITAL RECLAIMED
                  </span>
                  <p className="text-zinc-100 font-sans text-xs font-semibold leading-relaxed">
                    {businessContext.roiMetric}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="engineering-mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 text-xs font-mono"
              >
                <div className="p-4 border border-white/10 bg-[#090A0E] space-y-1.5">
                  <span className="text-zinc-500 text-[9px] uppercase tracking-widest block flex items-center gap-1.5">
                    <Cpu className="h-3 w-3 text-zinc-400" />
                    SYSTEM ARCHITECTURE
                  </span>
                  <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                    {engineeringContext.systemArchitecture}
                  </p>
                </div>

                <div className="p-4 border border-white/10 bg-[#090A0E] space-y-1.5">
                  <span className="text-zinc-500 text-[9px] uppercase tracking-widest block">
                    ALGORITHMIC MODEL
                  </span>
                  <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                    {engineeringContext.algorithmicApproach}
                  </p>
                </div>

                <div className="p-4 border border-white/20 bg-white/5 space-y-1.5">
                  <span className="text-white font-bold text-[9px] uppercase tracking-widest block flex items-center gap-1.5">
                    <GitBranch className="h-3 w-3 text-white" />
                    RUNTIME BENCHMARK
                  </span>
                  <p className="text-zinc-100 font-sans text-xs font-semibold leading-relaxed">
                    {engineeringContext.performanceMetric}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech Spec Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {engineeringContext.technicalStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            {githubUrl && githubUrl !== "#" && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-widest uppercase border border-white/20 text-zinc-300 hover:text-white hover:border-white/40 transition-all bg-white/5"
                data-cursor="CODE"
              >
                <Icons.gitHub className="h-3.5 w-3.5" /> <span>INSPECT CODE</span>
              </Link>
            )}
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-widest uppercase font-bold text-black bg-white hover:bg-zinc-200 transition-all"
              data-cursor="DISPATCH"
            >
              <span>INQUIRE ARCHITECTURE</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>

        {/* RIGHT COLUMN: THE ELEVATED LOOKBOOK SPECIMEN CONSOLE (7 Cols) */}
        <div className="lg:col-span-7 w-full sticky top-24" data-cursor="INTERACT">
          <div className="lookbook-frame p-3 sm:p-5 bg-[#090A0E] border border-white/15 shadow-2xl">
            {/* Top Specimen Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-b border-white/10 pb-3 mb-4">
              <span className="tracking-widest uppercase text-zinc-400">CONSOLE // SPECIMEN {index}</span>
              <span className="text-white flex items-center gap-1.5 font-medium tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                INTERACTIVE PROTOTYPE
              </span>
            </div>

            <div className="bg-[#050608] border border-white/10 p-2 sm:p-3 overflow-hidden">
              {interactiveWidget}
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
