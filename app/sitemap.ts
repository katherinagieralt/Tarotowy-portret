import { MetadataRoute } from 'next';
import { getAllArkanaPosts } from '@/lib/arkany';
import { individualPositionMeanings, partnerPositionMeanings, generatePositionSlug } from '@/lib/tarotCalculations';
import { getCombinationSeoBatch, isContentIndexable } from '@/config/seo';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://getarcheya.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const arkanaPosts = await getAllArkanaPosts();

  const basePaths = [
    '',
    '/arkany',
    '/pozycje-portretu',
    '/kontakt'
  ];

  const staticPages: MetadataRoute.Sitemap = [];

  // English static pages
  basePaths.forEach((path) => {
    staticPages.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.8,
    });
  });

  // Polish static pages
  basePaths.forEach((path) => {
    staticPages.push({
      url: `${baseUrl}/pl${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 0.9 : 0.8,
    });
  });

  const arkanyPages: MetadataRoute.Sitemap = [];
  
  arkanaPosts.forEach((post) => {
    // English Arkana
    arkanyPages.push({
      url: `${baseUrl}/arkana/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
    // Polish Arkana
    arkanyPages.push({
      url: `${baseUrl}/pl/arkana/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  const combinationsPages: MetadataRoute.Sitemap = [];

  for (const post of arkanaPosts) {
    // Individual Positions
    for (const key of Object.keys(individualPositionMeanings)) {
      const batch = getCombinationSeoBatch(false, key);
      if (isContentIndexable(batch)) {
        // English
        combinationsPages.push({
          url: `${baseUrl}/znaczenie/${generatePositionSlug(post.slug, false, key, true)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
        // Polish
        combinationsPages.push({
          url: `${baseUrl}/pl/znaczenie/${generatePositionSlug(post.slug, false, key, false)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
    
    // Partner Positions
    for (const key of Object.keys(partnerPositionMeanings)) {
      const batch = getCombinationSeoBatch(true, key);
      if (isContentIndexable(batch)) {
        // English
        combinationsPages.push({
          url: `${baseUrl}/znaczenie/${generatePositionSlug(post.slug, true, key, true)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
        // Polish
        combinationsPages.push({
          url: `${baseUrl}/pl/znaczenie/${generatePositionSlug(post.slug, true, key, false)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  }

  return [...staticPages, ...arkanyPages, ...combinationsPages];
}
