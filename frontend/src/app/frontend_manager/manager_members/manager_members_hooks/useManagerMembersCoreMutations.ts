'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { ManagerMembersApi } from '@/app/frontend_manager/manager_members/manager_members_api/ManagerMembersApi';
import { ManagerMembersQueryKeys } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersQueryKeys';
import { MEMBER_ACTIVE_STATUS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import { MEMBER_PAID_STATUS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersFormSchema';
import type { Member, ManagerMembersPaymentMethod } from '@/app/frontend_manager/manager_members/manager_members_types/ManagerMembersTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersCoreMutations.
 * @dependencies Uses ManagerMoney, ManagerMembersApi, ManagerToastTypes, ManagerMembersFormSchema.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersCoreMutations owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersCoreMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: async ({ data, idempotencyKey }: { data: MemberFormValues; idempotencyKey: string }) => {
      if (editId) {
        return await ManagerMembersApi.updateMember(editId, data, idempotencyKey);
      } else {
        const payload = {
          ...data,
          status: MEMBER_ACTIVE_STATUS,
          paidAmount: data.paidAmount === undefined ? undefined : toManagerMinorUnits(data.paidAmount),
          pendingAmount: data.pendingAmount === undefined ? undefined : toManagerMinorUnits(data.pendingAmount),
          advanceAmount: data.advanceAmount === undefined ? undefined : toManagerMinorUnits(data.advanceAmount),
        };
        const res = await ManagerMembersApi.createMember(payload, idempotencyKey);
        const newId = res.data?.id || (res as { id?: string }).id;
        
        if (data.paidAmount && data.paidAmount > 0 && newId) {
           await ManagerMembersApi.createMemberPayment(newId, {
             amount: toManagerMinorUnits(data.paidAmount),
             method: 'UPI',
             status: MEMBER_PAID_STATUS,
             paidAt: new Date()
           }, idempotencyKey);
        }
        return res;
      }
    },
    onSuccess: (res) => {
      showToast(res.message, 'success');
      setShowAddModal(false);
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.payments() });

    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerMembersApi.deleteMember(id, idempotencyKey),
    onSuccess: (res, id) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.payments() });
      if (selectedMember?.id === id.id) setSelectedMember(null);
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const renewMutation = useMutation({
    mutationFn: async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; memberId: string; idempotencyKey: string }) => {
      const payload = {
         planId: data.planId,
         expiryDate: data.newExpiryDate,
         billingCycle: data.billingCycle,
         customDays: data.customDays,
         status: MEMBER_ACTIVE_STATUS };
      await ManagerMembersApi.updateMember(data.memberId, payload, data.idempotencyKey);
      
      const res = await ManagerMembersApi.createMemberPayment(data.memberId, {
         amount: toManagerMinorUnits(data.amountPaid),
         method: data.paymentMethod as ManagerMembersPaymentMethod,
         status: MEMBER_PAID_STATUS,
         paidAt: new Date()
      }, data.idempotencyKey);
      return { payload, res };
    },
    onSuccess: (data, variables) => {
      showToast(data.res.message, 'success');
      setShowRenewModal(false);
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.payments() });

    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const recordPaymentMutation = useMutation({
    mutationFn: async (data: { amount: number; method: string; memberId: string; idempotencyKey: string }) => {
      const res = await ManagerMembersApi.createMemberPayment(data.memberId, {
         amount: toManagerMinorUnits(data.amount),
         method: data.method as ManagerMembersPaymentMethod,
         status: MEMBER_PAID_STATUS,
         paidAt: new Date()
      }, data.idempotencyKey);
      return res;
    },
    onSuccess: (res) => {
      showToast(res.message, 'success');
      setShowPaymentModal(false);
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.all });
      void queryClient.invalidateQueries({ queryKey: ManagerMembersQueryKeys.payments() });
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  return { saveMutation, deleteMutation, renewMutation, recordPaymentMutation };
}
