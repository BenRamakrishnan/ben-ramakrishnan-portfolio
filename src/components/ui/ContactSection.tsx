"use client";

import { useState } from "react";
import { Mail, Copy, Check, Send, Sparkles, Terminal, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icons } from "@/components/ui/Icons";

const INTENTS = [
  "Venture Collaboration",
  "Product Engineering",
  "Logistics Advisory",
  "General Inquiry",
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState(INTENTS[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const email = "ben.ramakrishnan@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 800);
  };

  return (
    <section id="contact" className="w-full py-28 flex justify-center relative scroll-mt-20 border-t border-white/10 bg-[#060709]">
      <div className="container max-w-6xl px-4 md:px-8 space-y-16 relative z-10">
        
        <FadeIn>
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-white font-semibold">05 // INQUIRIES</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-500">DIRECT DISPATCH</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display text-white uppercase leading-[0.95]">
              Let&apos;s architect
              <br />
              <span className="font-editorial italic font-light text-zinc-200 capitalize text-5xl sm:text-6xl lg:text-7xl pr-3 inline-block">
                something
              </span>
              extraordinary.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans font-light">
              Whether you have an operational supply chain friction point, a venture thesis to validate, or require full-stack product architecture—inquiries are received directly.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Intent */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn delay={0.1}>
              <div className="lookbook-frame p-6 sm:p-8 space-y-6 border border-white/10 bg-[#090A0E]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Terminal className="h-3.5 w-3.5 text-white" />
                    <span className="tracking-widest uppercase text-[10px]">DIRECT ATELIER TRANSMISSION</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white tracking-tight uppercase">Direct Dispatch</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
                    Every message is evaluated directly. Typical response latency is under 24 hours for high-signal architectural proposals.
                  </p>
                </div>

                {/* Copy Email Pill */}
                <div className="p-3 border border-white/10 bg-black/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate">{email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all shrink-0 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-white" />
                        <span className="text-white">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social Connectors */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    VERIFIED CHANNELS
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 border border-white/10 bg-white/5 hover:border-white/30 flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                        <Icons.gitHub className="h-3.5 w-3.5" /> GITHUB
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 border border-white/10 bg-white/5 hover:border-white/30 flex items-center justify-between text-zinc-300 hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
                        <Icons.linkedin className="h-3.5 w-3.5" /> LINKEDIN
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                    </a>
                  </div>
                </div>

                {/* Location Status */}
                <div className="pt-2 text-[10px] font-mono text-zinc-400 flex items-center gap-2 border-t border-white/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="tracking-wider uppercase">ZONE: IST (UTC+5:30) · GLOBAL DISPATCH</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="lookbook-frame p-6 sm:p-8 border border-white/10 bg-[#090A0E] space-y-6">
                
                {/* Intent Selector */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                    INQUIRY CLASSIFICATION
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INTENTS.map((intent) => (
                      <button
                        key={intent}
                        type="button"
                        onClick={() => setSelectedIntent(intent)}
                        className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all border cursor-pointer ${
                          selectedIntent === intent
                            ? "bg-white text-black font-bold border-white"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        YOUR NAME
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Alex Rivera"
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white text-sm font-sans transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        WORK EMAIL
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="alex@enterprise.com"
                        className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white text-sm font-sans transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                      ARCHITECTURAL SCOPE & PROBLEM
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Detail the operational friction, unit margin problem, or system architecture you want to deconstruct..."
                      className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white text-sm font-sans transition-all resize-y"
                    />
                  </div>

                  {status === "sent" ? (
                    <div className="p-4 border border-white/30 bg-white/10 text-white text-xs font-mono flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-white" />
                      <span className="tracking-wide uppercase">TRANSMISSION RECEIVED. EXPECT A RESPONSE WITHIN 24 HOURS.</span>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-3.5 px-6 font-mono text-xs uppercase tracking-[0.2em] font-bold text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                    >
                      {status === "sending" ? (
                        <span>TRANSMITTING INQUIRY...</span>
                      ) : (
                        <>
                          <span>DISPATCH INQUIRY</span>
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </form>

              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}
