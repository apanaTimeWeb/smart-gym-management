"use client";
import { format } from 'date-fns';
// RESPONSIBILITY: Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions.
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';

import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import { CheckCircle, Clock, Download, FileText, RotateCcw, XCircle } from 'lucide-react';
import { useAdminSubscriptionsLogic } from '@/app/admin/subscriptions/subscriptions_context/useAdminSubscriptionsLogic';
import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES } from '@/app/admin/subscriptions/subscriptions_utils/AdminSubscriptionsInvoiceStatusStyles';
import { AdminSubscriptionsEmptyState } from '@/app/admin/subscriptions/subscriptions_components/AdminSubscriptionsEmptyState/AdminSubscriptionsEmptyState';
import type { InvoiceStatus } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

function renderInvoiceStatusIcon(status: InvoiceStatus) {
  if (status === 'paid') return <CheckCircle size={12} aria-hidden="true" />;
  if (status === 'pending') return <Clock size={12} aria-hidden="true" />;
  if (status === 'failed') return <XCircle size={12} aria-hidden="true" />;
  return <RotateCcw size={12} aria-hidden="true" />;
}

export default function AdminSubscriptionsInvoices() {
  const {
    invoices,
    currentInvoicePage,
    setCurrentInvoicePage,
    invoiceTotal,
    invoiceTotalPages,
    invoiceItemsPerPage,
  } = useAdminSubscriptionsLogic();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-primary" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-primary">Invoice History</h3>
        </div>
        <span className="text-xs text-secondary">{invoiceTotal} invoices</span>
      </div>
      {invoices.length === 0 ? (
        <AdminSubscriptionsEmptyState
          title="No invoices yet"
          description="Invoice history will appear here after subscription billing activity is recorded."
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table data-admin-responsive-table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-highlight">
                  {['Invoice #', 'Date', 'Plan', 'Billing', 'Amount', 'Status', ''].map((header) => (
                    <th key={header} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-secondary">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => {
                  const statusStyle = ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES[invoice.status];

                  return (
                    <tr key={invoice.id} className="motion-safe:transition-colors hover:bg-input motion-safe:duration-base">
                      <td className="px-4 py-3 text-sm font-bold text-primary">{invoice.invoiceNo}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-secondary">
                        {format(new Date(invoice.date), 'dd MMM yyyy')}
                      </td>
                      <td className="px-4 py-3 text-sm text-primary">{invoice.planName}</td>
                      <td className="px-4 py-3 text-xs capitalize text-secondary">{invoice.billingCycle}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary">{formatCurrency(invoice.amount)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.backgroundClass} ${statusStyle.textClass}`}>
                          {renderInvoiceStatusIcon(invoice.status)}
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => window.open(invoice.pdfUrl, '_blank', 'noopener,noreferrer')}
                          className="min-h-11 min-w-11 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-input hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                          aria-label={`Download ${invoice.invoiceNo}`}
                          title={`Download ${invoice.invoiceNo}`}
                        >
                          <Download size={14} aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-3">
            <AdminPagination
              currentPage={currentInvoicePage}
              totalPages={invoiceTotalPages}
              totalItems={invoiceTotal}
              itemsPerPage={invoiceItemsPerPage}
              onPageChange={setCurrentInvoicePage}
            />
          </div>
        </>
      )}
    </div>
  );
}
