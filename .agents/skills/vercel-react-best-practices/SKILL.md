---
name: vercel-react-best-practices
description: Performance optimization rules for React and Next.js applications from Vercel Labs. Focuses on eliminating waterfalls, Server Components boundaries, bundle size optimization, and client leaf isolation.
---

# Vercel React & Next.js Best Practices

1. **RSC & Client Leaf Isolation**: Keep client interactivity (`"use client"`) isolated at the leaf level. Server Components handle data fetching and layout assembly.
2. **Eliminate Waterfalls**: Parallelize asynchronous operations; avoid sequential data waterfalls.
3. **Optimized Assets**: Use `next/image` with explicit dimensions and priority for LCP assets; load fonts with `next/font`.
4. **Clean Dependencies**: Use lightweight packages, avoid layout thrashing, and minimize bundle footprint.
