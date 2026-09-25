// RESPONSIBILITY: Starts the Manager browser MSW worker before rendering Manager client data consumers.
'use client';

// DATA FLOW: Manager layout → ManagerMswBrowserBootstrap → MSW worker → module API clients → TanStack Query → Manager UI

import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { managerMswWorker } from '@/app/manager/manager_mocks/ManagerMswBrowser';
import type { ManagerMswBrowserBootstrapProps } from '@/app/manager/manager_mocks/manager_mocks_types/ManagerMswBrowserBootstrapTypes';


// In production there is no MSW — children render immediately.
// In development we gate rendering behind MSW startup so the first queries
// always fire AFTER the mock service worker is listening (no race condition).
const IS_PROD = ManagerEnvConfig.isProduction;

export function ManagerMswBrowserBootstrap({ children }: ManagerMswBrowserBootstrapProps) {
  const [ready, setReady] = useState(IS_PROD);

  // EFFECT: Starts MSW once after mount so initial Manager queries do not race worker registration.
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
            if (pathname.startsWith('/manager/')) {
              logger.error('Unhandled Manager MSW request', { method: request.method, pathname, module: 'manager', route: pathname });
            }
          } });
      } catch (error: unknown) {
        logger.warn('Manager MSW worker was already active; continuing with the existing worker.', { module: 'manager', error });
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

