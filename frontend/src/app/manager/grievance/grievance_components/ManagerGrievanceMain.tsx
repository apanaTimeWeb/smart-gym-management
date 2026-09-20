// RESPONSIBILITY: Renders the Manager grievance list page and composes the feature-owned grievance UI sections.
"use client";

import { useState } from 'react';
import { CheckCircle, Loader2, Plus, Search, X } from 'lucide-react';
import { formatDateTime } from '@/lib/formatters';
import { ManagerGrievanceLogComplaintModal } from '@/app/manager/grievance/grievance_components/ManagerGrievanceLogComplaintModal';
import { useManagerGrievanceLogic } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceLogic';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { getManagerErrorMessage } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { GrievanceStatus } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';


function getGrievanceStatusClass(status: GrievanceStatus): string {
  switch (status) {
    case 'CLOSED': return 'bg-success-bg text-success';
    case 'RESOLVING': return 'bg-warning-bg text-warning';
    default: return 'bg-danger-bg text-danger';
  }
}

/** Renders the Manager grievance queue, search flow and inline resolution workflow. */
export default function ManagerGrievanceMain() {
  const { tickets, isPending, isError, error, reload, createTicket, resolveTicket, isResolving } = useManagerGrievanceLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolvingTicketId, setResolvingTicketId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const { confirmAndClose } = useManagerUnsavedChangesGuard(resolutionNote.trim().length > 0 && !isResolving);
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const filteredTickets = tickets.filter((ticket) =>
    !normalizedSearch ||
    ticket.memberName.toLowerCase().includes(normalizedSearch) ||
    ticket.issue.toLowerCase().includes(normalizedSearch),
  );

  const handleResolveSubmit = async () => {
    if (!resolvingTicketId || !resolutionNote.trim() || isResolving) return false;
    const success = await resolveTicket(resolvingTicketId, resolutionNote.trim());
    if (success) {
      setResolvingTicketId(null);
      setResolutionNote('');
    }
    return success;
  };

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader
        title="Member Grievances"
        subtitle="Manage and resolve member complaints locally"
        action={{ label: 'Log Complaint', onClick: () => setIsModalOpen(true), icon: <Plus size={18} /> }}
      />

      <div className="p-4 sm:p-6 space-y-5">
        <div className="relative w-full max-w-md">
          <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <label htmlFor="manager-grievance-search" className="sr-only">Search complaints</label>
          <input
            id="manager-grievance-search"
            type="search"
            placeholder="Search by member name or issue..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full min-h-11 pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {isPending ? (
          <div className="space-y-4" aria-label="Loading grievances">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-32 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse">
                <div className="h-full w-2/3 rounded-xl bg-skeleton-highlight" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-danger bg-danger-bg p-6">
            <p className="text-sm font-semibold text-danger">We could not load grievances right now.</p>
            <p className="mt-1 text-sm text-secondary">{getManagerErrorMessage(error)}</p>
            <button type="button" onClick={() => void reload()} className="mt-4 min-h-11 rounded-lg bg-primary text-on-primary px-4 font-semibold inline-flex items-center gap-2">
              <Loader2 size={17} aria-hidden="true" /> Retry
            </button>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-success" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-primary">No complaints found</h3>
            <p className="text-secondary text-sm mt-1">Try clearing your search or log a new complaint.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <article key={ticket.id} className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-card">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                      <h3 className="text-base font-bold text-primary">{ticket.memberName}</h3>
                      <span className="px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-input text-secondary rounded">{ticket.category.replace('_', ' ')}</span>
                    </div>
                    <p className="text-sm text-secondary mb-3">{ticket.issue}</p>
                    <p className="text-xs text-secondary font-medium">Reported: {formatDateTime(ticket.loggedAt)}</p>
                    {ticket.resolutionNote && (
                      <div className="mt-3 p-3 bg-success-bg rounded-lg border border-success text-sm">
                        <span className="font-semibold text-success">Resolution:</span> <span className="text-secondary">{ticket.resolutionNote}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-stretch lg:items-end gap-3 lg:min-w-36 shrink-0 border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-4">
                    <span className={`self-start lg:self-end px-3 py-1 text-xs font-bold rounded-full ${getGrievanceStatusClass(ticket.status)}`}>{ticket.status}</span>
                    {ticket.status !== 'CLOSED' && resolvingTicketId !== ticket.id && (
                      <button type="button" onClick={() => setResolvingTicketId(ticket.id)} className="w-full min-h-11 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-on-primary motion-safe:transition-colors">Resolve</button>
                    )}
                  </div>
                </div>

                {resolvingTicketId === ticket.id && (
                  <div className="mt-4 p-4 bg-input rounded-xl border border-border">
                    <div className="flex justify-between items-center gap-3 mb-2">
                      <label htmlFor={`manager-grievance-resolution-${ticket.id}`} className="text-sm font-bold text-primary">Resolution Note</label>
                      <button type="button" onClick={() => { setResolvingTicketId(null); setResolutionNote(''); }} aria-label="Cancel resolution" className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary hover:bg-card rounded-lg motion-safe:transition-colors"><X size={16} aria-hidden="true" /></button>
                    </div>
                    <textarea
                      id={`manager-grievance-resolution-${ticket.id}`}
                      value={resolutionNote}
                      onChange={(event) => setResolutionNote(event.target.value)}
                      placeholder="How was this resolved?"
                      className="w-full min-h-28 resize-none bg-card border border-border rounded-lg px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary mb-3"
                    />
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                      <button type="button" onClick={() => { setResolvingTicketId(null); setResolutionNote(''); }} className="min-h-11 px-4 text-sm font-semibold rounded-lg border border-border text-secondary hover:bg-card motion-safe:transition-colors">Cancel</button>
                      <button type="button" disabled={!resolutionNote.trim() || isResolving} onClick={() => { void handleResolveSubmit(); }} className="min-w-32 min-h-11 px-4 text-sm font-semibold rounded-lg bg-success text-on-success disabled:opacity-70 motion-safe:transition-colors inline-flex items-center justify-center gap-2">{isResolving && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true" />}{isResolving ? 'Submitting…' : 'Submit Resolution'}</button>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <ManagerGrievanceLogComplaintModal onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />}
    </div>
  );
}
