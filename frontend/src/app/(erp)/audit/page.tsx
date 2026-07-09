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
    <div className="audit-container p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Audit Logs</h1>
        <p style={{ color: 'var(--audit-text-secondary)' }}>
          Track and monitor system activities, data changes, and user actions securely.
        </p>
      </div>

      <AuditProvider>
        <AuditFilters />
        <AuditTable />
      </AuditProvider>
    </div>
  );
}
