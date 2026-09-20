// RESPONSIBILITY: Renders the page component and its associated UI logic.
import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeleton';
import SuperadminReportsClient from '@/app/superadmin/reports/reports_components/SuperadminReportsClient';
export default function ReportsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminReportsClient />
    </Suspense>);
}
