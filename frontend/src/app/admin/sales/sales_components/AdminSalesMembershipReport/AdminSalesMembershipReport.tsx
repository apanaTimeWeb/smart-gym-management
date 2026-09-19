"use client";
// RESPONSIBILITY: Renders the sortable membership receivable report and its server-backed empty/error states.
import { formatCurrency } from '@/lib/formatters';
import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import AdminSalesEmptyState from '@/app/admin/sales/sales_components/AdminSalesEmptyState/AdminSalesEmptyState';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { AdminSalesMembershipSortKey } from '@/app/admin/sales/sales_types/AdminSalesUiTypes';
import type { AdminSalesSortDirection } from '@/app/admin/sales/sales_types/AdminSalesSortTypes';
import type { MembershipReportItem } from '@/app/admin/sales/sales_types/AdminSalesTypes';

export default function AdminSalesMembershipReport() {
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
    { key: 'plan', label: 'Plan' },
    { key: 'receivable', label: 'Total Receivable' },
    { key: 'received', label: 'Amount Received' },
    { key: 'remaining', label: 'Remaining' },
    { key: 'refund', label: 'Refund' },
  ];

  if (status === 'pending') {
    return (
      <div className="overflow-x-auto" aria-busy="true" aria-label="Loading membership report">
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
        message="Unable to load membership report"
        subtext="Refresh the Sales view and try again."
      />
    );
  }

  if (sortedRows.length === 0) {
    return (
      <AdminSalesEmptyState
        message="No membership report data"
        subtext="No membership receivable records match the current Sales filters."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table data-admin-responsive-table className="w-full">
        <thead className="bg-input">
          <tr>
            {sortableColumns.map(({ key, label }) => (
              <th key={key} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                <button
                  type="button"
                  onClick={() => handleSort(key)}
                  className="inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`Sort membership report by ${label}`}
                  aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  title={`Sort by ${label}`}
                >
                  {label}
                  {sortKey === key
                    ? (sortDir === 'asc' ? <ChevronUp size={13} aria-hidden="true" className="text-primary" /> : <ChevronDown size={13} aria-hidden="true" className="text-primary" />)
                    : <ChevronsUpDown size={13} aria-hidden="true" className="text-disabled" />}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedRows.map((row) => (
            <tr key={row.id ?? row.plan ?? row.name} className="bg-card motion-safe:transition-colors hover:bg-surface-highlight motion-safe:duration-base">
              <td className="px-4 py-3 text-sm font-medium text-primary">{row.plan ?? row.name ?? '—'}</td>
              <td className="px-4 py-3 text-sm text-secondary">{formatCurrency(row.receivable ?? 0)}</td>
              <td className="px-4 py-3 text-sm font-medium text-success">{formatCurrency(row.received ?? 0)}</td>
              <td className="px-4 py-3 text-sm font-medium text-warning">{formatCurrency(row.remaining ?? 0)}</td>
              <td className="px-4 py-3 text-sm text-danger">{formatCurrency(row.refund ?? 0)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-border bg-input font-semibold">
            <td className="px-4 py-3 text-sm text-primary">Total</td>
            <td className="px-4 py-3 text-sm text-primary">{formatCurrency(membershipTotals.totalReceivable ?? 0)}</td>
            <td className="px-4 py-3 text-sm text-success">{formatCurrency(membershipTotals.totalReceived ?? 0)}</td>
            <td className="px-4 py-3 text-sm text-warning">{formatCurrency(membershipTotals.remaining ?? 0)}</td>
            <td className="px-4 py-3 text-sm text-danger">{formatCurrency(membershipTotals.refunds ?? 0)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
