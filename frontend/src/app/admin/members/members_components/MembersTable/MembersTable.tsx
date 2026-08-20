// RESPONSIBILITY: Renders the primary tabular list of members with actions, filtering state, and pagination.
'use client';

import { Edit, MessageCircle, Mail, Trash2, Loader2 } from 'lucide-react';
import { useMembersContext } from '@/app/admin/members/members_context/MembersContext';
import { useMembersStore } from '@/app/admin/members/members_store/useMembersStore';
import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS, MEMBERS_TABLE_HEADERS, formatCurrency } from '@/app/admin/members/members_utils/MembersSharedConstants';
import { maskSensitiveData } from '@/lib/formatters';
import MembersEmptyState from '@/app/admin/members/members_components/MembersEmptyState/MembersEmptyState';

import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { ADMIN_ITEMS_PER_PAGE } from '@/app/admin/admin_utils/AdminSharedConstants';

import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { MOCK_BRANCHES } from '@/app/admin/admin_store/useAdminGlobalStore';

export default function MembersTable() {
  const { 
    search, debouncedSearch, statusFilter, currentPage, setCurrentPage,
    setSelectedMember, openEdit, openMsg, deleteMember
  } = useMembersContext();

  const rawMembers = useMembersStore(s => s.members);
  const totalMembers = useMembersStore(s => s.totalMembers);
  const fetchState = useMembersStore(s => s.fetchState);
  const loadMemberProfile = useMembersStore(s => s.loadMemberProfile);
  
  const { selectedBranchId } = useAdminGlobalStore();

  // Deterministically assign a branch to a member based on charCode for demo purposes
  const getBranchForMember = (id: string) => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return MOCK_BRANCHES[sum % MOCK_BRANCHES.length];
  };

  const members = rawMembers.filter(m => {
    if (selectedBranchId === 'all') return true;
    return getBranchForMember(m.id).id === selectedBranchId;
  });

  const totalPages = Math.ceil(totalMembers / ADMIN_ITEMS_PER_PAGE);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden flex flex-col h-full min-h-96">
      {fetchState === 'loading' ? (
        <div className="flex items-center justify-center py-16 flex-1">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/5">
                <tr>
                  {MEMBERS_TABLE_HEADERS.map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {members.map(m => {
                  const statusStyle = MEMBERS_STATUS_COLORS[m.status] || { bg: 'bg-input', text: 'text-secondary' };
                  const branch = getBranchForMember(m.id);
                  return (
                  <tr 
                    key={m.id} 
                    className="hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={() => { setSelectedMember(m); loadMemberProfile(m.id); }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-primary/10 text-primary flex-shrink-0">
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{m.name}</p>
                          <p className="text-xs text-secondary">{maskSensitiveData(m.phone, 'phone')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                        {branch.name}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-foreground whitespace-nowrap">{m.plan?.name || `Plan #${m.planId}`}</td>
                    <td className="px-5 py-3.5">
                      <span 
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-secondary">{MEMBERS_CYCLE_LABELS[m.billingCycle] || m.billingCycle}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-success">{formatCurrency(m.paidAmount)}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-danger">{m.pendingAmount > 0 ? formatCurrency(m.pendingAmount) : '—'}</td>
                    <td className="px-5 py-3.5 text-sm text-secondary">{new Date(m.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); openEdit(m); }} className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle transition-all duration-200" title="Edit" aria-label={`Edit ${m.name}`}><Edit size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); openMsg(m, 'whatsapp'); }} className="p-1.5 rounded-lg bg-success text-white hover:opacity-80 transition-all duration-200" title="WhatsApp" aria-label={`Message ${m.name} on WhatsApp`}><MessageCircle size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); openMsg(m, 'email'); }} className="p-1.5 rounded-lg bg-info text-white hover:opacity-80 transition-all duration-200" title="Email" aria-label={`Email ${m.name}`}><Mail size={14} /></button>
                        <button onClick={(e) => { e.stopPropagation(); deleteMember(m.id); }} className="p-1.5 rounded-lg bg-danger-bg text-danger hover:opacity-80 transition-all duration-200" title="Delete" aria-label={`Delete ${m.name}`}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                )})}
                {members.length === 0 && fetchState === 'success' && (
                  <tr>
                    <td colSpan={8} className="p-0 border-b-0">
                      <MembersEmptyState isFiltered={Boolean(search || statusFilter !== 'All')} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <AdminPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalMembers} 
            itemsPerPage={ADMIN_ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
 );
}
