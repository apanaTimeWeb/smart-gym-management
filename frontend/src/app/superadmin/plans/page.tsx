import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the plans page. Renders the interactive client component.
import SuperadminPlansClient from '@/app/superadmin/plans/plans_components/SuperadminPlansClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminPlansClient />
    </Suspense>
  );
}
