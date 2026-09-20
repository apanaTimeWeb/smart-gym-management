// RESPONSIBILITY: Renders the primary tabular list of members with actions, filtering state, and pagination.
'use client';
import { MessageCircle, Mail, Loader2, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerMembersFilters } from '@/app/trainer/members/members_utils/useTrainerMembersFilters';
import { useTrainerMembersQuery } from '@/app/trainer/members/members_queries/useTrainerMembersQuery';
import { MEMBERS_STATUS_COLORS, MEMBERS_TABLE_HEADERS } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';
import type { TrainerMembersSortField } from '@/app/trainer/members/members_types/TrainerMembers_types';
import { maskSensitiveData, formatDate, displayValue } from '@/lib/formatters';
import TrainerMembersEmptyState from '@/app/trainer/members/members_components/TrainerMembersEmptyState/TrainerMembersEmptyState';

import TrainerPagination from '@/app/trainer/trainer_components/TrainerShared/TrainerPagination';
import { TRAINER_ITEMS_PER_PAGE } from '@/app/trainer/trainer_utils/TrainerSharedConstants';

export default function TrainerMembersTable() {
  const { search, debouncedSearch, statusFilter, progressStatusFilter, currentPage, setCurrentPage, sortBy, sortDirection, setSort } = useTrainerMembersFilters();
  const setSelectedMember = useTrainerMembersStore(s => s.setSelectedMember);
  const openMsg = useTrainerMembersStore(s => s.openMsg);
  const setProfileTab = useTrainerMembersStore(s => s.setProfileTab);

  const { data, isLoading } = useTrainerMembersQuery({ 
    page: String(currentPage), 
    limit: String(TRAINER_ITEMS_PER_PAGE), 
    search: debouncedSearch, 
    status: statusFilter, 
    progressStatus: progressStatusFilter,
    sortBy,
    sortDirection
  });

  const members = data?.members || [];
  const totalMembers = data?.total || 0;
  const totalPages = Math.ceil(totalMembers / TRAINER_ITEMS_PER_PAGE);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden flex flex-col h-full min-h-96">
      {isLoading ? (
        <div className="flex items-center justify-center py-16 flex-1">
          <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-highlight">
                <tr>
                  {MEMBERS_TABLE_HEADERS.map((header) => {
                    const fieldByHeader: Record<string, TrainerMembersSortField | null> = { ID: 'id', MEMBER: 'name', STATUS: 'status', EXPIRY: 'expiryDate', PROGRESS: 'progressStatus' };
                    const field = fieldByHeader[header] ?? null;
                    const active = field ? sortBy === field : false;
                    const SortIcon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                    return <th key={header} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3">
                      {field ? <button type="button" onClick={() => setSort(field)} className="inline-flex items-center gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Sort by ${header.toLowerCase()}`}>{header}<SortIcon size={18} className={active ? 'text-primary' : 'text-secondary'} aria-hidden="true" /></button> : header}
                    </th>;
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map(m => {
                  const statusStyle = MEMBERS_STATUS_COLORS[m.status] || { bg: 'bg-input', text: 'text-secondary' };
                  return (
                  <tr 
                    key={m.id} 
                    className="hover:bg-surface-highlight motion-safe:transition-colors cursor-pointer"
                    onClick={() => { setSelectedMember(m.id); setProfileTab('overview'); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedMember(m.id); setProfileTab('overview'); } }} role="button" tabIndex={0}
                  >
                    <td className="px-5 py-3.5 text-sm text-secondary font-medium">
                      #{m.id.split('-').pop()?.substring(0, 5) || m.id.substring(0, 5)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-primary-subtle text-primary">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-primary">{m.name}</p>
                            {m.isPT && (
                              <span className="text-xs font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-info-bg text-info border border-info/20">PT</span>
                            )}
                          </div>
                          <p className="text-xs text-secondary">{maskSensitiveData(m.phone, 'phone')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-primary">{displayValue(m.age)} / {displayValue(m.gender)}</td>
                    <td className="px-5 py-3.5">
                      <span 
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{formatDate(m.expiryDate)}</td>
                    <td className="px-5 py-3.5 text-sm text-primary whitespace-nowrap">{displayValue(m.fitnessGoal)}</td>
                    <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{displayValue(m.lastWorkout)}</td>
                    <td className="px-5 py-3.5 text-sm whitespace-nowrap">
                      <div className="flex gap-2">
                        <span className={`w-2 h-2 rounded-full ${m.assignedDietId ? 'bg-success' : 'bg-input'}`} title="Diet Plan" />
                        <span className={`w-2 h-2 rounded-full ${m.assignedWorkoutId ? 'bg-primary' : 'bg-input'}`} title="Workout Plan" />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-secondary whitespace-nowrap">{displayValue(m.daysSinceLastCheckIn)}</td>
                    <td className="px-5 py-3.5 text-sm whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                        m.progressStatus === 'Good' ? 'bg-success-bg text-success' : 
                        m.progressStatus === 'Needs Attention' ? 'bg-danger-bg text-danger' : 
                        'bg-warning-bg text-warning'
                      }`}>
                        {displayValue(m.progressStatus)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={(e) => { e.stopPropagation(); openMsg({ name: m.name, phone: m.phone, email: m.email }, 'whatsapp', ''); }} className="p-1.5 rounded-lg bg-success text-on-success motion-safe:hover:brightness-110 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title="WhatsApp" aria-label={`Message ${m.name} on WhatsApp`}><MessageCircle size={18} /></button>
                        <button type="button" onClick={(e) => { e.stopPropagation(); openMsg({ name: m.name, phone: m.phone, email: m.email }, 'email', ''); }} className="p-1.5 rounded-lg bg-info text-on-info motion-safe:hover:brightness-110 motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title="Email" aria-label={`Email ${m.name}`}><Mail size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )})}
                {members.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={11} className="p-0 border-b-0">
                      <TrainerMembersEmptyState isFiltered={Boolean(search || statusFilter !== 'All' || progressStatusFilter !== 'All')} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TrainerPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalMembers} 
            itemsPerPage={TRAINER_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
 );
}


