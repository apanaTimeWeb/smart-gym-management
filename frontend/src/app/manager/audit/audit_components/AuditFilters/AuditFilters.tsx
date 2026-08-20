// RESPONSIBILITY: Renders the search/filter inputs for Audit logs and syncs them via useAuditFilters.
'use client';

import React from 'react';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';
import { useAuditContext } from '@/app/manager/audit/audit_context/AuditContext';

export const AuditFilters = () => {
  const { 
    filters, handleEntityTypeChange, handleActorIdChange, handleActionTypeChange, handleStartDateChange, handleEndDateChange, entityTypes 
  } = useAuditContext();

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
          onChange={(e) => handleActorIdChange(e.target.value)}
          className="p-2.5 rounded-xl border border-border bg-input text-primary outline-none focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-sm placeholder:text-secondary"
        />
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="actionType" className="text-sm font-semibold mb-1.5 text-primary">
          Action
        </label>
        <SearchableDropdown
          value={filters.actionType || ''}
          onChange={handleActionTypeChange}
          options={[
            { label: 'All Actions', value: '' },
            { label: 'CREATE', value: 'CREATE' },
            { label: 'UPDATE', value: 'UPDATE' },
            { label: 'DELETE', value: 'DELETE' }
          ]}
        />
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="startDate" className="text-sm font-semibold mb-1.5 text-primary">
          Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => handleStartDateChange(e.target.value)}
          className="p-2.5 rounded-xl border border-border bg-input text-primary outline-none focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="endDate" className="text-sm font-semibold mb-1.5 text-primary">
          End Date
        </label>
        <input
          id="endDate"
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => handleEndDateChange(e.target.value)}
          className="p-2.5 rounded-xl border border-border bg-input text-primary outline-none focus:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-sm"
        />
      </div>
    </div>
  );
};
