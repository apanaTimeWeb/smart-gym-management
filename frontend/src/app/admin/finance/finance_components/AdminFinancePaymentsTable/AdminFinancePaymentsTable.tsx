"use client";

// RESPONSIBILITY: Renders the read-only paginated Finance payment history returned by TanStack Query.
import { formatCurrency } from '@/lib/formatters';
import type { AdminFinancePaymentSortKey } from '@/app/admin/finance/finance_types/AdminFinanceUiTypes';
import type { AdminSortDirection } from '@/app/admin/admin_types/AdminSortTypes';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useAdminFinanceLogic } from '@/app/admin/finance/finance_context/useAdminFinanceLogic';
import { PAYMENTS_TABLE_HEADERS, FINANCE_METHOD_STYLES, FINANCE_STATUS_STYLES } from '@/app/admin/finance/finance_utils/AdminFinanceSharedConstants';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { ADMIN_ITEMS_PER_PAGE } from '@/app/admin/admin_url_config';

export default function AdminFinancePaymentsTable() {
  const { payments, totalPayments, status, currentPage, setCurrentPage } = useAdminFinanceLogic();
  const [sortKey, setSortKey] = useState<AdminFinancePaymentSortKey>('paidAt');
  const [sortDir, setSortDir] = useState<AdminSortDirection>('desc');
  const sortedPayments = useMemo(() => [...payments].sort((a,b)=>{const av=sortKey==='member'?a.member?.name:a[sortKey]; const bv=sortKey==='member'?b.member?.name:b[sortKey]; const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true}); return sortDir==='asc'?result:-result;}), [payments,sortKey,sortDir]);
  const handleSort=(key:AdminFinancePaymentSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};
  const totalPages = Math.max(1, Math.ceil(totalPayments / ADMIN_ITEMS_PER_PAGE));

  if (status === 'pending') {
    return (
      <div className="overflow-x-auto" aria-busy="true" aria-label="Loading payments">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>{PAYMENTS_TABLE_HEADERS.map((header,index) => { const keys: AdminFinancePaymentSortKey[]=['invoiceNo','member','amount','method','status','paidAt']; const key=keys[index]; return <th key={header} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{header}{key && <button type="button" onClick={()=>handleSort(key)} className="ml-1 inline-flex align-middle" aria-label={`Sort by ${header}`} title={`Sort by ${header}`}>{sortKey===key?(sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>):<ChevronsUpDown size={13} className="text-disabled"/>}</button>}</th>; })}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }, (_, index) => (
              <tr key={`payment-skeleton-${index}`}>
                {PAYMENTS_TABLE_HEADERS.map((header) => <td key={header} className="px-4 py-4"><div className="h-4 rounded bg-muted motion-safe:animate-pulse" /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (status === 'error') {
    return <div className="rounded-2xl border border-danger/30 bg-card px-6 py-12 text-center"><p className="font-medium text-danger">Failed to load payments.</p><p className="mt-1 text-sm text-secondary">Please check your connection and try again.</p></div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>{PAYMENTS_TABLE_HEADERS.map((header,index) => { const keys: AdminFinancePaymentSortKey[]=['invoiceNo','member','amount','method','status','paidAt']; const key=keys[index]; return <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">{header}{key && <button type="button" onClick={()=>handleSort(key)} className="ml-1 inline-flex align-middle" aria-label={`Sort by ${header}`} title={`Sort by ${header}`}>{sortKey===key?(sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>):<ChevronsUpDown size={13} className="text-disabled"/>}</button>}</th>; })}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.length === 0 ? (
              <tr><td colSpan={PAYMENTS_TABLE_HEADERS.length} className="py-10 text-center text-sm text-secondary">No payments found for the current filters.</td></tr>
            ) : sortedPayments.map((payment) => {
              const methodStyle = FINANCE_METHOD_STYLES[payment.method] ?? { bg: 'bg-input', text: 'text-secondary' };
              const statusStyle = FINANCE_STATUS_STYLES[payment.status] ?? { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={payment.id} className="bg-card hover:bg-primary/5 motion-safe:transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-secondary">{payment.invoiceNo}</td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">{payment.member?.name ?? `Member #${payment.memberId}`}</td>
                  <td className="px-4 py-3 text-sm font-bold text-success">{formatCurrency(payment.amount)}</td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${methodStyle.bg} ${methodStyle.text}`}>{payment.method}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>{payment.status}</span></td>
                  <td className="px-4 py-3 text-sm text-secondary">{new Date(payment.paidAt).toLocaleDateString('en-IN')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <AdminPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalPayments} itemsPerPage={ADMIN_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
      </div>
    </>
  );
}
