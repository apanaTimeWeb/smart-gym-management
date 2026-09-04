/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Members module.
 * DATA FLOW: API -> useMembersStore -> useMembersLogic / UI Components
 */

import { create } from 'zustand';
import { membersApi } from '@/app/manager/members/members_api/members_api';
import { plansApi } from '@/app/manager/plans/plans_api/plans_api';
import { financeApi } from '@/app/manager/finance/finance_api/finance_api';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/attendance_api';
import { Member, MembersInitialData, FetchState } from '@/app/manager/members/members_types/members_types';
import type { Plan } from '@/app/manager/plans/plans_types/plans_types';
import type { Payment } from '@/app/manager/finance/finance_types/finance_types';
import { MemberFormValues, ATTENDANCE_CALENDAR_DAYS } from '@/app/manager/members/members_utils/MembersSharedConstants';
import type { DietPlan } from '@/app/manager/library/library_types/library_types';
import type { Workout } from '@/app/manager/workout/workout_types/workout_types';

interface MembersState {
  members: Member[];
  plans: Plan[];
  payments: Payment[];
  stats: { total: number; active: number; pending: number; expired: number };
  fetchState: FetchState;
  saving: boolean;
  totalMembers: number;
  attMap: Record<string, { day: number; status: string }[]>;

  hydrate: (data: MembersInitialData) => void;
  loadAll: (params: { search?: string; status?: string; page: string }) => Promise<void>;
  loadMemberProfile: (memberId: string) => Promise<void>;
  toggleAtt: (memberId: string, day: number) => void;
  saveMember: (data: MemberFormValues, editId: string | null) => Promise<{ success: boolean; message: string; memberId?: string }>;
  deleteMember: (id: string) => Promise<{ success: boolean; message: string }>;
  assignDiet: (memberId: string, diet: DietPlan | null) => Promise<void>;
  assignWorkout: (memberId: string, workout: Workout | null) => Promise<void>;
}

export const useMembersStore = create<MembersState>((set) => ({
  members: [],
  plans: [],
  payments: [],
  stats: { total: 0, active: 0, pending: 0, expired: 0 },
  fetchState: 'idle',
  saving: false,
  totalMembers: 0,
  attMap: {},

  hydrate: (data: MembersInitialData) => {
    set({
      members: data.members || [],
      plans: data.plans || [],
      stats: data.stats || { total: 0, active: 0, pending: 0, expired: 0 },
      totalMembers: data.totalMembers || 0,
      fetchState: 'success',
    });
  },

  loadAll: async (params) => {
    set({ fetchState: 'loading' });
    try {
      const [membersRes, plansRes, statsRes] = await Promise.all([
        membersApi.getAll(params as Record<string, string>),
        plansApi.getAll(),
        membersApi.getStats()
      ]);
      
      const plans = plansRes.data || [];
      const members = (membersRes.data?.members || []).map((m: Member & { planId?: string }) => {
        if (!m.plan && m.planId) {
          m.plan = plans.find((p: Plan) => String(p.id) === String(m.planId));
        }
        return m;
      });
      
      set({
        members,
        totalMembers: membersRes.data?.total || 0,
        plans,
        stats: statsRes.data || { total: 0, active: 0, pending: 0, expired: 0 },
        fetchState: 'success',
      });
    } catch (e: unknown) {
      set({ fetchState: 'error' });
      throw e; 
    }
  },

  loadMemberProfile: async (memberId: string) => {
    try {
      const pRes = await financeApi.getByMember(memberId);
      set({ payments: pRes.data || [] });
      
      const aRes = await attendanceApi.getAll({ memberId: memberId.toString() });
      
      if (aRes.success) {
        const realAtt = Array.from({ length: ATTENDANCE_CALENDAR_DAYS }, (_, i) => {
          const d = i + 1;
          const rec = (aRes.data.attendance as Array<{ date: string, status?: string }>)?.find(a => new Date(a.date).getDate() === d);
          return { day: d, status: rec ? (rec.status === 'LEAVE' ? 'L' : 'P') : 'NONE' };
        });
        set((state) => ({ attMap: { ...state.attMap, [memberId]: realAtt } }));
      }
    } catch {
      set((state) => ({ payments: [], attMap: { ...state.attMap, [memberId]: [] } }));
    }
  },

  toggleAtt: (memberId: string, day: number) => {
    set((state) => {
      const currentAtt = state.attMap[memberId] || [];
      const updatedAtt = currentAtt.map(a => a.day === day ? { ...a, status: a.status === 'NONE' ? 'P' : a.status === 'P' ? 'A' : 'NONE' } : a);
      return { attMap: { ...state.attMap, [memberId]: updatedAtt } };
    });
  },

  saveMember: async (data, editId) => {
    set({ saving: true });
    try {
      if (editId) {
        const res = await membersApi.update(editId, { ...data, planId: data.planId });
        set(state => {
          const plan = state.plans.find(p => String(p.id) === String(data.planId));
          const updatedMember = res.data ? { ...res.data, plan } : { ...state.members.find(m => m.id === editId), ...data, planId: data.planId, plan };
          return {
            members: state.members.map(m => m.id === editId ? updatedMember as Member : m)
          };
        });
        return { success: true, message: res.message || 'Updated successfully', memberId: editId };
      } else {
        const newMember = { ...data, planId: data.planId, joinDate: new Date().toISOString() };
        const res = await membersApi.create(newMember);
        let newId = '';
        set(state => {
          const plan = state.plans.find(p => String(p.id) === String(data.planId));
          // Use API response or fallback to mock
          const fullNewMember = res.data ? { ...res.data, plan, pendingAmount: res.data.pendingAmount || 0, status: res.data.status || 'ACTIVE' } : { 
            id: `m-${Date.now()}`, 
            ...newMember, 
            status: 'ACTIVE',
            plan,
            pendingAmount: 0 
          };
          newId = fullNewMember.id;
          return {
            members: [fullNewMember as unknown as Member, ...state.members],
            totalMembers: state.totalMembers + 1
          };
        });
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
      set(state => ({
        members: state.members.filter(m => m.id !== id),
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
      set(state => ({
        members: state.members.map(m => m.id === memberId ? { ...m, ...payload } : m)
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
      set(state => ({
        members: state.members.map(m => m.id === memberId ? { ...m, ...payload } : m)
      }));
    } catch (err: unknown) {
      throw err;
    }
  }
}));
