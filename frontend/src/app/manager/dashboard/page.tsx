// RESPONSIBILITY: Server route entry for the Manager Dashboard; delegates data fetching to the client query layer so browser MSW can provide frontend-first data.
import ManagerDashboardMain from '@/app/manager/dashboard/dashboard_components/ManagerDashboardMain/ManagerDashboardMain';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return <ManagerDashboardMain />;
}
