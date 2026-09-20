'use client';
import { useState } from 'react';
import { Plus, CheckCircle, Clock, FileWarning, Search, X } from 'lucide-react';
import { useManagerGrievanceLogic } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceLogic';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { LogComplaintModal } from '@/app/manager/grievance/grievance_components/LogComplaintModal';
import { type GrievanceTicket } from '@/app/manager/grievance/grievance_types/ManagerGrievanceTypes';
import { formatDateTime } from '@/lib/formatters';
import toast from 'react-hot-toast';

export default function ManagerGrievanceMain() {
  const { tickets, isLoading, createTicket, resolveTicket } = useManagerGrievanceLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolvingTicketId, setResolvingTicketId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [search, setSearch] = useState('');

  const filteredTickets = tickets.filter(t => 
    t.memberName.toLowerCase().includes(search.toLowerCase()) || 
    t.issue.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CLOSED': return 'bg-success/10 text-success';
      case 'RESOLVING': return 'bg-warning/10 text-warning';
      default: return 'bg-danger/10 text-danger';
    }
  };

  const handleResolveSubmit = async () => {
    if (!resolvingTicketId) return;
    if (!resolutionNote.trim()) {
      toast.error('Please enter a resolution note');
      return;
    }
    const success = await resolveTicket(resolvingTicketId, resolutionNote);
    if (success) {
      setResolvingTicketId(null);
      setResolutionNote('');
    }
  };

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader 
        title="Member Grievances" 
        subtitle="Manage and resolve member complaints locally"
        action={{ label: 'Log Complaint', onClick: () => setIsModalOpen(true), icon: <Plus size={18} /> }}
      />

      <div className="p-6">
        <div className="mb-6 relative max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text" 
            placeholder="Search by member name or issue..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
          />
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1,2].map(i => <div key={i} className="h-32 bg-card rounded-xl border border-border" />)}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-input rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-success opacity-80" />
            </div>
            <h3 className="text-lg font-bold text-primary">No Complaints!</h3>
            <p className="text-secondary text-sm mt-1">Everything is running smoothly.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-bold text-primary">{ticket.memberName}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-input text-secondary rounded">
                        {ticket.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-secondary mb-3">{ticket.issue}</p>
                    <div className="text-xs text-secondary font-medium">
                      Reported: {formatDateTime(ticket.loggedAt)}
                    </div>
                    {ticket.resolutionNote && (
                      <div className="mt-3 p-3 bg-success/5 rounded-lg border border-success/20 text-sm">
                        <span className="font-semibold text-success">Resolution:</span> <span className="text-secondary">{ticket.resolutionNote}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end justify-between min-w-[140px] shrink-0 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-4">
                    <div className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </div>
                    
                    {ticket.status !== 'CLOSED' && resolvingTicketId !== ticket.id && (
                      <button onClick={() => setResolvingTicketId(ticket.id)} className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors w-full text-center">
                        Resolve
                      </button>
                    )}
                  </div>
                </div>

                {resolvingTicketId === ticket.id && (
                  <div className="mt-4 p-4 bg-input rounded-xl animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-primary">Resolution Note</label>
                      <button onClick={() => { setResolvingTicketId(null); setResolutionNote(''); }} className="text-secondary hover:text-primary"><X size={16} /></button>
                    </div>
                    <textarea 
                      value={resolutionNote} 
                      onChange={e => setResolutionNote(e.target.value)} 
                      placeholder="How was this resolved? e.g. Apologized to the member and gave warning to trainer..."
                      className="w-full resize-none bg-card border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none mb-3"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setResolvingTicketId(null); setResolutionNote(''); }} className="px-4 py-2 text-sm font-semibold rounded-lg border border-border text-secondary hover:bg-card">Cancel</button>
                      <button onClick={handleResolveSubmit} className="px-4 py-2 text-sm font-semibold rounded-lg bg-success text-white hover:opacity-90">Submit Resolution</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <LogComplaintModal onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />
      )}
    </div>
  );
}
