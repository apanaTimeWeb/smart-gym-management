import { useState, useEffect } from 'react';
import { migrationsApi } from '@/app/superadmin/migrations/migrations_api/migrations_api';
import type { MigrationsPageData } from '@/app/superadmin/migrations/migrations_types/migrations_types';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function useMigrationsData() {
  const [data, setData] = useState<MigrationsPageData | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setFetchState('loading');
        const res = await migrationsApi.getAll();
        if (isMounted) {
          if (res.data) {
            setData(res.data);
            setFetchState('success');
          } else {
            throw new Error(res.message || 'Failed to fetch migrations data');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setFetchState('error');
        }
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return { data, fetchState, error, setFetchState, setData };
}
