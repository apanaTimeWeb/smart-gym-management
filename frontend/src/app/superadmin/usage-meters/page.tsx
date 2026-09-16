import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page component.
import SuperadminUsageMetersClient from '@/app/superadmin/usage-meters/usage-meters_components/SuperadminUsageMetersClient';

export default function UsageMetersPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminUsageMetersClient />
    </Suspense>
  );
}
