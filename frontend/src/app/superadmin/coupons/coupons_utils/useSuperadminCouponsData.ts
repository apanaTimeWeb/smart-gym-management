'use client';
// RESPONSIBILITY: Generic fetch hook for Superadmin read-only data. Manages loading/error state for a single API endpoint. For mutations, use useSuperadminMutation instead.
// DATA FLOW: API -> useSuperadminData -> Superadmin page components (SuperadminFeaturesClient, SuperadminBackupsClient, MigrationsClient, SuperadminDashboardView)

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

export function useSuperadminCouponsData<T>(endpoint: string) {
  const query = useQuery({
    queryKey: ['superadmin', endpoint],
    queryFn: () => apiFetch<ApiResponse<T>>(endpoint).then(res => {
      if ('data' in res) return res.data;
      return res as unknown as T;
    })
  });

  const data = query.data ?? null;
  const error = query.error ? query.error.message : null;

  const mutate = useCallback((updater: T | ((prev: T | null) => T | null)) => {
    query.refetch();
  }, [query]);

  return { data, isLoading: query.isLoading, isError: query.isError, error, mutate };
}

