"use client";
import { format } from 'date-fns';
// RESPONSIBILITY: Renders the paginated members table with clickable rows, status badges, and branch info.

import { useAdminMembersLogic } from '@/app/admin/members/members_context/useAdminMembersLogic';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdminMembersUrlConfig } from '@/app/admin/members/admin_members_url_config';
import { useAdminMembersStore } from '@/app/admin/members/members_store/useAdminMembersStore';
import AdminMembersEmptyState from '@/app/admin/members/members_components/AdminMembersEmptyState/AdminMembersEmptyState';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import { formatCurrency } from '@/lib/formatters';
import { maskSensitiveData } from '@/app/admin/admin_layout/admin_utils/AdminMaskSensitiveData';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE } from '@/app/admin/members/members_utils/AdminMembersSharedConstants';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-success text-on-success',
  expired: 'bg-danger text-on-danger',
  pending: 'bg-warning-bg text-warning',
  frozen: 'bg-info text-on-info',
};

const TABLE_HEADERS = ['Member', 'Branch', 'Plan', 'Join Date', 'Status', 'Expiry', 'Outstanding'];

export default function AdminMembersTable() {
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
              {TABLE_HEADERS.map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr
                key={m.id}
                onClick={() => {
                  const next = new URLSearchParams(searchParams.toString());
                  next.set('memberId', m.id);
                  router.replace(`${AdminMembersUrlConfig.root}?${next.toString()}`, { scroll: false });
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const next = new URLSearchParams(searchParams.toString());
                    next.set('memberId', m.id);
                    router.replace(`${AdminMembersUrlConfig.root}?${next.toString()}`, { scroll: false });
                  }
                }}
                tabIndex={0}
                role="link"
                aria-label={`Open ${m.name} profile`}
                className="hover:bg-surface-highlight cursor-pointer motion-safe:transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
              >
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
                    {format(new Date(m.joinDate), 'dd MMM yyyy')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[m.status] ?? 'bg-input text-secondary'}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-primary whitespace-nowrap">
                    {format(new Date(m.expiryDate), 'dd MMM yyyy')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${m.pendingAmount > 0 ? 'text-danger' : 'text-success'}`}>
                    {m.pendingAmount > 0 ? formatCurrency(m.pendingAmount) : '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminPagination
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