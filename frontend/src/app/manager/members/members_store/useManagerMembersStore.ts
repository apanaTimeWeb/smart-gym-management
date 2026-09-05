/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Members module.
 * DATA FLOW: API -> useManagerMembersStore -> useManagerMembersLogic / UI Components
 */

import { create } from 'zustand';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import { plansApi } from '@/app/manager/plans/plans_api/ManagerPlansApi';
import { financeApi } from '@/app/manager/finance/finance_api/ManagerFinanceApi';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import { Member, MembersInitialData, FetchState } from '@/app/manager/members/members_types/ManagerMembersTypes';
import type { Plan } from '@/app/manager/plans/plans_types/ManagerPlansTypes';
import type { Payment } from '@/app/manager/finance/finance_types/ManagerFinanceTypes';
import { MemberFormValues, ATTENDANCE_CALENDAR_DAYS } from '@/app/manager/members/members_utils/ManagerMembersSharedConstants';
import type { DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import { createMembersMutations } from './ManagerMembersStoreActions';

export interface MembersState {
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
  renewMember: (memberId: string, data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number }) => Promise<{ success: boolean; message: string }>;
  recordPayment: (memberId: string, data: { amount: number; method: string }) => Promise<{ success: boolean; message: string }>;
}

export const useManagerMembersStore = create<MembersState>((set, get) => ({
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
      let members = (membersRes.data?.members || []).map((m: Member & { planId?: string }) => {
        if (!m.plan && m.planId) {
          m.plan = plans.find((p: Plan) => String(p.id) === String(m.planId));
        }
        if (!m.status) {
          m.status = 'ACTIVE';
        } else {
          m.status = m.status.toUpperCase();
        }
        return m;
      });

      if (params?.status && params.status !== 'All') {
        members = members.filter((m: Member) => m.status === params.status);
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        members = members.filter((m: Member) => 
          m.name.toLowerCase().includes(query) || 
          m.phone.includes(query) || 
          (m.email && m.email.toLowerCase().includes(query))
        );
      }

      
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

  ...createMembersMutations(set, get)
}));
