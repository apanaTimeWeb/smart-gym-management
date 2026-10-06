// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import ManagerSalesEmptyState from '@/app/frontend_manager/manager_sales/manager_sales_components/manager_sales_empty_state/ManagerSalesEmptyState';
import { MANAGER_MEMBERSHIP_FILTERS, MANAGER_SALES_MEMBERSHIP_FILTER_VALUES } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesFilterConstants';
import { SALES_ACTIVE_STATUS } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesSharedConstants';
import { MANAGER_SALES_MEMBERSHIP_TABLE_HEADERS } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesTableConstants';
import { useManagerSalesLogic } from '@/app/frontend_manager/manager_sales/manager_sales_hooks/useManagerSalesLogic';
import { ManagerSalesFormatCurrency, ManagerSalesFormatDate } from '@/app/frontend_manager/manager_sales/manager_sales_utils/ManagerSalesFormatters';
import type { SalesMemberSnapshot } from '@/app/frontend_manager/manager_sales/manager_sales_types/ManagerSalesMemberSnapshotTypes';



/** Returns the Tailwind text color class for the days-left column based on urgency. */
/**
 * @description Provides the `getDaysLeftColorClass` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function getDaysLeftColorClass(daysLeft: number): string {
  if (daysLeft === 0) return 'text-danger';
  if (daysLeft <= 7) return 'text-danger';
  if (daysLeft <= 30) return 'text-warning';
  return 'text-success';
}

/** @description Renders the ManagerSalesAllMemberships component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerSalesAllMemberships() {
  const t = useTranslations('MANAGER_SALES');
  const locale = useLocale();

  const [filter, setFilter] = useState(MANAGER_SALES_MEMBERSHIP_FILTER_VALUES.ALL);
  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, isPending, isError, errorMessage } = useManagerSalesLogic();
  const [now] = useState(() => Date.now());

  const totalPages = Math.ceil(allMembershipsTotal / MANAGER_ITEMS_PER_PAGE) || 1;

  const filteredMemberships = allMemberships.filter((m: SalesMemberSnapshot) => {
    if (filter === MANAGER_SALES_MEMBERSHIP_FILTER_VALUES.ALL) return true;
    if (filter === MANAGER_SALES_MEMBERSHIP_FILTER_VALUES.ACTIVE) return m.status === SALES_ACTIVE_STATUS && new Date(m.expiryDate).getTime() >= now;
    if (filter === MANAGER_SALES_MEMBERSHIP_FILTER_VALUES.EXPIRED) return new Date(m.expiryDate).getTime() < now;
    if (filter === MANAGER_SALES_MEMBERSHIP_FILTER_VALUES.EXPIRING_SOON) {
      const daysLeft = Math.floor((new Date(m.expiryDate).getTime() - now) / 86400000);
      return daysLeft >= 0 && daysLeft <= 7;
    }
    return true;
  });

  if (isPending) {
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
      <div className="text-center py-16 bg-card rounded-2xl border border-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-secondary">{t("COPY_RETRY_REQUEST_1")}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {MANAGER_MEMBERSHIP_FILTERS.map((f, mapIndex) => (
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-3 py-1.5 text-xs rounded-full font-medium border motion-safe:transition-all ${
              f === filter
                ? 'bg-primary-subtle text-primary border-transparent'
                : 'border-border text-secondary hover:text-primary'
            } motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_sales-sales-managersalesallmemberships-button-primary-${mapIndex}`}
            key={f}
            onClick={() => setFilter(f)}
            
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
            {filteredMemberships.map((r: SalesMemberSnapshot) => {
              const expiryTimestamp = new Date(r.expiryDate).getTime();
              const daysLeft = Math.floor((expiryTimestamp - now) / 86400000);
              const daysLeftLabel = expiryTimestamp < now ? t('COPY_EXPIRED') : `${daysLeft} days`;
              return (
              <tr key={r.id} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out">
                <td className="px-4 py-3 text-sm font-medium text-primary">{r.name}</td>
                <td className="px-4 py-3 text-sm text-secondary">{r.plan?.name ?? `Plan #${r.planId}`}</td>
                <td className="px-4 py-3 text-sm text-secondary">{ManagerSalesFormatDate(r.joinDate)}</td>
                <td className="px-4 py-3 text-sm text-secondary">{ManagerSalesFormatDate(r.expiryDate)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    r.status === SALES_ACTIVE_STATUS
                      ? 'bg-success text-on-success'
                      : 'bg-danger text-on-danger'
                  }`} data-testid="manager_sales-managersalesallmemberships-status-badge-1">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-primary">{ManagerSalesFormatCurrency(r.paidAmount || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className={`px-4 py-3 text-sm font-medium ${getDaysLeftColorClass(Math.max(0, daysLeft))}`}>
                  {daysLeftLabel}
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredMemberships.length === 0 && (
        <ManagerSalesEmptyState message={t("COPY_NO_MEMBERSHIPS_FOUND")} subtext={t("COPY_TRY_ADJUSTING_FILTERS")} />
      )}

      <div className="mt-4 pt-4 border-t border-border">
          <ManagerPagination data-testid="manager_sales-managersalesallmemberships-managerpagination-1"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
