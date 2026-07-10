import React from 'react';
import { AuditProvider } from './audit_context/AuditContext';
import { AuditFilters } from './audit_components/AuditFilters/AuditFilters';
import { AuditTable } from './audit_components/AuditTable/AuditTable';
import './audit.css';

export const metadata = {
  title: 'Audit Logs | Smart Gym Management',
  description: 'View and filter system audit logs for security and tracking.',
};

export default function AuditPage() {
  return (
    <div className="audit-container p-6 min-h-screen text-[var(--audit-text-primary)] relative">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[var(--info-bg)] to-transparent opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--audit-bg-card)] p-6 rounded-2xl border border-[var(--audit-border-color)] shadow-sm backdrop-blur-xl">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--audit-text-primary)] to-[var(--audit-text-secondary)]">
              Audit Logs
            </h1>
            <p className="text-[var(--audit-text-secondary)] mt-1">
              Track and monitor system activities, data changes, and user actions securely.
            </p>
          </div>
        </div>

        {/* Content */}
        <AuditProvider>
          <div className="bg-[var(--audit-bg-card)] rounded-2xl border border-[var(--audit-border-color)] shadow-sm overflow-hidden">
            <AuditFilters />
            <div className="p-4 border-t border-[var(--audit-border-color)]">
              <AuditTable />
            </div>
          </div>
        </AuditProvider>
      </div>
    </div>
  );
}
