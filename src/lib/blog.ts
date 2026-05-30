import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAllBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  
  try {
    const files = await fs.readdir(blogDir);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(blogDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const { data } = matter(content);
          
          return {
            slug: file.replace('.mdx', ''),
            frontmatter: data as Record<string, unknown>,
          };
        })
    );

    // Sort by date descending
    return posts.sort((a, b) => {
      const dateA = new Date((a.frontmatter.date as string) || 0).getTime();
      const dateB = new Date((b.frontmatter.date as string) || 0).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.warn('Blog directory not found, returning empty array');
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogDir, `${slug}.mdx`);

  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { data, content: mdxContent } = matter(content);

    return {
      slug,
      frontmatter: data as Record<string, unknown>,
      content: mdxContent,
    };
  } catch (error) {
    return null;
  }
}
