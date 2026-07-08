"use client";

import React, { createContext, useContext, useState, useMemo } from 'react';
import { type SalesTab, type DateFilter } from '../sales_utils/SalesSharedConstants';

interface SalesContextType {
  tab: SalesTab;
  setTab: (t: SalesTab) => void;
  dateFilter: DateFilter;
  setDateFilter: (d: DateFilter) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<SalesTab>('Overview');
  const [dateFilter, setDateFilter] = useState<DateFilter>('This Month');

  const value = useMemo(() => ({
    tab, setTab,
    dateFilter, setDateFilter
  }), [tab, dateFilter]);

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSalesContext() {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSalesContext must be used within a SalesProvider');
  }
  return context;
}
