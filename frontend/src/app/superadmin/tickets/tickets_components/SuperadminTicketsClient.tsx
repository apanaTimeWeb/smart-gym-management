// RESPONSIBILITY: Root view for the Tickets page. Query/mutation orchestration stays in feature hooks; this file composes UI only.
'use client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSuperadminTickets } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTickets';
import { useSuperadminTicketMutations } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTicketMutations';
import SuperadminTicketsHeader from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader';
import SuperadminTicketsTable from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsTable/SuperadminTicketsTable';
import Pagination from '@/components/ui/Pagination';
import SuperadminTicketsReplyModal from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal';
import { useSuperadminTicketsStore } from '@/app/superadmin/tickets/tickets_store/useSuperadminTicketsStore';
import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_layout/SuperadminLayout/SuperadminErrorBoundary';

export default function SuperadminTicketsClient() {
  const [assigneeInput, setAssigneeInput] = useState('');
  const { isPending, error, totalPages, paginatedTickets } = useSuperadminTickets();
  const { closeTicket, isClosing, assignTicket, isAssigning } = useSuperadminTicketMutations();
  const {
    search, setSearch, showFilter, setShowFilter, statusFilter, setStatusFilter,
    priorityFilter, setPriorityFilter, currentPage, setCurrentPage, replyModalTicketId,
    setReplyModalTicketId, assignModalTicketId, setAssignModalTicketId,
  } = useSuperadminTicketsStore();

  const handleCloseTicket = async (ticketId: string) => {
    await closeTicket(ticketId);
  };

  const handleOpenAssign = (ticketId: string) => {
    setAssigneeInput('');
    setAssignModalTicketId(ticketId);
  };

  const handleConfirmAssign = async () => {
    if (!assignModalTicketId || !assigneeInput.trim() || isAssigning) return;
    await assignTicket({ ticketId: assignModalTicketId, input: { assignee: assigneeInput } });
    setAssignModalTicketId(null);
    setAssigneeInput('');
  };

  if (isPending) return (<div className="space-y-6" aria-busy="true">
    <div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
    <div className="h-96 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
  </div>);
  if (error) return <div className="p-8 text-center text-danger" role="alert">{error}</div>;

  return (<div className="space-y-6">
    <SuperadminTicketsHeader search={search} setSearch={setSearch} showFilter={showFilter} setShowFilter={setShowFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} onFilterChange={() => setCurrentPage(1)} />
    <div className="flex flex-col min-h-96 rounded-xl border border-border bg-card shadow-card">
      <SuperadminErrorBoundary variant="inline">
        <SuperadminTicketsTable tickets={paginatedTickets} onReply={setReplyModalTicketId} onClose={handleCloseTicket} onAssign={handleOpenAssign} />
      </SuperadminErrorBoundary>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
    <SuperadminTicketsReplyModal isOpen={!!replyModalTicketId} onClose={() => setReplyModalTicketId(null)} ticketId={replyModalTicketId} />
    {assignModalTicketId ? (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-ticket-assign-title">
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-overlay p-6 shadow-dialog">
        <h2 id="superadmin-ticket-assign-title" className="text-base font-bold text-primary">Assign Ticket</h2>
        <p className="text-sm text-secondary">Enter the name or email of the team member to assign this ticket to.</p>
        <label htmlFor="superadmin-ticket-assignee" className="sr-only">Assignee</label>
        <input id="superadmin-ticket-assignee" type="text" value={assigneeInput} onChange={(event) => setAssigneeInput(event.target.value)} placeholder="e.g. support@gymsmart.in" disabled={isAssigning} className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" autoFocus aria-describedby="superadmin-ticket-assignee-help" />
        <p id="superadmin-ticket-assignee-help" className="text-xs text-secondary">The assignment is saved only after the API confirms success.</p>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => { setAssignModalTicketId(null); setAssigneeInput(''); }} disabled={isAssigning} className="rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Cancel</button>
          <button type="button" onClick={() => void handleConfirmAssign()} disabled={!assigneeInput.trim() || isAssigning} className="inline-flex min-w-28 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {isAssigning ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>Saving...</> : 'Assign'}
          </button>
        </div>
      </div>
    </div>) : null}
    {isClosing ? <span className="sr-only" role="status">Updating ticket</span> : null}
  </div>);
}
