"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Cpu, Briefcase, Sparkles, Terminal, CheckCircle2, ArrowUpRight } from "lucide-react";

interface CapabilityCluster {
  id: string;
  name: string;
  categoryNumber: string;
  icon: React.ReactNode;
  summary: string;
  items: {
    name: string;
    level: string;
    spec: string;
    application: string;
  }[];
}

const CLUSTERS: CapabilityCluster[] = [
  {
    id: "software",
    name: "Full-Stack Software Engineering",
    categoryNumber: "01",
    icon: <Layers className="h-4 w-4 text-amber-400" />,
    summary: "Production-grade, type-safe web systems engineered with modern Next.js 16 and React 19.",
    items: [
      {
        name: "Next.js 16 & React 19",
        level: "Production Core",
        spec: "RSC Boundaries · Turbopack · Static & Edge Prerendering",
        application: "Powering modular SaaS dashboards and low-latency client leaves.",
      },
      {
        name: "TypeScript (Strict)",
        level: "Foundation",
        spec: "Zero-Any Policy · End-to-End Type Safety · Generics",
        application: "Deterministic business logic and safe API contracts across services.",
      },
      {
        name: "Tailwind CSS v4 & Motion",
        level: "Design Systems",
        spec: "Modern Tokens · Spring Kinematics · LayoutId Morphing",
        application: "High-craft micro-interactions with 0% CPU idle thread contention.",
      },
      {
        name: "Node.js & PostgreSQL",
        level: "Data Persistence",
        spec: "Relational Schema Normalization · Connection Pooling · REST/GraphQL",
        application: "Structured data storage for shipment manifests and user profiles.",
      },
      {
        name: "Redis & In-Memory State",
        level: "Caching Tier",
        spec: "Key-Value TTL Caching · Rate Limiting · Pub/Sub",
        application: "Sub-millisecond route calculation caching and scraping deduplication.",
      },
    ],
  },
  {
    id: "logistics",
    name: "Supply Chain & Unit Economics",
    categoryNumber: "02",
    icon: <Briefcase className="h-4 w-4 text-blue-400" />,
    summary: "Translating freight volatility, distribution friction, and inventory aging into software leverage.",
    items: [
      {
        name: "Route Optimization Heuristics",
        level: "Applied Math",
        spec: "Traveling Salesperson (TSP) Heuristics · Multi-Drop Clustering",
        application: "Cutting SMB delivery mileage by ~38% across congested urban nodes.",
      },
      {
        name: "Unit Economics & Margin Modeling",
        level: "Financial Analysis",
        spec: "Contribution Margin III · Cash Conversion Cycle · Demurrage Auditing",
        application: "Validating whether an operational bottleneck has sufficient profit pool.",
      },
      {
        name: "Dead-Stock & Aging Arbitrage",
        level: "Inventory Ops",
        spec: "FIFO/LIFO SKU Aging · Secondary Liquidation Channels",
        application: "Identifying commercial dead capital stuck in warehousing facilities.",
      },
      {
        name: "Cross-Border Tariffs & HS Classification",
        level: "Regulatory Ops",
        spec: "WCO Harmonized Tariff Schedules · Port Demurrage Risk Mitigation",
        application: "Automated classification to avoid surprise customs penalty holds.",
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Deterministic Pipelines",
    categoryNumber: "03",
    icon: <Sparkles className="h-4 w-4 text-emerald-400" />,
    summary: "Pragmatic LLM workflows and scraping pipelines designed for high-signal extraction, not novelty.",
    items: [
      {
        name: "Structured Output Extraction",
        level: "LLM Engineering",
        spec: "JSON Schema Enforcement · Vercel AI SDK · OpenAI Function Calling",
        application: "Extracting structured parameters from messy shipping invoices.",
      },
      {
        name: "Automated Web Scraping",
        level: "Data Ingestion",
        spec: "Puppeteer · Headless Chrome · Proxy Rotation · Rate Adaptation",
        application: "Scraping buyer complaints and freight price swings across forums.",
      },
      {
        name: "Venture Feasibility Radar",
        level: "Decision Engine",
        spec: "TAM Decomposition · Defensibility Index · Competitive Scrape",
        application: "Deterministic scoring before committing engineering resources.",
      },
    ],
  },
];

export function TactileArsenal() {
  const [activeClusterId, setActiveClusterId] = useState(CLUSTERS[0].id);
  const activeCluster = CLUSTERS.find((c) => c.id === activeClusterId) || CLUSTERS[0];

  return (
    <section id="arsenal" className="w-full py-28 border-t border-white/10 relative scroll-mt-20">
      <div className="container max-w-7xl px-4 md:px-8 mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-white font-semibold">03 // ATELIER</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-500">DISCIPLINES & CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight uppercase">
              The Operational Atelier.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans font-light">
              A curated inventory of architectural frameworks, mathematical routing models, and supply chain economic instruments.
            </p>
          </div>

          {/* Cluster Selector Tabs (JUUN.J Monochromatic Style) */}
          <div className="flex flex-wrap gap-2 select-none">
            {CLUSTERS.map((cluster) => (
              <button
                key={cluster.id}
                onClick={() => setActiveClusterId(cluster.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  activeCluster.id === cluster.id
                    ? "bg-white text-black font-bold shadow-md"
                    : "border border-white/15 text-zinc-400 hover:text-white hover:border-white/30 bg-white/5"
                }`}
                data-cursor="CLUSTER"
              >
                <span>{cluster.categoryNumber} // {cluster.name.split(" ")[0]}</span>
                <span className="text-[10px] font-mono opacity-60">({cluster.items.length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Workbench Shelf */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCluster.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Cluster Banner */}
            <div className="p-5 border border-white/15 bg-[#090A0E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3 text-white font-bold tracking-wider uppercase">
                <span className="h-2 w-2 bg-white" />
                <span>{activeCluster.name}</span>
              </div>
              <p className="text-zinc-400 font-sans text-xs max-w-xl font-light">
                {activeCluster.summary}
              </p>
            </div>

            {/* Item Rows / Lookbook Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCluster.items.map((item, idx) => (
                <div
                  key={idx}
                  className="lookbook-frame p-6 border border-white/10 space-y-4 group hover:border-white/30 transition-all bg-[#090A0E]"
                  data-cursor="INSPECT"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-white font-display tracking-tight uppercase group-hover:text-zinc-200 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mt-0.5">
                        {item.level}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 border border-white/10 text-[9px] font-mono text-zinc-400 tracking-wider uppercase shrink-0">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="p-3 border border-white/10 bg-black/60 font-mono text-[11px] text-zinc-300">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-widest block mb-1">SPECIFICATION</span>
                    {item.spec}
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    <strong className="text-zinc-200 font-medium uppercase text-[10px] font-mono mr-1">Context:</strong>
                    {item.application}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
