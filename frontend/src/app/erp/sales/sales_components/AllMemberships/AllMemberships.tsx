// RESPONSIBILITY: Renders the paginated table of all gym memberships with status filter tabs. Receives data via SalesContext. No API calls.
'use client';

import { useState } from 'react';
import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';
import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';
import SalesEmptyState from '@/app/erp/sales/sales_components/SalesEmptyState/SalesEmptyState';
import type { Member } from '@/app/erp/members/members_types/members_types';
import { ERP_ITEMS_PER_PAGE } from '@/app/erp/erp_utils/ErpSharedConstants';

const MEMBERSHIP_FILTERS = ['All', 'Active', 'Expiring Soon', 'Expired'] as const;
const TABLE_HEADERS = ['Member', 'Plan', 'Start', 'End Date', 'Status', 'Amount', 'Days Left'] as const;

/** Returns the Tailwind text color class for the days-left column based on urgency. */
function getDaysLeftColorClass(daysLeft: number): string {
  if (daysLeft === 0) return 'text-danger';
  if (daysLeft <= 7) return 'text-danger';
  if (daysLeft <= 30) return 'text-warning';
  return 'text-success';
}

export default function AllMemberships() {
  const [filter, setFilter] = useState('All');
  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, fetchState } = useSalesContext();

  const totalPages = Math.ceil(allMembershipsTotal / ERP_ITEMS_PER_PAGE) || 1;

  if (fetchState === 'loading') {
    return (
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse h-12 bg-card rounded border border-border" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {MEMBERSHIP_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium border transition-colors ${
              f === filter
                ? 'bg-primary text-white border-transparent'
                : 'border-border text-secondary hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-input">
            <tr>
              {TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allMemberships.map((r: Member) => (
              <tr key={r.id} className="hover:bg-primary-subtle transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground">{r.name}</td>
                <td className="px-4 py-3 text-sm text-secondary">{r.plan?.name ?? `Plan #${r.planId}`}</td>
                <td className="px-4 py-3 text-sm text-secondary">{new Date(r.joinDate).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3 text-sm text-secondary">{new Date(r.expiryDate).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    r.status === 'ACTIVE'
                      ? 'bg-success-bg text-success'
                      : 'bg-danger-bg text-danger'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">₹{r.paidAmount?.toLocaleString('en-IN') || 0}</td>
                <td className={`px-4 py-3 text-sm font-medium ${getDaysLeftColorClass(
                  Math.max(0, Math.floor((new Date(r.expiryDate).getTime() - Date.now()) / 86400000))
                )}`}>
                  {new Date(r.expiryDate) < new Date() ? 'Expired' : `${Math.floor((new Date(r.expiryDate).getTime() - Date.now()) / 86400000)} days`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allMemberships.length === 0 && (
        <SalesEmptyState message="No memberships found" subtext="Try adjusting your filters." />
      )}

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
