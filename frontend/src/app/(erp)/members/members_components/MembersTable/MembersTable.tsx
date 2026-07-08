"use client";

import { Eye, Edit, MessageCircle, Mail, Trash2 } from 'lucide-react';
import { useMembersContext } from '@/app/(erp)/members/members_context/MembersContext';
import { MEMBERS_STATUS_COLORS, MEMBERS_CYCLE_LABELS, MEMBERS_TABLE_HEADERS, formatCurrency } from '@/app/(erp)/members/members_utils/MembersSharedConstants';

import ErpPagination from '@/app/(erp)/erp_components/ErpPagination';

export default function MembersTable() {
  const { 
    members, loading, search, statusFilter, currentPage, setCurrentPage,
    setSelectedMember, loadMemberProfile, openEdit, openMsg, deleteMember 
  } = useMembersContext();

  const filtered = members.filter(m => {
    const ms = m.name.toLowerCase().includes(search.toLowerCase()) || m.phone.includes(search);
    const mf = statusFilter === 'All' || m.status === statusFilter;
    return ms && mf;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-[var(--members-bg-card)] rounded-xl shadow-sm border border-[var(--members-border)] overflow-hidden flex flex-col h-full min-h-[400px]">
      {loading ? (
        <div className="flex items-center justify-center py-16 flex-1">
          <div className="w-8 h-8 border-4 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--members-table-header-bg)]">
                <tr>
                  {MEMBERS_TABLE_HEADERS.map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-[var(--members-text-secondary)] uppercase tracking-wider px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--members-border)]">
                {currentData.map(m => (
                  <tr key={m.id} className="hover:bg-[var(--members-hover-bg)] transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: 'var(--members-highlight-subtle)', color: 'var(--members-highlight)' }}>
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--members-text-primary)]">{m.name}</p>
                          <p className="text-xs text-[var(--members-text-secondary)]">{m.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[var(--members-text-primary)]">{m.plan?.name || `Plan #${m.planId}`}</td>
                    <td className="px-5 py-3.5">
                      <span 
                        className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold" 
                        style={{ background: MEMBERS_STATUS_COLORS[m.status]?.split(' ')[0] || '#f3f4f6', color: MEMBERS_STATUS_COLORS[m.status]?.split(' ')[1] || '#374151' }}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-[var(--members-text-secondary)]">{MEMBERS_CYCLE_LABELS[m.billingCycle] || m.billingCycle}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-[var(--success)]">{formatCurrency(m.paidAmount)}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-[var(--danger)]">{m.pendingAmount > 0 ? formatCurrency(m.pendingAmount) : '—'}</td>
                    <td className="px-5 py-3.5 text-sm text-[var(--members-text-secondary)]">{new Date(m.expiryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedMember(m); loadMemberProfile(m.id); }} className="p-1.5 rounded-lg bg-[var(--info-bg)] text-[var(--info)] hover:bg-[var(--info-bg)]" title="View Profile"><Eye size={14} /></button>
                        <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg bg-[var(--bg-page)] text-[var(--text-tertiary)] hover:bg-[var(--primary-subtle)] dark:bg-[var(--bg-card)] dark:text-[var(--text-secondary)]" title="Edit"><Edit size={14} /></button>
                        <button onClick={() => openMsg(m, 'whatsapp')} className="p-1.5 rounded-lg text-white" style={{ background: '#25D366' }} title="WhatsApp"><MessageCircle size={14} /></button>
                        <button onClick={() => openMsg(m, 'email')} className="p-1.5 rounded-lg text-white" style={{ background: 'hsl(217 91% 60%)' }} title="Email"><Mail size={14} /></button>
                        <button onClick={() => deleteMember(m.id)} className="p-1.5 rounded-lg bg-[var(--danger-bg)] text-[var(--danger)] hover:bg-[var(--danger-bg)]" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-[var(--members-text-secondary)]">
                      {search || statusFilter !== 'All' ? 'No members match the filter.' : 'No members yet. Add your first member!'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <ErpPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={filtered.length} 
            itemsPerPage={ITEMS_PER_PAGE} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
 );
}
