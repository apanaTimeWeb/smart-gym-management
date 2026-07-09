"use client";

import React from 'react';
import { useAuditFilters } from './useAuditFilters';
import '../../audit.css';

export const AuditFilters = () => {
  const { filters, handleEntityTypeChange, handleActorIdChange, entityTypes } = useAuditFilters();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--audit-primary-bg)', border: '1px solid var(--audit-border-color)' }}>
      <div className="flex flex-col">
        <label htmlFor="entityType" className="text-sm font-medium mb-1" style={{ color: 'var(--audit-text-primary)' }}>Entity Type</label>
        <select
          id="entityType"
          value={filters.entityType || ''}
          onChange={handleEntityTypeChange}
          className="p-2 rounded border"
          style={{ borderColor: 'var(--audit-border-color)' }}
        >
          {entityTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="actorId" className="text-sm font-medium mb-1" style={{ color: 'var(--audit-text-primary)' }}>Actor ID</label>
        <input
          id="actorId"
          type="text"
          placeholder="Filter by Actor ID"
          value={filters.actorId || ''}
          onChange={handleActorIdChange}
          className="p-2 rounded border"
          style={{ borderColor: 'var(--audit-border-color)' }}
        />
      </div>
    </div>
  );
};
