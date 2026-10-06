// RESPONSIBILITY: Renders the manager_settings route boundary (ManagerSettingsPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerSettingsLoading from '@/app/frontend_manager/manager_settings/loading';
import ManagerSettingsMain from '@/app/frontend_manager/manager_settings/manager_settings_components/manager_settings_main/ManagerSettingsMain';
import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Settings | Manager | GymSmart' };

/** @description Route-level ManagerSettingsPage for the Manager frontend module. */
export default function ManagerSettingsPage() {
  return (
    <Suspense fallback={<ManagerSettingsLoading />}>
      <ManagerSettingsMain />
    </Suspense>
  );
}
