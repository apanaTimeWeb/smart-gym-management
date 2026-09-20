'use client';
// RESPONSIBILITY: Renders the ManagerReportsExpensesTable sub-view extracted from ManagerReportsTable; owns only this presentation responsibility.
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the data table for the active report tab — Revenue, Attendance, Members, or Expenses.
import { useManagerReportsLogic } from '@/app/manager/reports/reports_hooks/ManagerUseManagerReportsLogic';
import { EXPENSE_CATEGORY_STYLES } from '@/app/manager/reports/reports_utils/ManagerReportsSharedConstants';
import { formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import ManagerReportsEmptyState from '@/app/manager/reports/reports_components/ManagerReportsTable/ManagerReportsEmptyState';
const formatReportCurrency = (value: number) => formatCurrencyFromMinorUnits(value, ManagerEnvConfig.currencyCode);

export function ManagerReportsExpensesTable() {
  const { summary } = useManagerReportsLogic();
  const data = summary?.expenseBreakdown ?? [];
  return (
    <table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {['Category', 'Amount', 'Share'].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={3}><ManagerReportsEmptyState /></td></tr> : data.map(d => {
          const style = EXPENSE_CATEGORY_STYLES[d.category] ?? { bg: 'bg-secondary/10', text: 'text-secondary' };
          return (
            <tr key={d.category} className="hover:bg-primary-subtle motion-safe:transition-colors">
              <td className="px-5 py-3.5">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>{d.category}</span>
              </td>
              <td className="px-5 py-3.5 text-sm font-semibold text-primary">{formatReportCurrency(d.amount)}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-input rounded-full overflow-hidden max-w-32">
                    <div className="h-full bg-primary-subtle rounded-full" style={{ width: `${d.percentage}%` }} />
                  </div>
                  <span className="text-xs text-secondary">{d.percentage}%</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
