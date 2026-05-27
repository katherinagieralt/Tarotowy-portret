import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllArkanaPosts, getArkanaPostBySlug } from '@/lib/arkany';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getArkanaPostBySlug(resolvedParams.slug);

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

const mdxComponents = {
  h2: (props: any) => (
    <h2 
      className="text-2xl md:text-3xl font-serif text-amber-600 dark:text-amber-400 mt-12 mb-6 pb-3 border-b border-amber-500/20 flex items-center gap-3" 
      {...props} 
    >
      <span className="text-amber-500/50 text-xl">✦</span>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="text-xl md:text-2xl font-serif text-slate-800 dark:text-amber-200 mt-8 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6 font-light" {...props} />
  ),
  ul: (props: any) => (
    <ul className="space-y-4 mb-8 bg-black/5 dark:bg-black/20 p-6 rounded-xl border border-black/5 dark:border-white/5" {...props} />
  ),
  li: (props: any) => (
    <li className="flex gap-3 text-lg text-slate-700 dark:text-slate-300 font-light items-start">
      <span className="text-amber-500 mt-1.5 text-xs">◆</span>
      <span>{props.children}</span>
    </li>
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-slate-900 dark:text-white" {...props} />
  ),
  em: (props: any) => (
    <em className="italic text-slate-600 dark:text-slate-400" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-amber-500/50 pl-6 py-4 my-8 bg-gradient-to-r from-amber-500/10 to-transparent rounded-r-xl italic text-slate-700 dark:text-slate-300 text-xl font-serif" {...props} />
  )
};

export default async function ArkanaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getArkanaPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const imagePath = post.frontmatter.image as string || '/images/cover_bg.jpg';

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <article className="max-w-5xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-6 md:p-12 shadow-2xl">
        <header className="mb-16 pb-12 border-b border-black/5 dark:border-slate-800 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6 font-serif text-2xl border border-amber-500/20">
            {post.frontmatter.number !== undefined ? post.frontmatter.number : "✦"}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {String(post.frontmatter.title)}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
            {String(post.frontmatter.description)}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="sticky top-28 relative aspect-[180/305] w-full rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-slate-200 dark:bg-[#050308] group">
              <Image 
                src={imagePath} 
                alt={String(post.frontmatter.title)}
                fill
                className="object-contain p-2 md:p-3 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </main>
  );
}
