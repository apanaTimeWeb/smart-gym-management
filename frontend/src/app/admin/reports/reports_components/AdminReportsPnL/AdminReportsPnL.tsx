"use client";
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';
import { formatPercent1dp } from '@/lib/formatters';
// RESPONSIBILITY: Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators.

import { useAdminReportsLogic } from '@/app/admin/reports/reports_context/useAdminReportsLogic';
import { AdminReportsEmptyState } from '@/app/admin/reports/reports_components/AdminReportsEmptyState/AdminReportsEmptyState';

export default function AdminReportsPnL() {
  const { reportData } = useAdminReportsLogic();
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">Profit & Loss by Gym</h2>
          <p className="text-xs text-secondary mt-0.5">Full revenue, cost, and profit breakdown for the selected period</p>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['Gym', 'Total Revenue', 'Membership Rev.', 'Store Rev.', 'Staff Cost', 'Operational Cost', 'Total Expenses', 'Net Profit', 'Margin'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.pnlSummary.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-4 py-4 text-sm font-semibold text-primary whitespace-nowrap">{row.gymName}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary">{formatCurrency(row.revenue)}</td>
                  <td className="px-4 py-4 text-sm text-primary">{formatCurrency(row.membershipRevenue)}</td>
                  <td className="px-4 py-4 text-sm text-primary">{formatCurrency(row.storeRevenue)}</td>
                  <td className="px-4 py-4 text-sm text-danger">{formatCurrency(row.staffCost)}</td>
                  <td className="px-4 py-4 text-sm text-danger">{formatCurrency(row.operationalCost)}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-danger">{formatCurrency(row.totalExpenses)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-success">{formatCurrency(row.netProfit)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-input rounded-full">
                        <div className="h-2 bg-success text-on-success rounded-full" style={{ width: `${row.profitMargin}%` }} />
                      </div>
                      <span className={`text-xs font-bold ${row.profitMargin >= 60 ? 'text-success' : row.profitMargin >= 40 ? 'text-warning' : 'text-danger'}`}>
                        {formatPercent1dp(row.profitMargin)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-4 py-3 text-sm font-bold text-primary">Total</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.revenue, 0))}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.membershipRevenue, 0))}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.storeRevenue, 0))}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.staffCost, 0))}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.operationalCost, 0))}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.totalExpenses, 0))}</td>
                <td className="px-4 py-3 text-sm font-bold text-success">{formatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.netProfit, 0))}</td>
                <td className="px-4 py-3" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}