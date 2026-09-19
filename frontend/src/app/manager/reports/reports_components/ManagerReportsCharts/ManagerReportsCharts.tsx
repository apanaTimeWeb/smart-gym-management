'use client';
// RESPONSIBILITY: ApexCharts-based charts for each report tab — Revenue, Attendance, Members, Expenses.
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
import { ManagerReportsRevenueChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsRevenueChart/ManagerReportsRevenueChart';
import { ManagerReportsAttendanceChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsAttendanceChart/ManagerReportsAttendanceChart';
import { ManagerReportsMembersChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsMembersChart/ManagerReportsMembersChart';
import { ManagerReportsExpensesChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsExpensesChart/ManagerReportsExpensesChart';


export default function ManagerReportsCharts() {
  const { tab, summary } = useManagerReportsLogic();

  if (!summary) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {tab === 'Revenue'    && <ManagerReportsRevenueChart    />}
      {tab === 'Attendance' && <ManagerReportsAttendanceChart />}
      {tab === 'Members'    && <ManagerReportsMembersChart    />}
      {tab === 'Expenses'   && <ManagerReportsExpensesChart   />}
    </div>
  );
}
