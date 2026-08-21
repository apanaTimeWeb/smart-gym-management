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
    
    function fetchData() {
      setFetchState('success');
      setData({
        flags: [
          { id: '1', name: 'Beta_Feature_0', description: 'Enable beta features', isGlobalEnabled: false, enabledTenantIds: [] },
          { id: '2', name: 'Beta_Feature_1', description: 'New dashboard', isGlobalEnabled: true, enabledTenantIds: [] },
          { id: '3', name: 'Beta_Feature_2', description: 'Advanced analytics', isGlobalEnabled: false, enabledTenantIds: ['tenant-1'] },
          { id: '4', name: 'Beta_Feature_3', description: 'Custom domains', isGlobalEnabled: true, enabledTenantIds: [] },
        ],
        notes: [
          { id: '1', version: 'v1.0.0', title: 'Initial Release', content: 'We are live!', isPublished: true, date: '2023-01-01' }
        ]
      });
    }
    
    fetchData();
  }, []);

  return { data, fetchState, error, setFetchState, setData };
}
