// https://nextjs.org/docs/app/api-reference/next-config-js
import withMDX from '@next/mdx';
import withPWA from '@ducanh2912/next-pwa';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/.onlook/**',
      ],
    };
    return config;
  },
};

// MDX Configuration - simplified to fix serialization issue
const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

// PWA Configuration
const withPWAConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // Cache strategies
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  // Asset caching
  dynamicStartUrl: '/',
  dynamicStartUrlRedirect: '/offline',
  // Manifest
  manifest: {
    name: 'Tarotowy Portret',
    short_name: 'Tarot',
    description: 'Agency Landing Page Boilerplate - Production Ready',
    start_url: '/',
    display: 'standalone',
    scope: '/',
    theme_color: '#0f172a',
    background_color: '#0f172a',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-1.png',
        sizes: '540x720',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshot-2.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  },
});

export default withPWAConfig(withMDXConfig(nextConfig));
