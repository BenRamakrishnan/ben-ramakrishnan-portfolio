import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'blog');

export type PostMetadata = {
  title: string;
  date: string;
  description: string;
  slug: string;
};

export function getPostBySlug(slug: string) {
  // Strip extension first
  const realSlug = slug.replace(/\.mdx$/, '');
  // Then sanitize to prevent path traversal
  const sanitizedSlug = realSlug.replace(/[^a-zA-Z0-9-_]/g, '');
  const fullPath = path.join(contentDir, `${sanitizedSlug}.mdx`);
  
  // Extra safety check: ensure the resolved path is still inside the contentDir
  if (!fullPath.startsWith(contentDir)) {
    throw new Error('Invalid slug path');
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  return {
    meta: { ...data, slug: realSlug } as PostMetadata,
    content,
  };
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const slugs = fs.readdirSync(contentDir);
  const posts = slugs
    .filter((slug) => slug.endsWith('.mdx'))
    .map((slug) => getPostBySlug(slug).meta)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
    
  return posts;
}
