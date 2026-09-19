import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminMessagingClient from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingClient';
export default function MessagingPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminMessagingClient />
    </Suspense>);
}
