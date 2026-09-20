// DATA FLOW: Manager module state/API data → useManagerMembersStatusMutations → owning Manager UI components.
'use client';
/** Manages UseMembersStatusMutations for the Manager module. */
import { useMutation } from '@tanstack/react-query';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMembersStatusMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  invalidateMemberQueries: () => void
) {
  const assignDietMutation = useMutation({
    mutationFn: async ({ memberId, diet }: { memberId: string, diet: DietPlanSnapshot | null }) => 
      membersApi.updateMember(memberId, { assignedDietId: diet?.id || '', assignedDiet: diet || undefined }),
    onSuccess: (res, { memberId, diet }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const assignWorkoutMutation = useMutation({
    mutationFn: async ({ memberId, workout }: { memberId: string, workout: WorkoutSnapshot | null }) => 
      membersApi.updateMember(memberId, { assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined }),
    onSuccess: (res, { memberId, workout }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const freezeMutation = useMutation({
    mutationFn: async ({ memberId, isFrozen }: { memberId: string, isFrozen: boolean }) => 
      membersApi.updateMember(memberId, { status: isFrozen ? 'FROZEN' : 'ACTIVE' }),
    onSuccess: (res, { memberId, isFrozen }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const toggleSuspendMutation = useMutation({
    mutationFn: async ({ memberId, isSuspended }: { memberId: string, isSuspended: boolean }) => 
      membersApi.updateMember(memberId, { status: isSuspended ? 'SUSPENDED' : 'ACTIVE' }),
    onSuccess: (res, { memberId, isSuspended }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const assignTrainerMutation = useMutation({
    mutationFn: async ({ memberId, trainerId, trainerName, isPT }: { memberId: string, trainerId: string, trainerName: string, isPT: boolean }) => 
      membersApi.updateMember(memberId, { assignedTrainerId: trainerId || '', assignedTrainerName: trainerName || '', isPT }),
    onSuccess: (res, { memberId, trainerId, trainerName, isPT }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  return { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation };
}
