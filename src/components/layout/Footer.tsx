import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { Icons } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#060709] py-16 relative z-10 text-xs font-mono">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-sm font-bold tracking-[0.2em] text-white font-display uppercase">
                BEN RAMAKRISHNAN
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest pl-1 border-l border-white/10">
                FOLIO SS/26
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed text-xs font-sans font-light">
              Deconstructing supply chain friction, unit margin volatility, and full-stack software architecture.
            </p>
          </div>

          {/* Center Status Hub */}
          <div className="flex items-center gap-2.5 px-4 py-2 border border-white/10 bg-white/5 text-[10px] text-zinc-400 tracking-widest uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>OPERATIONAL // ATELIER OPEN FOR PRODUCT COLLABORATION</span>
          </div>

          {/* Social Connectors */}
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <Icons.gitHub className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <Icons.linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X Profile"
              className="p-2.5 border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <Icons.twitter className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:ben.ramakrishnan@example.com"
              aria-label="Email Ben Ramakrishnan"
              className="p-2.5 border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500 tracking-widest uppercase font-mono">
          <div>
            © {new Date().getFullYear()} BEN RAMAKRISHNAN. ARCHIVAL MONOGRAPH EDITION.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#home" className="hover:text-white transition-colors">
              RETURN TO TOP ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

