"use client";
import { format } from 'date-fns';
// RESPONSIBILITY: Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via SalesContext.
import { formatCurrency, formatNumber} from '@/lib/formatters';

import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import { SalesUrlConfig } from '@/app/admin/sales/admin_sales_url_config';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import AdminSalesEmptyState from '@/app/admin/sales/sales_components/AdminSalesEmptyState/AdminSalesEmptyState';
import type { PendingPaymentMember } from '@/app/admin/sales/sales_types/AdminSalesTypes';
import { GYM_DETAILS } from '@/app/admin/admin_url_config';
const SALES_ITEMS_PER_PAGE = 10;
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';

export default function AdminSalesPendingPayments() {
  const { currentPage, setCurrentPage, pendingPayments, pendingTotal, status } = useAdminSalesLogic();

  const totalPages = Math.ceil(pendingTotal / SALES_ITEMS_PER_PAGE) || 1;

  if (status === 'pending') {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={`sales-pending-skeleton-${i}`} className="motion-safe:animate-pulse flex items-center justify-between p-4 border border-border rounded-xl bg-card motion-safe:duration-base">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-input rounded-full"></div>
              <div>
                <div className="h-4 bg-input rounded w-24 mb-1"></div>
                <div className="h-3 bg-input rounded w-16"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-4 bg-input rounded w-16 mb-1 ml-auto"></div>
                <div className="h-3 bg-input rounded w-20"></div>
              </div>
              <div className="w-24 h-8 bg-input rounded-lg"></div>
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
          <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-warning motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger rounded-full flex items-center justify-center text-on-danger font-semibold text-sm">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-secondary">{p.plan || 'Standard'} Plan</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-danger">{formatCurrency(p.pendingAmount || 0)}</p>
                <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} days overdue</p>
              </div>
              <button
                onClick={() => {
                  const waText = WhatsAppFormatter.formatReceipt({
                    title: GYM_DETAILS.name,
                    subtitle: 'Payment Reminder',
                    date: format(new Date(), 'dd MMM yyyy'),
                    customerInfo: {
                      'Member': p.name,
                      'Plan': p.plan || 'Standard',
                    },
                    sections: [
                      {
                        title: 'Outstanding Dues',
                        items: {
                          'Pending Amount': formatCurrency(p.pendingAmount ?? 0),
                          'Overdue By': `${p.daysOverdue || 0} days`,
                        }
                      }
                    ],
                    footer: 'Please clear dues ASAP to avoid service interruption.'
                  });
                  window.open(SalesUrlConfig.EXTERNAL.WHATSAPP_WEB(p.phone ?? '', waText), '_blank', 'noopener,noreferrer');
                }}
                className="px-3 py-1.5 text-xs text-on-primary bg-primary rounded-lg font-medium motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Open Reminder in WhatsApp
              </button>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <AdminSalesEmptyState message="No pending payments" subtext="All members are up to date." />
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
