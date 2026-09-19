import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component.
import SuperadminAnalyticsClient from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsClient';
export default function AnalyticsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminAnalyticsClient />
    </Suspense>);
}
