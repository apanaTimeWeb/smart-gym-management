import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page component.
import SuperadminAnalyticsClient from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsClient';

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminAnalyticsClient />
    </Suspense>
  );
}
