'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerProfileApi } from '@/app/frontend_manager/manager_profile/manager_profile_api/ManagerProfileApi';
import { ManagerProfileQueryKeys } from '@/app/frontend_manager/manager_profile/manager_profile_constants/ManagerProfileQueryKeys';
import type { UpdateManagerPasswordPayload, UpdateManagerProfilePayload } from '@/app/frontend_manager/manager_profile/manager_profile_types/ManagerProfileTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileMutations.
 * @dependencies Uses ManagerProfileApi, ManagerProfileTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerProfileMutations owns the profile feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerProfileMutations() {
  const queryClient = useQueryClient();
  const profileMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: UpdateManagerProfilePayload; idempotencyKey: string }) => ManagerProfileApi.updateProfile(payload, idempotencyKey), onSuccess: () => queryClient.invalidateQueries({ queryKey: ManagerProfileQueryKeys.current() }) });
  const passwordMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: UpdateManagerPasswordPayload; idempotencyKey: string }) => ManagerProfileApi.updatePassword(payload, idempotencyKey), onSuccess: () => queryClient.invalidateQueries({ queryKey: ManagerProfileQueryKeys.current() }) });
  return { profileMutation, passwordMutation };
}
