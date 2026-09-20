'use client';
import { MANAGER_MEMBERSHIP_FILTERS } from '@/app/manager/sales/sales_constants/ManagerSalesFilterConstants';
import { MANAGER_SALES_MEMBERSHIP_TABLE_HEADERS } from '@/app/manager/sales/sales_constants/ManagerSalesTableConstants';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
// RESPONSIBILITY: Renders the paginated table of all gym memberships with status filter tabs. Receives data via ManagerUseManagerSalesLogic. No API calls.
import { useState } from 'react';
import { useManagerSalesLogic } from '@/app/manager/sales/sales_hooks/ManagerUseManagerSalesLogic';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { formatCurrencyFromMinorUnits , formatDate} from '@/lib/formatters';
import ManagerSalesEmptyState from '@/app/manager/sales/sales_components/ManagerSalesEmptyState/ManagerSalesEmptyState';
import type { SalesMemberSnapshot } from '@/app/manager/sales/sales_types/ManagerSalesMemberSnapshot';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';


/** Returns the Tailwind text color class for the days-left column based on urgency. */
function getDaysLeftColorClass(daysLeft: number): string {
  if (daysLeft === 0) return 'text-danger';
  if (daysLeft <= 7) return 'text-danger';
  if (daysLeft <= 30) return 'text-warning';
  return 'text-success';
}

export default function ManagerSalesAllMemberships() {
  const [filter, setFilter] = useState('All');
  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, isLoading, isError, errorMessage } = useManagerSalesLogic();
  const [now] = useState(() => Date.now());

  const totalPages = Math.ceil(allMembershipsTotal / MANAGER_ITEMS_PER_PAGE) || 1;

  const filteredMemberships = allMemberships.filter((m: SalesMemberSnapshot) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return m.status === 'ACTIVE' && new Date(m.expiryDate).getTime() >= now;
    if (filter === 'Expired') return new Date(m.expiryDate).getTime() < now;
    if (filter === 'Expiring Soon') {
      const daysLeft = Math.floor((new Date(m.expiryDate).getTime() - now) / 86400000);
      return daysLeft >= 0 && daysLeft <= 7;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={`skeleton-${i}`} className="motion-safe:animate-pulse h-12 bg-card rounded border border-border" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger/30">
        <p className="text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
        <span className="text-sm text-secondary">Retry the request.</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {MANAGER_MEMBERSHIP_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium border motion-safe:transition-colors ${
              f === filter
                ? 'bg-primary text-white border-transparent'
                : 'border-border text-secondary hover:text-on-success'
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
              {MANAGER_SALES_MEMBERSHIP_TABLE_HEADERS.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredMemberships.map((r: SalesMemberSnapshot) => (
              <tr key={r.id} className="hover:bg-primary-subtle motion-safe:transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-on-success">{r.name}</td>
                <td className="px-4 py-3 text-sm text-secondary">{r.plan?.name ?? `Plan #${r.planId}`}</td>
                <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.joinDate)}</td>
                <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.expiryDate)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    r.status === 'ACTIVE'
                      ? 'bg-success text-on-success'
                      : 'bg-danger text-on-danger'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-on-success">{formatCurrencyFromMinorUnits(r.paidAmount || 0, ManagerEnvConfig.currencyCode)}</td>
                <td className={`px-4 py-3 text-sm font-medium ${getDaysLeftColorClass(
                  Math.max(0, Math.floor((new Date(r.expiryDate).getTime() - now) / 86400000))
                )}`}>
                  {new Date(r.expiryDate).getTime() < now ? 'Expired' : `${Math.floor((new Date(r.expiryDate).getTime() - now) / 86400000)} days`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredMemberships.length === 0 && (
        <ManagerSalesEmptyState message="No memberships found" subtext="Try adjusting your filters." />
      )}

      <div className="mt-4 pt-4 border-t border-border">
          <ManagerPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
