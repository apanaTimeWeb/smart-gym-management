// RESPONSIBILITY: Renders the header and filter/search controls for Support Tickets
'use client';
import { Search, Filter } from 'lucide-react';
import type { TicketStatus, TicketPriority } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsTypes';
import type { SuperadminTicketsHeaderProps } from '@/app/superadmin/tickets/tickets_types/SuperadminTicketsHeaderTypes';

export default function SuperadminTicketsHeader({ search, setSearch, showFilter, setShowFilter, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, onFilterChange, }: SuperadminTicketsHeaderProps) {
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Support Tickets</h1>
          <p className="text-secondary mt-1">Manage incoming issues from gyms.</p>
        </div>
      </div>

      <div className="p-4 border-b border-border flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input type="text" placeholder="Search tickets or gyms..." className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary" value={search} onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange();
        }}/>
        </div>
        <div className="relative">
          <button onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-lg text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors">
            <Filter size={18} className="w-4"/> Filter
          </button>
          {showFilter && (<div className="absolute right-0 top-full mt-2  w-full sm:w-64  bg-card border border-border rounded-xl shadow-card p-4 z-10 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Status</label>
                <select value={statusFilter} onChange={(e) => {
                setStatusFilter(e.target.value as TicketStatus | 'ALL');
                onFilterChange();
            }} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary">
                  <option value="ALL">All Statuses</option>
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="WAITING">Waiting</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Priority</label>
                <select value={priorityFilter} onChange={(e) => {
                setPriorityFilter(e.target.value as TicketPriority | 'ALL');
                onFilterChange();
            }} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-primary">
                  <option value="ALL">All Priorities</option>
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="URGENT">Urgent</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>
            </div>)}
        </div>
      </div>
    </div>);
}
