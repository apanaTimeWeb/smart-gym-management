"use client";
// RESPONSIBILITY: Renders the paginated members table with clickable rows, status badges, and branch info.
import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_members/admin_members_utils/AdminMembersFormatters';

import { useAdminMembersLogic } from '@/app/frontend_admin/admin_members/admin_members_hooks/useAdminMembersLogic';
import { useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_MEMBERS_ROUTES } from '@/app/frontend_admin/admin_members/admin_members_url_config';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/admin_members_store/useAdminMembersStore';
import AdminMembersEmptyState from '@/app/frontend_admin/admin_members/admin_members_components/admin_members_empty_state/AdminMembersEmptyState';
import AdminLayoutPagination from '@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutPagination';
import { AdminMembersFormatCurrency } from '@/app/frontend_admin/admin_members/admin_members_utils/AdminMembersFormatCurrency';

import { maskSensitiveData } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMaskSensitiveData';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE, MEMBER_STATUS_LABEL_KEYS, MEMBER_STATUS_STYLES, MEMBER_TABLE_HEADER_KEYS } from '@/app/frontend_admin/admin_members/admin_members_constants/AdminMembersConstants';


/**
 * AdminMembersTable renders the admin members table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersTable: Renders the paginated members table with clickable rows, status badges, and branch info.
 * @dependencies Consumes AdminMembersFormatters, useAdminMembersLogic, admin_members_url_config, useAdminMembersStore, AdminMembersEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersTable() {
  const locale = useLocale();
  const t = useTranslations();
  const { members, allFilteredCount, totalPages } = useAdminMembersLogic();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search, statusFilter, branchFilter, expiryFilter, currentPage, setCurrentPage } = useAdminMembersStore();

  const hasFilters = search !== '' || statusFilter !== 'all' || branchFilter !== 'all' || expiryFilter !== 'all';

  if (members.length === 0) {
    return <AdminMembersEmptyState hasFilters={hasFilters} />;
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-highlight border-b border-border">
              {MEMBER_TABLE_HEADER_KEYS.map((key) => (
                <th key={key} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m , __testIdIndex61) => (
              <tr
                key={m.id}
                onClick={() => {
                  const next = new URLSearchParams(searchParams.toString());
                  next.set('memberId', m.id);
                  router.replace(`${ADMIN_MEMBERS_ROUTES.root}?${next.toString()}`, { scroll: false });
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const next = new URLSearchParams(searchParams.toString());
                    next.set('memberId', m.id);
                    router.replace(`${ADMIN_MEMBERS_ROUTES.root}?${next.toString()}`, { scroll: false });
                  }
                }}
                tabIndex={0}
                role="link"
                aria-label={t('admin_members_table.auto_openProfile', { name: m.name })}
                className="hover:bg-surface-highlight cursor-pointer motion-safe:transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
               data-testid={`admin_members-admin_members-table-click-map61-${__testIdIndex61}-1`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">{m.name}</p>
                      <p className="text-xs text-secondary">{maskSensitiveData(m.phone)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{m.branchName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary">{m.planName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {formatDate(m.joinDate, locale)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${MEMBER_STATUS_STYLES[m.status] ?? 'bg-input text-secondary'}`}>
                    {t(MEMBER_STATUS_LABEL_KEYS[m.status] ?? m.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {formatDate(m.expiryDate, locale)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${m.pendingAmount > 0 ? 'text-danger' : 'text-success'}`}>
                    {m.pendingAmount > 0 ? AdminMembersFormatCurrency(m.pendingAmount, undefined, locale) : '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminLayoutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={allFilteredCount}
          itemsPerPage={ADMIN_MEMBERS_ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
