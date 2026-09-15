// RESPONSIBILITY: Pure Server Component entry point for /superadmin/cancellations.
import type { Metadata } from 'next';
import SuperadminCancellationsMain from '@/app/superadmin/cancellations/cancellations_components/SuperadminCancellationsMain/SuperadminCancellationsMain';

export const metadata: Metadata = {
  title: 'Cancellations Alerts | Superadmin | GymSmart',
  description: 'Monitor at-risk gyms and take proactive retention actions.',
};

export default function SuperadminCancellationsAlertsPage() {
  return <SuperadminCancellationsMain />;
}
