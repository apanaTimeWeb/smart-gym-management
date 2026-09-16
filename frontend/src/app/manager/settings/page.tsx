import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /manager/settings. Rule 8 compliant — no .
import type { Metadata } from 'next';
import ManagerSettingsMain from '@/app/manager/settings/settings_components/ManagerSettingsMain/ManagerSettingsMain';

export const metadata: Metadata = { title: 'Settings | Manager | GymSmart' };

export default function ManagerSettingsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerSettingsMain />
    </Suspense>
  );
}
