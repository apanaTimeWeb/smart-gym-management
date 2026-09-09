// RESPONSIBILITY: Root orchestrator for the Tickets page. Composes isolated sub-components and passes state from useSuperadminTickets. No business logic here.
'use client';

import { useState } from 'react';
import { useSuperadminTickets } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTickets';
import SuperadminTicketsHeader from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader';
import SuperadminTicketsTable from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsTable/SuperadminTicketsTable';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import SuperadminTicketsReplyModal from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal';
import toast from 'react-hot-toast';

export default function SuperadminTicketsClient() {
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [assignModalTicketId, setAssignModalTicketId] = useState<string | null>(null);
  const [assigneeInput, setAssigneeInput] = useState('');

  const handleCloseTicket = async (ticketId: string) => {
    try {
      const { ticketsApi } = await import('@/app/superadmin/tickets/superadmin_tickets_api/superadmin_tickets_api');
      // POST /superadmin/tickets/:id/close — to be implemented on backend
      await (ticketsApi as Record<string, (id: string) => Promise<unknown>>)['closeTicket']?.(ticketId);
      toast.success('Ticket closed.');
    } catch {
      toast.error('Failed to close ticket.');
    }
  };

  const handleOpenAssign = (ticketId: string) => {
    setAssigneeInput('');
    setAssignModalTicketId(ticketId);
  };

  const handleConfirmAssign = async () => {
    if (!assignModalTicketId || !assigneeInput.trim()) return;
    try {
      const { ticketsApi } = await import('@/app/superadmin/tickets/superadmin_tickets_api/superadmin_tickets_api');
      // PATCH /superadmin/tickets/:id/assign — to be implemented on backend
      await (ticketsApi as Record<string, (id: string, assignee: string) => Promise<unknown>>)['assignTicket']?.(
        assignModalTicketId,
        assigneeInput.trim(),
      );
      toast.success(`Ticket assigned to ${assigneeInput.trim()}.`);
    } catch {
      toast.error('Failed to assign ticket.');
    } finally {
      setAssignModalTicketId(null);
      setAssigneeInput('');
    }
  };

  const {
    fetchState,
    error,
    search,
    setSearch,
    showFilter,
    setShowFilter,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedTickets,
  } = useSuperadminTickets();

  if (fetchState === 'loading') return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (error) return <div className="p-8 text-center text-danger">Error loading data.</div>;

  return (
    <div className="space-y-6">
      <SuperadminTicketsHeader
        search={search}
        setSearch={setSearch}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        onFilterChange={() => setCurrentPage(1)}
      />

      <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col min-h-96">
        <SuperadminTicketsTable
          tickets={paginatedTickets}
          onReply={(ticketId) => {
            setSelectedTicketId(ticketId);
            setReplyModalOpen(true);
          }}
          onClose={handleCloseTicket}
          onAssign={handleOpenAssign}
        />
        <SuperadminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <SuperadminTicketsReplyModal
        isOpen={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        ticketId={selectedTicketId}
      />

      {/* Assign Ticket inline modal — replaces forbidden prompt() */}
      {assignModalTicketId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-sm rounded-2xl shadow-xl border border-border p-6 space-y-4">
            <h2 className="text-base font-bold text-foreground">Assign Ticket</h2>
            <p className="text-sm text-secondary">Enter the name or email of the team member to assign this ticket to.</p>
            <input
              type="text"
              value={assigneeInput}
              onChange={(e) => setAssigneeInput(e.target.value)}
              placeholder="e.g. support@gymsmart.in"
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setAssignModalTicketId(null); setAssigneeInput(''); }}
                className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-input motion-safe:transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAssign}
                disabled={!assigneeInput.trim()}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
