import { Metadata } from 'next';
import HomePlClient from '@/components/HomePlClient';

export const metadata: Metadata = {
  title: 'Archeya Tarotowy Portret | Głęboka Analiza Psychologiczna',
  description: 'Odkryj swój prawdziwy potencjał dzięki spersonalizowanemu Portretowi Tarotowemu opartemu na psychologii Junga. Oblicz swoje archetypy i zrozum swoje przeznaczenie.',
  alternates: {
    canonical: '/pl',
    languages: {
      'en': '/',
      'pl': '/pl',
      'x-default': '/',
    },
  },
};

export default function HomePl() {
  return <HomePlClient />;
}
