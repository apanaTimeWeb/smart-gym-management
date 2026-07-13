// RESPONSIBILITY: useSuperadminData.ts fetches and manages server state for Superadmin components.
// DATA FLOW: API -> useSuperadminData.ts -> Component

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

/**
 * Custom hook to fetch and manage data for Superadmin components.
 * Automatically handles loading and error states.
 * @param endpoint The API endpoint to fetch data from.
 * @returns An object containing the data, loading state, error message, and a mutate function.
 */
export function useSuperadminData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [fetchState, setFetchState] = useState<import('@/app/superadmin/superadmin_types/superadmin_types').FetchState>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
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

  return { data, fetchState, error, mutate: setData };
}
