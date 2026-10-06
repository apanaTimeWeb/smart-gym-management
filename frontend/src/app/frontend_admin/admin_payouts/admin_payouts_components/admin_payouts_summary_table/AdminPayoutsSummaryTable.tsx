"use client";
// RESPONSIBILITY: Renders the Admin payout summary with server-side filtering, pagination, and sortable headers.
import { PAYOUT_STATUS_LABEL_KEYS, PAYOUT_STATUS_STYLES, PAYOUT_STATUS_VALUES } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsConstants';
import { useLocale, useTranslations } from 'next-intl';

import { CheckCircle, Clock, Loader2 } from 'lucide-react';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_payouts/admin_payouts_hooks/useAdminPayoutsLogic';
import AdminLayoutTableSkeleton from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_payouts/admin_payouts_utils/AdminPayoutsFormatCurrency';

import { PAYOUT_MONTH_OPTIONS, PAYOUT_GYM_OPTIONS, PAYOUT_STATUS_OPTIONS, PAYOUT_SUMMARY_COLUMN_OPTIONS } from '@/app/frontend_admin/admin_payouts/admin_payouts_constants/AdminPayoutsConstants';
import { AdminLayoutSearchableDropdown } from '@/app/frontend_admin/admin_layout/admin_layout_shared/admin_layout_searchable_dropdown/AdminLayoutSearchableDropdown';
import type { PayoutSortKey } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';
import AdminPayoutsSummaryTableSortIcon from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_summary_table/AdminPayoutsSummaryTableSortIcon';
import AdminPayoutsEmptyState from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_empty_state/AdminPayoutsEmptyState';


/**
 * AdminPayoutsSummaryTable renders the admin payouts summary table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsSummaryTable: Renders the Admin payout summary with server-side filtering, pagination, and sortable headers.
 * @dependencies Consumes useAdminPayoutsLogic, AdminLayoutTableSkeleton, AdminLayoutPagination, AdminPayoutsFormatCurrency, AdminPayoutsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsSummaryTable() {
  const t = useTranslations();
  const tableColumns = PAYOUT_SUMMARY_COLUMN_OPTIONS.map((column) => ({ ...column, label: t(column.labelKey) }));

  const locale = useLocale();

  const logic = useAdminPayoutsLogic();
  return <div className="space-y-3">
    <div className="flex flex-wrap gap-3">
      <div className="w-44"><AdminLayoutSearchableDropdown options={PAYOUT_MONTH_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={logic.monthFilter} onChange={(val) => logic.setMonthFilter(String(val))} placeholder={t('payouts.admin_payouts_summary_table.text_be46153ca6')}  testId="admin_payouts-admin_payouts-summary-table-change"/></div>
      <div className="w-40"><AdminLayoutSearchableDropdown options={PAYOUT_GYM_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={logic.gymFilter} onChange={(val) => logic.setGymFilter(String(val))} placeholder={t('payouts.admin_payouts_summary_table.text_1ea6687cfe')}  testId="admin_payouts-admin_payouts-summary-table-change-2"/></div>
      <div className="w-40"><AdminLayoutSearchableDropdown options={PAYOUT_STATUS_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))} value={logic.statusFilter} onChange={(val) => logic.setStatusFilter(String(val))} placeholder={t('payouts.admin_payouts_summary_table.text_6b308de777')}  testId="admin_payouts-admin_payouts-summary-table-change-3"/></div>
    </div>
    {logic.status === 'pending' ? <AdminLayoutTableSkeleton rows={6} cols={tableColumns.length} /> : <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto"><table data-admin-responsive-table className="w-full"><thead><tr className="bg-surface-highlight border-b border-border">
        {tableColumns.map((h , __testIdIndex40) => <th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={h.key} onClick={() => logic.onPayoutSort(h.key)} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-sort={logic.payoutSortKey===h.key ? (logic.payoutSortDir==='asc'?'ascending':'descending') : 'none'} data-testid={`admin_payouts-admin_payouts-summary-table-control-map40-${__testIdIndex40}-1`}><div className="flex items-center gap-1.5">{h.label}<AdminPayoutsSummaryTableSortIcon column={h.key} sortKey={logic.payoutSortKey} sortDir={logic.payoutSortDir} /></div></th>)}
      </tr></thead><tbody className="divide-y divide-border">
        {logic.payouts.length === 0 ? <tr><td colSpan={tableColumns.length}><AdminPayoutsEmptyState title={t('payouts.admin_payouts_summary_table.text_f79b0cb03e')} description={t('payouts.admin_payouts_summary_table.auto_76a79e50dc')} /></td></tr> : logic.payouts.map((p) => <tr key={`${p.gymId}-${p.month}`} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
          <td className="px-4 py-3 text-sm font-medium text-primary">{p.gymName}</td><td className="px-4 py-3 text-sm text-secondary">{p.month}</td><td className="px-4 py-3 text-sm text-primary font-medium">{AdminPayoutsFormatCurrency(p.grossRevenue, undefined, locale)}</td><td className="px-4 py-3 text-sm text-danger">{AdminPayoutsFormatCurrency(p.staffPayroll, undefined, locale)}</td><td className="px-4 py-3 text-sm text-danger">{AdminPayoutsFormatCurrency(p.operationalExpenses, undefined, locale)}</td><td className="px-4 py-3 text-sm text-secondary">{AdminPayoutsFormatCurrency(p.platformFee, undefined, locale)}</td><td className="px-4 py-3 text-sm font-bold text-success">{AdminPayoutsFormatCurrency(p.netProfit, undefined, locale)}</td>
          <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${PAYOUT_STATUS_STYLES[p.payoutStatus]}`}>{p.payoutStatus===PAYOUT_STATUS_VALUES.PAID?<CheckCircle size={18} strokeWidth={2}/>:p.payoutStatus===PAYOUT_STATUS_VALUES.PROCESSING?<Loader2 size={18} className="motion-safe:animate-spin motion-safe:duration-base" strokeWidth={2}/>:<Clock size={18} strokeWidth={2}/>} {PAYOUT_STATUS_LABEL_KEYS[p.payoutStatus] ? t(PAYOUT_STATUS_LABEL_KEYS[p.payoutStatus]) : p.payoutStatus}</span></td>
        </tr>)}
      </tbody></table></div><div className="border-t border-border"><AdminLayoutPagination currentPage={logic.currentPage} totalPages={logic.totalPages} onPageChange={logic.setCurrentPage} totalItems={logic.totalItems} itemsPerPage={10}/></div>
    </div>}
  </div>;
}
