// RESPONSIBILITY: Renders the Manager maintenance list page and composes the feature-owned maintenance UI sections.
"use client";

import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Loader2, Plus } from 'lucide-react';
import { formatCurrencyFromMinorUnits, formatDateTime } from '@/lib/formatters';
import { ManagerMaintenanceLogIssueModal } from '@/app/manager/maintenance/maintenance_components/ManagerMaintenanceLogIssueModal';
import { useManagerMaintenanceLogic } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceLogic';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { getManagerErrorMessage } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import type { MaintenancePriority, MaintenanceStatus } from '@/app/manager/maintenance/maintenance_types/ManagerMaintenanceTypes';


function getMaintenancePriorityClass(priority: MaintenancePriority): string {
  switch (priority) {
    case 'HIGH': return 'text-danger bg-danger-bg border-danger';
    case 'MEDIUM': return 'text-warning bg-warning-bg border-warning';
    default: return 'text-success bg-success-bg border-success';
  }
}

function getMaintenanceStatusIcon(status: MaintenanceStatus) {
  switch (status) {
    case 'RESOLVED': return <CheckCircle size={16} className="text-success" aria-hidden="true" />;
    case 'IN_PROGRESS': return <Clock size={16} className="text-warning" aria-hidden="true" />;
    default: return <AlertCircle size={16} className="text-danger" aria-hidden="true" />;
  }
}

/** Renders the Manager maintenance issue queue and completion actions. */
export default function ManagerMaintenanceMain() {
  const { tickets, isPending, isError, error, reload, createTicket, resolveTicket, isResolving } = useManagerMaintenanceLogic();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-full pb-10">
      <ManagerHeader
        title="Facility Maintenance"
        subtitle="Track equipment repairs and facility issues"
        action={{ label: 'Log Issue', onClick: () => setIsModalOpen(true), icon: <Plus size={18} /> }}
      />

      <div className="p-4 sm:p-6">
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Loading maintenance issues">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-44 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse">
                <div className="h-5 w-1/3 m-5 rounded bg-skeleton-highlight" />
                <div className="h-4 w-2/3 mx-5 mb-3 rounded bg-skeleton-highlight" />
                <div className="h-4 w-1/2 mx-5 rounded bg-skeleton-highlight" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-danger bg-danger-bg p-6">
            <p className="text-sm font-semibold text-danger">We could not load maintenance issues right now.</p>
            <p className="mt-1 text-sm text-secondary">{getManagerErrorMessage(error)}</p>
            <button type="button" onClick={() => void reload()} className="mt-4 min-h-11 rounded-lg bg-primary text-on-primary px-4 font-semibold inline-flex items-center gap-2">
              <Loader2 size={17} aria-hidden="true" /> Retry
            </button>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-success-bg rounded-full flex items-center justify-center mb-4"><CheckCircle size={32} className="text-success" aria-hidden="true" /></div>
            <h3 className="text-lg font-bold text-primary">No maintenance issues found</h3>
            <p className="text-secondary text-sm mt-1">Log an issue when equipment or a facility needs attention.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="bg-card border border-border rounded-xl p-4 sm:p-5 shadow-card flex flex-col h-full">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded border ${getMaintenancePriorityClass(ticket.priority)}`}>{ticket.priority} PRIORITY</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 bg-input rounded-md">
                    {getMaintenanceStatusIcon(ticket.status)}
                    <span className="text-primary">{ticket.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-primary mb-1 truncate">{ticket.title}</h3>
                <p className="text-sm font-medium text-secondary mb-4 truncate">{ticket.equipment}</p>

                <div className="mt-auto space-y-2 text-xs text-secondary">
                  <div className="flex justify-between gap-3"><span>Reported:</span><span className="font-medium text-primary text-right">{formatDateTime(ticket.reportedAt)}</span></div>
                  {ticket.assignedVendor && <div className="flex justify-between gap-3"><span>Vendor:</span><span className="font-medium text-primary text-right truncate">{ticket.assignedVendor}</span></div>}
                  {ticket.estimatedCost !== undefined && <div className="flex justify-between gap-3"><span>Est. Cost:</span><span className="font-medium text-primary text-right">{formatCurrencyFromMinorUnits(ticket.estimatedCost * 100, ManagerEnvConfig.currencyCode)}</span></div>}
                </div>

                {ticket.status !== 'RESOLVED' && (
                  <button type="button" onClick={() => { if (!isResolving) void resolveTicket(ticket.id); }} disabled={isResolving} className="w-full min-h-11 mt-5 rounded-lg bg-success text-on-success font-semibold text-sm motion-safe:transition-colors disabled:opacity-70 inline-flex items-center justify-center gap-2">{isResolving && <Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true" />}{isResolving ? 'Resolving…' : 'Mark as Resolved'}</button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && <ManagerMaintenanceLogIssueModal onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />}
    </div>
  );
}
