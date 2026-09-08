// RESPONSIBILITY: Renders the inline branch breakdown panel that expands inside the P&L table row.
// Shows revenue source split + expense category split + MoM delta context. No API calls.
'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { BranchPnlRecord } from '@/app/admin/finance/finance_types/finance_types';
import { formatCurrency } from '@/lib/formatters';

interface AdminFinancePnlRowBreakdownProps {
  branch: BranchPnlRecord;
  colSpan: number;
}

function Bar({ value, max, colorClass }: { value: number; max: number; colorClass: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function AdminFinancePnlRowBreakdown({ branch, colSpan }: AdminFinancePnlRowBreakdownProps) {
  const { revenueBreakdown: rev, expenseBreakdown: exp, momDelta, netProfit, revenue, expenses } = branch;

  const revItems = [
    { label: 'Memberships', value: rev.memberships },
    { label: 'PT Sessions',  value: rev.ptSessions  },
    { label: 'Products',     value: rev.products     },
    { label: 'Other',        value: rev.other        },
  ];

  const expItems = [
    { label: 'Rent',        value: exp.rent        },
    { label: 'Salaries',    value: exp.salaries    },
    { label: 'Utilities',   value: exp.utilities   },
    { label: 'Maintenance', value: exp.maintenance },
    { label: 'Marketing',   value: exp.marketing   },
  ];

  const MomIcon = momDelta > 0 ? TrendingUp : momDelta < 0 ? TrendingDown : Minus;
  const momColor = momDelta > 0 ? 'text-success' : momDelta < 0 ? 'text-danger' : 'text-secondary';

  return (
    <tr>
      <td colSpan={colSpan} className="bg-input/40 border-b border-border px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Revenue Breakdown */}
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Revenue Breakdown</p>
            <div className="space-y-2.5">
              {revItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-foreground font-medium">{formatCurrency(item.value)}</span>
                  </div>
                  <Bar value={item.value} max={revenue} colorClass="bg-success/70" />
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Expense Breakdown</p>
            <div className="space-y-2.5">
              {expItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-foreground font-medium">{formatCurrency(item.value)}</span>
                  </div>
                  <Bar value={item.value} max={expenses} colorClass="bg-danger/60" />
                </div>
              ))}
            </div>
          </div>

          {/* Summary Panel */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Period Summary</p>
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">Total Revenue</span>
                <span className="text-sm font-semibold text-success">{formatCurrency(revenue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary">Total Expenses</span>
                <span className="text-sm font-semibold text-danger">{formatCurrency(expenses)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-foreground">Net Profit</span>
                <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-xs text-secondary">MoM Change</span>
                <div className={`flex items-center gap-1 text-xs font-semibold ${momColor}`}>
                  <MomIcon size={12} strokeWidth={2} />
                  {momDelta > 0 ? '+' : ''}{momDelta.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

        </div>
      </td>
    </tr>
  );
}
