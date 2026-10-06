// RESPONSIBILITY: Renders the manager_reports route boundary (ReportsPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerReportsLoading from '@/app/frontend_manager/manager_reports/loading';
import ManagerReportsMain from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_main/ManagerReportsMain';


/** @description Route-level ReportsPage for the Manager frontend module. */
export default function ReportsPage() {
  return (
    <Suspense fallback={<ManagerReportsLoading />}>
      <ManagerReportsMain />
    </Suspense>
  );
}
