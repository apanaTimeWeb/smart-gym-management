// RESPONSIBILITY: Renders the page component.
import { Suspense } from 'react';

import SuperadminAnalyticsMain from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_components/SuperadminAnalyticsMain';
import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';



/**
 * @description Renders the page component.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function AnalyticsPage() {
    return (<SuperadminLayoutRoleProviders><Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
      <SuperadminAnalyticsMain />
    </Suspense></SuperadminLayoutRoleProviders>);
}
