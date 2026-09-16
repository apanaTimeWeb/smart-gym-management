// DATA FLOW: Manager module state/API data → useManagerMembersStatusMutations → owning Manager UI components.
/** Manages UseMembersStatusMutations for the Manager module. */
import { useMutation } from '@tanstack/react-query';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';

export function useManagerMembersStatusMutations(
  showToast: (msg: string, t: ToastType) => void,
  invalidateMemberQueries: () => void
) {
  const assignDietMutation = useMutation({
    mutationFn: async ({ memberId, diet }: { memberId: string, diet: DietPlanSnapshot | null }) => 
      membersApi.update(memberId, { assignedDietId: diet?.id || '', assignedDiet: diet || undefined }),
    onSuccess: (res, { memberId, diet }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const assignWorkoutMutation = useMutation({
    mutationFn: async ({ memberId, workout }: { memberId: string, workout: WorkoutSnapshot | null }) => 
      membersApi.update(memberId, { assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined }),
    onSuccess: (res, { memberId, workout }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const freezeMutation = useMutation({
    mutationFn: async ({ memberId, isFrozen }: { memberId: string, isFrozen: boolean }) => 
      membersApi.update(memberId, { status: isFrozen ? 'FROZEN' : 'ACTIVE' }),
    onSuccess: (res, { memberId, isFrozen }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const toggleSuspendMutation = useMutation({
    mutationFn: async ({ memberId, isSuspended }: { memberId: string, isSuspended: boolean }) => 
      membersApi.update(memberId, { status: isSuspended ? 'SUSPENDED' : 'ACTIVE' }),
    onSuccess: (res, { memberId, isSuspended }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const assignTrainerMutation = useMutation({
    mutationFn: async ({ memberId, trainerId, trainerName, isPT }: { memberId: string, trainerId: string, trainerName: string, isPT: boolean }) => 
      membersApi.update(memberId, { assignedTrainerId: trainerId || '', assignedTrainerName: trainerName || '', isPT }),
    onSuccess: (res, { memberId, trainerId, trainerName, isPT }) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  return { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation };
}
