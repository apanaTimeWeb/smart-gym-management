// DATA FLOW: Component -> useBackupsData.ts -> API/Store
import { useState, useEffect } from 'react';
import { backupsApi } from '@/app/superadmin/backups/backups_api/backups_api';
import type { BackupRecord } from '@/app/superadmin/backups/backups_types/backups_types';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function useBackupsData() {
  const [data, setData] = useState<BackupRecord[] | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchData() {
      try {
        setFetchState('loading');
        const res = await backupsApi.getAll();
        if (isMounted) {
          if (res.data) {
            setData(res.data);
            setFetchState('success');
          } else {
            throw new Error(res.message || 'Failed to fetch backups data');
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
