// RESPONSIBILITY: Generic fetch hook for Superadmin read-only data. Manages loading/error state for a single API endpoint.
// DATA FLOW: API -> useSuperadminData -> Superadmin page components

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import type { FetchState } from '@/app/superadmin/superadmin_types/superadmin_types';

/**
 * Fetches read-only data from a superadmin API endpoint.
 * Handles loading/error/success states automatically.
 * @param endpoint - The API path to fetch (e.g. SuperadminUrlConfig.BACKEND_API.FEATURES_BASE)
 */
export function useSuperadminData<T>(endpoint: string) {
  const query = useQuery({
    queryKey: ['superadmin', endpoint],
    queryFn: () => apiFetch<{ success: boolean; data: T }>(endpoint).then(res => {
      if ('data' in res) return res.data;
      return res as unknown as T;
    })
  });

  const fetchState: FetchState = query.isLoading ? 'loading' : query.isError ? 'error' : 'success';
  const data = query.data ?? null;
  const error = query.error ? query.error.message : null;

  const queryClient = useQueryClient();

  /** Pessimistically mutate local cache after a confirmed API write. */
  const mutate = useCallback((updater: T | ((prev: T | null) => T | null)) => {
    queryClient.setQueryData(['superadmin', endpoint], (old: T | null | undefined) => {
      if (typeof updater === 'function') {
        return (updater as (prev: T | null) => T | null)(old ?? null);
      }
      return updater;
    });
  }, [queryClient, endpoint]);

  return { data, fetchState, error, mutate };
}
