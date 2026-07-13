// RESPONSIBILITY: Custom hook for AuditFilters. Orchestrates updating the URL search parameters to reflect selected filters.
// DATA FLOW: AuditFilters (UI) -> useAuditFilters -> URL Search Params
"use client";

import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { AUDIT_ENTITY_TYPES } from '@/app/erp/audit/audit_utils/AuditSharedConstants';

export const useAuditFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const entityType = searchParams.get('entityType') || '';
  const actorId = searchParams.get('actorId') || '';

  const setFilter = useCallback((key: string, value: string) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }
    currentParams.set('page', '1'); // Reset page on filter change
    router.push(`${pathname}?${currentParams.toString()}`);
  }, [searchParams, pathname, router]);

  const handleEntityTypeChange = (val: string | number) => {
    setFilter('entityType', String(val));
  };

  const handleActorIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter('actorId', e.target.value);
  };

  return {
    filters: { entityType, actorId },
    handleEntityTypeChange,
    handleActorIdChange,
    entityTypes: AUDIT_ENTITY_TYPES,
  };
};
