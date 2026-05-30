import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

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
  const posts = await getAllBlogPosts();
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const imagePath = post.frontmatter.image as string || '/images/cover_bg.jpg';

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="mb-12 flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 flex-wrap gap-y-2">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Strona główna
          </Link>
          <span className="mx-3 text-slate-300 dark:text-slate-600">/</span>
          <Link href="/blog" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Blog
          </Link>
          <span className="mx-3 text-slate-300 dark:text-slate-600">/</span>
          <span className="text-amber-600 dark:text-amber-400">{String(post.frontmatter.title)}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-amber-600 dark:text-amber-400 font-mono text-sm mb-4">
            {new Date(String(post.frontmatter.date)).toLocaleDateString('pl-PL')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {String(post.frontmatter.title)}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8">
            {String(post.frontmatter.description)}
          </p>
          
          <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
            <Image
              src={imagePath}
              alt={String(post.frontmatter.title)}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content */}
        <article className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 p-6 md:p-12 shadow-xl mb-16 prose-lg max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* CTA (od SEO Strategii) */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 dark:from-amber-500/20 dark:to-amber-900/20 border border-amber-500/30 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-4">
            Poznaj swój własny Tarotowy Portret
          </h3>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto font-light">
            Zrozum swoje archetypy, zintegruj Cień i obudź uśpiony potencjał. Skorzystaj z darmowego kalkulatora lub zamów pełny, psychologiczny raport PDF.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#kalkulator" 
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-amber-500/25"
            >
              Oblicz za darmo
            </Link>
            <Link 
              href="/#raport" 
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-full font-medium transition-all shadow-md"
            >
              Zamów Raport PDF
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
