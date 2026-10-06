"use client";
// RESPONSIBILITY: Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart.
import { useLocale, useTranslations } from 'next-intl';
import { AdminReportsFormatCurrency } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatters';
import type { AdminReportsRevenueSortKey } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsUiTypes';
import type { AdminReportsSortDirection } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsSortTypes';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';
import { AdminReportsEmptyState } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_empty_state/AdminReportsEmptyState';
import AdminLayoutProgressBar from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar';

const TREND_ICON = {
  up: <TrendingUp size={18} className="text-success"  strokeWidth={2}/>,
  down: <TrendingDown size={18} className="text-danger"  strokeWidth={2}/>,
  flat: <Minus size={18} className="text-secondary"  strokeWidth={2}/>,
};

/**
 * AdminReportsRevenue renders the admin reports revenue UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsRevenue: Renders the Revenue report tab — breakdown by gym, payment method, plan, and monthly trend chart.
 * @dependencies Consumes AdminReportsFormatCurrency, AdminReportsFormatters, AdminReportsUiTypes, AdminReportsSortTypes, useAdminReportsLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsRevenue() {
  const t = useTranslations();
  const revenueHeaders = [t('reports.AdminAuditRepair.gym'), t('reports.AdminAuditRepair.revenue'), t('reports.AdminAuditRepair.expenses'), t('reports.AdminAuditRepair.netProfit'), t('reports.AdminAuditRepair.margin'), t('reports.AdminAuditRepair.trend')] as const;
  const monthlyHeaders = [t('reports.AdminAuditRepair.month'), t('reports.AdminAuditRepair.revenue'), t('reports.AdminAuditRepair.expenses'), t('reports.AdminAuditRepair.netProfit'), t('reports.AdminAuditRepair.margin')] as const;
  const locale = useLocale();

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
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_revenue.text_177bf7fe0c')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {revenueHeaders.map((h,index) => { const keys:Array<AdminReportsRevenueSortKey|null>=['gymName','revenue','expenses','profit',null,'trendPercent']; const key=keys[index]; return <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={h} onClick={()=>key&&handleSort(key)} className={`px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${key?'cursor-pointer select-none':''}`} aria-sort={key&&sortKey===key?(sortDir==='asc'?'ascending':'descending'):'none'} data-testid={`admin_reports-admin_reports-revenue-control-map59-${index}-1`}><div className="flex items-center gap-1.5">{h}{key&&(sortKey===key?(sortDir==='asc'?<ChevronUp size={18} className="text-primary" strokeWidth={2}/>:<ChevronDown size={18} className="text-primary" strokeWidth={2}/>):<ChevronsUpDown size={18} className="text-disabled" strokeWidth={2}/>)}</div></th>; })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {revenueByGym.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-primary">{row.gymName}</p>
                      <div className="mt-1 w-32">
                        <AdminLayoutProgressBar value={(row.revenue / maxRevenue) * 100} label={t('reports.admin_reports_revenue.auto_revenueShare', { gym: row.gymName })} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{AdminReportsFormatCurrency(row.revenue, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-danger">{AdminReportsFormatCurrency(row.expenses, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-success">{AdminReportsFormatCurrency(row.profit, undefined, locale)}</td>
                  <td className="px-5 py-4 text-sm text-primary">{formatPercent1dp((row.profit / row.revenue) * 100, locale)}%</td>
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
            <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_revenue.text_a47fd0727f')}</h2>
          </div>
          <div className="p-5 space-y-3">
            {reportData.revenueByMethod.length === 0 ? (
              <AdminReportsEmptyState title={t('reports.admin_reports_revenue.text_8764bbb6f1')} description={t('reports.admin_reports_revenue.auto_fdf7814a62')} />
            ) : reportData.revenueByMethod.map((row) => {
              const total = reportData.revenueByMethod.reduce((s: number, r) => s + r.amount, 0);
              const pct = formatPercent1dp((row.amount / total) * 100, locale);
              return (
                <div key={row.method}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">{row.method}</span>
                    <span className="text-secondary">{AdminReportsFormatCurrency(row.amount, undefined, locale)} <span className="text-xs">({pct}%)</span></span>
                  </div>
                  <AdminLayoutProgressBar value={Number(pct)} label={t('reports.admin_reports_revenue.auto_methodRevenueShare', { method: row.method })} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_revenue.text_098e8b7646')}</h2>
          </div>
          <div className="p-5 space-y-3">
            {reportData.revenueByPlan.length === 0 ? (
              <AdminReportsEmptyState title={t('reports.admin_reports_revenue.text_9dd0910563')} description={t('reports.admin_reports_revenue.auto_2e04c86d5b')} />
            ) : reportData.revenueByPlan.map((row) => {
              const total = reportData.revenueByPlan.reduce((s: number, r) => s + r.amount, 0);
              const pct = formatPercent1dp((row.amount / total) * 100, locale);
              return (
                <div key={row.planName}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-medium">{row.planName}</span>
                    <span className="text-secondary">{AdminReportsFormatCurrency(row.amount, undefined, locale)} <span className="text-xs">({row.count} {t('reports.admin_reports_revenue.text_3757697e2a')}</span></span>
                  </div>
                  <AdminLayoutProgressBar value={Number(pct)} label={t('reports.admin_reports_revenue.auto_planRevenueShare', { plan: row.planName })} variant="info" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_revenue.text_d965c78fbc')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {monthlyHeaders.map((h,index) => { const keys: Array<AdminReportsRevenueSortKey|null>=['gymName','revenue','expenses','profit',null]; const key=keys[index]; return <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">{h}{key&&<button type="button" onClick={()=>handleSort(key)} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out ml-1 inline-flex align-middle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('admin_reports_revenue.auto_sortBy', { header: h })} title={t('admin_reports_revenue.auto_sortBy', { header: h })} data-testid={`admin_reports-admin_reports-revenue-click-map150-${index}-1`}>{sortKey===key?(sortDir==='asc'?<ChevronUp size={18} className="text-primary" strokeWidth={2}/>:<ChevronDown size={18} className="text-primary" strokeWidth={2}/>):<ChevronsUpDown size={18} className="text-disabled" strokeWidth={2}/>}</button>}</th>; })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.monthlyRevenue.length === 0 ? (
                <tr><td colSpan={5}><AdminReportsEmptyState title={t('reports.admin_reports_revenue.text_096b9d52b6')} description={t('reports.admin_reports_revenue.auto_a64dbf269d')} /></td></tr>
              ) : reportData.monthlyRevenue.map((row) => (
                <tr key={row.month} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-3 text-sm font-semibold text-primary">{row.month}</td>
                  <td className="px-5 py-3 text-sm text-primary">{AdminReportsFormatCurrency(row.revenue, undefined, locale)}</td>
                  <td className="px-5 py-3 text-sm text-danger">{AdminReportsFormatCurrency(row.expenses, undefined, locale)}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-success">{AdminReportsFormatCurrency(row.profit, undefined, locale)}</td>
                  <td className="px-5 py-3 text-sm text-primary">{formatPercent1dp((row.profit / row.revenue) * 100, locale)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
