import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kompendium Wiedzy - Tarotowy Portret',
  description: 'Zrozum mechanizmy psychiki, archetypy Wielkich Arkanów i dynamikę relacji dzięki głębokiej wiedzy na temat Tarotowego Portretu Psychologicznego.',
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  // Konfiguracja kategorii
  const categories = [
    {
      id: 'start',
      title: 'Od tego zacznij',
      slugs: [
        'czym-jest-tarotowy-portret-psychologiczny',
        'tarot-a-psychologia-archetypow',
        'jak-obliczyc-portret-psychologiczny'
      ],
      match: (slug: string) => false,
      featured: true,
      posts: [] as typeof posts
    },
    {
      id: 'relacje',
      title: 'Relacje i Związki',
      match: (slug: string) => slug.includes('partnerski') || slug.includes('zwiazk') || slug.includes('relacj'),
      featured: false,
      posts: [] as typeof posts
    },
    {
      id: 'rozwoj',
      title: 'Rozwój Osobisty i Cień',
      // Rozwój idzie przed pracą z portretem i pozycjami, żeby łapać te ogólnorozwojowe tematy najpierw
      match: (slug: string) => slug.includes('cien') && !slug.includes('archetyp') && !slug.includes('cesarz') && !slug.includes('diabel') || slug.includes('kompleksy') || slug.includes('kryzys') || slug.includes('temperament') || slug.includes('dzieck'),
      featured: false,
      posts: [] as typeof posts
    },
    {
      id: 'praca',
      title: 'Praca z Portretem',
      match: (slug: string) => slug.includes('pracowac-z-raportem') || slug.includes('schematy'),
      featured: false,
      posts: [] as typeof posts
    },
    {
      id: 'archetypy',
      title: 'Baza Archetypów',
      match: (slug: string) => slug.includes('-archetyp') || ['cesarz-cien-w-portrecie', 'smierc-transformacja-w-portrecie', 'diabel-cien-w-portrecie'].includes(slug),
      featured: false,
      posts: [] as typeof posts
    },
    {
      id: 'pozycje',
      title: 'Pozycje w Portrecie',
      match: (slug: string) => slug.startsWith('pozycja-'),
      featured: false,
      posts: [] as typeof posts
    },
    {
      id: 'pozostale',
      title: 'Inne wpisy',
      // Fallback - łapie wszystko to, co nie wpadło wyżej
      match: (slug: string) => true,
      featured: false,
      posts: [] as typeof posts
    }
  ];

  // Przypisywanie postów do kategorii
  posts.forEach(post => {
    let matched = false;
    // Najpierw sprawdzamy ścisłe dopasowania (slugs array)
    for (const cat of categories) {
      if (cat.slugs && cat.slugs.includes(post.slug)) {
        cat.posts.push(post);
        matched = true;
        break;
      }
    }
    // Jeśli nie złapało, sprawdzamy matche po słowach kluczowych
    if (!matched) {
      for (const cat of categories) {
        if (!cat.slugs && cat.match(post.slug)) {
          cat.posts.push(post);
          break;
        }
      }
    }
  });

  // Sortowanie encyklopedyczne dla czytelności
  categories.forEach(cat => {
    if (cat.id === 'archetypy') {
      cat.posts.sort((a, b) => {
        const titleA = String(a.frontmatter.title);
        const titleB = String(b.frontmatter.title);
        const numA = parseInt(titleA.match(/\((\d+)\)/)?.[1] || '99');
        const numB = parseInt(titleB.match(/\((\d+)\)/)?.[1] || '99');
        return numA - numB;
      });
    } else if (cat.id === 'pozycje') {
      cat.posts.sort((a, b) => {
        const numA = parseInt(a.slug.match(/pozycj[ae]-?(\d+)/)?.[1] || '99');
        const numB = parseInt(b.slug.match(/pozycj[ae]-?(\d+)/)?.[1] || '99');
        return numA - numB;
      });
    }
  });

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 dark:text-white mb-6">
            Kompendium <span className="text-amber-600 dark:text-amber-400">Wiedzy</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Odkryj tajemnice archetypów, zrozum swoje mechanizmy podświadome i zgłębiaj wiedzę o Tarotowym Portrecie.
          </p>
        </div>

        {categories.map((category) => {
          if (category.posts.length === 0) return null;

          if (category.featured) {
            return (
              <div key={category.id} className="mb-20">
                <h2 className="text-3xl font-serif text-slate-800 dark:text-slate-200 mb-8 border-b border-amber-500/30 pb-4 inline-block">
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {category.posts.map((post) => (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col bg-amber-500/5 dark:bg-amber-500/10 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/60 hover:bg-amber-500/10 dark:hover:bg-amber-500/20 transition-all duration-300 h-full"
                    >
                      <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {String(post.frontmatter.title)}
                      </h3>
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-light flex-grow">
                        {String(post.frontmatter.description)}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={category.id} className="mb-14">
              <h2 className="text-2xl font-serif text-slate-800 dark:text-slate-200 mb-6 border-b border-black/10 dark:border-white/10 pb-3 inline-block">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.posts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-xl p-6 border border-black/5 dark:border-white/5 hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                      {String(post.frontmatter.title)}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-light flex-grow">
                      {String(post.frontmatter.description)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        
      </div>
    </main>
  );
}
