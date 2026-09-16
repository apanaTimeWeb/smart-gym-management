import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the Reports page.
import AdminReportsMain from '@/app/admin/reports/reports_components/AdminReportsMain/AdminReportsMain';

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminReportsMain />
    </Suspense>
  );
}
