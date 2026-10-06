"use client";
// RESPONSIBILITY: Renders sortable table displaying detailed staff performance metrics.
import { formatNumber } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrFormatters';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { formatDecimal } from '@/app/frontend_admin/admin_hr/admin_hr_utils/AdminHrFormatters';
import { PERFORMANCE_TABLE_HEADERS, PERFORMANCE_STATUS_CONFIG } from '@/app/frontend_admin/admin_hr/admin_hr_constants/AdminHrConstants';
import AdminHrEmptyState from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_empty_state/AdminHrEmptyState';
import AdminHrPerformanceTableSortIcon from '@/app/frontend_admin/admin_hr/admin_hr_components/admin_hr_performance/AdminHrPerformanceTableSortIcon';
import type {
  StaffPerformanceRecord,
  PerformanceSortKey,
  PerformanceSortDirection,
} from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';

import type { AdminHrPerformanceTableProps } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTablePropsTypes';


/**
 * AdminHrPerformanceTable renders the admin hr performance table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceTable: Renders sortable table displaying detailed staff performance metrics.
 * @dependencies Consumes AdminHrFormatters, AdminHrConstants, AdminHrEmptyState, AdminHrPerformanceTableSortIcon, AdminHrPerformanceTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceTable({
  data,
  sortKey,
  sortDir,
  onSort,
}: AdminHrPerformanceTableProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {PERFORMANCE_TABLE_HEADERS.map((h , __testIdIndex41) => (
                <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}
                  key={h.key}
                  className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                    h.sortable ? 'cursor-pointer hover:text-primary motion-safe:transition-colors' : ''
                  }`}
                  onClick={() => {
                    if (h.sortable) onSort(h.key as PerformanceSortKey);
                  }}
                  aria-sort={sortKey===h.key ? (sortDir==='asc' ? 'ascending' : 'descending') : 'none'}
                 data-testid={`admin_hr-admin_hr-performance-table-control-map41-${__testIdIndex41}-1`}>
                  <div className="flex items-center gap-1.5">
                    {t(h.labelKey)}
                    {h.sortable && <AdminHrPerformanceTableSortIcon column={h.key} sortKey={sortKey} sortDir={sortDir} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7}><AdminHrEmptyState title={t('hr.AdminHrPerformanceTable.text_04f991ef9b')} description={t('hr.AdminHrPerformanceTable.auto_36595ed797')} /></td>
              </tr>
            ) : (
              data.map((staff) => {
                const statusCfg = PERFORMANCE_STATUS_CONFIG[staff.status];
                return (
                  <tr key={staff.id} className="hover:bg-input motion-safe:transition-colors motion-safe:duration-base">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {staff.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-primary truncate">{staff.name}</p>
                          <p className="text-xs text-disabled truncate">{staff.branchName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-secondary">{staff.role}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-primary">{formatNumber(staff.sessionsTaken, locale)}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-primary">{formatNumber(staff.membersAdded, locale)}</td>
                    <td className="px-4 py-3.5 text-sm font-medium text-primary">{staff.attendancePct}%</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-primary">{formatDecimal(staff.rating, locale)} <span className="text-warning text-xs">★</span></td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg?.bgClass} ${statusCfg?.textClass}`}>
                        {statusCfg?.labelKey ? t(statusCfg.labelKey) : staff.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
