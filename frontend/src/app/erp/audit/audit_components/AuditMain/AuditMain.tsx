// RESPONSIBILITY: Entry component for the Audit module. Renders the layout, filters, and table for tracking system activities.
"use client";

import React from 'react';
import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import { AuditFilters } from '@/app/erp/audit/audit_components/AuditFilters/AuditFilters';
import { AuditTable } from '@/app/erp/audit/audit_components/AuditTable/AuditTable';
import { AuditProvider } from '@/app/erp/audit/audit_context/AuditContext';

function AuditContent() {
  return (
    <div className="min-h-full pb-10 audit-container bg-background text-foreground relative">
      <ErpHeader 
        title="Audit Logs" 
        subtitle="Track and monitor system activities, data changes, and user actions securely." 
      />
      
      {/* Background Gradient Effect */}
      <div className="absolute top-20 left-0 w-full h-96 bg-gradient-to-b from-info-bg to-transparent opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-6 space-y-6">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <AuditFilters />
          <div className="p-4 border-t border-border">
            <AuditTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuditMain() {
  return (
    <AuditProvider>
      <AuditContent />
    </AuditProvider>
  );
}
