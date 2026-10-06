// RESPONSIBILITY: Server route entry for the Manager Dashboard; delegates data fetching to the client query layer so browser MSW can provide frontend-first data.
import ManagerDashboardMain from '@/app/frontend_manager/manager_dashboard/manager_dashboard_components/manager_dashboard_main/ManagerDashboardMain';

export const dynamic = 'force-dynamic';

/** @description Route-level DashboardPage for the Manager frontend module. */
export default function DashboardPage() {
  return <ManagerDashboardMain />;
}
