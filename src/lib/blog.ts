import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostMetadata {
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
  slug?: string;
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  content: string;
  slug: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug,
        metadata: {
          ...(data as BlogPostMetadata),
          slug,
        },
        content,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.metadata.date).getTime();
      const dateB = new Date(b.metadata.date).getTime();
      return dateB - dateA;
    });
}

/**
 * Get single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    metadata: {
      ...(data as BlogPostMetadata),
      slug,
    },
    content,
  };
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts()
    .filter((post) => post.metadata.featured)
    .slice(0, limit);
}
