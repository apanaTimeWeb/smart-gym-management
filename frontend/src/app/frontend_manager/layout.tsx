// RESPONSIBILITY: Renders the frontend_manager route boundary (MANAGERLayout) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { ManagerConfirmProvider } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerLayout from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_layout/ManagerLayout';
import ManagerRouteProgress from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_route_progress/ManagerRouteProgress';
import { ManagerQueryProvider } from '@/app/frontend_manager/manager_infrastructure/ManagerQueryProvider';
import { ManagerMswBrowserBootstrap } from '@/app/frontend_manager/manager_mocks/ManagerMswBrowserBootstrap';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
export const metadata = {
  title: 'GymSmart MANAGER | Gym Management System',
  description: 'Complete gym management platform — members, attendance, finance, HR, and more.',
};

/** @description Composes the Manager shell, approved providers, and the zero-business route progress indicator. */
export default function MANAGERLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ManagerRouteProgress />
      <ManagerMswBrowserBootstrap>
        <ManagerQueryProvider>
          <ManagerConfirmProvider>
            <ManagerLayout>{children}</ManagerLayout>
          </ManagerConfirmProvider>
        </ManagerQueryProvider>
      </ManagerMswBrowserBootstrap>
      <Toaster />
    </>
  );
}
