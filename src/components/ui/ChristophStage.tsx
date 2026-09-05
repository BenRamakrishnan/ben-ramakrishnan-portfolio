"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  Mail, 
  Camera, 
  Cpu, 
  Zap, 
  X,
  Compass
} from "lucide-react";
import { RouteVisualizer } from "./RouteVisualizer";
import { MarketAnalyzerWidget } from "./MarketAnalyzerWidget";

interface SectionData {
  id: string;
  index: number;
  kicker: string;
  shortLabel: string;
  title: string;
  image: string;
  alt: string;
}

const SECTIONS: SectionData[] = [
  {
    id: "intro",
    index: 0,
    kicker: "00 // ARRIVAL",
    shortLabel: "Intro",
    title: "Code. Logistics. Ventures. Athlete. Frames.",
    image: "/images/hero-mature-founder-2026.jpg",
    alt: "Ben Ramakrishnan — Mature Tech Founder & Systems Architect with Side Profile",
  },
  {
    id: "software",
    index: 1,
    kicker: "01 AI Systems & Vibe Coding",
    shortLabel: "AI & Systems",
    title: "Autonomous AI Systems & Rapid Prototyping",
    image: "/images/systems-cinematic.jpg",
    alt: "Ben Ramakrishnan — AI Systems Architecture",
  },
  {
    id: "logistics",
    index: 2,
    kicker: "02 Logistics & Quantitative Finance",
    shortLabel: "Logistics & Finance",
    title: "Supply Chain Economics & Financial Modeling",
    image: "/images/logistics-cinematic.jpg",
    alt: "Ben Ramakrishnan — Logistics & Quantitative Finance",
  },
  {
    id: "ventures",
    index: 3,
    kicker: "03 Venture Architecture & Ideation",
    shortLabel: "Venture Ideation",
    title: "Zero-to-One Product Ideation & Market Gap Discovery",
    image: "/images/ventures-cinematic.jpg",
    alt: "Ben Ramakrishnan — Venture Ideation & Founder Strategy",
  },
  {
    id: "athletics",
    index: 4,
    kicker: "04 Athletic Performance & Badminton",
    shortLabel: "Athletics",
    title: "Kinetic Precision, Reflexes & Court Discipline",
    image: "/images/athletics-action-nospecs.jpg",
    alt: "Ben Ramakrishnan — Competitive Badminton Athlete (No Glasses)",
  },
  {
    id: "photography",
    index: 5,
    kicker: "05 Creative Direction & Photography",
    shortLabel: "Photography",
    title: "Monochrome Storytelling & Visual Nuance",
    image: "/images/photography-cinematic.jpg",
    alt: "Ben Ramakrishnan — Fine-Art Photography & Creative Direction",
  },
  {
    id: "mensch",
    index: 6,
    kicker: "06 The Person Behind It",
    shortLabel: "The Person",
    title: "Curiosity, Pragmatism & Relentless Execution",
    image: "/images/about-cinematic.jpg",
    alt: "Ben Ramakrishnan — Founder & Systems Architect from Bengaluru",
  },
];

const HERO_WORDS = [
  { word: "Code.", label: "AI Systems & Vibe Coding", sectionIdx: 1 },
  { word: "Logistics.", label: "Supply Chain & Quantitative Finance", sectionIdx: 2 },
  { word: "Ventures.", label: "Founder Ideation & Market Gaps", sectionIdx: 3 },
  { word: "Athlete.", label: "Badminton & Athletic Discipline", sectionIdx: 4 },
  { word: "Frames.", label: "Creative Direction & Photography", sectionIdx: 5 },
];

export function ChristophStage() {
  const [activeSection, setActiveSection] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [imprintOpen, setImprintOpen] = useState(false);
  const [photoInfoOpen, setPhotoInfoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const wheelLockRef = useRef(false);
  const touchStartRef = useRef<number | null>(null);
  const navScrollRef = useRef<HTMLElement>(null);
  const navButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync horizontal pill nav scroll with active section
  useEffect(() => {
    if (activeSection === 0) {
      navScrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    } else if (navButtonRefs.current[activeSection]) {
      navButtonRefs.current[activeSection]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

  // Auto-cycle hero words when in section 0
  useEffect(() => {
    if (activeSection !== 0) return;
    const interval = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeSection]);

  const goToSection = useCallback((nextIndex: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, nextIndex));
    setActiveSection(clamped);
    setMobileMenuOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    if (activeSection === 0) {
      if (heroWordIndex < HERO_WORDS.length - 1) {
        setHeroWordIndex((prev) => prev + 1);
      } else {
        goToSection(1);
      }
    } else {
      goToSection(activeSection + 1);
    }
  }, [activeSection, heroWordIndex, goToSection]);

  const handlePrevious = useCallback(() => {
    if (activeSection === 0) {
      if (heroWordIndex > 0) {
        setHeroWordIndex((prev) => prev - 1);
      }
    } else {
      if (activeSection === 1) {
        setHeroWordIndex(HERO_WORDS.length - 1);
      }
      goToSection(activeSection - 1);
    }
  }, [activeSection, heroWordIndex, goToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (contactOpen || imprintOpen || photoInfoOpen) {
        if (e.key === "Escape") {
          setContactOpen(false);
          setImprintOpen(false);
          setPhotoInfoOpen(false);
        }
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrevious, contactOpen, imprintOpen, photoInfoOpen]);

  // Reset content panels to top when switching sections
  useEffect(() => {
    const scrollAreas = document.querySelectorAll(".content-scroll-area");
    scrollAreas.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [activeSection]);

  // Mouse wheel listener with zone segregation:
  // - Left side (cursor over content scroll area or left half of viewport):
  //   SCROLLS THE CONTENT ONLY (never switches sections)
  // - Right side (portrait / stage area) or Section 0:
  //   SWITCHES SECTIONS (down -> next, up -> previous)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (contactOpen || imprintOpen || photoInfoOpen || mobileMenuOpen) return;

      // In content sections (1 to 5), check if wheel occurred on the left side
      if (activeSection > 0) {
        const isOverContent = 
          (e.target as HTMLElement)?.closest(".content-scroll-area") !== null ||
          e.clientX < window.innerWidth * 0.52;

        if (isOverContent) {
          // Allow natural, uninterrupted scrolling of the left-side content
          return;
        }
      }

      // Scrolling on the right side or Section 0 triggers section navigation
      if (wheelLockRef.current || Math.abs(e.deltaY) < 20) return;

      wheelLockRef.current = true;
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 650);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleNext, handlePrevious, activeSection, contactOpen, imprintOpen, photoInfoOpen, mobileMenuOpen]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    // If touch starts inside the content panel in content sections, let it scroll naturally
    if (activeSection > 0 && (e.target as HTMLElement)?.closest(".content-scroll-area")) {
      touchStartRef.current = null;
      return;
    }
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
    touchStartRef.current = null;
  };

  const progressPercent = (activeSection / (SECTIONS.length - 1)) * 100;

  return (
    <div 
      className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden select-none bg-[#080808] text-[#f4f4f1]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. FIXED BACKGROUND STAGE WITH PORTRAIT CROSSFADE */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808]">
        {SECTIONS.map((sec, idx) => (
          <motion.div
            key={sec.id}
            initial={false}
            animate={{
              opacity: activeSection === idx ? 1 : 0,
              scale: activeSection === idx ? 1 : 1.025,
              x: activeSection === 0 ? "0%" : activeSection > 0 && idx > 0 ? "3%" : "0%",
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={sec.image}
              alt={sec.alt}
              fill
              priority={idx === 0}
              quality={90}
              className={`object-cover ${
                activeSection === 0 
                  ? "object-[center_26%] sm:object-[center_24%]" 
                  : activeSection === 4
                  ? "object-[center_35%] md:object-[68%_28%] lg:object-[62%_24%]"
                  : "object-[80%_20%] md:object-[72%_18%] lg:object-[65%_18%]"
              } filter grayscale contrast-[1.05] brightness-[0.72]`}
            />
          </motion.div>
        ))}

        {/* Studio Radial Spotlight Treatment */}
        <div className="absolute inset-0 z-10 pointer-events-none hero-spotlight" />

        {/* Content Shade on Left for readability when on sections 1-6 */}
        <motion.div
          animate={{ opacity: activeSection > 0 ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-10 pointer-events-none content-shade"
        />

        {/* Subtle Animated Film Grain */}
        <div className="film-grain" />
      </div>

      {/* 2. TOPBAR HEADER */}
      <header className="fixed top-[var(--safe-top)] left-[var(--safe-left)] right-[var(--safe-right)] z-40 flex items-center justify-between gap-2 sm:gap-4 pointer-events-none">
        
        {/* Left: Monogram Mark (BR) */}
        <button
          onClick={() => goToSection(0)}
          aria-label="Return to Start"
          className="pointer-events-auto shrink-0 w-[2.45rem] sm:w-[2.65rem] h-[2.45rem] sm:h-[2.65rem] rounded-full border border-white/18 bg-[#080808]/60 backdrop-blur-xl flex items-center justify-center text-white text-[0.72rem] font-bold tracking-[0.14em] hover:scale-105 active:scale-95 hover:border-white/45 transition-all cursor-pointer shadow-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        >
          BR
        </button>

        {/* Center: Floating Frosted Pill Nav (Wide & Scroll-Free on PC, Scrollable on Mobile) */}
        <nav 
          ref={navScrollRef}
          aria-label="Main Navigation" 
          className="site-nav pointer-events-auto flex-1 min-w-0 lg:flex-initial lg:w-auto lg:max-w-none mx-auto"
        >
          {SECTIONS.slice(1).map((sec, i) => {
            const sectionIdx = i + 1;
            const isActive = activeSection === sectionIdx;
            return (
              <button
                key={sec.id}
                ref={(el) => {
                  navButtonRefs.current[sectionIdx] = el;
                }}
                onClick={() => goToSection(sectionIdx)}
                className={`site-nav-item ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{sec.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Contact Button & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
          <button
            onClick={() => setContactOpen(true)}
            className="hidden md:inline-flex items-center justify-center min-h-[2.45rem] sm:min-h-[2.65rem] px-3.5 sm:px-[1.15rem] border border-white/18 rounded-full bg-[#080808]/60 backdrop-blur-xl text-white/90 text-[0.72rem] sm:text-[0.74rem] font-semibold tracking-wider hover:border-white/45 hover:text-white active:scale-95 transition-all cursor-pointer shadow-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          >
            Contact
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-[2.45rem] sm:w-[2.65rem] h-[2.45rem] sm:h-[2.65rem] rounded-full border border-white/20 bg-[#080808]/60 backdrop-blur-xl flex flex-col items-center justify-center gap-1 cursor-pointer text-white active:scale-95 transition-transform focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 xl:hidden"
          >
            <span className={`w-3.5 sm:w-4 h-[1.5px] bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`w-3.5 sm:w-4 h-[1.5px] bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-35 bg-[#080808]/96 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 pt-20 sm:pt-24 max-h-[100dvh] overflow-y-auto"
          >
            <div className="flex flex-col gap-3 sm:gap-4 text-base sm:text-lg tracking-tight">
              <button
                onClick={() => goToSection(0)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 0 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                00 // INTRO
              </button>
              <button
                onClick={() => goToSection(1)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 1 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                01 // AI & SYSTEMS ARCHITECTURE
              </button>
              <button
                onClick={() => goToSection(2)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 2 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                02 // LOGISTICS & QUANTITATIVE FINANCE
              </button>
              <button
                onClick={() => goToSection(3)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 3 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                03 // VENTURE ARCHITECTURE & IDEATION
              </button>
              <button
                onClick={() => goToSection(4)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 4 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                04 // ATHLETIC PERFORMANCE & BADMINTON
              </button>
              <button
                onClick={() => goToSection(5)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 5 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                05 // CREATIVE DIRECTION & PHOTOGRAPHY
              </button>
              <button
                onClick={() => goToSection(6)}
                className={`text-left font-display py-2 border-b border-white/10 ${activeSection === 6 ? "text-white font-bold" : "text-zinc-400 hover:text-white"}`}
              >
                06 // THE PERSON BEHIND IT
              </button>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-white/10">
              <button
                onClick={() => { setMobileMenuOpen(false); setContactOpen(true); }}
                className="w-full py-3.5 border border-white/20 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase active:scale-[0.98] transition-transform cursor-pointer"
              >
                Initiate Contact &rarr;
              </button>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); setImprintOpen(true); }}
                  className="hover:text-white underline-offset-2 hover:underline cursor-pointer"
                >
                  Imprint
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => { setMobileMenuOpen(false); setPhotoInfoOpen(true); }}
                  className="hover:text-white underline-offset-2 hover:underline cursor-pointer"
                >
                  Photo System
                </button>
                <span aria-hidden="true">·</span>
                <span className="text-white/70">Bengaluru, IN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN PANELS VIEWPORT */}
      <main className="relative z-20 w-full h-full">

        {/* PANEL 0: INTRO / HERO */}
        <div
          className={`absolute inset-0 flex flex-col justify-end items-center text-center pb-[clamp(4.85rem,9.5vh,6.85rem)] px-3 sm:px-6 transition-opacity duration-700 ${
            activeSection === 0 ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
          }`}
        >
          <div className="w-full max-w-[96vw] sm:max-w-[90vw] flex flex-col items-center">
            
            {/* Subline above hero word */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: activeSection === 0 ? 1 : 0, y: activeSection === 0 ? 0 : 15 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="intro-subline mb-2.5 sm:mb-4"
            >
              <strong>BEN RAMAKRISHNAN</strong>
              <span className="text-zinc-300 max-w-lg text-center px-2 sm:px-4 text-xs sm:text-sm font-light">
                AI systems architect, logistics strategist, founder & badminton athlete from Bengaluru
              </span>
            </motion.div>

            {/* Giant Anton Word Display - UNCLIPPED & FULL WIDTH */}
            <div className="w-full max-w-full flex items-center justify-center overflow-visible">
              <h2 className="hero-title w-full text-center relative overflow-visible py-1" aria-label="Discipline Showcase">
                <span className="block relative h-[1.28em] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroWordIndex}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-110%", opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 top-0 h-full flex items-center justify-center whitespace-nowrap text-white text-center"
                    >
                      {HERO_WORDS[heroWordIndex].word}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>
            </div>

            {/* Disciplines Indicator Pills with dynamic responsive styling */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 mt-3 sm:mt-5 text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
              {HERO_WORDS.map((item, wIdx) => (
                <button
                  key={item.word}
                  onClick={() => {
                    setHeroWordIndex(wIdx);
                  }}
                  onDoubleClick={() => goToSection(item.sectionIdx)}
                  className={`min-h-[32px] sm:min-h-[36px] px-2.5 sm:px-3.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                    heroWordIndex === wIdx 
                      ? "text-white font-bold bg-white/12 border-white/35 shadow-md" 
                      : "border-white/10 hover:border-white/20 hover:text-zinc-300 bg-black/30"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${heroWordIndex === wIdx ? "bg-white" : "bg-zinc-600"}`} />
                  <span>{item.word}</span>
                  <span className="hidden lg:inline text-[9px] text-zinc-400 font-sans tracking-normal opacity-80 pl-1 border-l border-white/10">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* PANEL 1: AI & SYSTEMS ARCHITECTURE */}
        <div
          className={`absolute inset-0 flex items-center justify-start pt-[calc(var(--safe-top)+3.75rem)] pb-[calc(var(--safe-bottom)+4.5rem)] px-3.5 sm:px-8 md:px-12 lg:px-20 transition-all duration-700 ${
            activeSection === 1 ? "opacity-100 pointer-events-auto visible translate-x-0" : "opacity-0 pointer-events-none invisible -translate-x-6"
          }`}
        >
          <div className="content-scroll-area relative w-full max-w-[44rem] max-h-full overflow-y-auto pr-2 sm:pr-4 md:pr-6 space-y-4 sm:space-y-6 overscroll-contain bg-[#080808]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none">
            <p className="section-kicker">
              <span>01</span> AI Systems & Vibe Coding
            </p>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans leading-[1.14]">
              Autonomous AI Systems & Rapid Prototyping
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-light">
              <p>
                Software velocity has entered an inflection point: high-leverage AI tooling, prompt synthesis, and &ldquo;vibe coding&rdquo; methodologies allow rapid ideation from zero to working prototype within hours rather than quarters.
              </p>
              <p>
                However, velocity without engineering discipline produces fragile technical debt. I combine rapid AI-assisted development with robust distributed architecture: type-safe contracts, isolated failure domains, Next.js 16, TypeScript, and Go/Rust microservices that scale under production load.
              </p>
            </div>

            {/* AI Architecture Telemetry Benchmark Pill */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md space-y-2.5 sm:space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="flex items-center gap-2 text-white font-semibold text-[11px] sm:text-xs">
                  <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                  AI & FULL-STACK ENGINE SPEC
                </span>
                <span className="text-emerald-400 text-[9px] sm:text-[10px]">PIPELINE: ACTIVE</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] sm:text-[11px] text-zinc-400">
                <div>PARADIGM: <span className="text-white">AI-ASSISTED</span></div>
                <div>FRAMEWORK: <span className="text-white">NEXT.JS 16</span></div>
                <div className="col-span-2 sm:col-span-1">LATENCY: <span className="text-white">P99 &lt; 28MS</span></div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => goToSection(2)}
                className="min-h-[38px] inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white border-b border-white pb-1 hover:border-zinc-400 transition-colors cursor-pointer uppercase active:scale-95"
              >
                Proceed to 02 // Logistics & Finance &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 2: LOGISTICS & QUANTITATIVE FINANCE */}
        <div
          className={`absolute inset-0 flex items-center justify-start pt-[calc(var(--safe-top)+3.75rem)] pb-[calc(var(--safe-bottom)+4.5rem)] px-3.5 sm:px-8 md:px-12 lg:px-20 transition-all duration-700 ${
            activeSection === 2 ? "opacity-100 pointer-events-auto visible translate-x-0" : "opacity-0 pointer-events-none invisible -translate-x-6"
          }`}
        >
          <div className="content-scroll-area relative w-full max-w-[44rem] max-h-full overflow-y-auto pr-2 sm:pr-4 md:pr-6 space-y-4 sm:space-y-6 overscroll-contain bg-[#080808]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none">
            <p className="section-kicker">
              <span>02</span> Logistics & Quantitative Finance
            </p>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans leading-[1.14]">
              Supply Chain Economics & Financial Modeling
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-light">
              <p>
                Holding a formal B.Com specializing in Logistics, Supply Chain Management, and Financial Accounting, I analyze enterprise operations through the dual lens of physical graph networks and working capital mechanics.
              </p>
              <p>
                From freight rate volatility and demurrage mitigation to automated inventory buffer algorithms, I build digital engines that protect gross margins and compress cash conversion cycles. Below is a live interactive Traveling Salesperson (TSP) route heuristic simulator:
              </p>
            </div>

            {/* Embedded Interactive Route Visualizer Console */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <RouteVisualizer />
            </div>

            <div className="pt-2">
              <button
                onClick={() => goToSection(3)}
                className="min-h-[38px] inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white border-b border-white pb-1 hover:border-zinc-400 transition-colors cursor-pointer uppercase active:scale-95"
              >
                Proceed to 03 // Venture Ideation &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 3: VENTURE ARCHITECTURE & IDEATION */}
        <div
          className={`absolute inset-0 flex items-center justify-start pt-[calc(var(--safe-top)+3.75rem)] pb-[calc(var(--safe-bottom)+4.5rem)] px-3.5 sm:px-8 md:px-12 lg:px-20 transition-all duration-700 ${
            activeSection === 3 ? "opacity-100 pointer-events-auto visible translate-x-0" : "opacity-0 pointer-events-none invisible -translate-x-6"
          }`}
        >
          <div className="content-scroll-area relative w-full max-w-[44rem] max-h-full overflow-y-auto pr-2 sm:pr-4 md:pr-6 space-y-4 sm:space-y-6 overscroll-contain bg-[#080808]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none">
            <p className="section-kicker">
              <span>03</span> Venture Architecture & Ideation
            </p>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans leading-[1.14]">
              Zero-to-One Product Ideation & Market Gap Discovery
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-light">
              <p>
                One of my primary core strengths is personal idea generation and identifying structural market asymmetries. Great founders don&apos;t build features; they locate broken unit economics and engineer compounding digital leverage.
              </p>
              <p>
                Before writing software, I systematically test commercial viability: analyzing customer acquisition loops, gross margin spreads, and competitive defensibility. Explore live sector arbitrage diagnostics below:
              </p>
            </div>

            {/* Embedded Interactive Market Analyzer Console */}
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <MarketAnalyzerWidget />
            </div>

            <div className="pt-2">
              <button
                onClick={() => goToSection(4)}
                className="min-h-[38px] inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white border-b border-white pb-1 hover:border-zinc-400 transition-colors cursor-pointer uppercase active:scale-95"
              >
                Proceed to 04 // Athletics &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 4: ATHLETIC PERFORMANCE & BADMINTON */}
        <div
          className={`absolute inset-0 flex items-center justify-start pt-[calc(var(--safe-top)+3.75rem)] pb-[calc(var(--safe-bottom)+4.5rem)] px-3.5 sm:px-8 md:px-12 lg:px-20 transition-all duration-700 ${
            activeSection === 4 ? "opacity-100 pointer-events-auto visible translate-x-0" : "opacity-0 pointer-events-none invisible -translate-x-6"
          }`}
        >
          <div className="content-scroll-area relative w-full max-w-[44rem] max-h-full overflow-y-auto pr-2 sm:pr-4 md:pr-6 space-y-4 sm:space-y-6 overscroll-contain bg-[#080808]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none">
            <p className="section-kicker">
              <span>04</span> Athletic Performance & Badminton
            </p>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans leading-[1.14]">
              Kinetic Precision, Reflexes & Court Discipline
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-light">
              <p>
                Badminton is the fastest racquet sport on earth—governed by steep trajectories, smash velocities exceeding 400 km/h, and split-second cognitive decisions executed under intense cardiovascular load.
              </p>
              <p>
                As a competitive badminton athlete, the court is where physical stamina conditions high-output mental stamina. Anticipating an opponent&apos;s deception, timing an explosive rear-court jump smash, and resetting with efficient footwork mirrors software engineering: acute spatial awareness, biomechanical economy, and zero wasted motion.
              </p>
            </div>

            {/* Kinetic Performance & Reaction Telemetry HUD */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md space-y-2.5 sm:space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="flex items-center gap-2 text-white font-semibold text-[11px] sm:text-xs">
                  <Zap className="w-3.5 h-3.5 text-zinc-400" />
                  ATHLETIC PERFORMANCE TELEMETRY
                </span>
                <span className="text-amber-400 text-[9px] sm:text-[10px]">SMASH VECTOR: 390+ KM/H</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] sm:text-[11px] text-zinc-400">
                <div>REACTION: <span className="text-white">&lt; 160MS</span></div>
                <div>AEROBIC: <span className="text-white">HIGH VO2 MAX</span></div>
                <div className="col-span-2 sm:col-span-1">MOVEMENT: <span className="text-white">EXPLOSIVE LUNGE</span></div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => goToSection(5)}
                className="min-h-[38px] inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white border-b border-white pb-1 hover:border-zinc-400 transition-colors cursor-pointer uppercase active:scale-95"
              >
                Proceed to 05 // Photography &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 5: CREATIVE DIRECTION & PHOTOGRAPHY */}
        <div
          className={`absolute inset-0 flex items-center justify-start pt-[calc(var(--safe-top)+3.75rem)] pb-[calc(var(--safe-bottom)+4.5rem)] px-3.5 sm:px-8 md:px-12 lg:px-20 transition-all duration-700 ${
            activeSection === 5 ? "opacity-100 pointer-events-auto visible translate-x-0" : "opacity-0 pointer-events-none invisible -translate-x-6"
          }`}
        >
          <div className="content-scroll-area relative w-full max-w-[44rem] max-h-full overflow-y-auto pr-2 sm:pr-4 md:pr-6 space-y-4 sm:space-y-6 overscroll-contain bg-[#080808]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none">
            <p className="section-kicker">
              <span>05</span> Creative Direction & Photography
            </p>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans leading-[1.14]">
              Monochrome Storytelling & Visual Nuance
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-light">
              <p>
                Beyond code and balance sheets, I explore fine-art monochrome photography as an essential creative pursuit. Viewing the world through high-contrast chiaroscuro lenses trains an acute sensitivity to light, spatial geometry, and human nuance.
              </p>
              <p>
                This photographic discipline directly impacts my digital craft: it ensures that software interfaces are never cluttered or generic, but composed with intentional hierarchy, balanced whitespace, and cinematic visual impact.
              </p>
            </div>

            {/* Photography Aesthetic Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
              <div className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md space-y-1">
                <span className="text-white font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <Camera className="w-3.5 h-3.5 text-zinc-400" />
                  CHIAROSCURO LIGHT
                </span>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 font-sans">
                  Deep shadows and crisp highlights that isolate core narrative form.
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md space-y-1">
                <span className="text-white font-semibold flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <Compass className="w-3.5 h-3.5 text-zinc-400" />
                  SPATIAL GEOMETRY
                </span>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 font-sans">
                  Architectural lines and street perspectives that command attention.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => goToSection(6)}
                className="min-h-[38px] inline-flex items-center gap-2 text-xs font-mono tracking-wider text-white border-b border-white pb-1 hover:border-zinc-400 transition-colors cursor-pointer uppercase active:scale-95"
              >
                Proceed to 06 // The Person Behind It &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 6: THE PERSON BEHIND IT */}
        <div
          className={`absolute inset-0 flex items-center justify-start pt-[calc(var(--safe-top)+3.75rem)] pb-[calc(var(--safe-bottom)+4.5rem)] px-3.5 sm:px-8 md:px-12 lg:px-20 transition-all duration-700 ${
            activeSection === 6 ? "opacity-100 pointer-events-auto visible translate-x-0" : "opacity-0 pointer-events-none invisible -translate-x-6"
          }`}
        >
          <div className="content-scroll-area relative w-full max-w-[44rem] max-h-full overflow-y-auto pr-2 sm:pr-4 md:pr-6 space-y-4 sm:space-y-6 overscroll-contain bg-[#080808]/80 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-2xl sm:shadow-none">
            <p className="section-kicker">
              <span>06</span> The Person Behind It
            </p>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-white font-sans leading-[1.14]">
              Curiosity, Pragmatism & Relentless Execution
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-300 font-light">
              <p>
                Based in Bengaluru—India&apos;s dynamic epicenter of technology and entrepreneurship—I operate at the convergence of logistics economics, AI systems, and venture building.
              </p>
              <p>
                My trajectory started with physical supply chain dynamics and expanded through autodidactic software engineering. I value honest discourse, high velocity, and enduring quality over hype.
              </p>
              <p>
                Direct, observant, and grounded with both feet on the ground. When designing solutions or launching ventures, I look for compound leverage that creates genuine lasting value.
              </p>
            </div>

            {/* Contact & Social CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => setContactOpen(true)}
                className="min-h-[42px] px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                Write to Ben &rarr;
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:text-white hover:border-white/40 active:scale-95 transition-all"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:text-white hover:border-white/40 active:scale-95 transition-all"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <button
                onClick={() => setPhotoInfoOpen(true)}
                className="min-h-[42px] px-3.5 py-2 rounded-full border border-white/15 bg-white/5 text-zinc-400 hover:text-white active:scale-95 text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-zinc-400" />
                <span>Photo System</span>
              </button>
            </div>

          </div>
        </div>

      </main>

      {/* 4. SECTION CONTROLS (BOTTOM RIGHT) */}
      <div 
        className="fixed z-40 right-[var(--safe-right)] bottom-[var(--safe-bottom)] flex items-center gap-3"
        aria-label="Section Navigation Controls"
      >
        <button
          onClick={handlePrevious}
          disabled={activeSection === 0 && heroWordIndex === 0}
          aria-label="Previous Section"
          className="circle-btn"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Progress Track */}
        <div className="section-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progressPercent / 100})` }} />
        </div>

        <button
          onClick={handleNext}
          disabled={activeSection === SECTIONS.length - 1}
          aria-label="Next Section"
          className="circle-btn"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. FOOTER & LEGAL LINKS (BOTTOM LEFT) - Hidden on mobile to avoid collision with navigation controls */}
      <footer 
        className="fixed z-40 left-[var(--safe-left)] bottom-[var(--safe-bottom)] hidden sm:flex items-center gap-2.5 text-[0.68rem] tracking-wider text-white/50 font-mono"
        aria-label="Site Info & Legal"
      >
        <span className="text-white/80 font-semibold">Bengaluru, IN</span>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => setImprintOpen(true)}
          className="hover:text-white underline-offset-2 hover:underline cursor-pointer"
        >
          Imprint
        </button>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => setPhotoInfoOpen(true)}
          className="hover:text-white underline-offset-2 hover:underline cursor-pointer"
        >
          Photo System
        </button>
      </footer>

      {/* MODAL: CONTACT */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
          >
            <div className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-[#0e0e11] border border-white/15 rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl text-white">
              <button
                onClick={() => setContactOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  COMMUNICATIONS DISPATCH
                </span>
                <h3 className="text-2xl font-bold font-sans">Contact Ben</h3>
                <p className="text-xs text-zinc-400">
                  Inquiries regarding AI engineering, logistics modeling, venture architecture, or creative visual projects.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <a
                  href="mailto:ben@benramakrishnan.dev"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all text-white group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    <span>ben@benramakrishnan.dev</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
                </a>

                <div className="p-3.5 rounded-xl border border-white/10 bg-black/50 space-y-1.5 text-zinc-400 text-[11px]">
                  <div className="text-white font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    CURRENT AVAILABILITY
                  </div>
                  <p>Open for high-impact AI architecture, advisory & founder venture collaboration.</p>
                </div>
              </div>

              <button
                onClick={() => setContactOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: PHOTO SYSTEM & CUSTOMIZATION INFO */}
      <AnimatePresence>
        {photoInfoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
          >
            <div className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-[#0e0e11] border border-white/15 rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-2xl text-white">
              <button
                onClick={() => setPhotoInfoOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-white" />
                  PHOTO ARCHITECTURE & DROP-IN SLOTS
                </span>
                <h3 className="text-xl font-bold font-sans">Cinematic Portrait System</h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed font-sans">
                <p>
                  In accordance with your request, the portfolio borrows the fine-art studio lighting, double-exposure aesthetics, and photography language of Christoph Nagel&apos;s site.
                </p>
                <p>
                  High-fidelity monochrome portraits were generated directly referencing your authentic portrait in <code className="text-white bg-white/10 px-1 py-0.5 rounded font-mono">public/ben-portrait.jpg</code> to provide cohesive visual continuity for each of your professional disciplines.
                </p>
                <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1.5 font-mono text-[11px]">
                  <div className="text-white font-semibold">Drop-in Replacement Paths:</div>
                  <ul className="text-zinc-400 space-y-1 list-disc list-inside">
                    <li>Hero: <code className="text-zinc-200">public/images/hero-mature-founder-2026.jpg</code></li>
                    <li>AI & Systems: <code className="text-zinc-200">public/images/systems-cinematic.jpg</code></li>
                    <li>Logistics & Finance: <code className="text-zinc-200">public/images/logistics-cinematic.jpg</code></li>
                    <li>Venture Ideation: <code className="text-zinc-200">public/images/ventures-cinematic.jpg</code></li>
                    <li>Athletics: <code className="text-zinc-200">public/images/athletics-cinematic.jpg</code></li>
                    <li>Photography: <code className="text-zinc-200">public/images/photography-cinematic.jpg</code></li>
                    <li>About: <code className="text-zinc-200">public/images/about-cinematic.jpg</code></li>
                  </ul>
                </div>
                <p className="text-zinc-400">
                  Whenever you take new photoshoot photos, simply save them under these filenames in <code className="text-white font-mono">public/images/</code> to update all panels seamlessly!
                </p>
              </div>

              <button
                onClick={() => setPhotoInfoOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: IMPRINT & LEGAL */}
      <AnimatePresence>
        {imprintOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4"
          >
            <div className="relative w-full max-w-md max-h-[90dvh] overflow-y-auto bg-[#0e0e11] border border-white/15 rounded-2xl p-5 sm:p-8 space-y-4 shadow-2xl text-white">
              <button
                onClick={() => setImprintOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-bold font-sans">Legal Information & Imprint</h3>
              
              <div className="space-y-2 text-xs text-zinc-300 leading-relaxed font-sans">
                <p className="font-semibold text-white">Ben Ramakrishnan</p>
                <p>AI Systems Architect, Logistics & Finance Strategist, Founder</p>
                <p>Bengaluru, Karnataka, India</p>
                <p className="pt-2 font-mono text-[11px] text-zinc-400">Contact: ben@benramakrishnan.dev</p>
                <p className="text-[11px] text-zinc-500 pt-2 border-t border-white/10">
                  Design language inspired by Christoph Nagel (christoph-nagel.dev). All portfolio content, software implementations, and credentials belong to Ben Ramakrishnan.
                </p>
              </div>

              <button
                onClick={() => setImprintOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
