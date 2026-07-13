// RESPONSIBILITY: Renders the search/filter inputs for Audit logs and syncs them via useAuditFilters.
"use client";

import React from 'react';
import { useAuditFilters } from '@/app/erp/audit/audit_components/AuditFilters/useAuditFilters';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

export const AuditFilters = () => {
  const { filters, handleEntityTypeChange, handleActorIdChange, entityTypes } = useAuditFilters();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-card">
      <div className="flex flex-col flex-1">
        <label htmlFor="entityType" className="text-sm font-semibold mb-1.5 text-primary">
          Entity Type
        </label>
        <SearchableDropdown
          value={filters.entityType || ''}
          onChange={handleEntityTypeChange}
          options={entityTypes}
        />
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="actorId" className="text-sm font-semibold mb-1.5 text-primary">
          Actor ID
        </label>
        <input
          id="actorId"
          type="text"
          placeholder="Filter by Actor ID (e.g. 1)"
          value={filters.actorId || ''}
          onChange={handleActorIdChange}
          className="p-2.5 rounded-xl border border-border bg-input text-primary outline-none focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-sm placeholder:text-secondary"
        />
      </div>
    </div>
  );
};
