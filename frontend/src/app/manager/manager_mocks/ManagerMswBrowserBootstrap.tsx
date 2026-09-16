'use client';

// RESPONSIBILITY: Starts the Manager browser MSW worker before rendering Manager client data consumers.
// DATA FLOW: Manager layout → ManagerMswBrowserBootstrap → MSW worker → module API clients → TanStack Query → Manager UI

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { managerMswWorker } from '@/app/manager/manager_mocks/ManagerMswBrowser';
import { logger } from '@/lib/logger';

interface ManagerMswBrowserBootstrapProps {
  children: ReactNode;
}

export function ManagerMswBrowserBootstrap({ children }: ManagerMswBrowserBootstrapProps) {
  const [ready, setReady] = useState(typeof window === 'undefined');

  useEffect(() => {
    let active = true;

    const startWorker = async () => {
      if (process.env.NODE_ENV === 'production') {
        if (active) setReady(true);
        return;
      }

      await managerMswWorker.start({
        onUnhandledRequest(request) {
          const pathname = new URL(request.url).pathname;
          if (pathname.startsWith('/api/v1/manager/')) {
            logger.error('Unhandled Manager MSW request', { method: request.method, pathname, module: 'manager', route: pathname });
          }
        },
      });

      if (active) setReady(true);
    };

    void startWorker();

    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return <div className="min-h-screen bg-background" aria-hidden="true" />;
  }

  return children;
}
