'use client';
import { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import { useManagerMaintenanceLogic } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceLogic';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { LogIssueModal } from '@/app/manager/maintenance/maintenance_components/LogIssueModal';
import { type MaintenanceTicket } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';
import { formatDateTime, formatCurrencyFromMinorUnits } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';

export default function ManagerMaintenanceMain() {
  const { tickets, isLoading, createTicket, resolveTicket } = useManagerMaintenanceLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-danger bg-danger/10 border-danger/20';
      case 'MEDIUM': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-success bg-success/10 border-success/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RESOLVED': return <CheckCircle size={16} className="text-success" />;
      case 'IN_PROGRESS': return <Clock size={16} className="text-warning" />;
      default: return <AlertCircle size={16} className="text-danger" />;
    }
  };

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader 
        title="Facility Maintenance" 
        subtitle="Track equipment repairs and facility issues"
        action={{ label: 'Log Issue', onClick: () => setIsModalOpen(true), icon: <Plus size={18} /> }}
      />

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-24 bg-card rounded-xl border border-border" />)}
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-input rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-success opacity-80" />
            </div>
            <h3 className="text-lg font-bold text-primary">All Good!</h3>
            <p className="text-secondary text-sm mt-1">No maintenance issues reported.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map(ticket => (
              <div key={ticket.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority} PRIORITY
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-input rounded-md">
                    {getStatusIcon(ticket.status)}
                    <span className="text-primary">{ticket.status.replace('_', ' ')}</span>
                  </div>
                </div>
                
                <h3 className="text-base font-bold text-primary mb-1">{ticket.title}</h3>
                <p className="text-sm font-medium text-secondary mb-4">{ticket.equipment}</p>
                
                <div className="mt-auto space-y-2 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span>Reported:</span>
                    <span className="font-medium text-primary">{formatDateTime(ticket.reportedAt)}</span>
                  </div>
                  {ticket.assignedVendor && (
                    <div className="flex justify-between">
                      <span>Vendor:</span>
                      <span className="font-medium text-primary">{ticket.assignedVendor}</span>
                    </div>
                  )}
                  {ticket.estimatedCost ? (
                    <div className="flex justify-between">
                      <span>Est. Cost:</span>
                      <span className="font-medium text-primary">{formatCurrencyFromMinorUnits(ticket.estimatedCost * 100, ManagerEnvConfig.currencyCode)}</span>
                    </div>
                  ) : null}
                </div>

                {ticket.status !== 'RESOLVED' && (
                  <button onClick={() => resolveTicket(ticket.id)} className="w-full mt-5 py-2 rounded-lg bg-success/10 text-on-success font-semibold text-sm hover:bg-success hover:text-white transition-colors">
                    Mark as Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <LogIssueModal onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />
      )}
    </div>
  );
}
