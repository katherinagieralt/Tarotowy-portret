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
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20 px-4">
      <article className="max-w-3xl mx-auto bg-slate-900 rounded-lg border border-slate-700 p-8">
        <header className="mb-8 pb-8 border-b border-slate-700">
          <h1 className="text-4xl font-bold text-white mb-4">
            {String(post.frontmatter.title)}
          </h1>
          <p className="text-slate-400">{String(post.frontmatter.description)}</p>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
