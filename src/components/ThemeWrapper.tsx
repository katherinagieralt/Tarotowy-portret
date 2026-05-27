'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeWrapperProps {
  children: ReactNode;
}

/**
 * Theme wrapper component
 * Provides dark/light mode support with system preference detection
 * Wraps children with next-themes ThemeProvider
 */
export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
