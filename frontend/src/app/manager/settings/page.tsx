// RESPONSIBILITY: Server Component entry point for /manager/settings. Rule 8 compliant — no .
import { Suspense } from 'react';
import ManagerSettingsLoading from '@/app/manager/settings/loading';
import ManagerSettingsMain from '@/app/manager/settings/settings_components/ManagerSettingsMain/ManagerSettingsMain';
import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Settings | Manager | GymSmart' };

export default function ManagerSettingsPage() {
  return (
    <Suspense fallback={<ManagerSettingsLoading />}>
      <ManagerSettingsMain />
    </Suspense>
  );
}
