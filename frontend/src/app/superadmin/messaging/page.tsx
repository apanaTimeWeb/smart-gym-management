import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminMessagingClient from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingClient';
import SuperadminMessagingV1Client from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingV1Client';
export default function MessagingPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminMessagingClient />
      <SuperadminMessagingV1Client />
    </Suspense>);
}
