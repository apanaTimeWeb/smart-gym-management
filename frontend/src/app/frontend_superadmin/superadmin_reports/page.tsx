// RESPONSIBILITY: Renders the page component and its associated UI logic.
import { Suspense } from 'react';

import SuperadminPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
import SuperadminReportsMain from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsMain';


/**
 * @description Renders the page component and its associated UI logic.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function ReportsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminReportsMain />
    </Suspense>);
}
