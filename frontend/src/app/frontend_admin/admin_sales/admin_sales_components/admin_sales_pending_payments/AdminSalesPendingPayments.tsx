"use client";
// RESPONSIBILITY: Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state.
import { buildAdminSalesWhatsAppWebUrl } from '@/app/frontend_admin/admin_sales/admin_sales_constants/AdminSalesExternalUrlConstants';
import { useLocale, useTranslations } from 'next-intl';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatCurrency';
import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';
import { formatDate } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatters';

import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';

import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_empty_state/AdminSalesEmptyState';
import type { PendingPaymentMember } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';
import { ADMIN_GYM_CONFIGURATION } from '@/app/frontend_admin/admin_layout/admin_layout_config/AdminLayoutGymConfiguration';
import { SALES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_sales/admin_sales_constants/AdminSalesConstants';
import { AdminSalesWhatsAppFormatter } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesWhatsAppFormatter';

/**
 * AdminSalesPendingPayments renders the admin sales pending payments UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesPendingPayments: Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state.
 * @dependencies Consumes AdminSalesFormatCurrency, AdminSalesFormatters, useAdminSalesLogic, admin_sales_url_config, AdminLayoutPagination.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesPendingPayments() {
  const locale = useLocale();
  const t = useTranslations();

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
        {pendingTotal} {t('sales.admin_sales_pending_payments.text_315dc9e5fb')}</p>
      <div className="space-y-3">
        {pendingPayments.map((p: PendingPaymentMember , __testIdIndex61) => (
          <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger rounded-full flex items-center justify-center text-on-danger font-semibold text-sm" data-testid={`admin_sales-adminsalespendingpayments-status-1-map61-${__testIdIndex61}-1`}>
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-secondary">{displayValue(p.plan)} {t('sales.admin_sales_pending_payments.text_ae2f98a099')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-danger">{AdminSalesFormatCurrency(p.pendingAmount || 0, undefined, locale)}</p>
                <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} {t('sales.admin_sales_pending_payments.text_acb1814fce')}</p>
              </div>
              <button type="button"
                onClick={() => {
                  const waText = AdminSalesWhatsAppFormatter.formatReceipt({
                    title: ADMIN_GYM_CONFIGURATION.name,
                    subtitle: t('sales.admin_sales_pending_payments.whatsappReminderTitle'),
                    date: formatDate(new Date().toISOString(), locale),
                    customerInfo: {
                      [t('sales.admin_sales_pending_payments.whatsappMemberLabel')]: p.name,
                      [t('sales.admin_sales_pending_payments.text_ae2f98a099')]: p.plan ?? '—',
                    },
                    sections: [
                      {
                        title: t('sales.admin_sales_pending_payments.whatsappOutstandingDues'),
                        items: {
                          [t('sales.admin_sales_pending_payments.whatsappPendingAmount')]: AdminSalesFormatCurrency(p.pendingAmount ?? 0, undefined, locale),
                          [t('sales.admin_sales_pending_payments.whatsappOverdueBy')]: `${p.daysOverdue || 0} ${t('sales.admin_sales_pending_payments.text_acb1814fce')}`,
                        }
                      }
                    ],
                    footer: t('sales.admin_sales_pending_payments.whatsappFooter')
                  });
                  window.open(buildAdminSalesWhatsAppWebUrl(p.phone ?? '', waText), '_blank', 'noopener,noreferrer');
                }}
                className="px-3 py-1.5 text-xs text-on-primary bg-primary rounded-lg font-medium motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11"
               data-testid={`admin_sales-admin_sales-pending-payments-click-map61-${__testIdIndex61}-2`}>
                {t('sales.admin_sales_pending_payments.text_f3789fc9e6')}</button>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <AdminSalesEmptyState message={t('sales.admin_sales_pending_payments.auto_6f3655f8b3')} subtext={t('sales.admin_sales_pending_payments.auto_d5bc7150da')} />
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
          <AdminLayoutPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
