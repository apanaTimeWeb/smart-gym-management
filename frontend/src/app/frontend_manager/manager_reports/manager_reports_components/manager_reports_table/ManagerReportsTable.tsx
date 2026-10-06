// RESPONSIBILITY: Renders ManagerReportsTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import { ManagerReportsAttendanceTable } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/manager_reports_attendance_table/ManagerReportsAttendanceTable';
import { ManagerReportsExpensesTable } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/manager_reports_expenses_table/ManagerReportsExpensesTable';
import { ManagerReportsMembersTable } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/manager_reports_members_table/ManagerReportsMembersTable';
import { ManagerReportsRevenueTable } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_table/manager_reports_revenue_table/ManagerReportsRevenueTable';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';



/** @description Renders the ManagerReportsTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsTable() {
  const t = useTranslations('MANAGER_REPORTS');

  const { tab, summary } = useManagerReportsLogic();
  if (!summary) return null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      <div className="px-5 py-3.5 border-b border-border">
        <p className="text-sm font-semibold text-primary">{tab}{t("COPY_DATA")}</p>
      </div>
      <div className="overflow-x-auto">
        {tab === 'Revenue'    && <ManagerReportsRevenueTable    />}
        {tab === 'Attendance' && <ManagerReportsAttendanceTable />}
        {tab === 'Members'    && <ManagerReportsMembersTable    />}
        {tab === 'Expenses'   && <ManagerReportsExpensesTable   />}
      </div>
    </div>
  );
}
