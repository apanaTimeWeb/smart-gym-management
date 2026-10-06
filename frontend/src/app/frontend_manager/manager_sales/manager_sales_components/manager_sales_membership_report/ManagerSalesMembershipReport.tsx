// RESPONSIBILITY: Renders ManagerSalesMembershipReport's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations, useLocale } from 'next-intl';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import ManagerSalesMembershipReportEmptyState from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_membership_report/ManagerSalesMembershipReportEmptyState';
import { useManagerSalesLogic } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic';
import { ManagerSalesFormatCurrency } from '@/app/frontend_manager/manager_sales/manager_sales_utils/ManagerSalesFormatters';


/**
 * @description Renders/orchestrates the ManagerSalesMembershipReport user interface for the sales module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_sales/manager_sales_utils/ManagerSalesFormatters; @/components/ui/manager_pagination/ManagerPagination; @/app/frontend_manager/manager_infrastructure/ManagerEnvConfig; @/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults; @/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_membership_report/ManagerSalesMembershipReportEmptyState
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const SALES_MEMBERSHIP_REPORT_COLUMN_COUNT = 5;

/** @description Renders the ManagerSalesMembershipReport component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerSalesMembershipReport() {
  const t = useTranslations('MANAGER_SALES');
  const locale = useLocale();

  const { currentPage, setCurrentPage, membershipReport, membershipReportTotal, membershipTotals, isPending, isError, errorMessage } = useManagerSalesLogic();
  
  const totalPages = Math.max(1, Math.ceil(membershipReportTotal / MANAGER_ITEMS_PER_PAGE));
  const paginated = membershipReport;

  if (isPending) {
    return (
      <div className="space-y-2 p-4" aria-label={t("COPY_LOADING_MEMBERSHIP_REPORT")}><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /></div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-secondary">{t("COPY_RETRY_REQUEST_4")}</span>
      </div>
    );
  }

  return (
  <>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-input">
 <tr>
 {[t('COPY_PLAN'), t('COPY_TOTAL_RECEIVABLE'), t('COPY_AMOUNT_RECEIVED'), t('COPY_REMAINING'), t('COPY_REFUND')].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
  <tbody className="divide-y divide-border">
  {paginated.length > 0 ? (
    paginated.map((r) => (
      <tr key={r.plan} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
      <td className="px-4 py-3 text-sm font-medium text-primary">{r.plan || ''}</td>
      <td className="px-4 py-3 text-sm text-secondary">{ManagerSalesFormatCurrency(r.receivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm font-medium text-success ">{ManagerSalesFormatCurrency(r.received || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm font-medium text-warning ">{ManagerSalesFormatCurrency(r.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm text-danger">{ManagerSalesFormatCurrency(r.refund || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={SALES_MEMBERSHIP_REPORT_COLUMN_COUNT} className="px-4 py-8 text-center text-sm text-secondary">
        <ManagerSalesMembershipReportEmptyState />
      </td>
    </tr>
  )}
 <tr className="bg-input font-semibold border-t-2 border-border">
 <td className="px-4 py-3 text-sm text-primary">{t("COPY_TOTAL")}</td>
          <td className="px-4 py-3 text-sm text-primary">{ManagerSalesFormatCurrency(membershipTotals.totalReceivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-success ">{ManagerSalesFormatCurrency(membershipTotals.totalReceived || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-warning ">{ManagerSalesFormatCurrency(membershipTotals.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-danger ">{ManagerSalesFormatCurrency(membershipTotals.refunds || 0, ManagerEnvConfig.currencyCode, locale)}</td>
 </tr>
  </tbody>
  </table>
  </div>
  <div className="mt-4 pt-4 border-t border-border">
      <ManagerPagination data-testid="manager_sales-managersalesmembershipreport-managerpagination-1" 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </>
  );
}
