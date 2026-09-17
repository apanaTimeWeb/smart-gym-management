import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component.
import SuperadminAnalyticsClient from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsClient';
import SuperadminAnalyticsV1Client from '@/app/superadmin/analytics/analytics_components/SuperadminAnalyticsV1Client';
export default function AnalyticsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminAnalyticsClient />
      <SuperadminAnalyticsV1Client />
    </Suspense>);
}
