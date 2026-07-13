"use client";

import { useAuditContext } from '@/app/erp/audit/audit_context/AuditContext';
import { AUDIT_ENTITY_TYPES } from '@/app/erp/audit/audit_utils/AuditSharedConstants';

export const useAuditFilters = () => {
  const { filters, setFilters } = useAuditContext();

  const handleEntityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ entityType: e.target.value, page: 1 });
  };

  const handleActorIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ actorId: e.target.value, page: 1 });
  };

  return {
    filters,
    handleEntityTypeChange,
    handleActorIdChange,
    entityTypes: AUDIT_ENTITY_TYPES,
  };
};
