// RESPONSIBILITY: Renders the page component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminUsageMetersClient from '@/app/superadmin/usage-meters/usage-meters_components/SuperadminUsageMetersClient';
export default function UsageMetersPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminUsageMetersClient />
    </Suspense>);
}
