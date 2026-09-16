import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page component and its associated UI logic.
import SuperadminReportsClient from '@/app/superadmin/reports/reports_components/SuperadminReportsClient';

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <SuperadminReportsClient />
    </Suspense>
  );
}
