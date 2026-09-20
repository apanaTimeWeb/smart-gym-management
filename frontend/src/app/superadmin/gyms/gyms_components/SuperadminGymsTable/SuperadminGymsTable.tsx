// RESPONSIBILITY: Renders the table view of Gym tenants. Purely a view component that consumes useSuperadminGymsTable hook.
'use client';
import { CheckCircle2, Ban, LogIn, PlayCircle, MessageCircle, Trash2, Loader2 } from 'lucide-react';
import { useSuperadminGymsTable } from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/useSuperadminGymsTable';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsTypes';
import SuperadminGymEditModal from '@/app/superadmin/gyms/gyms_components/SuperadminGymEditModal/SuperadminGymEditModal';
import SuperadminGymWhatsappModal from '@/app/superadmin/gyms/gyms_components/SuperadminGymWhatsappModal/SuperadminGymWhatsappModal';
import SuperadminGymDeleteModal from '@/app/superadmin/gyms/gyms_components/SuperadminGymDeleteModal/SuperadminGymDeleteModal';
import SuperadminGymsEmptyState from '@/app/superadmin/gyms/gyms_components/SuperadminGymsEmptyState/SuperadminGymsEmptyState';
import Pagination from '@/components/ui/Pagination';
import CopyButton from '@/components/ui/CopyButton';
import type { KeyboardEvent } from 'react';
import { GYMS_PLAN_COLORS } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsConstants';
import { formatCurrency, formatDate } from '@/lib/formatters';
import SuperadminGymsTableSortIcon from '@/app/superadmin/gyms/gyms_components/SuperadminGymsTable/SuperadminGymsTableSortIcon';
// Rule 68: TABLE_COLUMN_COUNT must match <th> count AND colSpan on empty state
const TABLE_COLUMN_COUNT = 8; // Name | Owner | Plan | Members | MRR | Status | Last Login | Actions
/**
 * Returns the Tailwind badge classes for a given plan tier name.
 * Source of truth: GYMS_PLAN_COLORS constant â€” never inline in JSX.
 */
function getPlanBadgeClasses(plan: string | undefined): string {
    const key = plan?.toUpperCase() as keyof typeof GYMS_PLAN_COLORS;
    return GYMS_PLAN_COLORS[key] ?? GYMS_PLAN_COLORS.DEFAULT;
}
export default function SuperadminGymsTable() {
    const { filteredGyms, isPending, isError, total, actionLoadingId, handleRowClick, onGhostLoginClick, onSuspendClick, onDeleteClick, openWhatsappModal, currentPage, pageLimit, setCurrentPage, setSortBy, setSortOrder, sortBy, sortOrder, refetch } = useSuperadminGymsTable();
    const totalPages = Math.ceil(total / pageLimit) || 1;
    const handleSort = (col: string) => {
        if (sortBy === col) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }
        else {
            setSortBy(col);
            setSortOrder('desc');
        }
    };
    if (isPending) {
        return (<div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              {['Gym Name', 'Owner', 'Plan', 'Members', 'Monthly Income', 'Status', 'Last Login', 'Actions'].map((h) => (<th key={h} className="p-4">
                  <div className="h-3 bg-skeleton-base motion-safe:animate-pulse rounded w-16"/>
                </th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[...Array(5)].map((_, i) => (<tr key={`skeleton-row-${i}`}>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-32"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-24"/></td>
                <td className="p-4"><div className="h-5 bg-skeleton-base motion-safe:animate-pulse rounded-full w-16"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-10 ml-auto"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ml-auto"/></td>
                <td className="p-4"><div className="h-5 bg-skeleton-base motion-safe:animate-pulse rounded-full w-16 mx-auto"/></td>
                <td className="p-4"><div className="h-4 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ml-auto"/></td>
                <td className="p-4"><div className="h-6 bg-skeleton-base motion-safe:animate-pulse rounded w-20 ml-auto"/></td>
              </tr>))}
          </tbody>
        </table>
      </div>);
    }
    if (isError) {
        return (<div role="alert" className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-danger/30 bg-danger-bg p-8 text-center">
        <p className="text-danger">Unable to load gyms.</p>
        <button type="button" onClick={() => void refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button>
      </div>);
    }
    return (<div className="overflow-x-auto flex flex-col min-h-96">
      <table className="w-full text-left border-collapse flex-1">
        <thead>
          <tr className="bg-primary-subtle border-b border-border text-secondary text-sm">
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-48">Gym Name</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider min-w-40">Owner</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-32">Plan</th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-right w-24" aria-sort={sortBy === 'memberCount' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
              <button type="button" onClick={() => handleSort('memberCount')} className="min-h-11 w-full justify-end rounded-md px-2 text-right hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={`Sort gyms by member count${sortBy === 'memberCount' ? (sortOrder === 'asc' ? ', descending' : ', ascending') : ', descending'}`}>
                <span className="inline-flex items-center gap-1">Members <SuperadminGymsTableSortIcon col="memberCount" active={sortBy === 'memberCount'} /></span>
              </button>
            </th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-right w-32" aria-sort={sortBy === 'monthlyRevenue' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
              <button type="button" onClick={() => handleSort('monthlyRevenue')} className="min-h-11 w-full justify-end rounded-md px-2 text-right hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={`Sort gyms by monthly revenue${sortBy === 'monthlyRevenue' ? (sortOrder === 'asc' ? ', descending' : ', ascending') : ', descending'}`}>
                <span className="inline-flex items-center gap-1">MRR <SuperadminGymsTableSortIcon col="monthlyRevenue" active={sortBy === 'monthlyRevenue'} /></span>
              </button>
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center w-32">Status</th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-right w-32" aria-sort={sortBy === 'lastActiveAt' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
              <button type="button" onClick={() => handleSort('lastActiveAt')} className="min-h-11 w-full justify-end rounded-md px-2 text-right hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={`Sort gyms by last active time${sortBy === 'lastActiveAt' ? (sortOrder === 'asc' ? ', descending' : ', ascending') : ', descending'}`}>
                <span className="inline-flex items-center gap-1">Last Active <SuperadminGymsTableSortIcon col="lastActiveAt" active={sortBy === 'lastActiveAt'} /></span>
              </button>
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-40">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {filteredGyms.map((gym: Tenant) => {
            const isActionLoading = actionLoadingId === gym.id;
            const handleRowKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleRowClick(gym);
              }
            };
            return (<tr key={gym.id} onClick={() => handleRowClick(gym)} onKeyDown={handleRowKeyDown} tabIndex={0} className="hover:bg-card/50 focus-visible:bg-card/50 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
                <td className="p-4 max-w-48">
                  <p className="font-semibold text-primary truncate" title={gym.name}>{gym.name}</p>
                  <span className="flex items-center gap-1 text-xs text-disabled mt-1">
                    <span className="truncate font-mono" title={gym.id}>{gym.id}</span>
                    <CopyButton value={gym.id} label={`Copy gym ID ${gym.id}`}/>
                  </span>
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
                  {/* Design Â§21: Indian Numbering System â€” â‚¹1,23,456 */}
                  {formatCurrency(gym.monthlyRevenue)}
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    {gym.status === 'ACTIVE' ? (<span className="flex items-center gap-1 text-success text-xs font-semibold bg-success-bg px-2.5 py-1 rounded-full border border-success/20">
                        <CheckCircle2 size={18}/> Active
                      </span>) : gym.status === 'SUSPENDED' ? (<span className="flex items-center gap-1 text-danger text-xs font-semibold bg-danger-bg px-2.5 py-1 rounded-full border border-danger/20">
                        <Ban size={18}/> Suspended
                      </span>) : (<span className="text-secondary text-xs font-semibold bg-input px-2.5 py-1 rounded-full border border-border">{gym.status}</span>)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-xs text-secondary">
                    {formatDate(gym.lastActiveAt ?? gym.lastLoginAt)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {/* Rule 64: opacity-100 on mobile, hover-only on lg+ */}
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity">
                    {isActionLoading ? (<div className="p-2 text-primary">
                        <Loader2 size={18} className="motion-safe:animate-spin"/>
                      </div>) : (<>
                        <button onClick={(e) => onGhostLoginClick(e, gym.id, gym.name)} className="min-h-11 min-w-11 p-2 text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title="Ghost Login (Login As Admin)" aria-label={`Ghost Login to ${gym.name}`}>
                          <LogIn size={18}/>
                        </button>
                        <button onClick={(e) => onSuspendClick(e, gym.id, gym.name, gym.status)} className={`min-h-11 min-w-11 p-2 rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${gym.status === 'SUSPENDED'
                        ? 'text-success hover:bg-success-bg'
                        : 'text-danger hover:bg-danger-bg'}`} title={gym.status === 'SUSPENDED' ? 'Activate Gym' : 'Suspend Gym'} aria-label={gym.status === 'SUSPENDED' ? `Activate ${gym.name}` : `Suspend ${gym.name}`}>
                          {gym.status === 'SUSPENDED' ? <PlayCircle size={18}/> : <Ban size={18}/>}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); openWhatsappModal(gym); }} className="min-h-11 min-w-11 p-2 text-secondary hover:bg-success-bg hover:text-success rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title="WhatsApp Owner" aria-label={`WhatsApp owner of ${gym.name}`}>
                          <MessageCircle size={18}/>
                        </button>

                        <button onClick={(e) => onDeleteClick(e, gym)} className="min-h-11 min-w-11 p-2 text-secondary hover:bg-danger-bg hover:text-danger rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title="Delete Gym" aria-label={`Delete ${gym.name}`}>
                          <Trash2 size={18}/>
                        </button>
                      </>)}
                  </div>
                </td>
              </tr>);
        })}

          {filteredGyms.length === 0 && (<tr>
              {/* Rule 68: colSpan must exactly match TABLE_COLUMN_COUNT */}
              <td colSpan={TABLE_COLUMN_COUNT}><SuperadminGymsEmptyState /></td>
            </tr>)}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>

      <SuperadminGymEditModal />
      <SuperadminGymWhatsappModal />
      <SuperadminGymDeleteModal />
    </div>);
}
