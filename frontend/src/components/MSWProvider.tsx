'use client';
// RESPONSIBILITY: Starts Mock Service Worker (MSW) in the browser during development/demo mode.
// DATA FLOW: layout.tsx → MSWProvider → worker.start() → intercepts fetch requests → returns mock data.
// MSW is only activated when NEXT_PUBLIC_DEMO_MODE=true or when in development and the backend is unavailable.
// This ensures all API routes return realistic mock data even when the backend is offline.

import { useEffect, useState } from 'react';

interface MSWProviderProps {
  children: React.ReactNode;
}

async function enableMocking() {
  // Only activate MSW in browser environments
  if (typeof window === 'undefined') return;

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDemoMode && !isDev) return;

  const { worker } = await import('@/mocks/browser');

  // Start the worker - onUnhandledRequest: 'bypass' means real requests pass through
  // if there's no matching handler, so real backend still works when online.
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    enableMocking()
      .then(() => setMswReady(true))
      .catch((err) => {
        // MSW failed to start (e.g., service workers not supported) — fall through to apiFetch's catch-based mock fallback
        console.warn('[MSW] Failed to start worker, will rely on apiFetch network-error fallback:', err);
        setMswReady(true);
      });
  }, []);

  // Don't render children until MSW is ready to intercept requests
  if (!mswReady) return null;

  return <>{children}</>;
}
