"use client";

import { pendingReport } from '@/app/(erp)/sales/sales_utils/SalesSharedConstants';
import { useSalesContext } from '@/app/(erp)/sales/sales_context/SalesContext';
import ErpPagination from '@/app/(erp)/erp_components/ErpPagination';

export default function PendingPayments() {
  const { search, currentPage, setCurrentPage } = useSalesContext();
  
  const filtered = pendingReport.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.plan.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
  <div>
  <p className="text-sm text-[var(--sales-text-secondary)] mb-4">
  {filtered.length} members with pending payments
  </p>
  <div className="space-y-3">
  {paginated.map((p, i) => (
  <div key={i} className="flex items-center justify-between p-4 border border-[var(--sales-border)] rounded-xl hover:border-[var(--warning)] dark:hover:border-[var(--warning)] transition-colors bg-[var(--sales-bg-card)]">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] rounded-full flex items-center justify-center text-[var(--danger)] dark:text-[var(--danger)] font-semibold text-sm">
 {p.name.charAt(0)}
 </div>
 <div>
 <p className="font-medium text-[var(--sales-text-primary)]">{p.name}</p>
 <p className="text-xs text-[var(--sales-text-secondary)]">{p.plan} Plan</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-right">
 <p className="font-bold text-[var(--danger)] dark:text-[var(--danger)]">{p.amount}</p>
 <p className="text-xs text-[var(--sales-text-secondary)] opacity-80">{p.overdue} days overdue</p>
 </div>
 <button 
 className="px-3 py-1.5 text-xs text-white rounded-lg font-medium transition-opacity hover:opacity-90" 
 style={{ background: 'var(--sales-highlight)' }}
 >
 Send Reminder
 </button>
 </div>
 </div>
  ))}
  {paginated.length === 0 && (
    <div className="text-center py-8 text-[var(--sales-text-secondary)] border border-[var(--sales-border)] rounded-xl">
      No pending payments found.
    </div>
  )}
  </div>
  {totalPages > 1 && (
    <div className="mt-4 pt-4 border-t border-[var(--sales-border)]">
      <ErpPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        colors={{
          text: 'var(--sales-text-secondary)',
          textActive: 'white',
          bgActive: 'var(--sales-highlight)',
          border: 'var(--sales-border)',
          hoverBg: 'var(--sales-highlight-subtle)'
        }}
      />
    </div>
  )}
  </div>
  );
}
