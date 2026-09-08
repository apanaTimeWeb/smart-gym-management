// RESPONSIBILITY: Pure Server Component entry point for /superadmin/churn-alerts.
import type { Metadata } from 'next';
import SuperadminChurnMain from '@/app/superadmin/churn-alerts/churn_components/SuperadminChurnMain/SuperadminChurnMain';

export const metadata: Metadata = {
  title: 'Churn Alerts | Superadmin | GymSmart',
  description: 'Monitor at-risk tenants and take proactive retention actions.',
};

export default function SuperadminChurnAlertsPage() {
  return <SuperadminChurnMain />;
}
