import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import SuperadminMessagingClient from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingClient';

export default function MessagingPage() {
  return (
    <Suspense fallback={<div className="flex h-96 items-center justify-center"><Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" /></div>}>
      <SuperadminMessagingClient />
    </Suspense>
  );
}
