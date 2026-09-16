import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the Gym Health Alerts page.
import AdminGymHealthAlertsMain from '@/app/admin/gym-health-alerts/gym_health_alerts_components/AdminGymHealthAlertsMain/AdminGymHealthAlertsMain';

export const metadata = { title: 'Gym Health Alerts — Admin | Smart Gym 360' };

export default function GymHealthAlertsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminGymHealthAlertsMain />
    </Suspense>
  );
}
