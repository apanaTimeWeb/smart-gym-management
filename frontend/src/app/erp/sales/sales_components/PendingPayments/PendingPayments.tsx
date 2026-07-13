"use client";


import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function PendingPayments() {
  const { currentPage, setCurrentPage, pendingPayments, pendingTotal, loading } = useSalesContext();
  
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(pendingTotal / ITEMS_PER_PAGE) || 1;

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
  <div>
  <p className="text-sm text-secondary mb-4">
  {pendingTotal} members with pending payments
  </p>
  <div className="space-y-3">
  {pendingPayments.map((p: any, i: number) => (
  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-warning dark:hover:border-warning transition-colors bg-card">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-danger-bg dark:bg-danger-bg rounded-full flex items-center justify-center text-destructive dark:text-destructive font-semibold text-sm">
 {p.name.charAt(0)}
 </div>
 <div>
 <p className="font-medium text-foreground">{p.name}</p>
 <p className="text-xs text-secondary">{p.plan} Plan</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-right">
 <p className="font-bold text-destructive dark:text-destructive">₹{p.pendingAmount?.toLocaleString() || 0}</p>
 <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} days overdue</p>
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
  {pendingPayments.length === 0 && (
    <div className="text-center py-8 text-secondary border border-border rounded-xl">
      No pending payments found.
    </div>
  )}
  </div>
  {totalPages > 1 && (
    <div className="mt-4 pt-4 border-t border-border">
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
