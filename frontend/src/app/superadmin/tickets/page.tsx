import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component for the tickets page. Renders the interactive client component.
import SuperadminTicketsClient from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsClient';
export default function Page() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminTicketsClient />
    </Suspense>);
}
