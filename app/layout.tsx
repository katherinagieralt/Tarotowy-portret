import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeWrapper } from '@/components/ThemeWrapper';
import { Navbar } from '@/components/Navbar';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Archeya — Tarotowy Portret',
  description: 'Twój osobisty przewodnik po świecie tarota. Zrozum siebie i odkryj swój potencjał dzięki głębokiej analizie.',
  robots: 'index, follow',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Archeya',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: 'Archeya — Tarotowy Portret',
    description: 'Twój osobisty przewodnik po świecie tarota. Zrozum siebie i odkryj swój potencjał dzięki głębokiej analizie.',
    type: 'website',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    images: [
      {
        url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/og?title=Tarot%20Projektowa&type=landing`,
        width: 1200,
        height: 630,
        alt: 'Archeya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archeya — Tarotowy Portret',
    description: 'Twój osobisty przewodnik po świecie tarota. Zrozum siebie i odkryj swój potencjał dzięki głębokiej analizie.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0710" />
        <meta name="msapplication-TileColor" content="#0a0710" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans bg-[#F9F6EE] text-[#2A241F] dark:bg-[#0A0710] dark:text-[#E8E4D9] antialiased transition-colors duration-500`}>
        <ThemeWrapper>
          <div className="relative pt-20">
            {/* Background gradient */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-[#FDFBF7] via-[#F9F6EE] to-[#E3DBCB] dark:from-[#0B0914] dark:via-[#0A0710] dark:to-[#050308] transition-colors duration-500" />

            <Navbar />

            {/* Content */}
            {children}

            {/* Toast notifications */}
            <Toaster
              position="top-right"
              richColors
              expand
              theme="system"
              duration={3000}
            />
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
