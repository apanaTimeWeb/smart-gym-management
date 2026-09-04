// RESPONSIBILITY: Generic fetch hook for Superadmin read-only data. Manages loading/error state for a single API endpoint. For mutations, use useSuperadminMutation instead.
// DATA FLOW: API -> useSuperadminData -> Superadmin page components (FeaturesClient, BackupsClient, MigrationsClient, SuperadminDashboardView)

import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function useAffiliatesData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);

  // Refetch when endpoint changes (navigating between superadmin pages).
  useEffect(() => {
    let isMounted = true;
    Promise.resolve().then(() => setFetchState('loading'));
    Promise.resolve().then(() => setError(null));

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
          setError((err as Error).message);
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
