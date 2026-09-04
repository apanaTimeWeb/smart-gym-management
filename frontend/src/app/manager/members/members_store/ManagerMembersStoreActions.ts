import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';
import { Member } from '@/app/manager/members/members_types/ManagerMembersTypes';
import { MemberFormValues, getPriceForCycle } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';

import type { MembersState } from './useManagerMembersStore';

type StoreSet = (partial: Partial<MembersState> | ((state: MembersState) => Partial<MembersState>)) => void;
type StoreGet = () => MembersState;

export const createMembersMutations = (set: StoreSet, get: StoreGet) => ({
  saveMember: async (data: MemberFormValues, editId: string | null) => {
    set({ saving: true });
    try {
      if (editId) {
        const res = await membersApi.update(editId, data);
        set((state: MembersState) => ({
          members: state.members.map((m: Member) => m.id === editId ? { ...m, ...data } : m)
        }));
        return { success: true, message: res.message || 'Updated successfully' };
      } else {
        const payload = { ...data, status: 'ACTIVE' };
        const res = await membersApi.create(payload);
        let newId = res.data?.id || (res as { id?: string }).id;
        
        const state = get();
        const plan = state.plans.find((p: import('@/app/manager/plans/plans_types/ManagerPlansTypes').Plan) => String(p.id) === String(data.planId));
        
        let pendingAmount = data.pendingAmount;
        if (pendingAmount === undefined && plan) {
          const totalAmount = getPriceForCycle(plan, data.billingCycle, data.customDays);
          pendingAmount = totalAmount - (data.paidAmount || 0);
        }

        const fullNewMember = {
          ...res.data,
          ...data,
          id: newId,
          plan,
          status: 'ACTIVE',
          pendingAmount,
          attendance: 0,
          joinDate: data.joinDate || new Date().toISOString(),
        };

        set((state: MembersState) => {
          newId = fullNewMember.id;
          return {
            members: [fullNewMember as unknown as Member, ...state.members],
            totalMembers: state.totalMembers + 1
          };
        });

        if (data.paidAmount && data.paidAmount > 0) {
           try {
             await financeApi.createPayment({
               memberId: newId,
               amount: data.paidAmount,
               method: 'UPI',
               status: 'PAID',
               paidAt: new Date().toISOString(),
               invoiceNo: `INV-${Date.now().toString().slice(-6)}`
             });
           } catch(e) { console.error('Failed to create payment record', e); }
        }

        return { success: true, message: res.message || 'Created successfully', memberId: newId };
      }
    } catch (err: unknown) {
      throw err;
    } finally {
      set({ saving: false });
    }
  },

  deleteMember: async (id: string) => {
    try {
      const res = await membersApi.remove(id);
      set((state: MembersState) => ({
        members: state.members.filter((m: Member) => m.id !== id),
        totalMembers: state.totalMembers - 1
      }));
      return { success: true, message: res.message || 'Deleted successfully' };
    } catch (err: unknown) {
      throw err;
    }
  },

  assignDiet: async (memberId: string, diet: DietPlan | null) => {
    try {
      const payload = { 
        assignedDietId: diet?.id || '', 
        assignedDiet: diet || undefined 
      };
      await membersApi.update(memberId, payload);
      set((state: MembersState) => ({
        members: state.members.map((m: Member) => m.id === memberId ? { ...m, ...payload } : m)
      }));
    } catch (err: unknown) {
      throw err;
    }
  },

  assignWorkout: async (memberId: string, workout: Workout | null) => {
    try {
      const payload = { 
        assignedWorkoutId: workout?.id || '', 
        assignedWorkout: workout || undefined 
      };
      await membersApi.update(memberId, payload);
      set((state: MembersState) => ({
        members: state.members.map((m: Member) => m.id === memberId ? { ...m, ...payload } : m)
      }));
    } catch (err: unknown) {
      throw err;
    }
  },

  renewMember: async (memberId: string, data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number }) => {
    set({ saving: true });
    try {
      const state = get();
      const member = state.members.find((m: Member) => m.id === memberId);
      const currentPaid = member?.paidAmount || 0;

      const payload = {
         planId: data.planId,
         expiryDate: data.newExpiryDate,
         billingCycle: data.billingCycle,
         customDays: data.customDays,
         status: 'ACTIVE',
         paidAmount: currentPaid + data.amountPaid
      };
      await membersApi.update(memberId, payload);
      
      const pRes = await financeApi.createPayment({
         memberId,
         amount: data.amountPaid,
         method: data.paymentMethod,
         status: 'PAID',
         paidAt: new Date().toISOString(),
         invoiceNo: `INV-REN-${Date.now().toString().slice(-6)}`
      });

      set((state: MembersState) => {
         const plan = state.plans.find((p: import('@/app/manager/plans/plans_types/ManagerPlansTypes').Plan) => String(p.id) === String(data.planId));
         const updatedMembers = state.members.map((m: Member) => m.id === memberId ? { ...m, ...payload, plan } as Member : m);
         return {
           members: updatedMembers,
           payments: [pRes.data, ...state.payments]
         };
      });
      return { success: true, message: 'Renewed successfully' };
    } catch (err: unknown) {
      throw err;
    } finally {
      set({ saving: false });
    }
  },

  recordPayment: async (memberId: string, data: { amount: number; method: string }) => {
    set({ saving: true });
    try {
      const state = get();
      const member = state.members.find((m: Member) => m.id === memberId);
      const currentPaid = member?.paidAmount || 0;
      const currentPending = member?.pendingAmount || 0;
      
      await membersApi.update(memberId, {
         paidAmount: currentPaid + data.amount,
         pendingAmount: Math.max(0, currentPending - data.amount)
      });

      const pRes = await financeApi.createPayment({
         memberId,
         amount: data.amount,
         method: data.method,
         status: 'PAID',
         paidAt: new Date().toISOString(),
         invoiceNo: `INV-PMT-${Date.now().toString().slice(-6)}`
      });

      set((state: MembersState) => {
         const updatedMembers = state.members.map((m: Member) => 
            m.id === memberId 
            ? { ...m, paidAmount: (m.paidAmount || 0) + data.amount, pendingAmount: Math.max(0, (m.pendingAmount || 0) - data.amount) } as Member 
            : m
         );
         return {
           members: updatedMembers,
           payments: [pRes.data, ...state.payments]
         };
      });
      return { success: true, message: 'Payment recorded successfully' };
    } catch (err: unknown) {
      throw err;
    } finally {
      set({ saving: false });
    }
  }
});
