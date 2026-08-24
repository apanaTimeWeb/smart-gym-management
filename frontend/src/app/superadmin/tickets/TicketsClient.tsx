// RESPONSIBILITY: Renders the Support Tickets list page. Fetches ticket data via useSuperadminData. Supports search filtering. No mutations wired yet.
'use client';

import { useState } from 'react';
import { useTicketsData } from '@/app/superadmin/tickets/tickets_utils/useTicketsData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { Ticket, Search, Filter, MessageSquare } from 'lucide-react';
import { TicketStatus, TicketPriority, SupportTicket } from '@/app/superadmin/tickets/tickets_types/tickets_types';

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
  const { data: DUMMY_SUPPORT_TICKETS, fetchState, error } = useTicketsData<SupportTicket[]>(SuperadminUrlConfig.BACKEND_API.TICKETS_BASE);

    const [search, setSearch] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState<TicketStatus | 'ALL'>('ALL');
    const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'ALL'>('ALL');
if (fetchState === 'loading') return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (error || !DUMMY_SUPPORT_TICKETS) return <div className="p-8 text-center text-destructive">Error loading data.</div>;



  const filtered = DUMMY_SUPPORT_TICKETS.filter(t => {
    const matchesSearch = t.tenantName.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
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
          <div className="relative">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-foreground transition-colors"
            >
              <Filter size={16} /> Filter
            </button>
            {showFilter && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-lg p-4 z-10 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'ALL')}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Priority</label>
                  <select 
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'ALL')}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
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
