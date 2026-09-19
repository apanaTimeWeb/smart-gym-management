import { Suspense } from 'react';
// RESPONSIBILITY: Framework route boundary for the Manager reports module; renders the route-level shell, loading, error, or 404 state.
import ManagerReportsLoading from '@/app/manager/reports/loading';
import ManagerReportsMain from '@/app/manager/reports/reports_components/ManagerReportsMain/ManagerReportsMain';

export default function ReportsPage() {
  return (
    <Suspense fallback={<ManagerReportsLoading />}>
      <ManagerReportsMain />
    </Suspense>
  );
}
