'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import { useRef } from 'react';

interface TurnstileTokenProps {
  onToken: (token: string) => void;
  onError?: () => void;
}

/**
 * Cloudflare Turnstile component
 * Provides bot protection for forms
 */
export function TurnstileToken({ onToken, onError }: TurnstileTokenProps) {
  const turnstileRef = useRef<any>(null);

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={turnstileRef}
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ''}
        onSuccess={onToken}
        onError={onError}
        options={{
          theme: 'dark',
          size: 'normal',
          language: 'pl',
        }}
      />
    </div>
  );
}
