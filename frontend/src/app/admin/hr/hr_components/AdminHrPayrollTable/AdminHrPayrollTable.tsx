"use client";
// RESPONSIBILITY: Renders the Admin HR payroll list from the server-backed query, keeping search/month/sort/pagination state in the feature URL.

import { formatCurrency } from '@/lib/formatters';
import { useHrContext } from '@/app/admin/hr/hr_context/AdminHrContext';
import type { AdminHrPayrollSortKey } from '@/app/admin/hr/hr_types/AdminHrUiTypes';
import type { AdminHrSortDirection } from '@/app/admin/hr/hr_types/AdminHrSortTypes';
import { CheckCircle2, Download, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { PAYROLL_TABLE_HEADERS, HR_ITEMS_PER_PAGE } from '@/app/admin/hr/hr_utils/AdminHrSharedConstants';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import AdminHrEmptyState from '@/app/admin/hr/hr_components/AdminHrEmptyState/AdminHrEmptyState';

const PAYROLL_SORT_KEYS: Partial<Record<string, AdminHrPayrollSortKey>> = { Staff: 'staffName', Month: 'month', 'Net Payable': 'amount', 'Paid Amount': 'paidAmount', Pending: 'pendingAmount', Status: 'status', 'Paid On': 'paidAt' };

function SortIndicator({ active, direction }: { active: boolean; direction: AdminHrSortDirection }) {
  if (!active) return <ChevronsUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />;
  return direction === 'asc' ? <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" /> : <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />;
}

export default function AdminHrPayrollTable() {
  const { payrolls, currentPage, setCurrentPage, setPaymentModal, setShowPayrollModal, status, totalPayrolls, staff, payrollSortKey, payrollSortDir, setPayrollSort } = useHrContext();
  const handleSort = (key: AdminHrPayrollSortKey) => setPayrollSort(key, payrollSortKey === key && payrollSortDir === 'asc' ? 'desc' : 'asc');
  const renderHeader = (header: string) => {
    const key = PAYROLL_SORT_KEYS[header];
    if (!key) return header;
    return <button type="button" onClick={() => handleSort(key)} className="inline-flex min-h-[44px] items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded" aria-label={`Sort by ${header}`} >{header}<SortIndicator active={payrollSortKey === key} direction={payrollSortDir} /></button>;
  };

  if (status === 'pending') return <div className="flex flex-col h-full"><div className="overflow-x-auto flex-1"><table data-admin-responsive-table className="w-full"><thead className="bg-input text-secondary"><tr>{PAYROLL_TABLE_HEADERS.map((header) => <th key={header} aria-sort={PAYROLL_SORT_KEYS[header] && payrollSortKey === PAYROLL_SORT_KEYS[header] ? (payrollSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-border">{['payroll-skeleton-1','payroll-skeleton-2','payroll-skeleton-3','payroll-skeleton-4','payroll-skeleton-5'].map((key) => <tr key={key} className="motion-safe:animate-pulse bg-card motion-safe:duration-base">{['a','b','c','d','e','f','g','h'].map((cell) => <td key={`${key}-${cell}`} className="px-4 py-4"><div className="h-4 bg-skeleton-base rounded w-24" /></td>)}<td className="px-4 py-4"><div className="h-8 bg-skeleton-base rounded w-24 ml-auto" /></td></tr>)}</tbody></table></div></div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4"><button type="button" onClick={() => setShowPayrollModal(true)} className="min-h-[44px] flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base">Bulk Generate Payroll</button></div>
      <div className="overflow-x-auto flex-1"><table data-admin-responsive-table className="w-full"><thead className="bg-input text-secondary"><tr>{PAYROLL_TABLE_HEADERS.map((header) => <th key={header} aria-sort={PAYROLL_SORT_KEYS[header] && payrollSortKey === PAYROLL_SORT_KEYS[header] ? (payrollSortDir === 'asc' ? 'ascending' : 'descending') : 'none'} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{renderHeader(header)}</th>)}<th className="text-right text-xs font-semibold uppercase tracking-wider px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-border">
        {payrolls.map((payroll) => { const salary = staff.find((member) => member.id === payroll.staffId)?.salary ?? 0; return <tr key={payroll.id} className="motion-safe:transition-colors hover:bg-surface-hover bg-card motion-safe:duration-base"><td className="px-4 py-3"><p className="text-sm font-medium text-primary">{payroll.staff?.name || `Staff #${payroll.staffId}`}</p><div className="text-xs text-secondary">{payroll.staff?.role}</div></td><td className="px-4 py-3 text-sm text-primary">{payroll.month}</td><td className="px-4 py-3 text-sm font-medium text-right">{formatCurrency(salary)}</td><td className="px-4 py-3 text-sm font-bold text-primary text-right">{formatCurrency(payroll.amount || 0)}</td><td className="px-4 py-3 text-sm font-bold text-success text-right">{formatCurrency(payroll.paidAmount || 0)}</td><td className="px-4 py-3 text-sm font-bold text-danger text-right">{formatCurrency(payroll.pendingAmount || 0)}</td><td className="px-4 py-3"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${payroll.status.toLowerCase() === 'paid' ? 'bg-success text-success' : 'bg-warning text-warning'}`}>{payroll.status}</span></td><td className="px-4 py-3 text-sm text-secondary">{payroll.paidAt ? new Date(payroll.paidAt).toLocaleDateString('en-IN') : '—'}</td><td className="px-4 py-3 text-right"><div className="flex justify-end gap-2"><button type="button" onClick={() => { const csv = `Employee,Month,Amount,Status\n${payroll.staff?.name ?? payroll.staffId},${payroll.month},${payroll.amount},${payroll.status}`; const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `payslip-${payroll.id}.csv`; anchor.click(); URL.revokeObjectURL(url); }} className="min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-secondary border border-border rounded-lg hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base" aria-label={`Download payslip for ${payroll.staff?.name ?? payroll.staffId}`}><Download size={16} /> Payslip</button>{payroll.status.toLowerCase() !== 'paid' && <button type="button" onClick={() => setPaymentModal({ payrollId: payroll.id, staffName: payroll.staff?.name || `Staff #${payroll.staffId}`, pendingAmount: payroll.pendingAmount })} className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-on-success bg-primary rounded-lg hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base" aria-label={`Pay ${payroll.staff?.name ?? payroll.staffId}`}><CheckCircle2 size={16} /> Pay</button>}</div></td></tr>; })}
        {payrolls.length === 0 && <tr><td colSpan={PAYROLL_TABLE_HEADERS.length + 1}><AdminHrEmptyState title="No payroll records found" description="No payroll records match the selected filters." /></td></tr>}
      </tbody></table></div>
      <AdminPagination currentPage={currentPage} totalPages={Math.max(1, Math.ceil(totalPayrolls / HR_ITEMS_PER_PAGE))} totalItems={totalPayrolls} itemsPerPage={HR_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
