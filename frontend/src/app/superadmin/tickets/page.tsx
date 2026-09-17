import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the tickets page. Renders the interactive client component.
import SuperadminTicketsClient from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsClient';
import SuperadminTicketsV1Client from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsV1Client';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminTicketsClient />
      <SuperadminTicketsV1Client />
    </Suspense>);
}
