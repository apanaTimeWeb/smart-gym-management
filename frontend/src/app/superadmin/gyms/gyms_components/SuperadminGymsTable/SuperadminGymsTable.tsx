'use client';
// RESPONSIBILITY: Renders the table view of Gym tenants. Purely a view component that consumes useSuperadminGymsTable hook.

import { useState } from 'react';
import { CheckCircle2, Ban, LogIn, PlayCircle, Edit2, MessageCircle, Trash2, Loader2, ArrowUpDown, ExternalLink } from 'lucide-react';
import { useSuperadminGymsTable } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { useRouter } from 'next/navigation';
import type { Tenant } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_types';
import SuperadminGymEditModal from '@/app/superadmin/gyms/gyms_components/SuperadminGymEditModal/SuperadminGymEditModal';
import SuperadminGymWhatsappModal from '@/app/superadmin/gyms/gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal';
import SuperadminGymDeleteModal from '@/app/superadmin/gyms/gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal';
import SuperadminGymsEmptyState from '@/app/superadmin/gyms/gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import { GYMS_PLAN_COLORS } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsConstants';

// Rule 68: TABLE_COLUMN_COUNT must match <th> count AND colSpan on empty state
const TABLE_COLUMN_COUNT = 8; // Name | Owner | Plan | Members | MRR | Status | Last Login | Actions

/**
 * Returns the Tailwind badge classes for a given plan tier name.
 * Source of truth: GYMS_PLAN_COLORS constant — never inline in JSX.
 */
function getPlanBadgeClasses(plan: string | undefined): string {
  const key = plan?.toUpperCase() as keyof typeof GYMS_PLAN_COLORS;
  return GYMS_PLAN_COLORS[key] ?? GYMS_PLAN_COLORS.DEFAULT;
}

export default function SuperadminGymsTable() {
  const router = useRouter();
  const {
    filteredGyms,
    fetchState,
    actionLoadingId,
    handleRowClick,
    onGhostLoginClick,
    onSuspendClick,
    onDeleteClick,
    openEditModal,
    openWhatsappModal,
  } = useSuperadminGymsTable();

  const { currentPage, pageLimit, setCurrentPage, setSortBy, setSortOrder, sortBy, sortOrder } = useSuperadminGymsStore();
  const totalPages = Math.ceil(filteredGyms.length / pageLimit) || 1;

  const handleSort = (col: string) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ col }: { col: string }) => (
    <ArrowUpDown
      size={12}
      className={`inline ml-1 ${sortBy === col ? 'text-primary' : 'text-disabled'}`}
    />
  );

  if (fetchState === 'loading') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/10 border-b border-border">
              {['Gym Name', 'Owner', 'Plan', 'Members', 'MRR', 'Status', 'Last Login', 'Actions'].map((h) => (
                <th key={h} className="p-4">
                  <div className="h-3 bg-skeleton-base motion-safe:animate-pulse rounded w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[...Array(5)].map((_, i) => (
              <tr key={`skeleton-row-${i}`}>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-32" /></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-24" /></td>
                <td className="p-4"><div className="h-5 bg-skeleton-base motion-safe:animate-pulse rounded-full w-16" /></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-10 ml-auto" /></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ml-auto" /></td>
                <td className="p-4"><div className="h-5 bg-skeleton-base motion-safe:animate-pulse rounded-full w-16 mx-auto" /></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ml-auto" /></td>
                <td className="p-4"><div className="h-6 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ml-auto" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (fetchState === 'error') {
    return <div className="p-8 text-center text-danger">Error loading gyms. Please try again.</div>;
  }

  return (
    <div className="overflow-x-auto flex flex-col min-h-96">
      <table className="w-full text-left border-collapse flex-1">
        <thead>
          <tr className="bg-primary/10 border-b border-border text-secondary text-sm">
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-48">Gym Name</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider min-w-40">Owner</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-32">Plan</th>
            <th
              className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-24 cursor-pointer hover:text-foreground motion-safe:transition-colors"
              onClick={() => handleSort('memberCount')}
            >
              Members <SortIcon col="memberCount" />
            </th>
            <th
              className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-32 cursor-pointer hover:text-foreground motion-safe:transition-colors"
              onClick={() => handleSort('monthlyRevenue')}
            >
              MRR <SortIcon col="monthlyRevenue" />
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center w-32">Status</th>
            <th
              className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-32 cursor-pointer hover:text-foreground motion-safe:transition-colors"
              onClick={() => handleSort('lastActiveAt')}
            >
              Last Active <SortIcon col="lastActiveAt" />
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-40">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredGyms.map((gym: Tenant) => {
            const isActionLoading = actionLoadingId === gym.id;
            return (
              <tr
                key={gym.id}
                onClick={() => handleRowClick(gym)}
                className="hover:bg-card/50 motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out group cursor-pointer"
              >
                <td className="p-4 max-w-48">
                  <p className="font-semibold text-foreground truncate" title={gym.name}>{gym.name}</p>
                  <p className="text-xs text-disabled mt-1 truncate" title={gym.id}>{gym.id}</p>
                </td>
                <td className="p-4 max-w-40">
                  <p className="text-secondary truncate" title={gym.ownerName}>{gym.ownerName}</p>
                  <p className="text-xs text-disabled mt-1 truncate" title={gym.adminEmail}>{gym.adminEmail}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${getPlanBadgeClasses(gym.plan)}`}>
                    {gym.plan?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </td>
                <td className="p-4 text-secondary font-medium text-right">
                  {gym.memberCount}
                </td>
                <td className="p-4 text-success font-medium text-right">
                  {/* Design §21: Indian Numbering System — ₹1,23,456 */}
                  ₹{gym.monthlyRevenue.toLocaleString('en-IN')}
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    {gym.status === 'ACTIVE' ? (
                      <span className="flex items-center gap-1 text-success text-xs font-semibold bg-success-bg px-2.5 py-1 rounded-full border border-success/20">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : gym.status === 'SUSPENDED' ? (
                      <span className="flex items-center gap-1 text-danger text-xs font-semibold bg-danger-bg px-2.5 py-1 rounded-full border border-destructive/20">
                        <Ban className="w-3 h-3" /> Suspended
                      </span>
                    ) : (
                      <span className="text-secondary text-xs font-semibold bg-input px-2.5 py-1 rounded-full border border-border">{gym.status}</span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-xs text-secondary">
                    {gym.lastActiveAt ? new Date(gym.lastActiveAt).toLocaleDateString('en-IN') : (gym.lastLoginAt ? new Date(gym.lastLoginAt).toLocaleDateString('en-IN') : '—')}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {/* Rule 64: opacity-100 on mobile, hover-only on lg+ */}
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity">
                    {isActionLoading ? (
                      <div className="p-2 text-primary">
                        <Loader2 className="w-4 h-4 motion-safe:animate-spin" />
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); router.push(`/superadmin/gyms/${gym.id}`); }}
                          className="p-1.5 text-secondary hover:bg-input hover:text-foreground rounded-lg motion-safe:transition-all"
                          title="View Gym Detail"
                          aria-label={`View detail for ${gym.name}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => onGhostLoginClick(e, gym.id, gym.name)}
                          className="p-1.5 text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Ghost Login (Login As Admin)"
                          aria-label={`Ghost Login to ${gym.name}`}
                        >
                          <LogIn className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => onSuspendClick(e, gym.id, gym.name, gym.status)}
                          className={`p-1.5 rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page ${
                            gym.status === 'SUSPENDED'
                              ? 'text-success hover:bg-success/10'
                              : 'text-danger hover:bg-danger-bg/10'
                          }`}
                          title={gym.status === 'SUSPENDED' ? 'Activate Tenant' : 'Suspend Tenant'}
                          aria-label={gym.status === 'SUSPENDED' ? `Activate ${gym.name}` : `Suspend ${gym.name}`}
                        >
                          {gym.status === 'SUSPENDED' ? <PlayCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); openWhatsappModal(gym); }}
                          className="p-1.5 text-secondary hover:bg-success/10 hover:text-success rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="WhatsApp Owner"
                          aria-label={`WhatsApp owner of ${gym.name}`}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); openEditModal(gym); }}
                          className="p-1.5 text-secondary hover:bg-primary-subtle hover:text-primary rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Edit Gym"
                          aria-label={`Edit ${gym.name}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => onDeleteClick(e, gym)}
                          className="p-1.5 text-secondary hover:bg-danger-bg/10 hover:text-danger rounded-lg motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
                          title="Delete Gym"
                          aria-label={`Delete ${gym.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}

          {filteredGyms.length === 0 && (
            <tr>
              {/* Rule 68: colSpan must exactly match TABLE_COLUMN_COUNT */}
              <td colSpan={TABLE_COLUMN_COUNT}><SuperadminGymsEmptyState /></td>
            </tr>
          )}
        </tbody>
      </table>

      <SuperadminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <SuperadminGymEditModal />
      <SuperadminGymWhatsappModal />
      <SuperadminGymDeleteModal />
    </div>
  );
}
