import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminMessagingClient from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingClient';

export default function MessagingPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminMessagingClient />
    </Suspense>
  );
}
