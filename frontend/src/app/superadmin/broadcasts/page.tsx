import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the broadcasts page. Renders the interactive client component.
import SuperadminBroadcastsClient from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastsClient';
import SuperadminBroadcastsV1Client from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastsV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminBroadcastsClient />
      <SuperadminBroadcastsV1Client />
    </Suspense>);
}
