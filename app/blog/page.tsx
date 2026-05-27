import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Tarotowy Portret',
  description: 'Artykuły o web development, agencjach cyfrowych i best practices.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Nasz Blog</h1>
          <p className="text-xl text-slate-400">
            Artykuły o web developmencie, agencjach cyfrowych i najlepszych praktykach.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Brak artykułów. Wróć później!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Featured Badge */}
                {post.metadata.featured && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                    ⭐ Wyróżnione
                  </span>
                )}

                {/* Category */}
                <span className="mb-2 text-sm font-medium text-blue-400">
                  {post.metadata.category}
                </span>

                {/* Title */}
                <h2 className="mb-3 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.metadata.title}
                </h2>

                {/* Description */}
                <p className="mb-4 flex-grow text-slate-400">
                  {post.metadata.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{new Date(post.metadata.date).toLocaleDateString('pl-PL')}</span>
                  <span>{post.metadata.author}</span>
                </div>

                {/* Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Czytaj więcej →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
