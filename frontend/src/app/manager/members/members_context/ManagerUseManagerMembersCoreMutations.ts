// DATA FLOW: Manager module state/API data → useManagerMembersCoreMutations → owning Manager UI components.
/** Manages UseMembersCoreMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { MemberFormValues } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';

export function useManagerMembersCoreMutations(
  showToast: (msg: string, t: ToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void,
  invalidateMemberQueries: () => void
) {
  const saveMutation = useMutation({
    mutationFn: async (data: MemberFormValues) => {
      if (editId) {
        return await membersApi.update(editId, data);
      } else {
        const payload = { ...data, status: 'ACTIVE' };
        const res = await membersApi.create(payload);
        const newId = res.data?.id || (res as { id?: string }).id;
        
        if (data.paidAmount && data.paidAmount > 0 && newId) {
           await membersApi.addPayment(newId, {
             amount: data.paidAmount,
             method: 'UPI',
             status: 'PAID',
             paidAt: new Date().toISOString()
           });
        }
        return res;
      }
    },
    onSuccess: (res, variables) => {
      showToast(res.message, 'success');
      setShowAddModal(false);
      invalidateMemberQueries();

    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => membersApi.remove(id),
    onSuccess: (res, id) => {
      showToast(res.message, 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === id) setSelectedMember(null);
    },
    onError: (err: Error) => showToast(err.message, 'error')
  });

  const renewMutation = useMutation({
    mutationFn: async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; memberId: string }) => {
      const payload = {
         planId: data.planId,
         expiryDate: data.newExpiryDate,
         billingCycle: data.billingCycle,
         customDays: data.customDays,
         status: 'ACTIVE',
      };
      await membersApi.update(data.memberId, payload);
      
      const res = await membersApi.addPayment(data.memberId, {
         amount: data.amountPaid,
         method: data.paymentMethod as 'UPI' | 'Cash' | 'Card' | 'NetBanking',
         status: 'PAID',
         paidAt: new Date().toISOString()
      });
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
    mutationFn: async (data: { amount: number; method: string; memberId: string }) => {
      const res = await membersApi.addPayment(data.memberId, {
         amount: data.amount,
         method: data.method as 'UPI' | 'Cash' | 'Card' | 'NetBanking',
         status: 'PAID',
         paidAt: new Date().toISOString()
      });
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
