// DATA FLOW: Superadmin UI → useSuperadminFeaturesData → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Encapsulates functionality for useSuperadminFeaturesData.ts
// DATA FLOW: Component -> useSuperadminFeaturesData.ts -> API/Store
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { featuresApi } from '@/app/superadmin/features/features_api/SuperadminFeaturesApi';
import type { FeatureFlag, ReleaseNote } from '@/app/superadmin/features/features_types/SuperadminFeaturesTypes';
import type { SuperadminFeatureFlagStatusMutationInput, SuperadminFeatureFlagUpdateMutationInput, SuperadminReleaseNoteCreateMutationInput } from '@/app/superadmin/features/features_types/SuperadminFeaturesMutationTypes';


/**
 * Purpose: Encapsulates functionality for useSuperadminFeaturesData.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminFeaturesData() {
    const queryClient = useQueryClient();
    const queryKey = ['superadmin', 'features'];
    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const res = await featuresApi.fetchFeatures();
            if (!res.data)
                throw new Error(res.message);
            return res.data;
        }
    });
    const updateFeatureFlagStatusMutation = useMutation({
        mutationFn: ({ id, enabled, idempotencyKey }: SuperadminFeatureFlagStatusMutationInput) => enabled ? featuresApi.activateFeatureFlag(id, idempotencyKey) : featuresApi.suspendFeatureFlag(id, idempotencyKey),
        onSuccess: (res) => {
            queryClient.setQueryData(queryKey, (old: {
                flags: FeatureFlag[];
                notes: ReleaseNote[];
            } | undefined) => {
                if (!old)
                    return old;
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
        mutationFn: ({ id, body, idempotencyKey }: SuperadminFeatureFlagUpdateMutationInput) => featuresApi.updateFeatureFlag(id, body, idempotencyKey),
        onSuccess: (res) => {
            queryClient.setQueryData(queryKey, (old: {
                flags: FeatureFlag[];
                notes: ReleaseNote[];
            } | undefined) => {
                if (!old)
                    return old;
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
        mutationFn: ({ data, idempotencyKey }: SuperadminReleaseNoteCreateMutationInput) => featuresApi.createReleaseNote(data, idempotencyKey),
        onSuccess: (res) => {
            queryClient.setQueryData(queryKey, (old: {
                flags: FeatureFlag[];
                notes: ReleaseNote[];
            } | undefined) => {
                if (!old)
                    return old;
                return {
                    flags: old.flags,
                    notes: [(res.data as ReleaseNote), ...old.notes],
                };
            });
        },
    });
    return {
        data: query.data,
        isPending: query.isPending,
        isError: query.isError,
        error: query.error,
        updateFeatureFlagStatus: updateFeatureFlagStatusMutation.mutateAsync,
        isUpdatingFeatureFlagStatus: updateFeatureFlagStatusMutation.isPending,
        publishNote: publishNoteMutation.mutateAsync,
        isPublishing: publishNoteMutation.isPending,
        updateFlag: updateFlagMutation.mutateAsync,
    };
}
