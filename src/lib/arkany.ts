import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getAllArkanaPosts() {
  const arkanasDir = path.join(process.cwd(), 'content/arkany');
  
  try {
    const files = await fs.readdir(arkanasDir);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(arkanasDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const { data } = matter(content);
          
          return {
            slug: file.replace('.mdx', ''),
            frontmatter: data as Record<string, unknown>,
          };
        })
    );

    return posts.sort((a, b) => {
      const numA = (a.frontmatter.number as number) || 0;
      const numB = (b.frontmatter.number as number) || 0;
      return numA - numB;
    });
  } catch (error) {
    console.warn('Arkany directory not found, returning empty array');
    return [];
  }
}

export async function getArkanaPostBySlug(slug: string) {
  const arkanasDir = path.join(process.cwd(), 'content/arkany');
  const filePath = path.join(arkanasDir, `${slug}.mdx`);

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
