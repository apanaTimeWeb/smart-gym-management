// RESPONSIBILITY: AuditFilters.tsx handles the logic and UI for its corresponding feature.
"use client";

import React from 'react';
import { useAuditFilters } from '@/app/erp/audit/audit_components/AuditFilters/useAuditFilters';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';
import '../../audit.css';

export const AuditFilters = () => {
  const { filters, handleEntityTypeChange, handleActorIdChange, entityTypes } = useAuditFilters();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-card">
      <div className="flex flex-col flex-1">
        <label htmlFor="entityType" className="text-sm font-semibold mb-1.5 text-foreground">
          Entity Type
        </label>
        <SearchableDropdown
          value={filters.entityType || ''}
          onChange={(val) => handleEntityTypeChange({ target: { value: val } } as any)}
          options={entityTypes}
        />
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="actorId" className="text-sm font-semibold mb-1.5 text-foreground">
          Actor ID
        </label>
        <input
          id="actorId"
          type="text"
          placeholder="Filter by Actor ID (e.g. 1)"
          value={filters.actorId || ''}
          onChange={handleActorIdChange}
          className="p-2.5 rounded-xl border border-border bg-input text-foreground outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-sm placeholder:text-secondary"
        />
      </div>
    </div>
  );
};
