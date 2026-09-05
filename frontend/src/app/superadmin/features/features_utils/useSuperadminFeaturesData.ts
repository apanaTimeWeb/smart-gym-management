// DATA FLOW: Component -> useSuperadminFeaturesData.ts -> API/Store
import { useQuery } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/superadmin_features_api/superadmin_features_api';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

type FetchState = 'idle' | 'loading' | 'success' | 'error';

export function useSuperadminFeaturesData() {
  const query = useQuery({
    queryKey: ['superadmin', 'features'],
    queryFn: async () => {
      // Stub data for now, ideally call featuresApi.fetchFeatures()
      return {
        flags: [
          { id: '1', name: 'Beta_Feature_0', description: 'Enable beta features', isGlobalEnabled: false, enabledTenantIds: [] },
          { id: '2', name: 'Beta_Feature_1', description: 'New dashboard', isGlobalEnabled: true, enabledTenantIds: [] },
          { id: '3', name: 'Beta_Feature_2', description: 'Advanced analytics', isGlobalEnabled: false, enabledTenantIds: ['tenant-1'] },
          { id: '4', name: 'Beta_Feature_3', description: 'Custom domains', isGlobalEnabled: true, enabledTenantIds: [] },
        ],
        notes: [
          { id: '1', version: 'v1.0.0', title: 'Initial Release', content: 'We are live!', isPublished: true, date: '2023-01-01' }
        ]
      };
    }
  });

  const fetchState: FetchState = query.isLoading ? 'loading' : query.isError ? 'error' : 'success';

  return {
    data: query.data as { flags: FeatureFlag[]; notes: ReleaseNote[] },
    fetchState,
    error: query.isError ? new Error('Failed to fetch product data') : null,
    setFetchState: (state: React.SetStateAction<FetchState>) => {}, 
    setData: (updater: React.SetStateAction<{ flags: FeatureFlag[]; notes: ReleaseNote[]; } | null>) => {} 
  };
}
