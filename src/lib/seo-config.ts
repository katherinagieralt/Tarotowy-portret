import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  twitterHandle?: string;
  url?: string;
}

/**
 * Generate metadata for Next.js 16 with Open Graph and Twitter Cards support
 *
 * @param config - SEO configuration object
 * @returns Metadata object for use in page.tsx
 *
 * @example
 * export const metadata = generateMetadata({
 *   title: 'Landing Page',
 *   description: 'Your page description',
 *   ogImage: 'https://getarcheya.com/images/cover_bg.jpg',
 * });
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    ogImage = 'https://getarcheya.com/images/cover_bg.jpg',
    twitterHandle = '@getarcheya',
    url = process.env.NEXTAUTH_URL || 'https://getarcheya.com',
  } = config;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(url),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      type: 'website',
      locale: 'pl_PL',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: twitterHandle,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_CODE || '',
    },
  };
}

/**
 * Generate JSON-LD structured data for SEO
 *
 * @example
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: generateJsonLd({
 *     type: 'Organization',
 *     name: 'Your Company',
 *     url: 'https://example.com',
 *   })}}
 * />
 */
export function generateJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });
}

/**
 * Generate sitemap entry for SEO
 */
export function generateSitemapEntry(
  path: string,
  priority: number = 0.8,
  changefreq: 'never' | 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly' = 'weekly'
) {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return {
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: changefreq,
    priority,
  };
}
