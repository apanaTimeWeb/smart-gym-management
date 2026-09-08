import { Suspense } from 'react';
import SuperadminMessagingClient from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingClient';

export default function MessagingPage() {
  return (
    <Suspense fallback={<div>Loading messaging module...</div>}>
      <SuperadminMessagingClient />
    </Suspense>
  );
}
