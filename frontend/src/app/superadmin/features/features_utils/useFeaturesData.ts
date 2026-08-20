import { useState, useEffect } from 'react';
import { featuresApi } from '@/app/superadmin/features/features_api/features_api';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/features_types/features_types';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function useFeaturesData() {
  const [data, setData] = useState<{ flags: FeatureFlag[]; notes: ReleaseNote[] } | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        setFetchState('loading');
        const res = await featuresApi.getAll();
        if (isMounted) {
          if (res.data) {
            setData(res.data);
            setFetchState('success');
          } else {
            throw new Error(res.message || 'Failed to fetch features data');
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
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, fetchState, error, setFetchState, setData };
}
