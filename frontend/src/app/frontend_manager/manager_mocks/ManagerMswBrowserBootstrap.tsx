// RESPONSIBILITY: Renders ManagerMswBrowserBootstrap's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { managerMswWorker } from '@/app/frontend_manager/manager_mocks/ManagerMswBrowser';
import type { ManagerMswBrowserBootstrapProps } from '@/app/frontend_manager/manager_mocks/manager_mocks_types/ManagerMswBrowserBootstrapTypes';


// In production there is no MSW — children render immediately.
// In development we gate rendering behind MSW startup so the first queries
// always fire AFTER the mock service worker is listening (no race condition).
/**
 * @description Renders/orchestrates the ManagerMswBrowserBootstrap user interface for the manager infrastructure module without owning sibling business logic.
 * @dependencies @/lib/logger; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_mocks/ManagerMswBrowser; @/app/frontend_manager/manager_mocks/manager_mocks_types/ManagerMswBrowserBootstrapTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const IS_PROD = ManagerEnvConfig.isProduction;

/** @description Renders the ManagerMswBrowserBootstrap component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves error state. */
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
            const managerApiPrefix = `${ManagerEnvConfig.apiBaseUrl.replace(/\/$/, '')}/manager/`;
            if (pathname.startsWith(managerApiPrefix)) {
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
