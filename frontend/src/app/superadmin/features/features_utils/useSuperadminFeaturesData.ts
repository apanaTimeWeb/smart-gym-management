'use client';
// RESPONSIBILITY: Owns feature-flag/release-note TanStack Query state and mutations for the Features page.
// DATA FLOW: featuresApi → useSuperadminFeaturesData → SuperadminFeaturesClient
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/superadmin_features_api/superadmin_features_api';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/superadmin_features_types/superadmin_features_types';

const SUPERADMIN_FEATURES_QUERY_KEY = ['superadmin', 'features'] as const;

type SuperadminFeaturesQueryData = { flags: FeatureFlag[]; notes: ReleaseNote[] };

export function useSuperadminFeaturesData() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: SUPERADMIN_FEATURES_QUERY_KEY,
    queryFn: async () => {
      const response = await featuresApi.fetchFeatures();
      if (!response.data) throw new Error(response.message);
      return response.data;
    },
  });

  const toggleFlagMutation = useMutation({
    mutationFn: (id: string) => featuresApi.toggleFlag(id),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.setQueryData<SuperadminFeaturesQueryData>(SUPERADMIN_FEATURES_QUERY_KEY, (current) => current ? ({ ...current, flags: current.flags.map((flag) => flag.id === response.data?.id ? response.data : flag) }) : current);
    },
  });

  const updateFlagMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<FeatureFlag> }) => featuresApi.updateFlag(id, body),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.setQueryData<SuperadminFeaturesQueryData>(SUPERADMIN_FEATURES_QUERY_KEY, (current) => current ? ({ ...current, flags: current.flags.map((flag) => flag.id === response.data?.id ? response.data : flag) }) : current);
    },
  });

  const publishNoteMutation = useMutation({
    mutationFn: (data: Partial<ReleaseNote>) => featuresApi.createNote(data),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.setQueryData<SuperadminFeaturesQueryData>(SUPERADMIN_FEATURES_QUERY_KEY, (current) => current ? ({ flags: current.flags, notes: [response.data as ReleaseNote, ...current.notes] }) : current);
    },
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    toggleFlag: toggleFlagMutation.mutateAsync,
    isToggling: toggleFlagMutation.isPending,
    updateFlag: updateFlagMutation.mutateAsync,
    isUpdating: updateFlagMutation.isPending,
    publishNote: publishNoteMutation.mutateAsync,
    isPublishing: publishNoteMutation.isPending,
  };
}
