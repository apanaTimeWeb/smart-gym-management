import { Suspense } from 'react';
// RESPONSIBILITY: Server Component route entry for the Trainer dashboard; delegates all data access to the client Query layer.
import TrainerDashboardMain from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardMain/TrainerDashboardMain';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerDashboardMain />
    </Suspense>
  );
}
