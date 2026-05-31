'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import { useRef, useEffect } from 'react';

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

  // Zawsze przepuszczaj w trybie developerskim (omija problemy z localhost)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      onToken('dummy-token-for-development');
    }
  }, [onToken]);

  return (
    <div className="flex justify-center">
      {process.env.NODE_ENV !== 'development' && (
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          onSuccess={onToken}
          onError={onError}
          options={{
            theme: 'dark',
            size: 'normal',
            language: 'pl',
          }}
        />
      )}
    </div>
  );
}
