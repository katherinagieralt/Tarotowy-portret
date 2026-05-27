import Image from 'next/image';
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

  const imagePath = post.frontmatter.image as string || '/images/cover_bg.jpg';

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <article className="max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl border border-black/5 dark:border-white/5 p-8 shadow-xl">
        <header className="mb-12 pb-8 border-b border-black/5 dark:border-slate-700 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            {String(post.frontmatter.title)}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 italic text-xl max-w-2xl mx-auto">
            {String(post.frontmatter.description)}
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="sticky top-24 relative aspect-[180/305] w-full rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 bg-slate-200 dark:bg-[#050308]">
              <Image 
                src={imagePath} 
                alt={String(post.frontmatter.title)}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/40 to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="w-full md:w-2/3 prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-h2:text-amber-600 dark:prose-h2:text-amber-400 prose-a:text-amber-600 dark:prose-a:text-amber-400">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </article>
    </main>
  );
}
