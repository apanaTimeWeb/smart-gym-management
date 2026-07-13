// RESPONSIBILITY: useSuperadminData.ts handles the logic and UI for its corresponding feature.

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

export function useSuperadminData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    apiFetch<{ success: boolean; data: T }>(endpoint)
      .then(res => {
        if (isMounted) {
          const responseData = (res as any).data !== undefined ? (res as any).data : res;
          setData(responseData);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, [endpoint]);

  return { data, loading, error, mutate: setData };
}
