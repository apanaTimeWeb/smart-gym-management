import { useMutation } from '@tanstack/react-query';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';

export function useManagerMembersStatusMutations(
  showToast: (msg: string, t: ToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: React.Dispatch<React.SetStateAction<Member | null>>,
  invalidateMemberQueries: () => void
) {
  const assignDietMutation = useMutation({
    mutationFn: async ({ memberId, diet }: { memberId: string, diet: DietPlan | null }) => 
      membersApi.update(memberId, { assignedDietId: diet?.id || '', assignedDiet: diet || undefined }),
    onSuccess: (_, { memberId, diet }) => {
      showToast('Diet plan assigned successfully', 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, assignedDietId: diet?.id || '', assignedDiet: diet || undefined } as Member : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Failed to assign diet', 'error')
  });

  const assignWorkoutMutation = useMutation({
    mutationFn: async ({ memberId, workout }: { memberId: string, workout: Workout | null }) => 
      membersApi.update(memberId, { assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined }),
    onSuccess: (_, { memberId, workout }) => {
      showToast('Workout plan assigned successfully', 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, assignedWorkoutId: workout?.id || '', assignedWorkout: workout || undefined } as Member : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Failed to assign workout', 'error')
  });

  const freezeMutation = useMutation({
    mutationFn: async ({ memberId, isFrozen }: { memberId: string, isFrozen: boolean }) => 
      membersApi.update(memberId, { status: isFrozen ? 'FROZEN' : 'ACTIVE' }),
    onSuccess: (_, { memberId, isFrozen }) => {
      showToast(isFrozen ? 'Membership frozen successfully' : 'Membership unfrozen successfully', 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, status: isFrozen ? 'FROZEN' : 'ACTIVE' } : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Failed to update membership status', 'error')
  });

  const toggleSuspendMutation = useMutation({
    mutationFn: async ({ memberId, isSuspended }: { memberId: string, isSuspended: boolean }) => 
      membersApi.update(memberId, { status: isSuspended ? 'SUSPENDED' : 'ACTIVE' }),
    onSuccess: (_, { memberId, isSuspended }) => {
      showToast(isSuspended ? 'Member suspended successfully' : 'Member unsuspended successfully', 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, status: isSuspended ? 'SUSPENDED' : 'ACTIVE' } : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Failed to update membership status', 'error')
  });

  const assignTrainerMutation = useMutation({
    mutationFn: async ({ memberId, trainerId, trainerName, isPT }: { memberId: string, trainerId: string, trainerName: string, isPT: boolean }) => 
      membersApi.update(memberId, { assignedTrainerId: trainerId || '', assignedTrainerName: trainerName || '', isPT }),
    onSuccess: (_, { memberId, trainerId, trainerName, isPT }) => {
      showToast('Trainer assigned successfully', 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === memberId) {
        setSelectedMember(prev => prev ? { ...prev, assignedTrainerId: trainerId, assignedTrainerName: trainerName, isPT } as Member : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Failed to assign trainer', 'error')
  });

  return { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation };
}
