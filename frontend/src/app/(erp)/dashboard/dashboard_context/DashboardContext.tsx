"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { dashboardApi, type DashboardStats } from '@/lib/api';

interface DashboardContextType {
  stats: DashboardStats | null;
  loading: boolean;
  error: string;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardApi.getStats()
      .then(res => setStats(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    stats,
    loading,
    error
  }), [stats, loading, error]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
}
