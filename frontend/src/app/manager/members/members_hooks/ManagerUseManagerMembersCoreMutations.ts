// DATA FLOW: Manager module state/API data → useManagerMembersCoreMutations → owning Manager UI components.
'use client';
/** Manages UseMembersCoreMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { MemberFormValues } from '@/app/manager/members/members_schemas/ManagerMembersFormSchema';
import type { Member, ManagerMembersPaymentMethod } from '@/app/manager/members/members_types/ManagerMembersTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerMembersCoreMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void,
  invalidateMemberQueries: () => void
) {
  const saveMutation = useMutation({
    mutationFn: async ({ data, idempotencyKey }: { data: MemberFormValues; idempotencyKey?: string }) => {
      if (editId) {
        return await membersApi.updateMember(editId, data);
      } else {
        const payload = {
          ...data,
          status: 'ACTIVE',
          paidAmount: data.paidAmount === undefined ? undefined : toManagerMinorUnits(data.paidAmount),
          pendingAmount: data.pendingAmount === undefined ? undefined : toManagerMinorUnits(data.pendingAmount),
          advanceAmount: data.advanceAmount === undefined ? undefined : toManagerMinorUnits(data.advanceAmount),
        };
        const res = await membersApi.createMember(payload);
        const newId = res.data?.id || (res as { id?: string }).id;
        
        if (data.paidAmount && data.paidAmount > 0 && newId) {
           if (!idempotencyKey) throw new Error('A payment confirmation key is required.');
           await membersApi.addMemberPayment(newId, {
             amount: toManagerMinorUnits(data.paidAmount),
             method: 'UPI',
             status: 'PAID',
             paidAt: new Date().toISOString()
           }, idempotencyKey);
        }
        return res;
      }
    },
    onSuccess: (res) => {
      showToast(res.message, 'success');
      setShowAddModal(false);
      invalidateMemberQueries();

    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => membersApi.deleteMember(id, idempotencyKey),
    onSuccess: (res, id) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
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
         status: 'ACTIVE' };
      await membersApi.updateMember(data.memberId, payload);
      
      const res = await membersApi.addMemberPayment(data.memberId, {
         amount: toManagerMinorUnits(data.amountPaid),
         method: data.paymentMethod as ManagerMembersPaymentMethod,
         status: 'PAID',
         paidAt: new Date().toISOString()
      }, data.idempotencyKey);
      return { payload, res };
    },
    onSuccess: (data, variables) => {
      showToast(data.res.message, 'success');
      setShowRenewModal(false);
      invalidateMemberQueries();

    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const recordPaymentMutation = useMutation({
    mutationFn: async (data: { amount: number; method: string; memberId: string; idempotencyKey: string }) => {
      const res = await membersApi.addMemberPayment(data.memberId, {
         amount: toManagerMinorUnits(data.amount),
         method: data.method as ManagerMembersPaymentMethod,
         status: 'PAID',
         paidAt: new Date().toISOString()
      }, data.idempotencyKey);
      return res;
    },
    onSuccess: (res) => {
      showToast(res.message, 'success');
      setShowPaymentModal(false);
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  return { saveMutation, deleteMutation, renewMutation, recordPaymentMutation };
}
