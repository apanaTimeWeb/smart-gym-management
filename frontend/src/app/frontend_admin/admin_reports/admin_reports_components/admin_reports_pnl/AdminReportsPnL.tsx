"use client";
// RESPONSIBILITY: Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators.
import { useLocale, useTranslations } from 'next-intl';
import { AdminReportsFormatCurrency } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatCurrency';
import { formatPercent1dp } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatters';

import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';
import { AdminReportsEmptyState } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_empty_state/AdminReportsEmptyState';
import AdminLayoutProgressBar from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_progress_bar/AdminLayoutProgressBar';

/**
 * AdminReportsPnL renders the admin reports pn l UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsPnL: Renders the P&L (Profit & Loss) report tab — full breakdown per gym with margin indicators.
 * @dependencies Consumes AdminReportsFormatCurrency, AdminReportsFormatters, useAdminReportsLogic, AdminReportsEmptyState, AdminLayoutProgressBar.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsPnL() {
  const locale = useLocale();
  const t = useTranslations();

  const { reportData } = useAdminReportsLogic();
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_pnl.text_abc7e55ec9')}</h2>
          <p className="text-xs text-secondary mt-0.5">{t('reports.admin_reports_pnl.text_c51b793f71')}</p>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['reports.AdminAuditRepair.gym', 'reports.AdminAuditRepair.totalRevenue', 'reports.AdminAuditRepair.membershipRevenue', 'reports.AdminAuditRepair.storeRevenue', 'reports.AdminAuditRepair.staffCost', 'reports.AdminAuditRepair.operationalCost', 'reports.AdminAuditRepair.totalExpenses', 'reports.AdminAuditRepair.netProfit', 'reports.AdminAuditRepair.margin'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.pnlSummary.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-4 py-4 text-sm font-semibold text-primary whitespace-nowrap">{row.gymName}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary">{AdminReportsFormatCurrency(row.revenue, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-primary">{AdminReportsFormatCurrency(row.membershipRevenue, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-primary">{AdminReportsFormatCurrency(row.storeRevenue, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-danger">{AdminReportsFormatCurrency(row.staffCost, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm text-danger">{AdminReportsFormatCurrency(row.operationalCost, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-danger">{AdminReportsFormatCurrency(row.totalExpenses, undefined, locale)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-success">{AdminReportsFormatCurrency(row.netProfit, undefined, locale)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <AdminLayoutProgressBar value={row.profitMargin} label={t('reports.admin_reports_pnl.auto_profitMargin', { gym: row.gymName })} variant="success" />
                      </div>
                      <span className={`text-xs font-bold ${row.profitMargin >= 60 ? 'text-success' : row.profitMargin >= 40 ? 'text-warning' : 'text-danger'}`}>
                        {formatPercent1dp(row.profitMargin, locale)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-4 py-3 text-sm font-bold text-primary">{t('reports.admin_reports_pnl.text_b25928c699')}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.revenue, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.membershipRevenue, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-primary">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.storeRevenue, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.staffCost, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.operationalCost, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-danger">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.totalExpenses, 0), undefined, locale)}</td>
                <td className="px-4 py-3 text-sm font-bold text-success">{AdminReportsFormatCurrency(reportData.pnlSummary.reduce((s: number, r) => s + r.netProfit, 0), undefined, locale)}</td>
                <td className="px-4 py-3" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}