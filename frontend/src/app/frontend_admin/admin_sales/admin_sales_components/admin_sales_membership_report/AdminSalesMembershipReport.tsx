"use client";
// RESPONSIBILITY: Renders the sortable membership receivable report and its server-backed empty/error states.
import { useLocale, useTranslations } from 'next-intl';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatCurrency';
import { displayValue } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutDisplayValue';

import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_empty_state/AdminSalesEmptyState';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { AdminSalesMembershipSortKey } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesUiTypes';
import type { AdminSalesSortDirection } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesSortTypes';
import type { MembershipReportItem } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';

/**
 * AdminSalesMembershipReport renders the admin sales membership report UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesMembershipReport: Renders the sortable membership receivable report and its server-backed empty/error states.
 * @dependencies Consumes AdminSalesFormatCurrency, useAdminSalesLogic, AdminSalesEmptyState, AdminSalesUiTypes, AdminSalesSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesMembershipReport() {
  const locale = useLocale();
  const t = useTranslations();

  const { membershipReport, membershipTotals, status } = useAdminSalesLogic();
  const [sortKey, setSortKey] = useState<AdminSalesMembershipSortKey>('receivable');
  const [sortDir, setSortDir] = useState<AdminSalesSortDirection>('desc');

  const sortedRows = useMemo(() => {
    return [...membershipReport].sort((left: MembershipReportItem, right: MembershipReportItem) => {
      const leftValue = left[sortKey];
      const rightValue = right[sortKey];
      const result = typeof leftValue === 'number' && typeof rightValue === 'number'
        ? leftValue - rightValue
        : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? result : -result;
    });
  }, [membershipReport, sortKey, sortDir]);

  const handleSort = (key: AdminSalesMembershipSortKey) => {
    if (sortKey === key) {
      setSortDir((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDir('desc');
  };

  const sortableColumns: Array<{ key: AdminSalesMembershipSortKey; label: string }> = [
    { key: 'plan', label: t('sales.AdminAuditRepair.plan') },
    { key: 'receivable', label: t('sales.AdminAuditRepair.totalReceivable') },
    { key: 'received', label: t('sales.AdminAuditRepair.amountReceived') },
    { key: 'remaining', label: t('sales.AdminAuditRepair.remaining') },
    { key: 'refund', label: t('sales.AdminAuditRepair.refund') },
  ];

  if (status === 'pending') {
    return (
      <div className="overflow-x-auto" aria-busy="true" aria-label={t('sales.admin_sales_membership_report.text_a873abb3d3')}>
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input">
            <tr>
              {sortableColumns.map(({ key, label }) => (
                <th key={key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }, (_, index) => (
              <tr key={`membership-report-skeleton-${index}`} className="motion-safe:animate-pulse bg-card motion-safe:duration-base">
                {sortableColumns.map(({ key }) => (
                  <td key={key} className="px-4 py-4"><div className="h-4 w-24 rounded bg-skeleton-base" /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <AdminSalesEmptyState
        message={t('sales.admin_sales_membership_report.auto_8bae4e6d16')}
        subtext={t('sales.admin_sales_membership_report.auto_refreshSales')}
      />
    );
  }

  if (sortedRows.length === 0) {
    return (
      <AdminSalesEmptyState
        message={t('sales.admin_sales_membership_report.auto_b254e610f8')}
        subtext={t('sales.admin_sales_membership_report.auto_noMembershipRecords')}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table data-admin-responsive-table className="w-full">
        <thead className="bg-input">
          <tr>
            {sortableColumns.map(({ key, label } , __testIdIndex107) => (
              <th key={key} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                <button
                  type="button"
                  onClick={() => handleSort(key)}
                  className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
                  aria-label={t('admin_sales_membership_report.auto_sortBy', { label })}
                  aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  title={t('admin_sales_membership_report.auto_sortBy', { label })}
                 data-testid={`admin_sales-admin_sales-membership-report-click-map107-${__testIdIndex107}-1`}>
                  {label}
                  {sortKey === key
                    ? (sortDir === 'asc' ? <ChevronUp size={18} aria-hidden="true" className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} aria-hidden="true" className="text-primary"  strokeWidth={2}/>)
                    : <ChevronsUpDown size={18} aria-hidden="true" className="text-disabled"  strokeWidth={2}/>}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedRows.map((row) => (
            <tr key={row.id ?? row.plan ?? row.name} className="bg-card motion-safe:transition-colors hover:bg-surface-highlight motion-safe:duration-base">
              <td className="px-4 py-3 text-sm font-medium text-primary">{displayValue(row.plan ?? row.name)}</td>
              <td className="px-4 py-3 text-sm text-secondary">{AdminSalesFormatCurrency(row.receivable ?? 0, undefined, locale)}</td>
              <td className="px-4 py-3 text-sm font-medium text-success">{AdminSalesFormatCurrency(row.received ?? 0, undefined, locale)}</td>
              <td className="px-4 py-3 text-sm font-medium text-warning">{AdminSalesFormatCurrency(row.remaining ?? 0, undefined, locale)}</td>
              <td className="px-4 py-3 text-sm text-danger">{AdminSalesFormatCurrency(row.refund ?? 0, undefined, locale)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-border bg-input font-semibold">
            <td className="px-4 py-3 text-sm text-primary">{t('sales.admin_sales_membership_report.text_b25928c699')}</td>
            <td className="px-4 py-3 text-sm text-primary">{AdminSalesFormatCurrency(membershipTotals.totalReceivable ?? 0, undefined, locale)}</td>
            <td className="px-4 py-3 text-sm text-success">{AdminSalesFormatCurrency(membershipTotals.totalReceived ?? 0, undefined, locale)}</td>
            <td className="px-4 py-3 text-sm text-warning">{AdminSalesFormatCurrency(membershipTotals.remaining ?? 0, undefined, locale)}</td>
            <td className="px-4 py-3 text-sm text-danger">{AdminSalesFormatCurrency(membershipTotals.refunds ?? 0, undefined, locale)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
