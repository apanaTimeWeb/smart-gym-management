// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';
import { Edit, MessageCircle, Mail, Trash2, Banknote, Ban } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { getManagerErrorMessage } from '@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults';
import ManagerMembersSortIcon from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_sort_icon/ManagerMembersSortIcon';
import ManagerMembersEmptyState from '@/app/frontend_manager/manager_members/manager_members_components/manager_members_table/ManagerMembersEmptyState';

import { MEMBER_SUSPENDED_STATUS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBERS_TABLE_HEADERS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBERS_STATUS_COLORS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersUiConstants';
import { useManagerMembersLogic } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersLogic';
import { useFetchMembers } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersQueries';
import { ManagerMembersFormatCurrency, ManagerMembersDisplayValue, ManagerMembersMaskSensitiveData, ManagerMembersFormatDate } from '@/app/frontend_manager/manager_members/manager_members_utils/ManagerMembersFormatters';
import type { MemberSortColumn } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';
import type { ChangeEvent } from 'react';


/** @description Renders the ManagerMembersTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (15 documented module/import dependencies).. @edge-case Preserves empty state, error state, modal lifecycle. */
export default function ManagerMembersTable() {
  const t = useTranslations('MANAGER_MEMBERS');
  const locale = useLocale();

  // useConfirm provides the design-system confirm modal (Rule 71 — no window.confirm)
  const { confirm } = useConfirm();
  const { 
    debouncedSearch, search, statusFilter, genderFilter, planFilter, expiryFrom, expiryTo, currentPage, setCurrentPage,
    setSelectedMember, openEdit, openMsg, deleteMember, setShowPaymentModal, toggleSuspend,
    sortColumn, sortDirection, setSortColumn, setSortDirection
  } = useManagerMembersLogic();

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const { data: membersRes, isPending, isError, error, refetch } = useFetchMembers({ 
    search: debouncedSearch,
    status: statusFilter, 
    gender: genderFilter, 
    plan: planFilter, 
    expiryFrom, 
    expiryTo, 
    sort: sortColumn, 
    dir: sortDirection, 
    page: currentPage.toString(),
    limit: MANAGER_ITEMS_PER_PAGE.toString() });
  const members = membersRes?.members || [];
  const totalMembers = membersRes?.total || 0;

  const totalPages = Math.ceil(totalMembers / MANAGER_ITEMS_PER_PAGE);

  const handleSort = (column: MemberSortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };


  const toggleAll = () => {
    if (selectedRows.size === members.length) setSelectedRows(new Set());
    else setSelectedRows(new Set(members.map(m => m.id)));
  };

  const toggleRow = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      {(() => { if (isPending) { return (
        <ManagerTableSkeleton rows={6} />
      ); } return (() => { if (isError) { return (
        <div data-testid="manager_members-manager-members-table-status" role="alert" className="p-8 text-center text-danger space-y-3"><p>{getManagerErrorMessage(error)}</p><button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-manager-members-table-button-refresh" type="button" onClick={() => void refetch()} >{t("COPY_RETRY")}</button></div>
      ); } return (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-subtle">
                <tr>
                  <th className="px-2 py-3 w-10 text-center">
                    <input data-testid="manager_members-manager-members-table-input-checkbox-toggle" 
                      type="checkbox" 
                      className="rounded border-border text-primary focus-visible:ring-primary w-3.5 h-3.5"
                      checked={members.length > 0 && selectedRows.size === members.length}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[1].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={(() => { if (sortColumn === 'name') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                    <button data-testid="manager_members-manager-members-table-button-sort-name" type="button" className="inline-flex items-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" onClick={() => handleSort('name')} aria-label={t("COPY_SORT_MEMBER")}>{t("COPY_MEMBER_1")}<ManagerMembersSortIcon column="name" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[3].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[4].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={(() => { if (sortColumn === 'status') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                    <button data-testid="manager_members-manager-members-table-button-sort-status" type="button" className="inline-flex items-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" onClick={() => handleSort('status')} aria-label={t("COPY_SORT_STATUS")}>{t("COPY_STATUS")}<ManagerMembersSortIcon column="status" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={(() => { if (sortColumn === 'joinDate') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                    <button data-testid="manager_members-manager-members-table-sort-join-date" type="button" className="inline-flex items-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" onClick={() => handleSort('joinDate')} aria-label={t("COPY_SORT_JOIN_DATE")}>{t("COPY_JOIN_DATE_3")}<ManagerMembersSortIcon column="joinDate" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={(() => { if (sortColumn === 'expiryDate') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                    <button data-testid="manager_members-manager-members-table-sort-expiry-date" type="button" className="inline-flex items-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" onClick={() => handleSort('expiryDate')} aria-label={t("COPY_SORT_EXPIRY")}>{t("COPY_EXPIRY_1")}<ManagerMembersSortIcon column="expiryDate" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={(() => { if (sortColumn === 'paidAmount') { return (sortDirection === 'asc' ? 'ascending' : 'descending'); } return 'none'; })()}>
                    <button data-testid="manager_members-manager-members-table-sort-paid-amount" type="button" className="inline-flex items-center motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" onClick={() => handleSort('paidAmount')} aria-label={t("COPY_SORT_PAID")}>{t("COPY_PAID")}<ManagerMembersSortIcon column="paidAmount" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[9].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[10].label}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map((m, mapIndex) => {
                  const statusStyle = MEMBERS_STATUS_COLORS[m.status] || { bg: 'bg-input', text: 'text-secondary' };
                  return (
                  <tr
                    data-testid={`manager_members-members-managermemberstable-row-${m.id}`}
                    key={m.id} 
                    className="hover:bg-primary-subtle motion-safe:transition-all cursor-pointer motion-safe:duration-base ease-in-out"
                    tabIndex={0}
                    role="button"
                    aria-label={t("TEXT_OPEN_MEMBER", { value: m.name })}
                    onClick={() => { setSelectedMember(m); }}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedMember(m); } }}
                  >
                    <td className="px-2 py-3 text-center" onClick={(e) => e.stopPropagation()} data-testid="manager_members-managermemberstable-interactive">
                      <input data-testid={`manager_members-members-managermemberstable-input-togglerow-${mapIndex}`} 
                        type="checkbox" 
                        className="rounded border-border text-primary focus-visible:ring-primary w-3.5 h-3.5"
                        checked={selectedRows.has(m.id)}
                        onChange={(e) => toggleRow(m.id, e)}
                      />
                    </td>
                    <td className="px-2 py-3 text-xs text-secondary font-medium whitespace-nowrap">
                      <span className="font-bold text-primary">{m.id}</span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-primary-subtle text-primary shrink-0">
                          {m.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-primary">{ManagerMembersDisplayValue(m.name)}</p>
                          <p className="text-xs text-secondary">{ManagerMembersMaskSensitiveData(m.phone || '', 'phone')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-xs text-secondary whitespace-nowrap">{ManagerMembersDisplayValue(m.gender)}</td>
                    <td className="px-2 py-3 text-xs text-primary whitespace-nowrap">{ManagerMembersDisplayValue(m.plan?.name)}</td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span 
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs text-secondary whitespace-nowrap">{ManagerMembersFormatDate(m.joinDate)}</td>
                    <td className="px-2 py-3 text-xs text-secondary whitespace-nowrap">{ManagerMembersFormatDate(m.expiryDate)}</td>
                    <td className="px-2 py-3 text-xs font-semibold text-success whitespace-nowrap">{ManagerMembersFormatCurrency(m.paidAmount, ManagerEnvConfig.currencyCode, locale)}</td>
                    <td className="px-2 py-3 text-xs font-semibold text-danger whitespace-nowrap">{m.pendingAmount > 0 ? ManagerMembersFormatCurrency(m.pendingAmount, ManagerEnvConfig.currencyCode, locale) : ManagerMembersDisplayValue(null)}</td>
                    <td className="px-2 py-3 text-xs whitespace-nowrap">

                      <div className="flex items-center gap-1.5">
                        {m.pendingAmount > 0 && (
                          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-warning-bg text-warning hover:bg-warning-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-collect-dues-${m.id}`} onClick={(e) => { e.stopPropagation(); setSelectedMember(m); setShowPaymentModal(true); }}  title={t("COPY_COLLECT_DUES")} aria-label={t("TEXT_COLLECT_DUES", { value: m.name })}><Banknote size={18} strokeWidth={2}/></button>
                        )}
                        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-edit-${m.id}`} onClick={(e) => { e.stopPropagation(); openEdit(m); }}  title={t("COPY_EDIT_2")} aria-label={t("TEXT_EDIT_MEMBER_ROW", { value: m.name })}><Edit size={18} strokeWidth={2} /></button>
                        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-success text-on-success motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-whatsapp-${m.id}`} onClick={(e) => { e.stopPropagation(); openMsg(m, 'whatsapp'); }}  title={t("COPY_WHATSAPP_1")} aria-label={t("TEXT_WHATSAPP_MEMBER", { value: m.name })}><MessageCircle size={18} strokeWidth={2}/></button>
                        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-info text-on-info motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-email-${m.id}`} onClick={(e) => { e.stopPropagation(); openMsg(m, 'email'); }}  title={t("COPY_EMAIL_4")} aria-label={t("TEXT_EMAIL_MEMBER", { value: m.name })}><Mail size={18} strokeWidth={2}/></button>
                        {(() => { if (m.status !== MEMBER_SUSPENDED_STATUS && m.pendingAmount > 0) return (<button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-danger text-on-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-suspend-member-${mapIndex}`} onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(true); }}  title={t("COPY_SUSPEND_MEMBER")} aria-label={t("TEXT_SUSPEND_MEMBER", { value: m.name })}><Ban size={18} strokeWidth={2}/></button>); return (() => { if (m.status === MEMBER_SUSPENDED_STATUS) return (<button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-success text-on-success hover:bg-success-bg motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-unsuspend-member-${m.id}`} onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(false); }}  title={t("COPY_UNSUSPEND_MEMBER")} aria-label={t("TEXT_UNSUSPEND_MEMBER", { value: m.name })}><Ban size={18} strokeWidth={2}/></button>); return null; })(); })()}
                        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-danger text-on-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstable-button-delete-member-${m.id}`}
                          onClick={async (e) => { 
                            e.stopPropagation();
                            const confirmed = await confirm({
                              title: t("COPY_DELETE_MEMBER"),
                              message: t("TEXT_DELETE_MEMBER_CONFIRM_MESSAGE", { value: m.name }),
                              confirmText: t("COPY_DELETE_1"),
                              type: 'danger' });
                            if (confirmed) deleteMember(m.id);
                          }}
                          
                          title={t("COPY_DELETE_2")}
                          aria-label={t("TEXT_DELETE_MEMBER_ROW", { value: m.name })}
                        >
                          <Trash2 size={18} strokeWidth={2}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
                {members.length === 0 && !isPending && !isError && (
                  <tr>
                    <td colSpan={MEMBERS_TABLE_HEADERS.length} className="p-0 border-b-0">
                      <ManagerMembersEmptyState />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <ManagerPagination data-testid="manager_members-managermemberstable-managerpagination-1" 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalMembers} 
            itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </>
      ); })(); })()}
    </div>
 );
}
