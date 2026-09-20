'use client';
// RESPONSIBILITY: Renders the ManagerReportsMembersTable sub-view extracted from ManagerReportsTable; owns only this presentation responsibility.
// RESPONSIBILITY: Renders the data table for the active report tab — Revenue, Attendance, Members, or Expenses.
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import ManagerReportsEmptyState from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsEmptyState';

export function ManagerReportsMembersTable() {
  const { summary } = useManagerReportsLogic();
  const data = summary?.memberChurnData ?? [];
  return (
    <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {['Month', 'New Members', 'Lost', 'Active'].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={4}><ManagerReportsEmptyState /></td></tr> : data.map(d => (
          <tr key={d.month} className="hover:bg-primary-subtle motion-safe:transition-colors">
            <td className="px-5 py-3.5 text-sm font-medium text-primary">{d.month}</td>
            <td className="px-5 py-3.5 text-sm text-success font-semibold">+{formatNumber(d.newMembers)}</td>
            <td className="px-5 py-3.5 text-sm text-danger">-{formatNumber(d.churned)}</td>
            <td className="px-5 py-3.5 text-sm font-semibold text-primary">{formatNumber(d.active)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
