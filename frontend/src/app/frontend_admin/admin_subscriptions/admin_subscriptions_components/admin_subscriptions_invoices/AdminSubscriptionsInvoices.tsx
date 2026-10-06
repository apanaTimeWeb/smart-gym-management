"use client";
// RESPONSIBILITY: Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions.
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatters';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatCurrency';

import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import { CheckCircle, Clock, Download, FileText, RotateCcw, XCircle } from 'lucide-react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_hooks/useAdminSubscriptionsLogic';
import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsConstants';
import { AdminSubscriptionsEmptyState } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_components/admin_subscriptions_empty_state/AdminSubscriptionsEmptyState';
import type { InvoiceStatus } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_types/AdminSubscriptionsTypes';
import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_constants/AdminSubscriptionsConstants';

/**
 * renderInvoiceStatusIcon is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function renderInvoiceStatusIcon(status: InvoiceStatus) {
  if (status === ADMIN_SUBSCRIPTIONS_INVOICE_STATUS.PAID) return <CheckCircle size={18} aria-hidden="true"  strokeWidth={2}/>;
  if (status === ADMIN_SUBSCRIPTIONS_INVOICE_STATUS.PENDING) return <Clock size={18} aria-hidden="true"  strokeWidth={2}/>;
  if (status === ADMIN_SUBSCRIPTIONS_INVOICE_STATUS.FAILED) return <XCircle size={18} aria-hidden="true"  strokeWidth={2}/>;
  return <RotateCcw size={18} aria-hidden="true"  strokeWidth={2}/>;
}

/**
 * AdminSubscriptionsInvoices renders the admin subscriptions invoices UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsInvoices: Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions.
 * @dependencies Consumes AdminSubscriptionsFormatters, AdminSubscriptionsFormatCurrency, AdminLayoutPagination, useAdminSubscriptionsLogic, AdminSubscriptionsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsInvoices() {
  const locale = useLocale();
  const t = useTranslations();

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
          <FileText size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/>
          <h3 className="text-sm font-semibold text-primary">{t('subscriptions.admin_subscriptions_invoices.text_50d038cf02')}</h3>
        </div>
        <span className="text-xs text-secondary">{invoiceTotal} {t('subscriptions.admin_subscriptions_invoices.text_c3e815afba')}</span>
      </div>
      {invoices.length === 0 ? (
        <AdminSubscriptionsEmptyState
          title={t('subscriptions.admin_subscriptions_invoices.text_5e193a73d8')}
          description={t('subscriptions.admin_subscriptions_invoices.auto_e1af0c24ca')}
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table data-admin-responsive-table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-highlight">
                  {['subscriptions.admin_subscriptions_invoices.invoice', 'subscriptions.admin_subscriptions_invoices.date', 'subscriptions.admin_subscriptions_invoices.plan', 'subscriptions.admin_subscriptions_invoices.billing', 'subscriptions.admin_subscriptions_invoices.amount', 'subscriptions.admin_subscriptions_invoices.status', ''].map((header) => (
                    <th key={header} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-secondary">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice , __testIdIndex73) => {
                  const statusStyle = ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES[invoice.status];

                  return (
                    <tr key={invoice.id} className="motion-safe:transition-colors hover:bg-input motion-safe:duration-base">
                      <td className="px-4 py-3 text-sm font-bold text-primary">{invoice.invoiceNo}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-secondary">
                        {formatDate(invoice.date, locale)}
                      </td>
                      <td className="px-4 py-3 text-sm text-primary">{invoice.planName}</td>
                      <td className="px-4 py-3 text-xs capitalize text-secondary">{invoice.billingCycle}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary">{AdminSubscriptionsFormatCurrency(invoice.amount, undefined, locale)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.backgroundClass} ${statusStyle.textClass}`}>
                          {renderInvoiceStatusIcon(invoice.status)}
                          {t(statusStyle.labelKey)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => window.open(invoice.pdfUrl, '_blank', 'noopener,noreferrer')}
                          className="min-h-11 min-w-11 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-input hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
                          aria-label={t('admin_subscriptions_invoices.auto_download', { invoice: invoice.invoiceNo })}
                          title={t('admin_subscriptions_invoices.auto_download', { invoice: invoice.invoiceNo })}
                         data-testid={`admin_subscriptions-admin_subscriptions-invoices-click-map73-${__testIdIndex73}-1`}>
                          <Download size={18} aria-hidden="true"  strokeWidth={2}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-3">
            <AdminLayoutPagination
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
