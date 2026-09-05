"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable for desktop pointer devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for contextual cursor cues
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        setCursorLabel(cursorTarget.getAttribute("data-cursor"));
        setIsHovered(true);
      } else {
        const isClickable = target?.closest("a, button, input, select, textarea, [role='button']");
        setIsHovered(!!isClickable);
        setCursorLabel(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block select-none">
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-400 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Smooth Trailing Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-amber-400/40 pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 backdrop-blur-[0.5px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorLabel ? 80 : isHovered ? 40 : 26,
          height: cursorLabel ? 80 : isHovered ? 40 : 26,
          backgroundColor: cursorLabel
            ? "rgba(245, 158, 11, 0.12)"
            : isHovered
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0.02)",
          borderColor: cursorLabel ? "rgba(245, 158, 11, 0.6)" : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {cursorLabel && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-amber-300 uppercase select-none px-1 text-center">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
}
