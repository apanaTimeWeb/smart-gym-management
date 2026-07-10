'use client';

import { useState } from 'react';
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { Ticket, Search, Filter, MessageSquare } from 'lucide-react';
import { TicketStatus, TicketPriority } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SupportTicket } from '@/app/superadmin/superadmin_types/superadmin_types';

const PriorityColors: Record<TicketPriority, string> = {
  LOW: 'text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/20',
  MEDIUM: 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)]/20',
  HIGH: 'text-[var(--warning)] bg-[var(--warning)]/10 border-[var(--warning)]/20',
  CRITICAL: 'text-[var(--danger)] bg-[var(--danger)]/10 border-[var(--danger)]/20'
};

const StatusColors: Record<TicketStatus, string> = {
  OPEN: 'text-[var(--warning)]',
  IN_PROGRESS: 'text-[var(--primary)]',
  RESOLVED: 'text-[var(--success)]'
};

export default function TicketsPage() {
  const { data: DUMMY_SUPPORT_TICKETS, loading, error } = useSuperadminData<SupportTicket[]>(SuperadminUrlConfig.BACKEND_API.TICKETS_BASE);

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error || !DUMMY_SUPPORT_TICKETS) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  const [search, setSearch] = useState('');

  const filtered = DUMMY_SUPPORT_TICKETS.filter(t => t.tenantName.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Support Tickets</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage incoming issues from SaaS tenants.</p>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search tickets or gyms..." 
              className="w-full pl-9 pr-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[var(--bg-header)] border-b border-[var(--border)] text-sm">
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Ticket ID</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Gym (Tenant)</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Subject</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Priority</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Status</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)]">Last Updated</th>
                <th className="p-4 font-semibold text-[var(--text-secondary)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[var(--bg-input)] transition-colors">
                  <td className="p-4 text-sm font-medium text-[var(--text-primary)]">{ticket.id}</td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{ticket.tenantName}</td>
                  <td className="p-4 text-sm text-[var(--text-primary)] font-medium">{ticket.subject}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${PriorityColors[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold">
                    <span className={StatusColors[ticket.status]}>{ticket.status.replace('_', ' ')}</span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{new Date(ticket.lastUpdated).toLocaleString()}</td>
                  <td className="p-4 text-sm text-right">
                    <button className="p-2 text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-lg transition-colors inline-flex items-center gap-1 font-medium">
                      <MessageSquare size={16} /> Reply
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
