/** Manages UseMembersMutations for the Manager module. */
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

import { useManagerMembersCoreMutations } from '@/app/manager/members/members_context/ManagerUseManagerMembersCoreMutations';
import { useManagerMembersStatusMutations } from '@/app/manager/members/members_context/ManagerUseManagerMembersStatusMutations';

// RESPONSIBILITY: Encapsulates all TanStack Query mutations for members.
// DATA FLOW: UI Component -> useManagerMembersMutations -> API -> Invalidate Queries

export function useManagerMembersMutations(
  showToast: (msg: string, t: ToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();

  const invalidateMemberQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['manager', 'members'] });
    queryClient.invalidateQueries({ queryKey: ['manager', 'members', 'payments'] });
    queryClient.invalidateQueries({ queryKey: ['manager', 'stats'] });
  }, [queryClient]);

  const { saveMutation, deleteMutation, renewMutation, recordPaymentMutation } = useManagerMembersCoreMutations(
    showToast, selectedMember, setSelectedMember, editId, setShowAddModal, setShowRenewModal, setShowPaymentModal, invalidateMemberQueries
  );

  const { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation } = useManagerMembersStatusMutations(
    showToast, invalidateMemberQueries
  );

  return {
    saveMember: saveMutation.mutateAsync,
    deleteMember: useCallback(async (id: string) => {
      const isConfirmed = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member? This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
      if (isConfirmed) deleteMutation.mutate(id);
    }, [confirm, deleteMutation]),
    assignDiet: (memberId: string, diet: DietPlanSnapshot | null) => assignDietMutation.mutateAsync({ memberId, diet }),
    assignWorkout: (memberId: string, workout: WorkoutSnapshot | null) => assignWorkoutMutation.mutateAsync({ memberId, workout }),
    renewMember: (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; }) => renewMutation.mutateAsync({ ...data, memberId: selectedMember?.id! }),
    recordPayment: (data: { amount: number; method: string }) => recordPaymentMutation.mutateAsync({ ...data, memberId: selectedMember?.id! }),
    freezeMember: (isFrozen: boolean) => freezeMutation.mutateAsync({ memberId: selectedMember?.id!, isFrozen }),
    toggleSuspend: (isSuspended: boolean) => toggleSuspendMutation.mutateAsync({ memberId: selectedMember?.id!, isSuspended }),
    assignTrainer: (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => assignTrainerMutation.mutateAsync({ memberId, trainerId, trainerName, isPT })
  };
}
