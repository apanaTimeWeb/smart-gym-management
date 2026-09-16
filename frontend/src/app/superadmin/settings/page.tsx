import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the settings page. Renders the interactive client component.
import SuperadminSettingsClient from '@/app/superadmin/settings/settings_components/SuperadminSettingsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminSettingsClient />
    </Suspense>
  );
}
