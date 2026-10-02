'use client';
/**
 * RESPONSIBILITY: React component SuperadminTicketsMain owned by the superadmin_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/components/ui/Pagination, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_header/SuperadminTicketsHeader, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_reply_modal/SuperadminTicketsReplyModal, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_table/SuperadminTicketsTable, @/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsMainViewModel
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Composes the Tickets page from feature-owned query, mutation, store, and modal state; contains no API or business orchestration.
import { Loader2 } from 'lucide-react';

import Pagination from '@/components/ui/Pagination';

import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';
import SuperadminTicketsHeader from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_header/SuperadminTicketsHeader';
import SuperadminTicketsReplyModal from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_reply_modal/SuperadminTicketsReplyModal';
import SuperadminTicketsTable from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_table/SuperadminTicketsTable';
import { useSuperadminTicketsMainViewModel } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsMainViewModel';



/**
 * @description Composes the Tickets page from feature-owned query, mutation, store, and modal state; contains no API or business orchestration.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminTicketsMain() {
  const vm = useSuperadminTicketsMainViewModel();

  if (vm.isPending) return (<div className="space-y-6" aria-busy="true" data-testid="superadmin_tickets-superadmin-tickets-main-page"><div className="h-8 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-96 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" /></div>);
  if (vm.isError) return <div className="p-8 text-center text-danger" role="alert" data-testid="superadmin_tickets-superadmin-tickets-main-superadmin_tickets-main-error">{vm.t('ui.tickets_could_not_be_loaded_3f9e2c1')}</div>;

  return (<div className="space-y-6" data-testid="superadmin_tickets-superadmin-tickets-main-page-ready">
    <SuperadminTicketsHeader search={vm.search} setSearch={vm.setSearch} showFilter={vm.showFilter} setShowFilter={vm.setShowFilter} statusFilter={vm.statusFilter} setStatusFilter={vm.setStatusFilter} priorityFilter={vm.priorityFilter} setPriorityFilter={vm.setPriorityFilter} onFilterChange={() => vm.setCurrentPage(1)} data-testid="superadmin_tickets-superadmin-tickets-header-interactive-1" />
    <div className="flex flex-col min-h-96 rounded-xl border border-border bg-card shadow-card">
      <SuperadminLayoutErrorBoundary variant="inline"><SuperadminTicketsTable tickets={vm.paginatedTickets} onReply={vm.setReplyModalTicketId} onClose={vm.handleCloseTicket} onAssign={vm.handleOpenAssign} data-testid="superadmin_tickets-superadmin-tickets-table-interactive-2" /></SuperadminLayoutErrorBoundary>
      <Pagination currentPage={vm.currentPage} totalPages={vm.totalPages} onPageChange={vm.setCurrentPage}  data-testid="superadmin_tickets-superadmin-tickets-main-superadmin-tickets-main-pagination"/>
    </div>
    <SuperadminTicketsReplyModal isOpen={Boolean(vm.replyModalTicketId)} onClose={() => vm.setReplyModalTicketId(null)} ticketId={vm.replyModalTicketId} data-testid="superadmin_tickets-superadmin-tickets-reply-modal-interactive-3" />
    {vm.assignModalTicketId ? (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-ticket-assign-title" data-testid="superadmin_tickets-superadmin-tickets-main-superadmin_tickets-main-assign-dialog" ref={vm.assignDialogRef}>
      <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-overlay p-6 shadow-dialog">
        <h2 id="superadmin-ticket-assign-title" data-autofocus="true" className="text-base font-bold text-primary">{vm.t('ui.assign_ticket_2ce81f4')}</h2>
        <p className="text-sm text-secondary">{vm.t('ui.enter_the_name_or_email_of_the_superadmin_team_member_to_as_57eb516')}</p>
        <label htmlFor="superadmin-ticket-assignee" className="sr-only">{vm.t('ui.assignee_138416f')}</label>
        <input id="superadmin-ticket-assignee" type="text" value={vm.assigneeInput} onChange={(event) => vm.setAssigneeInput(event.target.value)} placeholder={vm.t('ui.e_g_support_gymsmart_in_c021bc7')} disabled={vm.isAssigning} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out" autoFocus aria-describedby="superadmin-ticket-assignee-help" data-testid="superadmin_tickets-superadmin-tickets-main-superadmin_tickets-main-assignee" />
        <p id="superadmin-ticket-assignee-help" className="text-xs text-secondary">{vm.t('ui.the_assignment_is_saved_only_after_the_api_confi_907d8c7')}</p>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => { vm.setAssignModalTicketId(null); vm.setAssigneeInput(''); }} disabled={vm.isAssigning} className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_tickets-superadmin-tickets-main-superadmin_tickets-main-assign-cancel">{vm.t('ui.cancel_292aa09')}</button>
          <button type="button" onClick={() => void vm.handleConfirmAssign()} disabled={!vm.assigneeInput.trim() || vm.isAssigning} className="min-h-11 inline-flex min-w-28 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_tickets-superadmin-tickets-main-superadmin_tickets-main-assign-submit">
            {vm.isAssigning ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" />{vm.t('ui.saving_c2555de')}</> : vm.t('ui.assign')}
          </button>
        </div>
      </div>
    </div>) : null}
    {vm.isClosing ? <span className="sr-only" role="status" data-testid="superadmin_tickets-superadmin-tickets-main-superadmin_tickets-main-closing">{vm.t('ui.updating_ticket_3a86874')}</span> : null}
  </div>);
}
