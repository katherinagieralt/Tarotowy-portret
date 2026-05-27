import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllArkanaPosts, getArkanaPostBySlug } from '@/lib/arkany';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getArkanaPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return {
    title: `${String(post.frontmatter.title)} - Tarotowy Portret`,
    description: String(post.frontmatter.description),
    openGraph: {
      title: String(post.frontmatter.title),
      description: String(post.frontmatter.description),
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllArkanaPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArkanaPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getArkanaPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <article className="max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-black/5 dark:border-white/5 p-8 shadow-xl">
        <header className="mb-8 pb-8 border-b border-black/5 dark:border-slate-700">
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            {String(post.frontmatter.title)}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 italic text-lg">
            {String(post.frontmatter.description)}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-amber-600 dark:prose-a:text-amber-400">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
