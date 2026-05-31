import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://getarcheya.com'),
  title: 'Archeya, Tarotowy Portret',
  description: 'Twój osobisty przewodnik po świecie tarota. Zrozum siebie i odkryj swój potencjał dzięki głębokiej analizie.',
  openGraph: {
    title: 'Archeya, Tarotowy Portret',
    description: 'Twój osobisty przewodnik po świecie tarota. Zrozum siebie i odkryj swój potencjał dzięki głębokiej analizie.',
  },
  twitter: {
    title: 'Archeya, Tarotowy Portret',
    description: 'Twój osobisty przewodnik po świecie tarota. Zrozum siebie i odkryj swój potencjał dzięki głębokiej analizie.',
  },
};

export default function PlLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
