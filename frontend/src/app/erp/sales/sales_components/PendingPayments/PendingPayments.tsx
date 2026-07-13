// RESPONSIBILITY: Renders the list of members with pending payments, including pagination and overdue details. Receives data via SalesContext.
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
        {pendingPayments.map((p: PendingPaymentMember) => (
          <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-warning transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger-bg rounded-full flex items-center justify-center text-danger font-semibold text-sm">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-secondary">{p.plan || 'Standard'} Plan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-danger">₹{p.pendingAmount?.toLocaleString() || 0}</p>
                <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} days overdue</p>
              </div>
              <button 
                onClick={() => showToast(`Reminder sent to ${p.name}`, 'success')}
                className="px-3 py-1.5 text-xs text-primary-foreground bg-primary rounded-lg font-medium transition-all duration-200 ease-in-out hover:bg-primary/90 active:scale-95" 
              >
                Send Reminder
              </button>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <div className="text-center py-8 text-secondary border border-border rounded-xl">
            No pending payments yet
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
