// RESPONSIBILITY: Generic fetch hook for Superadmin read-only data. Manages loading/error state for a single API endpoint. For mutations, use useSuperadminMutation instead.
// DATA FLOW: API -> useSuperadminData -> Superadmin page components (FeaturesClient, BackupsClient, MigrationsClient, DashboardView)

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import type { FetchState } from '@/app/superadmin/superadmin_types/superadmin_types';

/**
 * Fetches read-only data from a superadmin API endpoint.
 * Handles loading/error/success states automatically.
 * For mutations (create/update/delete), use useSuperadminMutation (Rule 58).
 * @param endpoint - The API path to fetch (e.g. SuperadminUrlConfig.BACKEND_API.FEATURES_BASE)
 */
export function useSuperadminData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);

  // Refetch when endpoint changes (navigating between superadmin pages).
  useEffect(() => {
    let isMounted = true;
    setFetchState('loading');
    setError(null);

    apiFetch<{ success: boolean; data: T }>(endpoint)
      .then(res => {
        if (isMounted) {
          const responseData = ('data' in res) ? res.data : (res as unknown as T);
          setData(responseData);
          setFetchState('success');
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message);
          setFetchState('error');
        }
      });

    return () => { isMounted = false; };
  }, [endpoint]);

  /** Pessimistically mutate local cache after a confirmed API write. */
  const mutate = useCallback((updater: T | ((prev: T | null) => T | null)) => {
    setData(prev =>
      typeof updater === 'function'
        ? (updater as (prev: T | null) => T | null)(prev)
        : updater
    );
  }, []);

  return { data, fetchState, error, mutate };
}
