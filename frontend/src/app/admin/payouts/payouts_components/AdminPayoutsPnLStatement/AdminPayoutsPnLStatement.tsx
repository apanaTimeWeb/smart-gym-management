"use client";
// RESPONSIBILITY: Tax-ready P&L statement table per gym.

import { useAdminPayoutsLogic } from '@/app/admin/payouts/payouts_context/useAdminPayoutsLogic';
import { AdminTableSkeleton } from '@/app/admin/admin_components/AdminShared/AdminTableSkeleton';
import { formatCurrency } from '@/lib/formatters';

const HEADERS = ['Gym', 'Month', 'Revenue', 'COGS', 'Gross Profit', 'Staff Cost', 'Rent & Utilities', 'Marketing', 'Misc', 'EBITDA', 'Tax', 'Net Profit'];

export default function AdminPayoutsPnLStatement() {
  const { pnlData, loadingPnL } = useAdminPayoutsLogic();

  if (loadingPnL) return <AdminTableSkeleton rows={4} cols={HEADERS.length} />;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-3 border-b border-border">
        <p className="text-sm font-semibold text-foreground">Profit & Loss Statement</p>
        <p className="text-xs text-secondary mt-0.5">Tax-ready breakdown per gym per month</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primary/5">
              {HEADERS.map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pnlData.map((p) => (
              <tr key={`${p.gymId}-${p.month}`} className="hover:bg-primary/5 motion-safe:transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{p.gymName}</td>
                <td className="px-4 py-3 text-sm text-secondary">{p.month}</td>
                <td className="px-4 py-3 text-sm text-foreground">{formatCurrency(p.revenue)}</td>
                <td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.cogs)}</td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">{formatCurrency(p.grossProfit)}</td>
                <td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.staffCost)}</td>
                <td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.rentUtilities)}</td>
                <td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.marketing)}</td>
                <td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.miscExpenses)}</td>
                <td className="px-4 py-3 text-sm font-semibold text-info">{formatCurrency(p.ebitda)}</td>
                <td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.tax)}</td>
                <td className="px-4 py-3 text-sm font-bold text-success">{formatCurrency(p.netProfit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}