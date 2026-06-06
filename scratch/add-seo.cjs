const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'app/kontakt/page.tsx', route: '/kontakt' },
  { path: 'app/pozycje-portretu/page.tsx', route: '/pozycje-portretu' },
  { path: 'app/polityka-prywatnosci/page.tsx', route: '/polityka-prywatnosci' },
  { path: 'app/regulamin/page.tsx', route: '/regulamin' },
  { path: 'app/pl/kontakt/page.tsx', route: '/pl/kontakt' },
  { path: 'app/pl/pozycje-portretu/page.tsx', route: '/pl/pozycje-portretu' },
  { path: 'app/pl/polityka-prywatnosci/page.tsx', route: '/pl/polityka-prywatnosci' },
  { path: 'app/pl/regulamin/page.tsx', route: '/pl/regulamin' },
];

for (const page of pages) {
  const fullPath = path.join(__dirname, '..', page.path);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const baseRoute = page.route.replace('/pl', '');
    const enRoute = baseRoute === '' ? '/' : baseRoute;
    const plRoute = `/pl${baseRoute === '/' ? '' : baseRoute}`;
    
    const alternatesStr = `  alternates: {
    canonical: '${page.route}',
    languages: {
      'en': '${enRoute}',
      'pl': '${plRoute}',
      'x-default': '${enRoute}',
    },
  },`;

    if (!content.includes('alternates: {')) {
      content = content.replace(
        /export const metadata: Metadata = \{([\s\S]*?)\n\};/,
        `export const metadata: Metadata = {$1\n${alternatesStr}\n};`
      );
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${page.path}`);
    }
  }
}

// Add to arkany
const addArkanyMetadata = (isPl) => {
  const p = isPl ? 'app/pl/arkany/page.tsx' : 'app/arkany/page.tsx';
  const fullPath = path.join(__dirname, '..', p);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('export const metadata')) {
      const metadataStr = `\nimport { Metadata } from 'next';\n\nexport const metadata: Metadata = {
  title: '${isPl ? 'Wielkie Arkana | Archeya' : 'Major Arcana | Archeya'}',
  description: '${isPl ? 'Odkryj 22 archetypy ludzkiej duszy.' : 'Discover the 22 archetypes of the human soul.'}',
  alternates: {
    canonical: '${isPl ? '/pl/arkany' : '/arkany'}',
    languages: {
      'en': '/arkany',
      'pl': '/pl/arkany',
      'x-default': '/arkany',
    },
  },
};\n`;
      content = content.replace(/import Link from 'next\/link';\nimport Image from 'next\/image';/, `import Link from 'next/link';\nimport Image from 'next/image';${metadataStr}`);
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${p}`);
    }
  }
}
addArkanyMetadata(false);
addArkanyMetadata(true);

// Update dynamic route znaczenie
const updateZnaczenie = (isPl) => {
  const p = isPl ? 'app/pl/znaczenie/[slug]/page.tsx' : 'app/znaczenie/[slug]/page.tsx';
  const fullPath = path.join(__dirname, '..', p);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('alternates: {')) {
      const rep = isPl 
      ? `    robots: {
      index: indexable,
      follow: true,
    },
    alternates: {
      canonical: \`/pl/znaczenie/\${resolvedParams.slug}\`,
      languages: {
        'en': \`/znaczenie/\${generatePositionSlug(cardSlug, !!isPartner, posKey, true)}\`,
        'pl': \`/pl/znaczenie/\${resolvedParams.slug}\`,
        'x-default': \`/znaczenie/\${generatePositionSlug(cardSlug, !!isPartner, posKey, true)}\`,
      }
    }`
      : `    robots: {
      index: indexable,
      follow: true,
    },
    alternates: {
      canonical: \`/znaczenie/\${resolvedParams.slug}\`,
      languages: {
        'en': \`/znaczenie/\${resolvedParams.slug}\`,
        'pl': \`/pl/znaczenie/\${generatePositionSlug(cardSlug, !!isPartner, posKey, false)}\`,
        'x-default': \`/znaczenie/\${resolvedParams.slug}\`,
      }
    }`;
      content = content.replace(/    robots: {\s*index: indexable,\s*follow: true,\s*}/, rep);
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${p}`);
    }
  }
}
updateZnaczenie(false);
updateZnaczenie(true);

// Update dynamic route arkana
const updateArkana = (isPl) => {
  const p = isPl ? 'app/pl/arkana/[slug]/page.tsx' : 'app/arkana/[slug]/page.tsx';
  const fullPath = path.join(__dirname, '..', p);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes("'en-US':") && content.includes("'pl-PL':")) {
      content = content.replace("'en-US':", "'en':").replace("'pl-PL':", "'pl':");
      const defaultStr = isPl 
        ? `\n        'x-default': \`/arkana/\${resolvedParams.slug}\`,` 
        : `\n        'x-default': \`/arkana/\${resolvedParams.slug}\`,`;
      
      content = content.replace(/('pl': `[^`]+`,)/, `$1${defaultStr}`);
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${p}`);
    }
  }
}
updateArkana(false);
updateArkana(true);

console.log('SEO update complete.');
