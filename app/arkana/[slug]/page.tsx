import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllArkanaPosts, getArkanaPostBySlug } from '@/lib/arkany';
import { Metadata } from 'next';
import CardMagnifier from '@/components/CardMagnifier';

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

  const allPosts = await getAllArkanaPosts();
  const currentIndex = allPosts.findIndex(p => p.slug === resolvedParams.slug);
  
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : allPosts[allPosts.length - 1];
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : allPosts[0];

  const imagePath = post.frontmatter.image as string || '/images/cover_bg.jpg';

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Strona główna
          </Link>
          <span className="mx-3 text-slate-300 dark:text-slate-600">/</span>
          <Link href="/arkany" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Wielkie Arkana
          </Link>
          <span className="mx-3 text-slate-300 dark:text-slate-600">/</span>
          <span className="text-amber-600 dark:text-amber-400">{String(post.frontmatter.title)}</span>
        </nav>

        {/* Top Section: Split layout (Text Left, Image Right) */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-start mb-20">
          
          {/* Left: Text Content */}
          <div className="w-full md:w-3/5 flex flex-col pt-4 md:pt-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {String(post.frontmatter.title)}
            </h1>
            
            <p className="text-amber-600 dark:text-amber-400 text-lg md:text-xl font-medium tracking-wide mb-8 uppercase text-sm md:text-base">
              {String(post.frontmatter.description)}
            </p>

            <p className="text-slate-700 dark:text-slate-300 text-xl font-serif leading-relaxed italic border-l-2 border-amber-500/30 pl-6 py-1">
              {String(post.frontmatter.summary || "Ten archetyp czeka na swoje głębsze podsumowanie. Zwiastuje ważne procesy na poziomie psychicznym i duchowym.")}
            </p>
          </div>

          {/* Right: Big Card Image with Magnifier */}
          <div className="w-full sm:w-2/3 md:w-2/5 flex-shrink-0 flex justify-center md:justify-end z-10">
            <CardMagnifier src={imagePath} alt={String(post.frontmatter.title)} />
          </div>
        </div>

        {/* Bottom Section: MDX Content inside a delicate container */}
        <article className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-6 md:p-12 shadow-xl mb-16">
          <div className="max-w-4xl mx-auto">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {/* Next / Prev Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 border-t border-black/5 dark:border-white/5 pt-12">
          {prevPost && (
            <Link href={`/arkana/${prevPost.slug}`} className="group flex flex-col items-start bg-white/40 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/80 p-6 rounded-2xl border border-transparent hover:border-amber-500/30 transition-all duration-300">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Poprzednia karta
              </span>
              <span className="text-xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {String(prevPost.frontmatter.title)}
              </span>
            </Link>
          )}
          
          {nextPost && (
            <Link href={`/arkana/${nextPost.slug}`} className="group flex flex-col items-end text-right bg-white/40 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/80 p-6 rounded-2xl border border-transparent hover:border-amber-500/30 transition-all duration-300">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                Następna karta <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <span className="text-xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {String(nextPost.frontmatter.title)}
              </span>
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}
