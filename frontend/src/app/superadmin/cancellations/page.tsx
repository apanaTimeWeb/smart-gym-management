import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Pure Server Component entry point for /superadmin/cancellations.
import type { Metadata } from 'next';
import SuperadminCancellationsClient from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsClient/SuperadminCancellationsClient';
export const metadata: Metadata = {
    title: 'Cancellations Alerts | Superadmin | GymSmart',
    description: 'Monitor at-risk gyms and take proactive retention actions.',
};
import SuperadminCancellationsV1Client from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsV1Client';
export default function SuperadminCancellationsAlertsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminCancellationsClient />
      <SuperadminCancellationsV1Client />
    </Suspense>);
}
