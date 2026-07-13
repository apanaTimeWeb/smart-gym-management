// RESPONSIBILITY: TicketsClient.tsx handles the logic and UI for its corresponding feature.
'use client';

import { useState } from 'react';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { Ticket, Search, Filter, MessageSquare } from 'lucide-react';
import { TicketStatus, TicketPriority } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SupportTicket } from '@/app/superadmin/superadmin_types/superadmin_types';

const PriorityColors: Record<TicketPriority, string> = {
  LOW: 'text-success bg-success/10 border-success/20',
  MEDIUM: 'text-primary bg-primary/10 border-primary/20',
  HIGH: 'text-warning bg-warning/10 border-warning/20',
  CRITICAL: 'text-destructive bg-destructive/10 border-destructive/20'
};

const StatusColors: Record<TicketStatus, string> = {
  OPEN: 'text-warning',
  IN_PROGRESS: 'text-primary',
  RESOLVED: 'text-success'
};

export default function TicketsClient() {
  const { data: DUMMY_SUPPORT_TICKETS, fetchState, error } = useSuperadminData<SupportTicket[]>(SuperadminUrlConfig.BACKEND_API.TICKETS_BASE);

    const [search, setSearch] = useState('');
if (fetchState === 'loading') return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (error || !DUMMY_SUPPORT_TICKETS) return <div className="p-8 text-center text-destructive">Error loading data.</div>;



  const filtered = DUMMY_SUPPORT_TICKETS.filter(t => t.tenantName.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-secondary mt-1">Manage incoming issues from SaaS tenants.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search tickets or gyms..." 
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-foreground transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[48rem]">
            <thead>
              <tr className="bg-header border-b border-border text-sm">
                <th className="p-4 font-semibold text-secondary">Ticket ID</th>
                <th className="p-4 font-semibold text-secondary">Gym (Tenant)</th>
                <th className="p-4 font-semibold text-secondary">Subject</th>
                <th className="p-4 font-semibold text-secondary">Priority</th>
                <th className="p-4 font-semibold text-secondary">Status</th>
                <th className="p-4 font-semibold text-secondary">Last Updated</th>
                <th className="p-4 font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-input transition-colors">
                  <td className="p-4 text-sm font-medium text-foreground">{ticket.id}</td>


                  <td className="p-4 text-sm text-secondary">{ticket.tenantName}</td>
                  <td className="p-4 text-sm text-foreground font-medium">{ticket.subject}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${PriorityColors[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold">
                    <span className={StatusColors[ticket.status]}>{ticket.status.replace('_', ' ')}</span>
                  </td>
                  <td className="p-4 text-sm text-secondary">{new Date(ticket.lastUpdated).toLocaleString()}</td>
                  <td className="p-4 text-sm text-right">
                    <button 
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex items-center justify-center font-medium"
                      title="Reply"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
