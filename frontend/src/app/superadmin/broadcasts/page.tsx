import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the broadcasts page. Renders the interactive client component.
import SuperadminBroadcastsClient from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminBroadcastsClient />
    </Suspense>
  );
}
