// RESPONSIBILITY: Encapsulates functionality for useSuperadminFeaturesData.ts
// DATA FLOW: Component -> useSuperadminFeaturesData.ts -> API/Store
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/superadmin_features_api/superadmin_features_api';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

export function useSuperadminFeaturesData() {
  const queryClient = useQueryClient();
  const queryKey = ['superadmin', 'features'];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const res = await featuresApi.fetchFeatures();
      if (!(res.data as any)) throw new Error(res.message || 'Failed to fetch features data');
      return (res.data as any);
    }
  });

  const toggleFlagMutation = useMutation({
    mutationFn: (id: string) => featuresApi.toggleFlag(id),
    onSuccess: (res) => {
      queryClient.setQueryData(queryKey, (old: { flags: FeatureFlag[]; notes: ReleaseNote[] } | undefined) => {
        if (!old) return old;
        return {
          flags: old.flags.map((f) => (f.id === (res.data as any)?.id ? (res.data as any) : f)),
          notes: old.notes,
        };
      });
    },
  });

  const updateFlagMutation = useMutation({
    mutationFn: ({ id, body }: { id: string, body: Partial<FeatureFlag> }) => featuresApi.updateFlag(id, body),
    onSuccess: (res) => {
      queryClient.setQueryData(queryKey, (old: { flags: FeatureFlag[]; notes: ReleaseNote[] } | undefined) => {
        if (!old) return old;
        return {
          flags: old.flags.map((f) => (f.id === (res.data as any)?.id ? (res.data as any) : f)),
          notes: old.notes,
        };
      });
    },
  });

  const publishNoteMutation = useMutation({
    mutationFn: (data: Partial<ReleaseNote>) => featuresApi.createNote(data),
    onSuccess: (res) => {
      queryClient.setQueryData(queryKey, (old: { flags: FeatureFlag[]; notes: ReleaseNote[] } | undefined) => {
        if (!old) return old;
        return {
          flags: old.flags,
          notes: [(res.data as any), ...old.notes],
        };
      });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    toggleFlag: toggleFlagMutation.mutateAsync,
    isToggling: toggleFlagMutation.isPending,
    publishNote: publishNoteMutation.mutateAsync,
    isPublishing: publishNoteMutation.isPending,
    updateFlag: updateFlagMutation.mutateAsync,
  };
}
