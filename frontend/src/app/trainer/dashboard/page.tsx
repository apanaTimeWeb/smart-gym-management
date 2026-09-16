import { Suspense } from 'react';
// RESPONSIBILITY: Server Component route entry for the Trainer dashboard; delegates all data access to the client Query layer.
import TrainerDashboardMain from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMain/TrainerDashboardMain';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerDashboardMain />
    </Suspense>
  );
}
