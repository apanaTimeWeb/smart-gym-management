// RESPONSIBILITY: Renders ManagerReportsCharts's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { ManagerReportsAttendanceChart } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_charts/manager_reports_attendance_chart/ManagerReportsAttendanceChart';
import { ManagerReportsExpensesChart } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_charts/manager_reports_expenses_chart/ManagerReportsExpensesChart';
import { ManagerReportsMembersChart } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_charts/manager_reports_members_chart/ManagerReportsMembersChart';
import { ManagerReportsRevenueChart } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_charts/manager_reports_revenue_chart/ManagerReportsRevenueChart';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';



/** @description Renders the ManagerReportsCharts component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsCharts() {
  const { tab, summary } = useManagerReportsLogic();

  if (!summary) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      {tab === 'Revenue'    && <ManagerReportsRevenueChart    />}
      {tab === 'Attendance' && <ManagerReportsAttendanceChart />}
      {tab === 'Members'    && <ManagerReportsMembersChart    />}
      {tab === 'Expenses'   && <ManagerReportsExpensesChart   />}
    </div>
  );
}
