"use client";

import React from 'react';
import { useAuditFilters } from './useAuditFilters';
import '../../audit.css';

export const AuditFilters = () => {
  const { filters, handleEntityTypeChange, handleActorIdChange, entityTypes } = useAuditFilters();

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-[var(--audit-bg-card)]">
      <div className="flex flex-col flex-1">
        <label htmlFor="entityType" className="text-sm font-semibold mb-1.5 text-[var(--audit-text-primary)]">
          Entity Type
        </label>
        <select
          id="entityType"
          value={filters.entityType || ''}
          onChange={handleEntityTypeChange}
          className="p-2.5 rounded-xl border border-[var(--audit-border-color)] bg-[var(--audit-bg-input)] text-[var(--audit-text-primary)] outline-none focus:border-[var(--audit-accent)] focus:ring-1 focus:ring-[var(--audit-accent)] transition-all shadow-sm"
        >
          {entityTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="actorId" className="text-sm font-semibold mb-1.5 text-[var(--audit-text-primary)]">
          Actor ID
        </label>
        <input
          id="actorId"
          type="text"
          placeholder="Filter by Actor ID (e.g. 1)"
          value={filters.actorId || ''}
          onChange={handleActorIdChange}
          className="p-2.5 rounded-xl border border-[var(--audit-border-color)] bg-[var(--audit-bg-input)] text-[var(--audit-text-primary)] outline-none focus:border-[var(--audit-accent)] focus:ring-1 focus:ring-[var(--audit-accent)] transition-all shadow-sm placeholder:text-[var(--audit-text-secondary)]"
        />
      </div>
    </div>
  );
};
