import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const metadata = {
  title: "Field Notes & Systems Thinking — Ben Ramakrishnan",
  description: "Writings on logistics economics, full-stack software architecture, and finding signal in fragmented markets.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto max-w-4xl px-4 pt-32 pb-24 space-y-16 relative z-10">
      <FadeIn>
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Overview
          </Link>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-white font-semibold">04 // JOURNAL</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-500">PUBLICATIONS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-white uppercase">
              Field Notes & Monographs
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl font-sans font-light">
              Essays on unit margin mechanics, supply chain architecture, and the convergence of commerce and deterministic code.
            </p>
          </div>
        </div>
      </FadeIn>

      <section className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-zinc-500 font-mono text-xs">No field notes published yet.</p>
        ) : (
          posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.1}>
              <div className="lookbook-frame p-8 border border-white/10 group hover:border-white/30 transition-all bg-[#090A0E]">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span className="px-2 py-0.5 border border-white/10 text-zinc-300 text-[10px] tracking-wider uppercase">
                    MONOGRAPH EDITION
                  </span>
                </div>
                <div className="group relative w-full mt-4">
                  <h2 className="text-2xl font-bold tracking-tight text-white font-display uppercase group-hover:text-zinc-200 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-zinc-400 text-sm leading-relaxed font-sans font-light">
                    {post.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-white group-hover:text-zinc-300 flex items-center gap-1.5 transition-colors uppercase tracking-wider">
                    Read Complete Note <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-zinc-500">5 min read</span>
                </div>
              </div>
            </FadeIn>
          ))
        )}
      </section>
    </div>
  );
}
