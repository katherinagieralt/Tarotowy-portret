import { Metadata } from 'next';
import HomeEnClient from '@/components/HomeEnClient';

export const metadata: Metadata = {
  title: 'Archeya Tarot Portrait | Deep Psychological Analysis',
  description: 'Discover your true potential through a personalized Tarot Portrait based on Jungian psychology. Calculate your archetypes and understand your destiny.',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'pl': '/pl',
      'x-default': '/',
    },
  },
};

export default function Home() {
  return <HomeEnClient />;
}
