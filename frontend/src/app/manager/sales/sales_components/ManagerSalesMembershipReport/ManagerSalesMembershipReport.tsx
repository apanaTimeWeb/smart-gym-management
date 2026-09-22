// RESPONSIBILITY: Renders the membership sales report table and its feature-owned controls.
'use client';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';

import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import ManagerSalesMembershipReportEmptyState from '@/app/manager/sales/sales_components/ManagerSalesMembershipReport/ManagerSalesMembershipReportEmptyState';
import { useManagerSalesLogic } from '@/app/manager/sales/sales_hooks/ManagerUseManagerSalesLogic';
import { useLocale } from "next-intl";

const SALES_MEMBERSHIP_REPORT_COLUMN_COUNT = 5;

export default function ManagerSalesMembershipReport() {
    const locale = useLocale();
  const { currentPage, setCurrentPage, membershipReport, membershipReportTotal, membershipTotals, isPending, isError, errorMessage } = useManagerSalesLogic();
  
  const totalPages = Math.max(1, Math.ceil(membershipReportTotal / MANAGER_ITEMS_PER_PAGE));
  const paginated = membershipReport;

  if (isPending) {
    return (
      <div className="space-y-2 p-4" aria-label="Loading membership report"><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /></div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger">
        <p className="text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
        <span className="text-sm text-secondary">Retry the request.</span>
      </div>
    );
  }

  return (
  <>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-input">
 <tr>
 {['Plan', 'Total Receivable', 'Amount Received', 'Remaining', 'Refund'].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
  <tbody className="divide-y divide-border">
  {paginated.length > 0 ? (
    paginated.map((r) => (
      <tr key={r.plan} className="hover:bg-primary-subtle motion-safe:transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-primary">{r.plan || ''}</td>
      <td className="px-4 py-3 text-sm text-secondary">{formatCurrency(r.receivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm font-medium text-success dark:text-success">{formatCurrency(r.received || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm font-medium text-warning dark:text-warning">{formatCurrency(r.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm text-danger">{formatCurrency(r.refund || 0, ManagerEnvConfig.currencyCode, locale)}</td>
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
 <td className="px-4 py-3 text-sm text-primary">Total</td>
          <td className="px-4 py-3 text-sm text-primary">{formatCurrency(membershipTotals.totalReceivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-success dark:text-success">{formatCurrency(membershipTotals.totalReceived || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-warning dark:text-warning">{formatCurrency(membershipTotals.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-danger dark:text-danger">{formatCurrency(membershipTotals.refunds || 0, ManagerEnvConfig.currencyCode, locale)}</td>
 </tr>
  </tbody>
  </table>
  </div>
  <div className="mt-4 pt-4 border-t border-border">
      <ManagerPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </>
  );
}
