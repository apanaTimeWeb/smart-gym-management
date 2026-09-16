import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Settings module entry point.
import AdminSettingsMain from '@/app/admin/settings/settings_components/AdminSettingsMain/AdminSettingsMain';

export default function SettingsPage() {
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminSettingsMain />
    </Suspense>
  );
}
