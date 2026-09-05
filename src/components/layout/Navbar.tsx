"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowRight, Menu, X, Compass, Radio } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSystemsPerspective } from "@/components/ui/SystemsPerspectiveToggle";

const navItems = [
  { path: "home", label: "00 // ARRIVAL" },
  { path: "about", label: "01 // NARRATIVE" },
  { path: "projects", label: "02 // ARCHIVE" },
  { path: "arsenal", label: "03 // ATELIER" },
  { path: "blog", label: "04 // JOURNAL" },
  { path: "contact", label: "05 // INQUIRIES" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const activeSection = useActiveSection(navItems.map((item) => item.path));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { mode, toggleMode } = useSystemsPerspective();
  const { scrollYProgress } = useScroll();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${targetId}`);
      return;
    }
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1020px] select-none">
        <div className="relative bg-[#08090C]/90 border border-white/10 backdrop-blur-2xl px-4 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex items-center justify-between">
          
          {/* Real-time Scroll Progress Line along bottom rim */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-white origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Brand Mark: JUUN.J Minimalist Editorial Style */}
          <Link
            href="/#home"
            onClick={(e) => handleScroll(e, "home")}
            className="flex items-center gap-3 py-1 group"
            data-cursor="BEN.R"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
            <span className="font-display tracking-[0.18em] text-xs sm:text-sm font-bold text-white uppercase">
              BEN RAMAKRISHNAN
            </span>
            <span className="hidden md:inline text-[10px] font-mono text-zinc-500 tracking-widest pl-1 border-l border-white/10">
              SS/26
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                (pathname === "/" && activeSection === item.path) ||
                (pathname === "/" && activeSection === "" && item.path === "home");

              return (
                <Link
                  key={item.path}
                  href={`/#${item.path}`}
                  onClick={(e) => handleScroll(e, item.path)}
                  className={cn(
                    "relative px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider transition-colors",
                    isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                  )}
                  data-cursor="NAVIGATE"
                >
                  {isActive && (
                    <motion.div
                      layoutId="dock-active-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-white -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Perspective Mode Badge & Dispatch Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Perspective Quick Toggle Button */}
            <button
              onClick={toggleMode}
              className="px-2.5 py-1 text-[10px] font-mono border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer bg-white/5"
              title="Toggle Perspective Lens"
              data-cursor="PERSPECTIVE"
            >
              <Radio className="h-2.5 w-2.5 text-zinc-400" />
              <span className="uppercase text-[9px] tracking-widest font-medium">
                {mode === "business" ? "ECONOMICS" : "SYSTEMS"}
              </span>
            </button>

            {/* High-Fashion Monochromatic CTA */}
            <Link
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-mono tracking-wider uppercase font-semibold text-black bg-white hover:bg-zinc-200 transition-all"
              data-cursor="INQUIRE"
            >
              <span>INQUIRE</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-zinc-300 hover:text-white"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="lg:hidden mt-2 p-4 rounded-3xl bg-[#0A0C10]/95 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
            >
              {/* Mobile Perspective Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                <span className="text-zinc-400">PERSPECTIVE:</span>
                <button
                  onClick={toggleMode}
                  className="px-3 py-1 rounded-lg bg-white/10 border border-white/10 text-amber-300 font-semibold"
                >
                  {mode === "business" ? "Business / Unit Economics" : "Systems / Engineering"}
                </button>
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={`/#${item.path}`}
                  onClick={(e) => handleScroll(e, item.path)}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10">
                <Link
                  href="#contact"
                  onClick={(e) => handleScroll(e, "contact")}
                  className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-center text-black bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-2"
                >
                  <span>Dispatch Direct Transmission</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
