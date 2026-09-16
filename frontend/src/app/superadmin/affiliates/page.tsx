import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component for the affiliates page. Renders the interactive client component.
import SuperadminAffiliatesClient from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminAffiliatesClient />
    </Suspense>
  );
}
