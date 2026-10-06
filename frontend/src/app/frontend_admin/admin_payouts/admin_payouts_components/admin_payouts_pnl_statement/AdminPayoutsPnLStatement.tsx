"use client";
// RESPONSIBILITY: Renders the tax-ready P&L statement with functional sortable headers and empty state.
import { useTranslations } from 'next-intl';

import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_payouts/admin_payouts_hooks/useAdminPayoutsLogic';
import AdminLayoutTableSkeleton from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton';
import AdminPayoutsPnLStatementCell from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_pnl_statement/AdminPayoutsPnLStatementCell';
import type { PnlSortKey } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';
import AdminPayoutsPnLStatementSortIcon from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_pnl_statement/AdminPayoutsPnLStatementSortIcon';
import AdminPayoutsEmptyState from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_empty_state/AdminPayoutsEmptyState';


/**
 * AdminPayoutsPnLStatement renders the admin payouts pn lstatement UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsPnLStatement: Renders the tax-ready P&L statement with functional sortable headers and empty state.
 * @dependencies Consumes useAdminPayoutsLogic, AdminLayoutTableSkeleton, AdminPayoutsPnLStatementCell, AdminPayoutsTypes, AdminPayoutsPnLStatementSortIcon.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsPnLStatement(){
  const t = useTranslations();
  const headers: ReadonlyArray<{ key: PnlSortKey; label: string }> = [
    { key: 'gymName', label: t('payouts.AdminAuditRepair.gym') },
    { key: 'month', label: t('payouts.AdminAuditRepair.month') },
    { key: 'revenue', label: t('payouts.AdminAuditRepair.revenue') },
    { key: 'cogs', label: t('payouts.AdminAuditRepair.cogs') },
    { key: 'grossProfit', label: t('payouts.AdminAuditRepair.grossProfit') },
    { key: 'staffCost', label: t('payouts.AdminAuditRepair.staffCost') },
    { key: 'rentUtilities', label: t('payouts.AdminAuditRepair.rentUtilities') },
    { key: 'marketing', label: t('payouts.AdminAuditRepair.marketing') },
    { key: 'miscExpenses', label: t('payouts.AdminAuditRepair.misc') },
    { key: 'ebitda', label: t('payouts.AdminAuditRepair.ebitda') },
    { key: 'tax', label: t('payouts.AdminAuditRepair.tax') },
    { key: 'netProfit', label: t('payouts.AdminAuditRepair.netProfit') },
  ];
  const t = useTranslations();
const logic=useAdminPayoutsLogic();if(logic.pendingPnl)return <AdminLayoutTableSkeleton rows={4} cols={headers.length}/>;return <div className="bg-card rounded-xl border border-border overflow-hidden"><div className="px-5 py-3 border-b border-border"><p className="text-sm font-semibold text-primary">{t('payouts.admin_payouts_pnl_statement.text_587bef7062')}</p><p className="text-xs text-secondary mt-0.5">{t('payouts.admin_payouts_pnl_statement.text_b968ad7e9b')}</p></div><div className="overflow-x-auto"><table data-admin-responsive-table className="w-full"><thead><tr className="bg-surface-highlight border-b border-border">{headers.map((h, __testIdIndex37) =><th role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.currentTarget.click(); } }}  key={h.key} onClick={()=>logic.onPnlSort(h.key)} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-sort={logic.pnlSortKey===h.key?(logic.pnlSortDir==='asc'?'ascending':'descending'):'none'} data-testid={`admin_payouts-admin_payouts-pn-lstatement-state-map37-${__testIdIndex37}-1`}><div className="flex items-center gap-1.5">{h.label}<AdminPayoutsPnLStatementSortIcon column={h.key} sortKey={logic.pnlSortKey} sortDir={logic.pnlSortDir}/></div></th>)}</tr></thead><tbody className="divide-y divide-border">{logic.pnlData.length===0?<tr><td colSpan={headers.length}><AdminPayoutsEmptyState title={t('payouts.admin_payouts_pnl_statement.text_f19bc6d402')} description={t('payouts.admin_payouts_pnl_statement.auto_55e2fbeab5')} /></td></tr>:logic.pnlData.map(p=><tr key={`${p.gymId}-${p.month}`} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base"> <td className="px-4 py-3 text-sm font-medium text-primary">{p.gymName}</td><td className="px-4 py-3 text-sm text-secondary">{p.month}</td><AdminPayoutsPnLStatementCell value={p.revenue}/><AdminPayoutsPnLStatementCell value={p.cogs} tone="text-danger"/><AdminPayoutsPnLStatementCell value={p.grossProfit}/><AdminPayoutsPnLStatementCell value={p.staffCost} tone="text-danger"/><AdminPayoutsPnLStatementCell value={p.rentUtilities} tone="text-danger"/><AdminPayoutsPnLStatementCell value={p.marketing} tone="text-danger"/><AdminPayoutsPnLStatementCell value={p.miscExpenses} tone="text-danger"/><AdminPayoutsPnLStatementCell value={p.ebitda} tone="text-info"/><AdminPayoutsPnLStatementCell value={p.tax} tone="text-danger"/><AdminPayoutsPnLStatementCell value={p.netProfit} tone="font-bold text-success"/></tr>)}</tbody></table></div></div>}
