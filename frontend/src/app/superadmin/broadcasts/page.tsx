// RESPONSIBILITY: Pure Server Component for the broadcasts page. Renders the interactive client component.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminBroadcastsClient from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastsClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBroadcastsClient />
    </Suspense>);
}
