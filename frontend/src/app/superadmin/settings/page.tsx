// RESPONSIBILITY: Pure Server Component for the settings page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminSettingsClient from '@/app/superadmin/settings/settings_components/SuperadminSettingsClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminSettingsClient />
    </Suspense>);
}
