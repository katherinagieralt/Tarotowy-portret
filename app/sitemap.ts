import { MetadataRoute } from 'next';
import { getAllArkanaPosts } from '@/lib/arkany';
import { individualPositionMeanings, partnerPositionMeanings, generatePositionSlug } from '@/lib/tarotCalculations';
import { getCombinationSeoBatch, isContentIndexable } from '@/config/seo';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tarotowy-portret.pl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const arkanaPosts = await getAllArkanaPosts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/kalkulator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/arkany`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pozycje-portretu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  const arkanyPages: MetadataRoute.Sitemap = arkanaPosts.map((post) => ({
    url: `${baseUrl}/arkana/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const combinationsPages: MetadataRoute.Sitemap = [];

  for (const post of arkanaPosts) {
    // Individual Positions
    for (const key of Object.keys(individualPositionMeanings)) {
      const batch = getCombinationSeoBatch(false, key);
      if (isContentIndexable(batch)) {
        combinationsPages.push({
          url: `${baseUrl}/znaczenie/${generatePositionSlug(post.slug, false, key)}`,
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
        combinationsPages.push({
          url: `${baseUrl}/znaczenie/${generatePositionSlug(post.slug, true, key)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  }

  return [...staticPages, ...arkanyPages, ...combinationsPages];
}
