import { MetadataRoute } from 'next';
import { getAllArkanaPosts } from '@/lib/arkany';

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
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
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

  return [...staticPages, ...arkanyPages];
}
