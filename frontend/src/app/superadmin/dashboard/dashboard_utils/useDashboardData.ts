// RESPONSIBILITY: Generic fetch hook for Dashboard read-only data. Manages loading/error state for a single API endpoint.
// DATA FLOW: API -> useDashboardData -> DashboardView

import { useState, useEffect, useCallback } from 'react';
import { apiFetch, ApiResponse } from '@/lib/api';

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function useDashboardData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setFetchState('loading');
    setError(null);

    apiFetch<ApiResponse<T>>(endpoint)
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

  const mutate = useCallback((updater: T | ((prev: T | null) => T | null)) => {
    setData(prev =>
      typeof updater === 'function'
        ? (updater as (prev: T | null) => T | null)(prev)
        : updater
    );
  }, []);

  return { data, fetchState, error, mutate };
}
