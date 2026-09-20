'use client';
import { getManagerErrorMessage } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { formatCurrencyFromMinorUnits } from '@/lib/formatters';
// RESPONSIBILITY: Renders the primary tabular list of members with actions, filtering state, and pagination.
import { Edit, MessageCircle, Mail, Trash2, Users, Banknote, Ban, Loader2 } from 'lucide-react';
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useFetchMembers } from '@/app/manager/members/members_api/ManagerUseManagerMembersQueries';
import { MEMBERS_STATUS_COLORS, MEMBERS_TABLE_HEADERS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import { maskSensitiveData, formatDate, displayValue } from '@/lib/formatters';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/manager/manager_infrastructure/ManagerPaginationDefaults';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import { useState } from 'react';
import type { MemberSortColumn } from '@/app/manager/members/members_types/ManagerMembersTypes';
import ManagerMembersSortIcon from '@/app/manager/members/members_components/ManagerMembersSortIcon/ManagerMembersSortIcon';
import type { ChangeEvent } from 'react';

export default function ManagerMembersTable() {
  // useConfirm provides the design-system confirm modal (Rule 71 â€” no window.confirm)
  const { confirm } = useConfirm();
  const { 
    debouncedSearch, search, statusFilter, genderFilter, planFilter, expiryFrom, expiryTo, currentPage, setCurrentPage,
    setSelectedMember, openEdit, openMsg, deleteMember, setShowPaymentModal, toggleSuspend,
    sortColumn, sortDirection, setSortColumn, setSortDirection
  } = useManagerMembersLogic();

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const { data: membersRes, isLoading, isError, error, refetch } = useFetchMembers({ 
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
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      {isLoading ? (
        <div className="flex items-center justify-center py-16 flex-1">
          <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div role="alert" className="p-8 text-center text-danger space-y-3"><p>{getManagerErrorMessage(error)}</p><button type="button" onClick={() => void refetch()} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold motion-safe:transition-colors">Retry</button></div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/5">
                <tr>
                  <th className="px-2 py-3 w-10 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                      checked={members.length > 0 && selectedRows.size === members.length}
                      onChange={toggleAll}
                    />
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[1].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={sortColumn === 'name' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <button type="button" className="inline-flex items-center motion-safe:transition-colors" onClick={() => handleSort('name')} aria-label="Sort by member">
                      MEMBER <ManagerMembersSortIcon column="name" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[3].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[4].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={sortColumn === 'status' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <button type="button" className="inline-flex items-center motion-safe:transition-colors" onClick={() => handleSort('status')} aria-label="Sort by status">
                      STATUS <ManagerMembersSortIcon column="status" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={sortColumn === 'joinDate' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <button type="button" className="inline-flex items-center motion-safe:transition-colors" onClick={() => handleSort('joinDate')} aria-label="Sort by join date">
                      JOIN DATE <ManagerMembersSortIcon column="joinDate" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={sortColumn === 'expiryDate' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <button type="button" className="inline-flex items-center motion-safe:transition-colors" onClick={() => handleSort('expiryDate')} aria-label="Sort by expiry">
                      EXPIRY <ManagerMembersSortIcon column="expiryDate" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap" aria-sort={sortColumn === 'paidAmount' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <button type="button" className="inline-flex items-center motion-safe:transition-colors" onClick={() => handleSort('paidAmount')} aria-label="Sort by paid">
                      PAID <ManagerMembersSortIcon column="paidAmount" activeColumn={sortColumn} direction={sortDirection} />
                    </button>
                  </th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[9].label}</th>
                  <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-2 py-3 whitespace-nowrap">{MEMBERS_TABLE_HEADERS[10].label}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map(m => {
                  const statusStyle = MEMBERS_STATUS_COLORS[m.status] || { bg: 'bg-input', text: 'text-secondary' };
                  return (
                  <tr 
                    key={m.id} 
                    className="hover:bg-primary/5 motion-safe:transition-colors cursor-pointer"
                    tabIndex={0}
                    role="button"
                    aria-label={`Open member ${m.name}`}
                    onClick={() => { setSelectedMember(m); }}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedMember(m); } }}
                  >
                    <td className="px-2 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                        checked={selectedRows.has(m.id)}
                        onChange={(e) => toggleRow(m.id, e)}
                      />
                    </td>
                    <td className="px-2 py-3 text-xs text-secondary font-medium whitespace-nowrap">
                      <span className="font-bold text-primary">{m.id}</span>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-primary/10 text-primary shrink-0">
                          {m.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-primary">{displayValue(m.name)}</p>
                          <p className="text-xs text-secondary">{maskSensitiveData(m.phone || '', 'phone')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-xs text-secondary whitespace-nowrap">{displayValue(m.gender)}</td>
                    <td className="px-2 py-3 text-xs text-primary whitespace-nowrap">{displayValue(m.plan?.name)}</td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <span 
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-xs text-secondary whitespace-nowrap">{formatDate(m.joinDate)}</td>
                    <td className="px-2 py-3 text-xs text-secondary whitespace-nowrap">{formatDate(m.expiryDate)}</td>
                    <td className="px-2 py-3 text-xs font-semibold text-success whitespace-nowrap">{formatCurrencyFromMinorUnits(m.paidAmount, ManagerEnvConfig.currencyCode)}</td>
                    <td className="px-2 py-3 text-xs font-semibold text-danger whitespace-nowrap">{m.pendingAmount > 0 ? formatCurrencyFromMinorUnits(m.pendingAmount, ManagerEnvConfig.currencyCode) : 'â€”'}</td>
                    <td className="px-2 py-3 text-xs whitespace-nowrap">

                      <div className="flex items-center gap-1.5">
                        {m.pendingAmount > 0 && (
                          <button onClick={(e) => { e.stopPropagation(); setSelectedMember(m); setShowPaymentModal(true); }} className="p-1.5 rounded-lg bg-warning/10 text-warning hover:bg-warning/20 motion-safe:transition-all motion-safe:duration-200" title="Collect Dues" aria-label={`Collect Dues for ${m.name}`}><Banknote size={18} /></button>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); openEdit(m); }} className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200" title="Edit" aria-label={`Edit ${m.name}`}><Edit size={18} /></button>
                        <button onClick={(e) => { e.stopPropagation(); openMsg(m, 'whatsapp'); }} className="p-1.5 rounded-lg bg-success text-on-success hover:opacity-80 motion-safe:transition-all motion-safe:duration-200" title="WhatsApp" aria-label={`Message ${m.name} on WhatsApp`}><MessageCircle size={18} /></button>
                        <button onClick={(e) => { e.stopPropagation(); openMsg(m, 'email'); }} className="p-1.5 rounded-lg bg-info text-on-info hover:opacity-80 motion-safe:transition-all motion-safe:duration-200" title="Email" aria-label={`Email ${m.name}`}><Mail size={18} /></button>
                        {m.status !== 'SUSPENDED' && m.pendingAmount > 0 ? (
                          <button onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(true); }} className="p-1.5 rounded-lg bg-danger text-on-danger hover:bg-danger/20 motion-safe:transition-all motion-safe:duration-200" title="Suspend Member" aria-label={`Suspend ${m.name}`}><Ban size={18} /></button>
                        ) : m.status === 'SUSPENDED' ? (
                          <button onClick={(e) => { e.stopPropagation(); setSelectedMember(m); toggleSuspend(false); }} className="p-1.5 rounded-lg bg-success text-on-success hover:bg-success/20 motion-safe:transition-all motion-safe:duration-200" title="Unsuspend Member" aria-label={`Unsuspend ${m.name}`}><Ban size={18} /></button>
                        ) : null}
                        <button
                          onClick={async (e) => { 
                            e.stopPropagation();
                            const confirmed = await confirm({
                              title: 'Delete Member',
                              message: `Are you sure you want to permanently delete "${m.name}"? This action cannot be undone.`,
                              confirmText: 'Delete',
                              type: 'danger' });
                            if (confirmed) deleteMember(m.id);
                          }}
                          className="p-1.5 rounded-lg bg-danger text-on-danger hover:opacity-80 motion-safe:transition-all motion-safe:duration-200"
                          title="Delete"
                          aria-label={`Delete ${m.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )})}
                {members.length === 0 && !isLoading && !isError && (
                  <tr>
                    <td colSpan={MEMBERS_TABLE_HEADERS.length} className="p-0 border-b-0">
                      <ManagerEmptyState 
                        icon={<Users size={18} />}
                        title={Boolean(search || statusFilter !== 'All') ? 'No members found' : 'No members yet'}
                        subtitle={Boolean(search || statusFilter !== 'All') ? 'Try adjusting your filters.' : 'Add your first member to get started.'}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <ManagerPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalMembers} 
            itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
 );
}

