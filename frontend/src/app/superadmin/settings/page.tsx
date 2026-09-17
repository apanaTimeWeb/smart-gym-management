import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the settings page. Renders the interactive client component.
import SuperadminSettingsClient from '@/app/superadmin/settings/settings_components/SuperadminSettingsClient';
import SuperadminSettingsV1Client from '@/app/superadmin/settings/settings_components/SuperadminSettingsV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminSettingsClient />
      <SuperadminSettingsV1Client />
    </Suspense>);
}
