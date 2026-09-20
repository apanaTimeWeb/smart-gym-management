// RESPONSIBILITY: Renders the data table for the active report tab — Revenue, Attendance, Members, or Expenses.
'use client';
import { ManagerReportsAttendanceTable } from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsAttendanceTable/ManagerReportsAttendanceTable';
import { ManagerReportsExpensesTable } from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsExpensesTable/ManagerReportsExpensesTable';
import { ManagerReportsMembersTable } from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsMembersTable/ManagerReportsMembersTable';
import { ManagerReportsRevenueTable } from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsRevenueTable/ManagerReportsRevenueTable';
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';



export default function ManagerReportsTable() {
  const { tab, summary } = useManagerReportsLogic();
  if (!summary) return null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      <div className="px-5 py-3.5 border-b border-border">
        <p className="text-sm font-semibold text-primary">{tab} Data</p>
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
