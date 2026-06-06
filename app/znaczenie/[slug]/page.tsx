import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArkanaPosts } from '@/lib/arkany';
import { individualPositionMeaningsEn, partnerPositionMeaningsEn, ARCANA, ARCANA_DESCRIPTIONS, generatePositionSlug } from '@/lib/tarotCalculations';
import interpretationsDataEn from '@/content/interpretations-en.json';
import CardMagnifier from '@/components/CardMagnifier';
import { ChevronRight, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  const posts = await getAllArkanaPosts('en');
  const params: { slug: string }[] = [];

  for (const post of posts) {
    for (const key of Object.keys(individualPositionMeaningsEn)) {
      params.push({ slug: generatePositionSlug(post.slug, false, key, true) });
    }
    for (const key of Object.keys(partnerPositionMeaningsEn)) {
      params.push({ slug: generatePositionSlug(post.slug, true, key, true) });
    }
  }

  return params;
}

import { ACTIVE_SEO_BATCH, getCombinationSeoBatch, isContentIndexable } from '@/config/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const match = resolvedParams.slug.match(/^(.*)-position-(part-)?(?:p)?(\d+)(?:-.*)?$/);
  if (!match) return { title: 'Znaczenie - Archeya' };

  const [, cardSlug, isPartner, posNumber] = match;
  const posKey = `p${posNumber}`;
  const posts = await getAllArkanaPosts('en');
  const card = posts.find(p => p.slug === cardSlug);
  
  if (!card) return { title: 'Znaczenie - Archeya' };

  const position = !!isPartner ? partnerPositionMeaningsEn[posKey] : individualPositionMeaningsEn[posKey];
  if (!position) return { title: 'Meaning - Archeya' };

  const title = `${card.frontmatter.title} in position ${posKey.replace('p', '')} (${position.title}) | Archeya`;
  const description = `Learn what ${card.frontmatter.title} means in position ${posKey.replace('p', '')} (${position.title}) in your Tarot Portrait.`;

  const batch = getCombinationSeoBatch(!!isPartner, posKey);
  const indexable = isContentIndexable(batch);

  return { 
    title, 
    description,
    robots: {
      index: indexable,
      follow: true,
    },
    alternates: {
      canonical: `/znaczenie/${resolvedParams.slug}`,
      languages: {
        'en': `/znaczenie/${resolvedParams.slug}`,
        'pl': `/pl/znaczenie/${generatePositionSlug(cardSlug, !!isPartner, posKey, false)}`,
        'x-default': `/znaczenie/${resolvedParams.slug}`,
      }
    }
  };
}

export default async function MeaningPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const match = resolvedParams.slug.match(/^(.*)-position-(part-)?(?:p)?(\d+)(?:-.*)?$/);
  
  if (!match) {
    notFound();
  }

  const [, cardSlug, isPartner, posNumber] = match;
  const posKey = `p${posNumber}`;
  const posts = await getAllArkanaPosts('en');
  const card = posts.find(p => p.slug === cardSlug);
  
  if (!card) {
    notFound();
  }

  const position = isPartner ? partnerPositionMeaningsEn[posKey] : individualPositionMeaningsEn[posKey];
  const typeLabel = isPartner ? "Partnership Portrait" : "Individual Portrait";
  
  if (!position) {
    notFound();
  }

  const imagePath = (card.frontmatter.image as string) || '/images/cover_bg.jpg';
  const posNum = posKey.replace('p', '');

  // Pobranie wygenerowanej esencji z JSON
  const typeKey = isPartner ? 'partner' : 'individual';
  const cardNumber = String(card.frontmatter.number || card.slug.split('-')[0]);
  const interpretations = interpretationsDataEn as any;
  const essence = interpretations[typeKey]?.[posKey]?.[cardNumber]?.essence || null;

  // Generate 3 related combinations for exploration
  const relatedCombinations = [];
  const cardIndex = posts.findIndex(p => p.slug === cardSlug);
  
  // 1. Same card, next position
  const allPosKeys = Object.keys(isPartner ? partnerPositionMeaningsEn : individualPositionMeaningsEn);
  const posIndex = allPosKeys.indexOf(posKey);
  const nextPosKey1 = allPosKeys[(posIndex + 1) % allPosKeys.length];
  const nextPosKey2 = allPosKeys[(posIndex + 2) % allPosKeys.length];
  
  // 2. Next card, same position
  const nextCardIndex = (cardIndex + 1) % posts.length;
  const nextCard = posts[nextCardIndex];

  relatedCombinations.push({
    card: card,
    positionKey: nextPosKey1,
    position: (isPartner ? partnerPositionMeaningsEn : individualPositionMeaningsEn)[nextPosKey1],
    isPartner
  });
  
  relatedCombinations.push({
    card: card,
    positionKey: nextPosKey2,
    position: (isPartner ? partnerPositionMeaningsEn : individualPositionMeaningsEn)[nextPosKey2],
    isPartner
  });

  relatedCombinations.push({
    card: nextCard,
    positionKey: posKey,
    position: position,
    isPartner
  });

  return (
    <main className="min-h-screen bg-[#F9F6EE] dark:bg-[#0A0710] py-24 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://getarcheya.com'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Major Arcana',
                  item: 'https://getarcheya.com/arkany'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: String(card.frontmatter.title),
                  item: `https://getarcheya.com/arkana/${card.slug}`
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: `Position ${posNum}`,
                  item: `https://getarcheya.com/znaczenie/${resolvedParams.slug}`
                }
              ]
            })
          }}
        />

        {/* Breadcrumbs */}
        <nav className="mb-12 flex flex-wrap items-center text-sm font-medium text-slate-500 dark:text-slate-400 gap-2">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link href="/arkany" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Major Arcana
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link href={`/arkana/${card.slug}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            {String(card.frontmatter.title)}
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-amber-600 dark:text-amber-400">
            Position {posNum}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12 md:items-center mb-16">
          <div className="w-full md:w-1/3 flex justify-center">
            <CardMagnifier src={imagePath} alt={String(card.frontmatter.title)} />
          </div>

          <div className="w-full md:w-2/3">
            <span className="text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              {typeLabel}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-slate-900 dark:text-white mb-6 leading-tight">
              {String(card.frontmatter.title)}
            </h1>
            <h2 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-8">
              {position.title}
            </h2>

            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-black/5 dark:border-white/5 shadow-lg mb-8">
              {essence && (
                <div className="mb-4">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                    {essence}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 border-t border-black/5 dark:border-white/5 pt-8">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wide text-xs">Card Energy: {String(card.frontmatter.title)}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {String(card.frontmatter.description)}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wide text-xs">Position: {position.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {position.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore More Section */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white whitespace-nowrap">
              Explore More
            </h3>
            <div className="h-px bg-gradient-to-r from-amber-500/30 to-transparent flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCombinations.map((combo, idx) => (
              <Link
                key={idx}
                href={`/znaczenie/${generatePositionSlug(combo.card.slug, combo.isPartner, combo.positionKey, true)}`}
                className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-black/5 dark:border-white/5 p-6 rounded-2xl hover:bg-white/80 dark:hover:bg-slate-800/80 hover:border-amber-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="text-amber-600/70 dark:text-amber-400/70 text-xs font-bold uppercase tracking-wider">
                    {combo.isPartner ? "Partnership" : "Individual"}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30 transition-colors">
                    →
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {String(combo.card.frontmatter.title)}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    Position {combo.positionKey.replace('p', '')}: {combo.position.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Premium Call to Action for PDF (Full Width) */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#130F24] border border-amber-500/30 shadow-xl dark:shadow-2xl">
          {/* Background glows */}
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-orange-600/5 dark:bg-orange-600/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative p-8 sm:p-16 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-amber-500" />
            </div>
            
            <h3 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
              Discover Full <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-200 dark:to-amber-500">Tarot Portrait</span>
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 text-lg sm:text-xl font-light leading-relaxed">
              This is just a fraction of the knowledge hidden in your date of birth. Get a comprehensive, personalized e-book (approx. 50 pages) that deeply analyzes your psyche, talents, challenges, and relationships.
            </p>
            
            <ul className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12 text-sm sm:text-base text-slate-700 dark:text-slate-400 font-medium dark:font-normal">
              <li className="flex items-center justify-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Professional interpretation
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Practical tips
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Instant access
              </li>
            </ul>

            <a href="/" className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] dark:hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] hover:scale-[1.02]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-xl tracking-wide">Calculate your Portrait</span>
              <ChevronRight className="relative z-10 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
