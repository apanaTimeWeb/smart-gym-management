import { Suspense } from 'react';
// RESPONSIBILITY: Pure Server Component entry point for /superadmin/cancellations.
import type { Metadata } from 'next';
import SuperadminCancellationsClient from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsClient/SuperadminCancellationsClient';

export const metadata: Metadata = {
  title: 'Cancellations Alerts | Superadmin | GymSmart',
  description: 'Monitor at-risk gyms and take proactive retention actions.',
};

export default function SuperadminCancellationsAlertsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminCancellationsClient />
    </Suspense>
  );
}
