"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { AuditFilterState } from '../audit_types/audit_types';

interface AuditContextProps {
  filters: AuditFilterState;
  setFilters: (filters: Partial<AuditFilterState>) => void;
}

const AuditContext = createContext<AuditContextProps | undefined>(undefined);

export const AuditProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFiltersState] = useState<AuditFilterState>({
    page: 1,
    limit: 10,
    entityType: '',
    actorId: '',
  });

  const setFilters = useCallback((newFilters: Partial<AuditFilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters, page: newFilters.entityType !== undefined ? 1 : (newFilters.page || prev.page) }));
  }, []);

  const value = useMemo(() => ({ filters, setFilters }), [filters, setFilters]);

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>;
};

export const useAuditContext = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAuditContext must be used within an AuditProvider');
  }
  return context;
};
