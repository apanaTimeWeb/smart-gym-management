"use client";
// RESPONSIBILITY: Renders the Admin payout summary with server-side filtering, pagination, and sortable headers.

import { CheckCircle, ChevronDown, ChevronUp, ChevronsUpDown, Clock, Loader2 } from 'lucide-react';
import { useAdminPayoutsLogic } from '@/app/admin/payouts/payouts_context/useAdminPayoutsLogic';
import { AdminTableSkeleton } from '@/app/admin/admin_components/AdminShared/AdminTableSkeleton';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { formatCurrency } from '@/lib/formatters';
import { PAYOUT_MONTH_OPTIONS, PAYOUT_GYM_OPTIONS, PAYOUT_STATUS_OPTIONS } from '@/app/admin/payouts/payouts_utils/AdminPayoutsSharedConstants';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import type { PayoutSortDirection, PayoutSortKey } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';

const STATUS_STYLES: Record<string, string> = { paid: 'bg-success-bg text-success', pending: 'bg-warning-bg text-warning', processing: 'bg-info-bg text-info' };
const HEADERS: ReadonlyArray<{ key: PayoutSortKey; label: string }> = [
  { key: 'gymName', label: 'Gym' }, { key: 'month', label: 'Month' }, { key: 'grossRevenue', label: 'Gross Revenue' }, { key: 'staffPayroll', label: 'Payroll' },
  { key: 'operationalExpenses', label: 'Expenses' }, { key: 'platformFee', label: 'Platform Fee' }, { key: 'netProfit', label: 'Net Profit' }, { key: 'payoutStatus', label: 'Status' },
];
function SortIcon({ column, sortKey, sortDir }: { column: PayoutSortKey; sortKey: PayoutSortKey; sortDir: PayoutSortDirection }) {
  if (column !== sortKey) return <ChevronsUpDown size={13} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" /> : <ChevronDown size={13} className="text-primary" />;
}

export default function AdminPayoutsSummaryTable() {
  const logic = useAdminPayoutsLogic();
  return <div className="space-y-3">
    <div className="flex flex-wrap gap-3">
      <div className="w-44"><AdminSearchableDropdown options={PAYOUT_MONTH_OPTIONS} value={logic.monthFilter} onChange={(val) => logic.setMonthFilter(String(val))} placeholder="All Months" /></div>
      <div className="w-40"><AdminSearchableDropdown options={PAYOUT_GYM_OPTIONS} value={logic.gymFilter} onChange={(val) => logic.setGymFilter(String(val))} placeholder="All Gyms" /></div>
      <div className="w-40"><AdminSearchableDropdown options={PAYOUT_STATUS_OPTIONS} value={logic.statusFilter} onChange={(val) => logic.setStatusFilter(String(val))} placeholder="All Status" /></div>
    </div>
    {logic.status === 'pending' ? <AdminTableSkeleton rows={6} cols={HEADERS.length} /> : <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-primary/5 border-b border-border">
        {HEADERS.map((h) => <th key={h.key} onClick={() => logic.onPayoutSort(h.key)} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap cursor-pointer select-none" aria-sort={logic.payoutSortKey===h.key ? (logic.payoutSortDir==='asc'?'ascending':'descending') : 'none'}><div className="flex items-center gap-1.5">{h.label}<SortIcon column={h.key} sortKey={logic.payoutSortKey} sortDir={logic.payoutSortDir} /></div></th>)}
      </tr></thead><tbody className="divide-y divide-border">
        {logic.payouts.length === 0 ? <tr><td colSpan={HEADERS.length} className="px-4 py-14 text-center text-sm text-secondary">No payout records found for the current filters.</td></tr> : logic.payouts.map((p) => <tr key={`${p.gymId}-${p.month}`} className="hover:bg-primary/5 motion-safe:transition-colors cursor-pointer" tabIndex={0}>
          <td className="px-4 py-3 text-sm font-medium text-foreground">{p.gymName}</td><td className="px-4 py-3 text-sm text-secondary">{p.month}</td><td className="px-4 py-3 text-sm text-foreground font-medium">{formatCurrency(p.grossRevenue)}</td><td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.staffPayroll)}</td><td className="px-4 py-3 text-sm text-danger">{formatCurrency(p.operationalExpenses)}</td><td className="px-4 py-3 text-sm text-secondary">{formatCurrency(p.platformFee)}</td><td className="px-4 py-3 text-sm font-bold text-success">{formatCurrency(p.netProfit)}</td>
          <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[p.payoutStatus]}`}>{p.payoutStatus==='paid'?<CheckCircle size={11}/>:p.payoutStatus==='processing'?<Loader2 size={11} className="motion-safe:animate-spin"/>:<Clock size={11}/>} {p.payoutStatus}</span></td>
        </tr>)}
      </tbody></table></div><div className="border-t border-border"><AdminPagination currentPage={logic.currentPage} totalPages={logic.totalPages} onPageChange={logic.setCurrentPage} totalItems={logic.totalItems} itemsPerPage={10}/></div>
    </div>}
  </div>;
}
