'use client';
// RESPONSIBILITY: Renders the data table for Support Tickets
import { SUPERADMIN_TICKETS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { MessageSquare, CheckCircle2, UserCheck, AlertOctagon, ExternalLink } from 'lucide-react';

import CopyButton from '@/components/ui/CopyButton';
import { formatDateTime } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_utils/SuperadminTicketsFormatters';


import SuperadminTicketsEmptyState from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_components/superadmin_tickets_empty_state/SuperadminTicketsEmptyState';
import { PriorityColors, StatusColors } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_constants/SuperadminTicketsConstants';
import { getSuperadminTicketsSlaRemainingMs } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_utils/SuperadminTicketsSlaUtils';
import { SuperadminTicketsUrlConfig } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config';

import type { SuperadminTicketsTableProps } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTableTypes';
import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsTypes';

/**
 * @description Renders the data table for Support Tickets
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminTicketsTable({ tickets, onReply, onClose, onAssign }: SuperadminTicketsTableProps) {
  const t = useTranslations('superadmin_tickets');
    const router = useRouter();
    const getSlaStatus = (ticket: SupportTicket) => {
        if (!ticket.slaDeadline)
            return { label: t('ui.sla_no_sla'), color: 'text-secondary', icon: null };
        const diff = getSuperadminTicketsSlaRemainingMs(ticket.slaDeadline);
        if (diff < 0)
            return { label: t('ui.sla_breached'), color: 'text-danger', icon: <AlertOctagon size={18} className="w-3"/> };
        if (diff < 12 * 60 * 60 * 1000)
            return { label: t('ui.sla_approaching'), color: 'text-warning', icon: <AlertOctagon size={18} className="w-3"/> };
        return { label: t('ui.sla_ok'), color: 'text-success', icon: <CheckCircle2 size={18} className="w-3"/> };
    };
    return (<div className="overflow-x-auto flex-1">
      <table className="w-full text-left border-collapse min-w-max superadmin-mobile-card-table">
        <thead>
            <tr className="bg-header border-b border-border text-sm" data-testid="superadmin_tickets-tickets-table-action-1">
              <th className="p-4 font-semibold text-secondary">{t('ui.ticket_id_bfe2ba9')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.gym_4f5e8a8')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.subject_5f39e42')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.priority_292b027')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.status_b9a439d')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.response_time_22cd6ee')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.last_updated_a6d2b1f')}</th>
              <th className="p-4 font-semibold text-secondary text-right">{t('ui.actions_67b65eb')}</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tickets.length === 0 ? (<tr data-testid="superadmin_tickets-tickets-table-action-2">
              <td colSpan={8} data-mobile-label={t('ui.mobile_ticket_id')}><SuperadminTicketsEmptyState /></td>
            </tr>) : (tickets.map((ticket, index) => {
            const sla = getSlaStatus(ticket);
            return (<tr key={ticket.id} tabIndex={0} aria-label={t('ui.a11y_open_ticket', { id: ticket.id })} data-testid={`superadmin_tickets-table-${ticket.id}-open`} className="hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary motion-safe:transition-colors cursor-pointer" onClick={() => onReply(ticket.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onReply(ticket.id); } }}>
                <td className="p-4" data-mobile-label={t('ui.mobile_ticket_id')}>
                  <span className="flex items-center gap-1 text-sm font-mono font-medium text-primary">
                    <span>{ticket.id}</span>
                    <CopyButton value={ticket.id} label={`Copy ticket ID ${ticket.id}`}/>
                  </span>
                </td>
                <td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_gym')}>
                  <button  type="button" onClick={(e) => {
                    e.stopPropagation();
                    router.push(`${SuperadminTicketsUrlConfig.PAGES.GYMS}?id=${ticket.tenantId}`);
                }} className="min-w-11 min-h-11 flex items-center gap-1 hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.view_gym_37e8508')} data-testid={`superadmin_tickets-table-view-${index}`}>
                    {ticket.tenantName} <ExternalLink size={18} className="w-3"/>
                  </button>
                </td>
                <td className="p-4 text-sm text-primary font-medium" data-mobile-label={t('ui.mobile_subject')}>{ticket.subject}</td>
                <td className="p-4 text-sm" data-mobile-label={t('ui.mobile_priority')}>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${PriorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold" data-mobile-label={t('ui.mobile_status')}>
                  <span data-testid={`superadmin_tickets-status-${ticket.id}`} className={StatusColors[ticket.status]}>{ticket.status.replace('_', ' ')}</span>
                </td>
                <td className="p-4 text-sm" data-mobile-label={t('ui.mobile_response_time')}>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${sla.color}`}>
                    {sla.icon} {sla.label}
                  </span>
                </td>
                <td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_last_updated')}>{formatDateTime(ticket.lastUpdated)}</td>
                <td className="p-4 text-sm text-right" data-mobile-label={t('ui.mobile_actions')}>
                  <div className="flex items-center justify-end gap-1">
                      <button  type="button" onClick={(e) => { e.stopPropagation(); onReply(ticket.id); }} className="min-w-11 min-h-11 p-2 text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" title={t('ui.reply_to_ticket_d555f35')} aria-label={t('ui.a11y_reply_ticket', { id: ticket.id })} data-testid={`superadmin_tickets-table-reply-${index}`}>
                      <MessageSquare size={18} className="w-4"/>
                    </button>
                    {onAssign && (<button  type="button" onClick={(e) => { e.stopPropagation(); onAssign(ticket.id); }} className="min-w-11 min-h-11 p-2 text-secondary hover:bg-surface-hover hover:text-primary rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.assign_to_4306f8c')} data-testid={`superadmin_tickets-table-assign-${index}`}>
                        <UserCheck size={18} className="w-4"/>
                      </button>)}
                    {onClose && ticket.status !== SUPERADMIN_TICKETS_STATUS_CODES.RESOLVED && ticket.status !== SUPERADMIN_TICKETS_STATUS_CODES.CLOSED && (<button  type="button" onClick={(e) => { e.stopPropagation(); onClose(ticket.id); }} className="min-w-11 min-h-11 p-2 text-success hover:bg-success-bg rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.close_ticket_94a4dc0')} data-testid={`superadmin_tickets-table-close-${index}`}>
                        <CheckCircle2 size={18} className="w-4"/>
                      </button>)}
                  </div>
                </td>
              </tr>);
        }))}
        </tbody>
      </table>
    </div>);
}
