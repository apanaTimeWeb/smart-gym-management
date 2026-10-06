"use client";
// RESPONSIBILITY: Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { formatNumber } from '@/app/frontend_admin/admin_reports/admin_reports_utils/AdminReportsFormatters';

import { useAdminReportsLogic } from '@/app/frontend_admin/admin_reports/admin_reports_hooks/useAdminReportsLogic';
import { AdminReportsEmptyState } from '@/app/frontend_admin/admin_reports/admin_reports_components/admin_reports_empty_state/AdminReportsEmptyState';

/**
 * AdminReportsMembership renders the admin reports membership UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsMembership: Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.
 * @dependencies Consumes AdminReportsFormatters, useAdminReportsLogic, AdminReportsEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsMembership() {
  const locale = useLocale();
  const t = useTranslations();

  const { reportData } = useAdminReportsLogic();
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">{t('reports.admin_reports_membership.text_fd05c3efa5')}</h2>
          <p className="text-xs text-secondary mt-0.5">{t('reports.admin_reports_membership.text_e044ab4747')}</p>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['reports.AdminAuditRepair.gym', 'reports.AdminAuditRepair.activeMembers', 'reports.AdminAuditRepair.newMembers', 'reports.AdminAuditRepair.renewals', 'reports.AdminAuditRepair.exits', 'reports.AdminAuditRepair.netGrowth'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">{t(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.membershipGrowth.map((row , __testIdIndex41) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{row.gymName}</td>
                  <td className="px-5 py-4 text-sm text-primary">{formatNumber(row.activeMembers, locale)}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-bg text-success-text" data-testid={`admin_reports-adminreportsmembership-status-1-map41-${__testIdIndex41}-1`}>+{row.newMembers}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info-text" data-testid={`admin_reports-adminreportsmembership-status-2-map41-${__testIdIndex41}-2`}>{row.renewals}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger-bg text-danger-text" data-testid={`admin_reports-adminreportsmembership-status-3-map41-${__testIdIndex41}-3`}>-{row.exits}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.netGrowth >= 0 ? 'bg-success-bg text-success-text' : 'bg-danger-bg text-danger-text'}`} data-testid={`admin_reports-adminreportsmembership-status-4-map41-${__testIdIndex41}-4`}>
                      {row.netGrowth >= 0 ? '+' : ''}{row.netGrowth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-5 py-3 text-sm font-bold text-primary">{t('reports.admin_reports_membership.text_b25928c699')}</td>
                <td className="px-5 py-3 text-sm font-bold text-primary">
                  {formatNumber(reportData.membershipGrowth.reduce((s: number, r) => s + r.activeMembers, 0), locale)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-success">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.newMembers, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-info">
                  {reportData.membershipGrowth.reduce((s: number, r) => s + r.renewals, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-danger">
                  -{reportData.membershipGrowth.reduce((s: number, r) => s + r.exits, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-success">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.netGrowth, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}