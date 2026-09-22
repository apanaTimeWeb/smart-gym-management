"use client";
// RESPONSIBILITY: Renders the inline branch breakdown panel that expands inside the P&L table row.
// Shows revenue source split + expense category split + MoM delta context. No API calls.

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AdminFinancePnlBreakdownBar from '@/app/admin/finance/finance_components/AdminFinancePnl/AdminFinancePnlBreakdownBar';
import type { BranchPnlRecord } from '@/app/admin/finance/finance_types/AdminFinanceTypes';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';
import { formatPercent1dp } from '@/lib/formatters';

import type { AdminFinancePnlRowBreakdownProps } from '@/app/admin/finance/finance_types/AdminFinancePnlRowBreakdownPropsTypes';


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
      <td colSpan={colSpan} className="bg-input border-b border-border px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Revenue Breakdown */}
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Revenue Breakdown</p>
            <div className="space-y-2.5">
              {revItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary">{item.label}</span>
                    <span className="text-primary font-medium">{formatCurrency(item.value)}</span>
                  </div>
                  <AdminFinancePnlBreakdownBar value={item.value} max={revenue} colorClass="bg-success-bg" />
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
                    <span className="text-primary font-medium">{formatCurrency(item.value)}</span>
                  </div>
                  <AdminFinancePnlBreakdownBar value={item.value} max={expenses} colorClass="bg-danger-bg" />
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
                <span className="text-xs font-bold text-primary">Net Profit</span>
                <span className={`text-sm font-bold ${netProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-xs text-secondary">MoM Change</span>
                <div className={`flex items-center gap-1 text-xs font-semibold ${momColor}`}>
                  <MomIcon size={12} strokeWidth={2} />
                  {momDelta > 0 ? '+' : ''}{formatPercent1dp(momDelta)}%
                </div>
              </div>
            </div>
          </div>

        </div>
      </td>
    </tr>
  );
}