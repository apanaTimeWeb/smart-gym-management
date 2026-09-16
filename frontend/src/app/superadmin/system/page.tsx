import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the system page. Renders the interactive client component.
import SuperadminSystemClient from '@/app/superadmin/system/system_components/SuperadminSystemClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminSystemClient />
    </Suspense>
  );
}
