import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArkanaPosts } from '@/lib/arkany';
import { individualPositionMeanings, partnerPositionMeanings, ARCANA, ARCANA_DESCRIPTIONS, generatePositionSlug } from '@/lib/tarotCalculations';
import interpretationsData from '@/content/interpretations.json';
import CardMagnifier from '@/components/CardMagnifier';
import { ChevronRight, Sparkles, User, Users } from 'lucide-react';
import { CheckoutLink } from '@/components/CheckoutLink';

function toRoman(num: number): string {
  if (num === 0) return '0';
  const roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let str = '';
  let n = num;
  for (let i of Object.keys(roman)) {
    let q = Math.floor(n / roman[i as keyof typeof roman]);
    n -= q * roman[i as keyof typeof roman];
    str += i.repeat(q);
  }
  return str;
}

function getFirstSentence(text: string): string {
  if (!text) return "";
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0] : text;
}

const DUMMY_TEXT_1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut hendrerit metus. Pellentesque suscipit dignissim est id elementum. Maecenas tristique pretium elit vitae sagittis. Sed eu urna ullamcorper, imperdiet arcu volutpat, auctor mauris. Quisque dictum elit nec interdum efficitur. Mauris vitae libero quis sapien porttitor interdum in nec odio.";
const DUMMY_TEXT_2 = "Suspendisse potenti. Fusce nec ipsum purus. Vivamus consequat libero id orci vestibulum, sit amet tincidunt odio convallis. Nunc sed varius lacus. Integer imperdiet urna ac sem fringilla, et vulputate quam efficitur. Sed scelerisque erat ac lectus condimentum, sit amet consequat enim congue. Praesent non aliquet urna.";
const DUMMY_TEXT_3 = "Mauris efficitur, ligula nec pharetra auctor, sem sem tincidunt purus, et tincidunt mauris quam et lacus. Vestibulum tristique sapien in velit tempor, ac luctus velit varius. Sed sed ex nulla. Nullam feugiat nisi non felis eleifend elementum. Fusce bibendum efficitur fermentum. Curabitur blandit dui ut nisl gravida, ac semper metus dignissim.";

export async function generateStaticParams() {
  const posts = await getAllArkanaPosts();
  const params: { slug: string }[] = [];

  for (const post of posts) {
    for (const key of Object.keys(individualPositionMeanings)) {
      params.push({ slug: generatePositionSlug(post.slug, false, key) });
    }
    for (const key of Object.keys(partnerPositionMeanings)) {
      params.push({ slug: generatePositionSlug(post.slug, true, key) });
    }
  }

  return params;
}

import { ACTIVE_SEO_BATCH, getCombinationSeoBatch, isContentIndexable } from '@/config/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const match = resolvedParams.slug.match(/^(.*)-pozycja-(part-)?(?:p)?(\d+)(?:-.*)?$/);
  if (!match) return { title: 'Znaczenie - Archeya' };

  const [, cardSlug, isPartner, posNumber] = match;
  const posKey = `p${posNumber}`;
  const posts = await getAllArkanaPosts();
  const card = posts.find(p => p.slug === cardSlug);
  
  if (!card) return { title: 'Znaczenie - Archeya' };

  const position = !!isPartner ? partnerPositionMeanings[posKey] : individualPositionMeanings[posKey];
  if (!position) return { title: 'Znaczenie - Archeya' };

  const title = `${card.frontmatter.title} w pozycji ${posKey.replace('p', '')} (${position.title}) | Archeya`;
  const description = `Dowiedz się, co oznacza ${card.frontmatter.title} na pozycji ${posKey.replace('p', '')} (${position.title}) w Twoim Tarotowym Portrecie.`;

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
      canonical: `/pl/znaczenie/${resolvedParams.slug}`,
      languages: {
        'en': `/znaczenie/${generatePositionSlug(cardSlug, !!isPartner, posKey, true)}`,
        'pl': `/pl/znaczenie/${resolvedParams.slug}`,
        'x-default': `/znaczenie/${generatePositionSlug(cardSlug, !!isPartner, posKey, true)}`,
      }
    }
  };
}

export default async function MeaningPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const match = resolvedParams.slug.match(/^(.*)-pozycja-(part-)?(?:p)?(\d+)(?:-.*)?$/);
  
  if (!match) {
    notFound();
  }

  const [, cardSlug, isPartner, posNumber] = match;
  const posKey = `p${posNumber}`;
  const posts = await getAllArkanaPosts();
  const card = posts.find(p => p.slug === cardSlug);
  
  if (!card) {
    notFound();
  }

  const position = isPartner ? partnerPositionMeanings[posKey] : individualPositionMeanings[posKey];
  const typeLabel = isPartner ? "Portret Partnerski" : "Portret Indywidualny";
  
  if (!position) {
    notFound();
  }

  const imagePath = (card.frontmatter.image as string) || '/images/cover_bg.jpg';
  const posNum = posKey.replace('p', '');

  // Pobranie wygenerowanej esencji z JSON
  const typeKey = isPartner ? 'partner' : 'individual';
  const cardNumber = String(card.frontmatter.number || card.slug.split('-')[0]);
  const romanCardNumber = toRoman(parseInt(cardNumber, 10));
  const interpretations = interpretationsData as any;
  const interpretation = interpretations[typeKey]?.[posKey]?.[cardNumber];

  // Map all arcana for dynamic related cards
  const allArkana = await getAllArkanaPosts();
  const slugsMap: Record<number, string> = {};
  const titlesMap: Record<number, string> = {};
  allArkana.forEach(a => {
    const num = parseInt(String(a.frontmatter.number || a.slug.split('-')[0]), 10);
    slugsMap[num] = a.slug;
    titlesMap[num] = String(a.frontmatter.title);
  });

  // Generate 3 related combinations for exploration (fallback)
  const relatedCombinations = [];
  const cardIndex = posts.findIndex(p => p.slug === cardSlug);
  
  // 1. Same card, next position
  const allPosKeys = Object.keys(isPartner ? partnerPositionMeanings : individualPositionMeanings);
  const posIndex = allPosKeys.indexOf(posKey);
  const nextPosKey1 = allPosKeys[(posIndex + 1) % allPosKeys.length];
  const nextPosKey2 = allPosKeys[(posIndex + 2) % allPosKeys.length];
  
  // 2. Next card, same position
  const nextCardIndex = (cardIndex + 1) % posts.length;
  const nextCard = posts[nextCardIndex];

  relatedCombinations.push({
    card: card,
    positionKey: nextPosKey1,
    position: (isPartner ? partnerPositionMeanings : individualPositionMeanings)[nextPosKey1],
    isPartner
  });
  
  relatedCombinations.push({
    card: card,
    positionKey: nextPosKey2,
    position: (isPartner ? partnerPositionMeanings : individualPositionMeanings)[nextPosKey2],
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
                  name: 'Strona główna',
                  item: 'https://getarcheya.com/pl'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Wielkie Arkana',
                  item: 'https://getarcheya.com/pl/arkany'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: String(card.frontmatter.title),
                  item: `https://getarcheya.com/pl/arkana/${card.slug}`
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: `Pozycja ${posNum}`,
                  item: `https://getarcheya.com/pl/znaczenie/${resolvedParams.slug}`
                }
              ]
            })
          }}
        />

        {/* Breadcrumbs */}
        <nav className="mb-12 flex flex-wrap items-center text-sm font-medium text-slate-500 dark:text-slate-400 gap-2">
          <Link href="/pl" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Strona główna
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link href="/pl/arkany" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Wielkie Arkana
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <Link href={`/pl/arkana/${card.slug}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            {String(card.frontmatter.title)} {romanCardNumber}
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-amber-600 dark:text-amber-400">
            Pozycja {posNum} - {position.title}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="w-full md:w-1/3">
            <div className="sticky top-32 flex justify-center">
              <CardMagnifier src={imagePath} alt={String(card.frontmatter.title)} />
            </div>
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

            <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 border border-black/5 dark:border-white/5 shadow-lg">
              {interpretation ? (
                <div>
                  {/* W pełni widoczny Główny sens */}
                  <div className="mb-8">
                    <h3 className="text-xl font-serif text-amber-700 dark:text-amber-500 mb-3 font-bold">Główny sens</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light text-lg">
                      {interpretation.mainMeaning}
                    </p>
                  </div>

                  {/* Wzorzec psychologiczny - pierwsze zdanie widoczne, reszta zamazana jako losowy tekst */}
                  <div className="relative">
                    <h3 className="text-xl font-serif text-amber-700 dark:text-amber-500 mb-3 font-bold">Wzorzec psychologiczny</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light text-lg">
                      {getFirstSentence(interpretation.psychologicalPattern)}
                      {' '}
                      <span className="blur-[5px] opacity-40 select-none pointer-events-none">
                        {DUMMY_TEXT_1} {DUMMY_TEXT_2}
                      </span>
                    </p>
                  </div>
                  {/* Zamazane sekcje - teraz w tym samym boksie */}
                  <div className="flex flex-col space-y-12 mt-12 pt-12 border-t border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div>
                      <h3 className="text-xl font-serif text-amber-700 dark:text-amber-500 mb-4 font-bold">Potencjał i jasna strona</h3>
                      <div className="relative select-none pointer-events-none space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_1}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_2}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_3}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-serif text-amber-700 dark:text-amber-500 mb-4 font-bold">Cień i wyzwania</h3>
                      <div className="relative select-none pointer-events-none space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_3}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_1}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_2}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-serif text-amber-700 dark:text-amber-500 mb-4 font-bold">Pytania do refleksji</h3>
                      <div className="relative select-none pointer-events-none">
                        <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40 space-y-2">
                          <li>Czy Lorem ipsum dolor sit amet, consectetur adipiscing elit?</li>
                          <li>Jak Aliquam ut hendrerit metus pellentesque suscipit dignissim?</li>
                          <li>Gdzie Maecenas tristique pretium elit vitae sagittis eu urna?</li>
                          <li>Dlaczego Suspendisse potenti fusce nec ipsum purus vivamus consequat?</li>
                          <li>W jaki sposób Integer imperdiet urna ac sem fringilla et vulputate?</li>
                          <li>Kiedy Mauris efficitur ligula nec pharetra auctor sem tincidunt?</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-serif text-amber-700 dark:text-amber-500 mb-4 font-bold">Wskazówka rozwojowa</h3>
                      <div className="relative select-none pointer-events-none space-y-4">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_2}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-light blur-[6px] opacity-40">
                          {DUMMY_TEXT_1}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-600 dark:text-slate-400">Interpretacja jest w trakcie opracowywania.</p>
              )}
            </div>
          </div>
        </div>

        {/* Premium Call to Action for PDF (Full Width) */}
        <div className={`relative overflow-hidden rounded-3xl bg-white dark:bg-[#130F24] border shadow-xl dark:shadow-2xl ${isPartner ? 'border-purple-500/30' : 'border-amber-500/30'}`}>
          {/* Background glows */}
          <div className={`absolute top-[-50%] left-[-10%] w-[60%] h-[150%] blur-[100px] rounded-full pointer-events-none ${isPartner ? 'bg-purple-500/10' : 'bg-amber-500/10'}`} />
          <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] blur-[80px] rounded-full pointer-events-none ${isPartner ? 'bg-indigo-600/5 dark:bg-indigo-600/10' : 'bg-orange-600/5 dark:bg-orange-600/10'}`} />
          
          <div className="relative p-8 sm:p-16 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 ${isPartner ? 'bg-purple-500/10 border-purple-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
              {isPartner ? <Users className="w-8 h-8 text-purple-500" /> : <Sparkles className="w-8 h-8 text-amber-500" />}
            </div>
            
            <h3 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
              {isPartner ? (
                <>Odkryj Wasz Pełny <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-300 dark:to-purple-500">Portret Partnerski</span></>
              ) : (
                <>Odkryj Swój Pełny <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-200 dark:to-amber-500">Tarotowy Portret</span></>
              )}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 text-lg sm:text-xl font-light leading-relaxed">
              {isPartner 
                ? "To tylko ułamek wiedzy ukrytej w Waszych datach urodzenia. Zdobądź kompleksowy, spersonalizowany Raport PDF, który dogłębnie przeanalizuje dynamikę Waszej relacji, wspólne cele, trudności i karmiczny sens Waszego spotkania."
                : "To tylko ułamek wiedzy ukrytej w Twojej dacie urodzenia. Zdobądź kompleksowy, spersonalizowany Raport PDF, który dogłębnie przeanalizuje Twoją psychikę, karmiczne wyzwania, misję życiową i potencjały."}
            </p>
            
            <ul className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12 text-sm sm:text-base text-slate-700 dark:text-slate-400 font-medium dark:font-normal">
              <li className="flex items-center justify-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isPartner ? 'bg-purple-500' : 'bg-amber-500'}`} />
                {isPartner ? "Analiza dynamiki i wspólnych celów" : "Profesjonalna interpretacja 17 pozycji"}
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isPartner ? 'bg-purple-500' : 'bg-amber-500'}`} />
                {isPartner ? "Rozwiązywanie konfliktów i trudności" : "Zrozumienie własnych talentów i Cieni"}
              </li>
              <li className="flex items-center justify-center gap-3">
                <span className={`w-2 h-2 rounded-full ${isPartner ? 'bg-purple-500' : 'bg-amber-500'}`} />
                {isPartner ? "Wspólna lekcja i karmiczne zadanie" : "Karmiczny bagaż z poprzednich wcieleń"}
              </li>
            </ul>

            <CheckoutLink isPartner={!!isPartner} lang="pl">
              {isPartner ? "Oblicz Portret Partnerski" : "Oblicz Portret Indywidualny"}
            </CheckoutLink>
          </div>
        </div>

      </div>
    </main>
  );
}
