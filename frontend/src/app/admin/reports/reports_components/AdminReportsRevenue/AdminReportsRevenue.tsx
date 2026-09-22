"use client";
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';
import { formatPercent1dp } from '@/lib/formatters';
import type { AdminReportsRevenueSortKey } from '@/app/admin/reports/reports_types/AdminReportsUiTypes';
import type { AdminReportsSortDirection } from '@/app/admin/reports/reports_types/AdminReportsSortTypes';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
// RESPONSIBILITY: Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart.

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAdminReportsLogic } from '@/app/admin/reports/reports_context/useAdminReportsLogic';
import { AdminReportsEmptyState } from '@/app/admin/reports/reports_components/AdminReportsEmptyState/AdminReportsEmptyState';

const TREND_ICON = {
  up: <TrendingUp size={14} className="text-success" />,
  down: <TrendingDown size={14} className="text-danger" />,
  flat: <Minus size={14} className="text-secondary" />,
};

export default function AdminReportsRevenue() {
  const { reportData } = useAdminReportsLogic();
  const [sortKey, setSortKey] = useState<AdminReportsRevenueSortKey>('revenue');
  const [sortDir, setSortDir] = useState<AdminReportsSortDirection>('desc');

  const revenueByGym = useMemo(() => {
    if (!reportData) return [];
    return [...reportData.revenueByGym].sort((a,b)=>{const av=a[sortKey],bv=b[sortKey];const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true});return sortDir==='asc'?result:-result;});
  },[reportData,sortKey,sortDir]);
  const handleSort=(key:AdminReportsRevenueSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};
  const maxRevenue = Math.max(1, ...revenueByGym.map(g => g.revenue));

  if (!reportData) return null;

  return (
    <div className="space-y-6">
      {/* Revenue by Gym */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">Revenue by Gym</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['Gym', 'Revenue', 'Expenses', 'Net Profit', 'Margin', 'Trend'].map((h,index) => { const keys:Array<AdminReportsRevenueSortKey|null>=['gymName','revenue','expenses','profit',null,'trendPercent']; const key=keys[index]; return <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={h} onClick={()=>key&&handleSort(key)} className={`px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider ${key?'cursor-pointer select-none':''}`} aria-sort={key&&sortKey===key?(sortDir==='asc'?'ascending':'descending'):'none'}><div className="flex items-center gap-1.5">{h}{key&&(sortKey===key?(sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>):<ChevronsUpDown size={13} className="text-disabled"/>)}</div></th>; })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {revenueByGym.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">{row.gymName}</p>
                      <div className="mt-1 h-1.5 bg-input rounded-full w-32">
                        <div className="h-1.5 bg-primary text-on-primary rounded-full" style={{ width: `${(row.revenue / maxRevenue) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{formatCurrency(row.revenue)}</td>
                  <td className="px-5 py-4 text-sm text-danger">{formatCurrency(row.expenses)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-success">{formatCurrency(row.profit)}</td>
                  <td className="px-5 py-4 text-sm text-primary">{formatPercent1dp((row.profit / row.revenue) * 100)}%</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      {TREND_ICON[row.trend as keyof typeof TREND_ICON]}
                      <span className={`text-xs font-medium ${row.trend === 'up' ? 'text-success' : row.trend === 'down' ? 'text-danger' : 'text-secondary'}`}>
                        {row.trendPercent > 0 ? '+' : ''}{row.trendPercent}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue by Method + Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-primary">Revenue by Payment Method</h2>
          </div>
          <div className="p-5 space-y-3">
            {reportData.revenueByMethod.length === 0 ? (
              <AdminReportsEmptyState title="No payment-method data" description="No revenue by payment method is available for the selected report scope." />
            ) : reportData.revenueByMethod.map((row) => {
              const total = reportData.revenueByMethod.reduce((s: number, r) => s + r.amount, 0);
              const pct = formatPercent1dp((row.amount / total) * 100);
              return (
                <div key={row.method}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">{row.method}</span>
                    <span className="text-secondary">{formatCurrency(row.amount)} <span className="text-xs">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-input rounded-full">
                    <div className="h-2 bg-primary text-on-primary rounded-full motion-safe:transition-all motion-safe:duration-base" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-primary">Revenue by Plan</h2>
          </div>
          <div className="p-5 space-y-3">
            {reportData.revenueByPlan.length === 0 ? (
              <AdminReportsEmptyState title="No plan revenue data" description="No revenue by plan is available for the selected report scope." />
            ) : reportData.revenueByPlan.map((row) => {
              const total = reportData.revenueByPlan.reduce((s: number, r) => s + r.amount, 0);
              const pct = formatPercent1dp((row.amount / total) * 100);
              return (
                <div key={row.planName}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">{row.planName}</span>
                    <span className="text-secondary">{formatCurrency(row.amount)} <span className="text-xs">({row.count} members)</span></span>
                  </div>
                  <div className="h-2 bg-input rounded-full">
                    <div className="h-2 bg-info text-on-info rounded-full motion-safe:transition-all motion-safe:duration-base" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">Monthly Revenue Trend</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['Month', 'Revenue', 'Expenses', 'Net Profit', 'Margin'].map((h,index) => { const keys: Array<AdminReportsRevenueSortKey|null>=['gymName','revenue','expenses','profit',null]; const key=keys[index]; return <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">{h}{key&&<button type="button" onClick={()=>handleSort(key)} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out ml-1 inline-flex align-middle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={`Sort by ${h}`} title={`Sort by ${h}`}>{sortKey===key?(sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>):<ChevronsUpDown size={13} className="text-disabled"/>}</button>}</th>; })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.monthlyRevenue.length === 0 ? (
                <tr><td colSpan={5}><AdminReportsEmptyState title="No monthly revenue data" description="No monthly revenue records are available for the selected report scope." /></td></tr>
              ) : reportData.monthlyRevenue.map((row) => (
                <tr key={row.month} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-3 text-sm font-semibold text-primary">{row.month}</td>
                  <td className="px-5 py-3 text-sm text-primary">{formatCurrency(row.revenue)}</td>
                  <td className="px-5 py-3 text-sm text-danger">{formatCurrency(row.expenses)}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-success">{formatCurrency(row.profit)}</td>
                  <td className="px-5 py-3 text-sm text-primary">{formatPercent1dp((row.profit / row.revenue) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
