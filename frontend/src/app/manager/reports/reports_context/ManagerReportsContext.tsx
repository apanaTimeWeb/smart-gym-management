'use client';
// DATA FLOW: URL → TanStack Query → Reports UI; export mutation → module API.
// RESPONSIBILITY: Bridges URL-owned report controls with module server state.
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ReportTab } from '@/app/manager/reports/reports_types/ManagerReportsTypes';
import { reportsApi } from '@/app/manager/reports/reports_api/ManagerReportsApi';

interface ReportsContextValue {
  tab: ReportTab;
  setTab: (t: ReportTab) => void;
  dateRange: string;
  setDateRange: (v: string) => void;
  summary: Awaited<ReturnType<typeof reportsApi.fetchSummary>>['data'];
  isPending: boolean;
  isError: boolean;
  exporting: boolean;
  handleExportCSV: () => Promise<unknown>;
  reload: () => Promise<void>;
}

const ManagerReportsContext = createContext<ReportsContextValue | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<ReportTab>('Revenue');
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const dateRange = searchParams.get('range') || 'this_month';
  const setDateRange = () => undefined;

  const summaryQuery = useQuery({
    queryKey: ['manager', 'reports', 'summary', dateRange],
    queryFn: async () => (await reportsApi.fetchSummary({ range: dateRange })).data ?? null,
  });

  const exportMutation = useMutation({
    mutationFn: () => reportsApi.exportReportCSV(tab, { range: dateRange }),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${tab.toLowerCase()}_report_${new Date().toISOString().slice(0, 10)}.csv`;
      anchor.click();
      URL.revokeObjectURL(url);
    },
  });

  const reload = async () => { await queryClient.invalidateQueries({ queryKey: ['manager', 'reports', 'summary'] }); };
  const value = useMemo(() => ({
    tab, setTab, dateRange, setDateRange, summary: summaryQuery.data ?? null,
    isPending: summaryQuery.isPending, isError: summaryQuery.isError, exporting: exportMutation.isPending,
    handleExportCSV: exportMutation.mutateAsync, reload,
  }), [tab, dateRange, summaryQuery.data, summaryQuery.isPending, summaryQuery.isError, exportMutation.isPending, exportMutation.mutateAsync]);

  return <ManagerReportsContext.Provider value={value}>{children}</ManagerReportsContext.Provider>;
}

export function useReportsContext() {
  const ctx = useContext(ManagerReportsContext);
  if (!ctx) throw new Error('useReportsContext must be used within ReportsProvider');
  return ctx;
}
