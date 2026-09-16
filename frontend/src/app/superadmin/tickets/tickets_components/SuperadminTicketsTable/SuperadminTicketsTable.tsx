'use client';
// RESPONSIBILITY: Renders the data table for Support Tickets
import { MessageSquare, CheckCircle2, UserCheck, AlertOctagon, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { SupportTicket } from '@/app/superadmin/tickets/superadmin_tickets_types/superadmin_tickets_types';
import { TicketsUrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_url_config';
import { PriorityColors, StatusColors } from '@/app/superadmin/tickets/tickets_utils/SuperadminTicketsConstants';
import SuperadminTicketsEmptyState from '@/app/superadmin/tickets/tickets_components/SuperadminTicketsEmptyState/SuperadminTicketsEmptyState';
import SuperadminCopyButton from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminCopyButton';
import { formatDateTime } from '@/lib/formatters';

interface SuperadminTicketsTableProps {
  tickets: SupportTicket[];
  onReply: (ticketId: string) => void;
  onClose?: (ticketId: string) => void;
  onAssign?: (ticketId: string) => void;
}

export default function SuperadminTicketsTable({ tickets, onReply, onClose, onAssign }: SuperadminTicketsTableProps) {
  const router = useRouter();
  const getSlaStatus = (ticket: SupportTicket) => {
    if (!ticket.slaDeadline) return { label: 'No SLA', color: 'text-secondary', icon: null };
    const diff = new Date(ticket.slaDeadline).getTime() - new Date().getTime();
    if (diff < 0) return { label: 'Breached', color: 'text-danger', icon: <AlertOctagon className="w-3 h-3" /> };
    if (diff < 12 * 60 * 60 * 1000) return { label: 'Approaching', color: 'text-warning', icon: <AlertOctagon className="w-3 h-3" /> };
    return { label: 'OK', color: 'text-success', icon: <CheckCircle2 className="w-3 h-3" /> };
  };

  return (
    <div className="overflow-x-auto flex-1">
      <table className="w-full text-left border-collapse min-w-max">
        <thead>
            <tr className="bg-header border-b border-border text-sm">
              <th className="p-4 font-semibold text-secondary">Ticket ID</th>
              <th className="p-4 font-semibold text-secondary">Gym</th>
              <th className="p-4 font-semibold text-secondary">Subject</th>
              <th className="p-4 font-semibold text-secondary">Priority</th>
              <th className="p-4 font-semibold text-secondary">Status</th>
              <th className="p-4 font-semibold text-secondary">Response Time</th>
              <th className="p-4 font-semibold text-secondary">Last Updated</th>
              <th className="p-4 font-semibold text-secondary text-right">Actions</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={8}><SuperadminTicketsEmptyState /></td>
            </tr>
          ) : (
            tickets.map((ticket) => {
              const sla = getSlaStatus(ticket);
              return (
              <tr 
                key={ticket.id} 
                className="hover:bg-input motion-safe:transition-colors cursor-pointer"
                onClick={() => onReply(ticket.id)}
              >
                <td className="p-4">
                  <span className="flex items-center gap-1 text-sm font-mono font-medium text-foreground">
                    <span>{ticket.id}</span>
                    <SuperadminCopyButton value={ticket.id} label={`Copy ticket ID ${ticket.id}`} />
                  </span>
                </td>
                <td className="p-4 text-sm text-secondary">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`${TicketsUrlConfig.PAGES.GYMS}?id=${ticket.tenantId}`);
                    }}
                    className="flex items-center gap-1 hover:text-primary motion-safe:transition-colors"
                    title="View Gym"
                  >
                    {ticket.tenantName} <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
                <td className="p-4 text-sm text-foreground font-medium">{ticket.subject}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${PriorityColors[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold">
                  <span className={StatusColors[ticket.status]}>{ticket.status.replace('_', ' ')}</span>
                </td>
                <td className="p-4 text-sm">
                  <span className={`flex items-center gap-1 text-xs font-semibold ${sla.color}`}>
                    {sla.icon} {sla.label}
                  </span>
                </td>
                <td className="p-4 text-sm text-secondary">{formatDateTime(ticket.lastUpdated)}</td>
                <td className="p-4 text-sm text-right">
                  <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); onReply(ticket.id); }}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        title="Reply to ticket"
                        aria-label={`Reply to ticket ${ticket.id}`}
                      >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    {onAssign && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onAssign(ticket.id); }}
                        className="p-2 text-secondary hover:bg-input hover:text-foreground rounded-lg motion-safe:transition-colors"
                        title="Assign To"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                    {onClose && ticket.status !== 'RESOLVED' && ticket.status !== 'CLOSED' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); onClose(ticket.id); }}
                        className="p-2 text-success hover:bg-success/10 rounded-lg motion-safe:transition-colors"
                        title="Close Ticket"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

