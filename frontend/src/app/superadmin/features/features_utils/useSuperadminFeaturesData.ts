'use client';
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
      if (!res.data) throw new Error(res.message);
      return res.data;
    }
  });

  const toggleFlagMutation = useMutation({
    mutationFn: (id: string) => featuresApi.toggleFlag(id),
    onSuccess: (res) => {
      queryClient.setQueryData(queryKey, (old: { flags: FeatureFlag[]; notes: ReleaseNote[] } | undefined) => {
        if (!old) return old;
        return {
          flags: old.flags.map((f) => {
            const flagData = res.data as FeatureFlag;
            return f.id === flagData?.id ? flagData : f;
          }),
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
          flags: old.flags.map((f) => {
            const flagData = res.data as FeatureFlag;
            return f.id === flagData?.id ? flagData : f;
          }),
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
          notes: [(res.data as ReleaseNote), ...old.notes],
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

