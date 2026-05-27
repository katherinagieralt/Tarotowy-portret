import { getAllArkanaPosts } from '@/lib/arkany';
import Link from 'next/link';

export default async function ArkanaiPage() {
  const posts = await getAllArkanaPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            ✦ 22 Arkany Wielkiej Arkany ✦
          </h1>
          <p className="text-xl text-slate-400">
            Poznaj znaczenie każdej karty i jej duchową interpretację
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/arkana/${post.slug}`}>
                <div className="bg-slate-900 rounded-lg border border-slate-700 p-6 hover:border-amber-500 transition cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center">
                      <span className="text-amber-500 font-bold text-lg">
                        {String(post.frontmatter.number) || '?'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {String(post.frontmatter.title)}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {String(post.frontmatter.description)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">
              Arkany są wciąż przygotowywane. Wróć wkrótce!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
