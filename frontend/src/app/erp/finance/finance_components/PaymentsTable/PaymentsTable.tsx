// RESPONSIBILITY: PaymentsTable.tsx handles the logic and UI for its corresponding feature.
"use client";

import { useFinanceContext } from '@/app/erp/finance/finance_context/FinanceContext';
import { PAYMENTS_TABLE_HEADERS, FINANCE_METHOD_STYLES, FINANCE_STATUS_STYLES } from '@/app/erp/finance/finance_utils/FinanceSharedConstants';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';
import { Loader2 } from 'lucide-react';

const fmt = (n: number) => '₹' + (n || 0).toLocaleString('en-IN');

export default function PaymentsTable() {
  const { payments, totalPayments, loading, search, currentPage, setCurrentPage } = useFinanceContext();
  
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalPayments / ITEMS_PER_PAGE) || 1;

 if (loading) {
 return (
 <div className="flex justify-center py-10">
 <Loader2 className="w-8 h-8 animate-spin text-primary" />
 </div>
 );
 }

 return (
 <>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-input text-secondary">
 <tr>
 {PAYMENTS_TABLE_HEADERS.map(h => (
 <th key={h} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {payments.map(p => {
 const mStyle = FINANCE_METHOD_STYLES[p.method] || { bg: 'bg-input', text: 'text-secondary' };
 const sStyle = FINANCE_STATUS_STYLES[p.status] || { bg: 'bg-input', text: 'text-secondary' };
 return (
 <tr key={p.id} className="transition-colors hover:bg-primary/5 bg-card">
 <td className="px-4 py-3 text-sm font-mono text-secondary">{p.invoiceNo}</td>
 <td className="px-4 py-3 text-sm font-medium text-foreground">{p.member?.name || `Member #${p.memberId}`}</td>
 <td className="px-4 py-3 text-sm font-bold text-success">{fmt(p.amount)}</td>
 <td className="px-4 py-3">
 <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${mStyle.bg} ${mStyle.text}`}>
 {p.method}
 </span>
 </td>
 <td className="px-4 py-3">
 <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${sStyle.bg} ${sStyle.text}`}>
 {p.status}
 </span>
 </td>
 <td className="px-4 py-3 text-sm text-secondary">
 {new Date(p.paidAt).toLocaleDateString('en-IN')}
 </td>
 </tr>
 );
 })}
 {payments.length === 0 && (
 <tr>
 <td colSpan={6} className="text-center py-10 text-sm text-secondary">
 No payments recorded yet.
 </td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 {totalPages > 1 && !loading && (
    <div className="mt-4 pt-4 border-t border-border">
      <ErpPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalPayments}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  )}
 </>
 );
}
