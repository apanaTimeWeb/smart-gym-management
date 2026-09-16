import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the tickets page. Renders the interactive client component.
import SuperadminTicketsClient from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminTicketsClient />
    </Suspense>
  );
}
