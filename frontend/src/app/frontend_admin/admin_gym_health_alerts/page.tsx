import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
// RESPONSIBILITY: Server Component entry point for the Gym Health Alerts page.
import AdminGymHealthAlertsMain from '@/app/frontend_admin/admin_gym_health_alerts/admin_gym_health_alerts_components/admin_gym_health_alerts_main/AdminGymHealthAlertsMain';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('gym-health-alerts.metadata');
  return { title: t('title'), description: t('description') };
}

/**
 * GymHealthAlertsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function GymHealthAlertsPage() {
  return (
      <AdminGymHealthAlertsMain />
  );
}
