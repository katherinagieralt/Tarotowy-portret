import { getAllArkanaPosts } from '@/lib/arkany';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Major Arcana | Archeya',
  description: 'Discover the 22 archetypes of the human soul.',
  alternates: {
    canonical: '/arkany',
    languages: {
      'en': '/arkany',
      'pl': '/pl/arkany',
      'x-default': '/arkany',
    },
  },
};


export default async function ArkanaiPageEn() {
  const posts = await getAllArkanaPosts('en');

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-20 px-4 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Major Arcana
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover the 22 archetypes of the human soul's journey. Click a card to dive into its meaning.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {posts.map((post) => {
              const imagePath = post.frontmatter.image as string || '/images/cover_bg.jpg';
              
              return (
                <Link key={post.slug} href={`/arkana/${post.slug}`}>
                  <div className="group bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl border border-black/5 dark:border-white/5 overflow-hidden hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-[180/305] w-full overflow-hidden bg-slate-200 dark:bg-[#050308]">
                      <Image 
                        src={imagePath} 
                        alt={String(post.frontmatter.title)}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/90 via-[#0A0710]/30 to-transparent opacity-80" />
                      
                      <div className="absolute bottom-0 left-0 w-full p-2 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500/90 text-white flex items-center justify-center font-serif font-bold text-xs sm:text-sm shadow-lg shrink-0">
                            {post.frontmatter.number !== undefined ? String(post.frontmatter.number) : '?'}
                          </div>
                          <h3 className="text-sm sm:text-lg font-serif font-bold text-white drop-shadow-md truncate">
                            {String(post.frontmatter.title)}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-5 flex-grow flex flex-col justify-between bg-white dark:bg-[#0f172a]">
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed italic line-clamp-3 sm:line-clamp-none">
                        "{String(post.frontmatter.description)}"
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              The Arcana are still being prepared. Come back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
