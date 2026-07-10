"use client";

import React from 'react';
import ErpHeader from '@/app/(erp)/erp_components/ErpLayout/ErpHeader';
import { AuditProvider } from '@/app/(erp)/audit/audit_context/AuditContext';
import { AuditFilters } from '@/app/(erp)/audit/audit_components/AuditFilters/AuditFilters';
import { AuditTable } from '@/app/(erp)/audit/audit_components/AuditTable/AuditTable';
import '@/app/(erp)/audit/audit.css';

function AuditContent() {
  return (
    <div className="min-h-full pb-10 audit-container bg-[var(--bg-page)] text-[var(--audit-text-primary)] relative">
      <ErpHeader 
        title="Audit Logs" 
        subtitle="Track and monitor system activities, data changes, and user actions securely." 
      />
      
      {/* Background Gradient Effect */}
      <div className="absolute top-20 left-0 w-full h-96 bg-gradient-to-b from-[var(--info-bg)] to-transparent opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-6 space-y-6">
        <div className="bg-[var(--audit-bg-card)] rounded-2xl border border-[var(--audit-border-color)] shadow-sm overflow-hidden">
          <AuditFilters />
          <div className="p-4 border-t border-[var(--audit-border-color)]">
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
