// DATA FLOW: UI Component -> useManagerMembersMutations -> API -> Invalidate Queries
// RESPONSIBILITY: Encapsulates all TanStack Query mutations for members.
'use client';
/** Manages UseMembersMutations for the Manager module. */
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { useManagerMembersCoreMutations } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersCoreMutations';
import { useManagerMembersStatusMutations } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersStatusMutations';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { MemberFormValues } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/manager/members/members_types/ManagerMembersSnapshotTypes';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
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
    saveMember: async (data: MemberFormValues, idempotencyKey?: string) => { await saveMutation.mutateAsync({ data, idempotencyKey }); },
    deleteMember: useCallback(async (id: string) => { await deleteMutation.mutateAsync({ id, idempotencyKey: createManagerIdempotencyKey() }); }, [deleteMutation]),
    assignDiet: async (memberId: string, diet: DietPlanSnapshot | null) => { await assignDietMutation.mutateAsync({ memberId, diet }); },
    assignWorkout: async (memberId: string, workout: WorkoutSnapshot | null) => { await assignWorkoutMutation.mutateAsync({ memberId, workout }); },
    renewMember: async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; }, idempotencyKey: string) => { await renewMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }); },
    recordPayment: async (data: { amount: number; method: string }, idempotencyKey: string) => { await recordPaymentMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }); },
    freezeMember: async (isFrozen: boolean) => { await freezeMutation.mutateAsync({ memberId: selectedMember?.id!, isFrozen }); },
    toggleSuspend: async (isSuspended: boolean) => { await toggleSuspendMutation.mutateAsync({ memberId: selectedMember?.id!, isSuspended }); },
    assignTrainer: async (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => { await assignTrainerMutation.mutateAsync({ memberId, trainerId, trainerName, isPT }); }
  };
}
