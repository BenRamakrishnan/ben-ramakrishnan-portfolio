import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { meta } = getPostBySlug(slug);
    return {
      title: `${meta.title} — Ben Ramakrishnan`,
      description: meta.description,
    };
  } catch {
    return { title: "Field Note Not Found" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 pt-32 pb-24 space-y-12 relative z-10">
      <FadeIn delay={0.05} direction="right">
        <Button variant="ghost" className="gap-2 -ml-3 text-xs font-mono text-zinc-400 hover:text-amber-400" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Field Notes
          </Link>
        </Button>
      </FadeIn>

      <article className="space-y-8">
        <FadeIn delay={0.1}>
          <header className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">
                Field Note
              </span>
              <span>·</span>
              <time dateTime={post.meta.date}>
                {new Date(post.meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-display text-white">
              {post.meta.title}
            </h1>
            <p className="text-lg text-zinc-400 font-sans leading-relaxed">
              {post.meta.description}
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="prose prose-invert prose-amber prose-lg max-w-none text-zinc-300 font-sans">
            <MDXRemote source={post.content} />
          </div>
        </FadeIn>
      </article>
    </div>
  );
}
