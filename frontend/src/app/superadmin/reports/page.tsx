import { Suspense } from 'react';
import SuperadminPageSuspenseSkeleton from '@/app/superadmin/superadmin_components/SuperadminPageSuspenseSkeleton';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminReportsClient from '@/app/superadmin/reports/reports_components/SuperadminReportsClient';
import SuperadminReportsV1Client from '@/app/superadmin/reports/reports_components/SuperadminReportsV1Client';
export default function ReportsPage() {
    return (<Suspense fallback={<SuperadminPageSuspenseSkeleton />}>
      <SuperadminReportsClient />
      <SuperadminReportsV1Client />
    </Suspense>);
}
