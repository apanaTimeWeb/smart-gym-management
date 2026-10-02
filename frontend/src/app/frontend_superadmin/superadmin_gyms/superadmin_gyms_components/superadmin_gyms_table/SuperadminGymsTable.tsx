'use client';
import { formatCurrency as SuperadminGymsFormatCurrency } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_utils/SuperadminGymsFormatCurrency';
// RESPONSIBILITY: Renders and composes SuperadminGymsTable for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import { CheckCircle2, Ban, LogIn, PlayCircle, MessageCircle, Trash2, Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import Pagination from '@/components/ui/Pagination';
import { formatDate } from '@/lib/formatters';

import SuperadminGymsEmptyState from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_empty_state/SuperadminGymsEmptyState';
import SuperadminGymsGymDeleteModal from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_gym_delete_modal/SuperadminGymsGymDeleteModal';
import SuperadminGymsGymEditModal from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_gym_edit_modal/SuperadminGymsGymEditModal';
import SuperadminGymsGymWhatsappModal from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_gym_whatsapp_modal/SuperadminGymsGymWhatsappModal';
import SuperadminGymsTableSortIcon from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_components/superadmin_gyms_table/SuperadminGymsTableSortIcon';
import { GYMS_PLAN_COLORS, SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsConstants';
import { useSuperadminGymsTable } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsTable';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes';
import type { KeyboardEvent } from 'react';


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
  const t = useTranslations('superadmin_gyms');
    const locale = useLocale();

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
        return (<div role="alert" className="flex min-h-80 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-danger-bg p-8 text-center" data-testid="superadmin_gyms-table-error-state">
        <p className="text-danger">{t('ui.unable_to_load_gyms_296d2be0')}</p>
        <button type="button" onClick={() => void refetch()} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_gyms-superadmin-gyms-table-superadmin-gyms-table-retry">{t('ui.retry_6327b4e5')}</button>
      </div>);
    }
    return (<div className="overflow-x-auto flex flex-col min-h-96">
      <table className="w-full text-left border-collapse flex-1">
        <thead>
          <tr className="bg-primary-subtle border-b border-border text-secondary text-sm">
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-48">{t('ui.gym_name_4ad76c40')}</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider min-w-40">{t('ui.owner_b6f4a2ec')}</th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider w-32">{t('ui.plan_0b6cbdf7')}</th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-right w-24" aria-sort={sortBy === 'memberCount' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
              <button type="button" onClick={() => handleSort('memberCount')} className="min-h-11 w-full justify-end rounded-md px-2 text-right hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={t('ui.sort_member_count_aria', { order: sortBy === 'memberCount' ? (sortOrder === 'asc' ? t('ui.descending') : t('ui.ascending')) : t('ui.descending') })} data-testid="superadmin_gyms-superadmin-gyms-table-superadmin-gyms-table-button">
                <span className="inline-flex items-center gap-1">{t('ui.members_ef53538a')}<SuperadminGymsTableSortIcon col="memberCount" active={sortBy === 'memberCount'} /></span>
              </button>
            </th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-right w-32" aria-sort={sortBy === 'monthlyRevenue' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
              <button type="button" onClick={() => handleSort('monthlyRevenue')} className="min-h-11 w-full justify-end rounded-md px-2 text-right hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={t('ui.sort_monthly_revenue_aria', { order: sortBy === 'monthlyRevenue' ? (sortOrder === 'asc' ? t('ui.descending') : t('ui.ascending')) : t('ui.descending') })} data-testid="superadmin_gyms-table-sort-monthly-revenue">
                <span className="inline-flex items-center gap-1">{t('ui.mrr_35432afe')}<SuperadminGymsTableSortIcon col="monthlyRevenue" active={sortBy === 'monthlyRevenue'} /></span>
              </button>
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-center w-32">{t('ui.status_ec53a8c4')}</th>
            <th className="p-2 font-semibold uppercase text-xs tracking-wider text-right w-32" aria-sort={sortBy === 'lastActiveAt' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}>
              <button type="button" onClick={() => handleSort('lastActiveAt')} className="min-h-11 w-full justify-end rounded-md px-2 text-right hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors" aria-label={t('ui.sort_last_active_time_aria', { order: sortBy === 'lastActiveAt' ? (sortOrder === 'asc' ? t('ui.descending') : t('ui.ascending')) : t('ui.descending') })} data-testid="superadmin_gyms-table-sort-last-active">
                <span className="inline-flex items-center gap-1">{t('ui.last_active_b32a44ea')}<SuperadminGymsTableSortIcon col="lastActiveAt" active={sortBy === 'lastActiveAt'} /></span>
              </button>
            </th>
            <th className="p-4 font-semibold uppercase text-xs tracking-wider text-right w-40">{t('ui.actions_06df3300')}</th>
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
            return (<tr key={gym.id} onClick={() => handleRowClick(gym)} onKeyDown={handleRowKeyDown} tabIndex={0} className="hover:bg-card focus-visible:bg-card motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" data-testid={`superadmin_gyms-table-row-${gym.id}`}>
                <td className="p-4 max-w-48">
                  <p className="font-semibold text-primary truncate" title={gym.name}>{gym.name}</p>
                  <span className="flex items-center gap-1 text-xs text-disabled mt-1">
                    <span className="truncate font-mono" title={gym.id}>{gym.id}</span>
                    <CopyButton value={gym.id} label={`Copy gym ID ${gym.id}`} data-testid="superadmin_gyms-table-copy-id"/>
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
                  {SuperadminGymsFormatCurrency(gym.monthlyRevenue, gym.currency, locale)}
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    {gym.status === SUPERADMIN_GYM_STATUS_CODES.ACTIVE ? (<span className="flex items-center gap-1 text-success text-xs font-semibold bg-success-bg px-2.5 py-1 rounded-full border border-border">
                        <CheckCircle2 size={18}/> {t('ui.active_4d3d769b')}</span>) : gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? (<span className="flex items-center gap-1 text-danger text-xs font-semibold bg-danger-bg px-2.5 py-1 rounded-full border border-border">
                        <Ban size={18}/> {t('ui.suspended_8bf90683')}</span>) : (<span className="text-secondary text-xs font-semibold bg-input px-2.5 py-1 rounded-full border border-border">{gym.status}</span>)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="text-xs text-secondary">
                    {formatDate(gym.lastActiveAt ?? gym.lastLoginAt)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {/* Rule 64: opacity-100 on mobile, hover-only on lg+ */}
                  <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
                    {isActionLoading ? (<div className="p-2 text-primary">
                        <Loader2 size={18} className="motion-safe:animate-spin"/>
                      </div>) : (<>
                        <button onClick={(e) => onGhostLoginClick(e, gym.id, gym.name)} className="min-h-11 min-w-11 p-2 text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.ghost_login_login_as_admin_a57b6a13')} aria-label={t('ui.ghost_login_aria', { name: gym.name })} data-testid="superadmin_gyms-superadmin-gyms-table-login-login-as-admin">
                          <LogIn size={18}/>
                        </button>
                        <button onClick={(e) => onSuspendClick(e, gym.id, gym.name, gym.status)} className={`min-h-11 min-w-11 p-2 rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED
                        ? 'text-success hover:bg-success-bg'
                        : 'text-danger hover:bg-danger-bg'}`} title={gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? t('ui.activate_gym_aria', { name: gym.name }) : t('ui.suspend_gym_aria', { name: gym.name })} aria-label={gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? t('ui.activate_gym_aria', { name: gym.name }) : t('ui.suspend_gym_aria', { name: gym.name })} data-testid="superadmin_gyms-table-toggle-status">
                          {gym.status === SUPERADMIN_GYM_STATUS_CODES.SUSPENDED ? <PlayCircle size={18}/> : <Ban size={18}/>}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); openWhatsappModal(gym); }} className="min-h-11 min-w-11 p-2 text-secondary hover:bg-success-bg hover:text-success rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.whatsapp_owner_d88ef9f0')} aria-label={t('ui.whatsapp_owner_aria', { name: gym.name })} data-testid="superadmin_gyms-superadmin-gyms-table-table-whats-app-owner">
                          <MessageCircle size={18}/>
                        </button>

                        <button onClick={(e) => onDeleteClick(e, gym)} className="min-h-11 min-w-11 p-2 text-secondary hover:bg-danger-bg hover:text-danger rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.delete_gym_326630c6')} aria-label={t('ui.delete_gym_aria', { name: gym.name })} data-testid="superadmin_gyms-superadmin-gyms-table-gyms-table-delete-gym">
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} data-testid="superadmin_gyms-superadmin-gyms-table-superadmin-gyms-table-pagination"/>

      <SuperadminGymsGymEditModal />
      <SuperadminGymsGymWhatsappModal />
      <SuperadminGymsGymDeleteModal />
    </div>);
}
