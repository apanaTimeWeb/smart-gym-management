"use client";
// RESPONSIBILITY: Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls.
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatters';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatCurrency';

import type { MembershipFilter } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesAllMembershipsTypes';
import { ADMIN_SALES_MEMBERSHIP_FILTER, ADMIN_SALES_MEMBERSHIP_STATUS, ADMIN_SALES_MEMBERSHIP_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_sales/admin_sales_constants/AdminSalesConstants';
import { SALES_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_sales/admin_sales_constants/AdminSalesConstants';

import { useMemo } from 'react';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/admin_sales_components/admin_sales_empty_state/AdminSalesEmptyState';
import type { Member } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesTypes';
import { Users, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';




/**
 * getDaysLeft is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getDaysLeft(expiryDate: string): number {
  return Math.floor((new Date(expiryDate).getTime() - Date.now()) / 86400000);
}

/**
 * getDaysLeftColorClass is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getDaysLeftColorClass(daysLeft: number): string {
  if (daysLeft <= 0) return 'text-danger';
  if (daysLeft <= 7) return 'text-danger';
  if (daysLeft <= 30) return 'text-warning';
  return 'text-success';
}

/**
 * getMembershipFilter is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getMembershipFilter(member: Member): MembershipFilter {
  if (member.status?.toLowerCase() === ADMIN_SALES_MEMBERSHIP_STATUS.EXPIRED) return ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED;
  const days = getDaysLeft(member.expiryDate);
  if (days <= 0) return ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED;
  if (days <= 30) return ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON;
  return ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE;
}

/**
 * AdminSalesAllMemberships renders the admin sales all memberships UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAllMemberships: Renders the paginated, filterable table of all gym memberships. KPI cards (Rule 74) double as interactive filters. Receives data via useAdminSalesLogic state. No API calls.
 * @dependencies Consumes AdminSalesFormatters, AdminSalesFormatCurrency, AdminSalesAllMembershipsTypes, AdminSalesConstants, useAdminSalesLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAllMemberships() {
  const locale = useLocale();
  const t = useTranslations();
  const { currentPage, setCurrentPage, allMemberships, allMembershipsTotal, status, membershipFilter, setMembershipFilter } = useAdminSalesLogic();
  const activeFilter = membershipFilter;
  const tableHeaders = [
    t('sales.AdminAuditRepair.member'),
    t('sales.AdminAuditRepair.plan'),
    t('sales.AdminAuditRepair.start'),
    t('sales.AdminAuditRepair.endDate'),
    t('sales.AdminAuditRepair.status'),
    t('sales.AdminAuditRepair.amount'),
    t('sales.AdminAuditRepair.daysLeft'),
  ] as const;

  // Compute per-status counts for the KPI bar (Rule 74)
  const counts = useMemo(() => ({
    All: allMemberships.length,
    Active: allMemberships.filter(m => getMembershipFilter(m) === ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE).length,
    'Expiring Soon': allMemberships.filter(m => getMembershipFilter(m) === ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON).length,
    Expired: allMemberships.filter(m => getMembershipFilter(m) === ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED).length,
  }), [allMemberships]);

  // Apply client-side filter
  const filtered = useMemo(() => {
    if (activeFilter === ADMIN_SALES_MEMBERSHIP_FILTER.ALL) return allMemberships;
    return allMemberships;
  }, [allMemberships]);

  const totalPages = Math.ceil(allMembershipsTotal / SALES_ITEMS_PER_PAGE) || 1;

  const kpiCards = [
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.ALL as MembershipFilter, label: t('sales.AdminAuditRepair.totalMembers'), count: counts.All, icon: Users, color: 'text-primary', bg: 'bg-primary-subtle', activeBorder: 'border-focus' },
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE as MembershipFilter, label: t('sales.AdminAuditRepair.active'), count: counts.Active, icon: CheckCircle, color: 'text-success', bg: 'bg-success-bg', activeBorder: 'border-border' },
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON as MembershipFilter, label: t('sales.AdminAuditRepair.expiringSoon'), count: counts['Expiring Soon'], icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning-bg', activeBorder: 'border-border' },
    { filter: ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED as MembershipFilter, label: t('sales.AdminAuditRepair.expired'), count: counts.Expired, icon: XCircle, color: 'text-danger', bg: 'bg-danger-bg', activeBorder: 'border-border' },
  ];

  if (status === 'pending') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["row-1", "row-2", "row-3", "row-4"].map(i => <div key={`sales-membership-skeleton-${i}`} className="motion-safe:animate-pulse h-20 bg-input rounded-xl border border-border motion-safe:duration-base" />)}
        </div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={`sales-membership-skeleton-${i}`} className="motion-safe:animate-pulse h-12 bg-card rounded border border-border motion-safe:duration-base" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* KPI Filter Cards (Rule 74) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpiCards.map(({ filter, label, count, icon: Icon, color, bg, activeBorder } , __testIdIndex115) => (
          <button type="button"
            key={filter}
            onClick={() => { setMembershipFilter(filter); }}
            className={`ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page text-left p-4 rounded-xl border-2 motion-safe:transition-all motion-safe:duration-base bg-card hover:shadow-card ${
              activeFilter === filter
                ? `${activeBorder} shadow-card`
                : 'border-border hover:border-border'
            }`}
           data-testid={`admin_sales-admin_sales-all-memberships-click-map115-${__testIdIndex115}-1`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}>
                <Icon size={18} className={color} />
              </div>
              <span className="text-xs font-medium text-secondary">{label}</span>
            </div>
            <div className={`text-2xl font-bold ${activeFilter === filter ? color : 'text-primary'}`}>
              {count}
            </div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input">
            <tr>
              {tableHeaders.map(h => (
                <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((r: Member , __testIdIndex151) => {
              const daysLeft = getDaysLeft(r.expiryDate);
              return (
                <tr key={r.id} className="hover:bg-surface-highlight motion-safe:transition-colors bg-card motion-safe:duration-base">
                  <td className="px-4 py-3 text-sm font-medium text-primary">{r.name}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{r.plan?.name ?? `Plan #${r.planId}`}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.joinDate, locale)}</td>
                  <td className="px-4 py-3 text-sm text-secondary">{formatDate(r.expiryDate, locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      r.status?.toLowerCase() === ADMIN_SALES_MEMBERSHIP_STATUS.ACTIVE
                        ? 'bg-success-bg text-success-text'
                        : 'bg-danger-bg text-danger-text'
                    }`} data-testid={`admin_sales-adminsalesallmemberships-status-1-map151-${__testIdIndex151}-1`}>
                      {t(ADMIN_SALES_MEMBERSHIP_STATUS_LABEL_KEYS[r.status] ?? r.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">{AdminSalesFormatCurrency(r.paidAmount || 0, undefined, locale)}</td>
                  <td className={`px-4 py-3 text-sm font-medium ${getDaysLeftColorClass(daysLeft)}`}>
                    {daysLeft <= 0 ? t('sales.admin_sales_all_memberships.auto_112a3f9892') : `${daysLeft}d`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <AdminSalesEmptyState message={t('sales.AdminSalesAllMemberships.auto_4b31b4cf4c')} subtext={t('sales.admin_sales_all_memberships.auto_7f704f07a0')} />
      )}

      <div className="pt-2 border-t border-border">
        <AdminLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
