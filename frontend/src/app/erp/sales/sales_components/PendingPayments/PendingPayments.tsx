// RESPONSIBILITY: Provides the implementation for PendingPayments.tsx functionality within its module.
"use client";

import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';
import type { PendingPaymentMember } from '@/app/erp/sales/sales_types/sales_types';
import { ERP_ITEMS_PER_PAGE } from '@/app/erp/erp_utils/ErpSharedConstants';

export default function PendingPayments() {
  const { currentPage, setCurrentPage, pendingPayments, pendingTotal, fetchState, showToast } = useSalesContext();
  
    const totalPages = Math.ceil(pendingTotal / ERP_ITEMS_PER_PAGE) || 1;

  if (fetchState === 'loading') {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center justify-between p-4 border border-border rounded-xl bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-muted rounded-full"></div>
              <div>
                <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-4 bg-muted rounded w-16 mb-1 ml-auto"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
              <div className="w-24 h-8 bg-muted rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
  <div>
  <p className="text-sm text-secondary mb-4">
  {pendingTotal} members with pending payments
  </p>
  <div className="space-y-3">
  {pendingPayments.map((p: PendingPaymentMember, i: number) => (
  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-warning dark:hover:border-warning transition-colors bg-card">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 bg-danger-bg dark:bg-danger-bg rounded-full flex items-center justify-center text-destructive dark:text-destructive font-semibold text-sm">
 {p.name.charAt(0)}
 </div>
 <div>
 <p className="font-medium text-foreground">{p.name}</p>
 <p className="text-xs text-secondary">{p.plan || 'Standard'} Plan</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="text-right">
 <p className="font-bold text-destructive dark:text-destructive">₹{p.pendingAmount?.toLocaleString() || 0}</p>
 <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} days overdue</p>
 </div>
 <button 
 onClick={() => showToast(`Reminder sent to ${p.name}`, 'success')}
 className="px-3 py-1.5 text-xs text-primary-foreground bg-primary rounded-lg font-medium transition-colors hover:bg-primary/90" 
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
      />
    </div>
  )}
  </div>
  );
}
