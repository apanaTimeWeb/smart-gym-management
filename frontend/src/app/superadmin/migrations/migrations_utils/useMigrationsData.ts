// DATA FLOW: Component -> useMigrationsData.ts -> API/Store
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
    function fetchData() {
      setFetchState('success');
      setData({
        migrations: [
          { id: '1', name: 'AddUsersTable', version: 'v1.0.1', description: 'Add billing features', status: 'SUCCESS', appliedAt: '2023-08-01T10:00:00Z' },
          { id: '2', name: 'AddSubscriptionColumn', version: 'v1.0.2', description: 'Update user schema', status: 'PENDING', appliedAt: undefined }
        ],
        tenants: [
          { id: 't1', name: 'Gold Gym', plan: 'Enterprise', ownerName: 'John', adminEmail: 'john@goldgym.com', phone: '123456', status: 'ACTIVE', databaseVersion: 'v1.0.0', memberCount: 100, monthlyRevenue: 5000, createdAt: '2023-01-01' }
        ]
      });
    }
    fetchData();
    return () => { isMounted = false; };
  }, []);

  return { data, fetchState, error, setFetchState, setData };
}
