import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the system page. Renders the interactive client component.
import SuperadminSystemClient from '@/app/superadmin/system/system_components/SuperadminSystemClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminSystemClient />
    </Suspense>);
}
