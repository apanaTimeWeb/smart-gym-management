'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useRef } from 'react';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { useManagerMembersCoreMutations } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersCoreMutations';
import { useManagerMembersStatusMutations } from '@/app/frontend_manager/manager_members/manager_members_hooks/useManagerMembersStatusMutations';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';
import type { DietPlanSnapshot, WorkoutSnapshot } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersSnapshotTypes';
import type { Member } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';



/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersMutations.
 * @dependencies Uses ManagerIdempotency, useManagerMembersCoreMutations, useManagerMembersStatusMutations, ManagerToastTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersMutations owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const { saveMutation, deleteMutation, renewMutation, recordPaymentMutation } = useManagerMembersCoreMutations(
    showToast, selectedMember, setSelectedMember, editId, setShowAddModal, setShowRenewModal, setShowPaymentModal
  );

  const saveKeyRef = useRef<string | null>(null);
  const intentKeysRef = useRef(new Map<string, string>());

  const { assignDietMutation, assignWorkoutMutation, freezeMutation, toggleSuspendMutation, assignTrainerMutation } = useManagerMembersStatusMutations(
    showToast
  );

  return {
    saveMember: async (data: MemberFormValues, idempotencyKey?: string) => { const key = idempotencyKey ?? saveKeyRef.current ?? createManagerIdempotencyKey(); saveKeyRef.current = key; const response = await saveMutation.mutateAsync({ data, idempotencyKey: key }); saveKeyRef.current = null; return response; },
    deleteMember: useCallback(async (id: string) => { const key = intentKeysRef.current.get(`delete:${id}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`delete:${id}`, key); const response = await deleteMutation.mutateAsync({ id, idempotencyKey: key }); intentKeysRef.current.delete(`delete:${id}`); return response; }, [deleteMutation]),
    assignDiet: async (memberId: string, diet: DietPlanSnapshot | null) => { const key = intentKeysRef.current.get(`diet:${memberId}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`diet:${memberId}`, key); const response = await assignDietMutation.mutateAsync({ memberId, diet, idempotencyKey: key }); intentKeysRef.current.delete(`diet:${memberId}`); return response; },
    assignWorkout: async (memberId: string, workout: WorkoutSnapshot | null) => { const key = intentKeysRef.current.get(`workout:${memberId}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`workout:${memberId}`, key); const response = await assignWorkoutMutation.mutateAsync({ memberId, workout, idempotencyKey: key }); intentKeysRef.current.delete(`workout:${memberId}`); return response; },
    renewMember: async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; }, idempotencyKey: string) => { await renewMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }); },
    recordPayment: async (data: { amount: number; method: string }, idempotencyKey: string) => { await recordPaymentMutation.mutateAsync({ ...data, memberId: selectedMember?.id!, idempotencyKey }); },
    freezeMember: async (isFrozen: boolean) => { const memberId = selectedMember?.id; if (!memberId) return; const key = intentKeysRef.current.get(`freeze:${memberId}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`freeze:${memberId}`, key); const response = await freezeMutation.mutateAsync({ memberId, isFrozen, idempotencyKey: key }); intentKeysRef.current.delete(`freeze:${memberId}`); return response; },
    toggleSuspend: async (isSuspended: boolean) => { const memberId = selectedMember?.id; if (!memberId) return; const key = intentKeysRef.current.get(`suspend:${memberId}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`suspend:${memberId}`, key); const response = await toggleSuspendMutation.mutateAsync({ memberId, isSuspended, idempotencyKey: key }); intentKeysRef.current.delete(`suspend:${memberId}`); return response; },
    assignTrainer: async (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => { const key = intentKeysRef.current.get(`trainer:${memberId}`) ?? createManagerIdempotencyKey(); intentKeysRef.current.set(`trainer:${memberId}`, key); const response = await assignTrainerMutation.mutateAsync({ memberId, trainerId, trainerName, isPT, idempotencyKey: key }); intentKeysRef.current.delete(`trainer:${memberId}`); return response; }
  };
}
