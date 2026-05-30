import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tarotowy-portret.pl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/arkana/', '/arkany', '/znaczenie/', '/pozycje-portretu/', '/kalkulator', '/kontakt'],
        disallow: ['/api/', '/admin/', '/success', '/error'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
