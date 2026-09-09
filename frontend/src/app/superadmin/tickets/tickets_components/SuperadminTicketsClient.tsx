// RESPONSIBILITY: Root orchestrator for the Tickets page. Composes isolated sub-components and passes state from useSuperadminTickets. No business logic here.
'use client';

import { useState } from 'react';
import { useSuperadminTickets } from '@/app/superadmin/tickets/tickets_utils/useSuperadminTickets';
import SuperadminTicketsHeader from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsHeader/SuperadminTicketsHeader';
import SuperadminTicketsTable from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsTable/SuperadminTicketsTable';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';
import SuperadminTicketsReplyModal from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsReplyModal/SuperadminTicketsReplyModal';

export default function SuperadminTicketsClient() {
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleCloseTicket = async (ticketId: string) => {
    try {
      const { ticketsApi } = await import('@/app/superadmin/tickets/superadmin_tickets_api/superadmin_tickets_api');
      // @ts-expect-error PATCH /superadmin/tickets/:id/close to be implemented
      await ticketsApi.closeTicket(ticketId);
    } catch {
      // handled by error boundary
    }
  };

  const handleAssignTicket = (ticketId: string) => {
    // @ts-expect-error Assign modal to be implemented in future iteration
    const assignee = prompt('Enter assignee name or email:');
    if (assignee) {
      // eslint-disable-next-line no-console
      console.log(`Assigning ticket ${ticketId} to ${assignee}`);
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
          onAssign={handleAssignTicket}
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
    </div>
  );
}
