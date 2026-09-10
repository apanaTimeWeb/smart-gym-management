import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';
import type { DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import { MemberFormValues } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { ToastType } from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';

// RESPONSIBILITY: Encapsulates all TanStack Query mutations for members.
// DATA FLOW: UI Component -> useManagerMembersMutations -> API -> Invalidate Queries

export function useManagerMembersMutations(
  showToast: (msg: string, t: ToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: React.Dispatch<React.SetStateAction<Member | null>>,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();

  const invalidateMemberQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['manager', 'members'] });
    queryClient.invalidateQueries({ queryKey: ['manager', 'payments'] });
    queryClient.invalidateQueries({ queryKey: ['manager', 'stats'] });
  };

  const saveMutation = useMutation({
    mutationFn: async (data: MemberFormValues) => {
      if (editId) {
        return await membersApi.update(editId, data);
      } else {
        const payload = { ...data, status: 'ACTIVE' };
        const res = await membersApi.create(payload);
        const newId = res.data?.id || (res as { id?: string }).id;
        
        if (data.paidAmount && data.paidAmount > 0 && newId) {
           await financeApi.createPayment({
             memberId: newId,
             amount: data.paidAmount,
             method: 'UPI',
             status: 'PAID',
             paidAt: new Date().toISOString(),
             invoiceNumber: `INV-${Date.now().toString().slice(-6)}`
           });
        }
        return res;
      }
    },
    onSuccess: (res, variables) => {
      showToast(res.message || 'Saved successfully', 'success');
      setShowAddModal(false);
      invalidateMemberQueries();
      if (editId && selectedMember?.id === editId) {
        setSelectedMember(prev => prev ? { ...prev, ...variables } as Member : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Save failed', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => membersApi.remove(id),
    onSuccess: (res, id) => {
      showToast(res.message || 'Deleted successfully', 'success');
      invalidateMemberQueries();
      if (selectedMember?.id === id) setSelectedMember(null);
    },
    onError: (err: Error) => showToast(err.message || 'Delete failed', 'error')
  });

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
      
      await financeApi.createPayment({
         memberId: data.memberId,
         amount: data.amountPaid,
         method: data.paymentMethod as 'UPI' | 'CASH' | 'CARD' | 'BANK_TRANSFER',
         status: 'PAID',
         paidAt: new Date().toISOString(),
         invoiceNumber: `INV-REN-${Date.now().toString().slice(-6)}`
      });
      return payload;
    },
    onSuccess: (res, variables) => {
      showToast('Renewed successfully', 'success');
      setShowRenewModal(false);
      invalidateMemberQueries();
      if (selectedMember?.id === variables.memberId) {
        setSelectedMember(prev => prev ? { ...prev, ...res } as Member : null);
      }
    },
    onError: (err: Error) => showToast(err.message || 'Renewal failed', 'error')
  });

  const recordPaymentMutation = useMutation({
    mutationFn: async (data: { amount: number; method: string; memberId: string }) => {
      await financeApi.createPayment({
         memberId: data.memberId,
         amount: data.amount,
         method: data.method as 'UPI' | 'CASH' | 'CARD' | 'BANK_TRANSFER',
         status: 'PAID',
         paidAt: new Date().toISOString(),
         invoiceNumber: `INV-PMT-${Date.now().toString().slice(-6)}`
      });
      return data;
    },
    onSuccess: (_, variables) => {
      showToast('Payment recorded successfully', 'success');
      setShowPaymentModal(false);
      invalidateMemberQueries();
    },
    onError: (err: Error) => showToast(err.message || 'Payment recording failed', 'error')
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

  return {
    saveMember: saveMutation.mutateAsync,
    deleteMember: useCallback(async (id: string) => {
      const isConfirmed = await confirm({ title: 'Delete Member', message: 'Are you sure you want to delete this member? This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
      if (isConfirmed) deleteMutation.mutate(id);
    }, [confirm, deleteMutation]),
    assignDiet: (memberId: string, diet: DietPlan | null) => assignDietMutation.mutateAsync({ memberId, diet }),
    assignWorkout: (memberId: string, workout: Workout | null) => assignWorkoutMutation.mutateAsync({ memberId, workout }),
    renewMember: (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; }) => renewMutation.mutateAsync({ ...data, memberId: selectedMember?.id! }),
    recordPayment: (data: { amount: number; method: string }) => recordPaymentMutation.mutateAsync({ ...data, memberId: selectedMember?.id! }),
    freezeMember: (isFrozen: boolean) => freezeMutation.mutateAsync({ memberId: selectedMember?.id!, isFrozen }),
    toggleSuspend: (isSuspended: boolean) => toggleSuspendMutation.mutateAsync({ memberId: selectedMember?.id!, isSuspended }),
    assignTrainer: (memberId: string, trainerId: string, trainerName: string, isPT: boolean) => assignTrainerMutation.mutateAsync({ memberId, trainerId, trainerName, isPT })
  };
}
