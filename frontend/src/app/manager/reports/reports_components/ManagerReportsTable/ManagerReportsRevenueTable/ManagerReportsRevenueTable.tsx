// RESPONSIBILITY: Renders the ManagerReportsRevenueTable sub-view extracted from ManagerReportsTable; owns only this presentation responsibility.
'use client';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import ManagerReportsEmptyState from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsEmptyState';
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';

const formatReportCurrency = (value: number) => formatCurrencyFromMinorUnits(value, ManagerEnvConfig.currencyCode);

export function ManagerReportsRevenueTable() {
  const { summary } = useManagerReportsLogic();
  const data = summary?.revenueData ?? [];
  return (
    <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {['Month', 'Revenue', 'Expenses', 'Net Profit'].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={4}><ManagerReportsEmptyState /></td></tr> : data.map(d => (
          <tr key={d.month} className="hover:bg-primary-subtle motion-safe:transition-colors">
            <td className="px-5 py-3.5 text-sm font-medium text-primary">{d.month}</td>
            <td className="px-5 py-3.5 text-sm text-success font-semibold">{formatReportCurrency(d.revenue)}</td>
            <td className="px-5 py-3.5 text-sm text-danger">{formatReportCurrency(d.expenses)}</td>
            <td className={`px-5 py-3.5 text-sm font-semibold ${d.profit >= 0 ? 'text-success' : 'text-danger'}`}>{formatReportCurrency(d.profit)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
