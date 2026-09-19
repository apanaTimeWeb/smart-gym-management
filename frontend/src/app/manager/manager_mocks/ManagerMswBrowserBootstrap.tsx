'use client';

// RESPONSIBILITY: Starts the Manager browser MSW worker before rendering Manager client data consumers.
// DATA FLOW: Manager layout → ManagerMswBrowserBootstrap → MSW worker → module API clients → TanStack Query → Manager UI

import type { ManagerMswBrowserBootstrapProps } from '@/app/manager/manager_mocks/manager_mocks_types/ManagerMswBrowserBootstrapTypes';
import { useEffect, useState } from 'react';
import { managerMswWorker } from '@/app/manager/manager_mocks/ManagerMswBrowser';
import { logger } from '@/lib/logger';

// In production there is no MSW — children render immediately.
// In development we gate rendering behind MSW startup so the first queries
// always fire AFTER the mock service worker is listening (no race condition).
const IS_PROD = process.env.NODE_ENV === 'production';

export function ManagerMswBrowserBootstrap({ children }: ManagerMswBrowserBootstrapProps) {
  const [ready, setReady] = useState(IS_PROD);

  useEffect(() => {
    let active = true;

    const startWorker = async () => {
      if (IS_PROD) {
        if (active) setReady(true);
        return;
      }

      try {
        await managerMswWorker.start({
          onUnhandledRequest(request) {
            const pathname = new URL(request.url).pathname;
            if (pathname.startsWith('/api/v1/manager/')) {
              logger.error('Unhandled Manager MSW request', { method: request.method, pathname, module: 'manager', route: pathname });
            }
          } });
      } catch {
        // Worker already started (e.g. hot-reload) — safe to ignore
      }

      if (active) setReady(true);
    };

    void startWorker();

    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return <div className="min-h-screen bg-page" aria-hidden="true" />;
  }

  return children;
}

