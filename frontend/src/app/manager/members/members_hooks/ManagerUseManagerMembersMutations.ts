'use client';
/** Manages UseMembersMutations for the Manager module. */
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { MemberFormValues } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';

import { useManagerMembersCoreMutations } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersCoreMutations';
import { useManagerMembersStatusMutations } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersStatusMutations';

// RESPONSIBILITY: Encapsulates all TanStack Query mutations for members.
// DATA FLOW: UI Component -> useManagerMembersMutations -> API -> Invalidate Queries

export function useManagerMembersMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const queryClient = useQueryClient();

  const invalidateMemberQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['manager', 'members'] });
    queryClient.invalidateQueries({ queryKey: ['manager', 'members', 'payments'] });
  }, [queryClient]);

  const { saveMutation, deleteMutation, renewMutation, recordPaymentMutation } = useManagerMembersCoreMutations(
    showToast, selectedMember, setSelectedMember, editId, setShowAddModal, setShowRenewModal, setShowPaymentModal, invalidateMemberQueries
  );

  const { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation } = useManagerMembersStatusMutations(
    showToast, invalidateMemberQueries
  );

  return {
    saveMember: (data: MemberFormValues, idempotencyKey?: string) => saveMutation.mutateAsync({ data, idempotencyKey }),
    deleteMember: useCallback(async (id: string) => { deleteMutation.mutate({ id, idempotencyKey: crypto.randomUUID() }); }, [deleteMutation]),
    assignDiet: (memberId: string, diet: DietPlanSnapshot | null) => assignDietMutation.mutateAsync({ memberId, diet }),
    assignWorkout: (memberId: string, workout: WorkoutSnapshot | null) => assignWorkoutMutation.mutateAsync({ memberId, workout }),
    renewMember: (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; }, idempotencyKey: string) => renewMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }),
    recordPayment: (data: { amount: number; method: string }, idempotencyKey: string) => recordPaymentMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }),
    freezeMember: (isFrozen: boolean) => freezeMutation.mutateAsync({ memberId: selectedMember?.id!, isFrozen }),
    toggleSuspend: (isSuspended: boolean) => toggleSuspendMutation.mutateAsync({ memberId: selectedMember?.id!, isSuspended }),
    assignTrainer: (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => assignTrainerMutation.mutateAsync({ memberId, trainerId, trainerName, isPT })
  };
}
