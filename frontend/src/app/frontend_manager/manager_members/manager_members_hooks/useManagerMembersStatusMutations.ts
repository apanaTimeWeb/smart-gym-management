'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ManagerMembersApi } from '@/app/frontend_manager/manager_members/manager_members_api/ManagerMembersApi';
import { ManagerMembersQueryKeys } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersQueryKeys';
import { MEMBER_ACTIVE_STATUS, MEMBER_FROZEN_STATUS, MEMBER_SUSPENDED_STATUS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersSnapshotTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersStatusMutations.
 * @dependencies Uses ManagerIdempotency, ManagerMembersApi, ManagerToastTypes, ManagerMembersSnapshotTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersStatusMutations owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersStatusMutations(
  showToast: (msg: string, t: ManagerToastType) => void
) {
  const queryClient = useQueryClient();

  const assignDietMutation = useMutation({
    mutationFn: async ({ memberId, diet, idempotencyKey }: { memberId: string, diet: DietPlanSnapshot | null; idempotencyKey: string }) => 
      ManagerMembersApi.updateMember(memberId, { assignedDietId: diet?.id || '', assignedDiet: diet || undefined }, idempotencyKey),
    onSuccess: (res, { memberId, diet }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const assignWorkoutMutation = useMutation({
    mutationFn: async ({ memberId, workout, idempotencyKey }: { memberId: string, workout: WorkoutSnapshot | null; idempotencyKey: string }) => 
      ManagerMembersApi.updateMember(memberId, { assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined }, idempotencyKey),
    onSuccess: (res, { memberId, workout }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const freezeMutation = useMutation({
    mutationFn: async ({ memberId, isFrozen, idempotencyKey }: { memberId: string, isFrozen: boolean; idempotencyKey: string }) => 
      ManagerMembersApi.updateMember(memberId, { status: isFrozen ? MEMBER_FROZEN_STATUS : MEMBER_ACTIVE_STATUS }, idempotencyKey),
    onSuccess: (res, { memberId, isFrozen }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const toggleSuspendMutation = useMutation({
    mutationFn: async ({ memberId, isSuspended, idempotencyKey }: { memberId: string, isSuspended: boolean; idempotencyKey: string }) => 
      ManagerMembersApi.updateMember(memberId, { status: isSuspended ? MEMBER_SUSPENDED_STATUS : MEMBER_ACTIVE_STATUS }, idempotencyKey),
    onSuccess: (res, { memberId, isSuspended }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const assignTrainerMutation = useMutation({
    mutationFn: async ({ memberId, trainerId, trainerName, isPT, idempotencyKey }: { memberId: string, trainerId: string, trainerName: string, isPT: boolean; idempotencyKey: string }) => 
      ManagerMembersApi.updateMember(memberId, { assignedTrainerId: trainerId || '', assignedTrainerName: trainerName || '', isPT }, idempotencyKey),
    onSuccess: (res, { memberId, trainerId, trainerName, isPT }) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  return { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation };
}
