// RESPONSIBILITY: ApexCharts-based charts for each report tab — Revenue, Attendance, Members, Expenses.
'use client';
import { ManagerReportsAttendanceChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsAttendanceChart/ManagerReportsAttendanceChart';
import { ManagerReportsExpensesChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsExpensesChart/ManagerReportsExpensesChart';
import { ManagerReportsMembersChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsMembersChart/ManagerReportsMembersChart';
import { ManagerReportsRevenueChart } from '@/app/manager/reports/reports_components/ManagerReportsCharts/ManagerReportsRevenueChart/ManagerReportsRevenueChart';
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';



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
