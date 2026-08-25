/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Members module.
 * DATA FLOW: API -> useMembersStore -> useMembersLogic / UI Components
 */

import { create } from 'zustand';
import { membersApi } from '@/app/admin/members/members_api/members_api';
import { plansApi } from '@/app/admin/plans/plans_api/plans_api';
import { financeApi } from '@/app/admin/finance/finance_api/finance_api';

import type { Member, MembersInitialData, FetchState } from '@/app/admin/members/members_types/members_types';
import type { Plan } from '@/app/admin/plans/plans_types/plans_types';
import type { Payment } from '@/app/admin/finance/finance_types/finance_types';
import { MemberFormValues, ATTENDANCE_CALENDAR_DAYS } from '@/app/admin/members/members_utils/MembersSharedConstants';

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
  saveMember: (data: MemberFormValues, editId: string | null) => Promise<{ success: boolean; message: string }>;
  deleteMember: (id: string) => Promise<{ success: boolean; message: string }>;
}

export const useMembersStore = create<MembersState>((set, get) => ({
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
      const apiParams: Record<string, string> = { 
        limit: '10', 
        page: params.page 
      };
      if (params.search) apiParams.search = params.search;
      if (params.status && params.status !== 'All') apiParams.status = params.status;

      const [membersRes, plansRes, statsRes] = await Promise.all([
        membersApi.getAll(apiParams),
        plansApi.getAll(),
        membersApi.getStats(),
      ]);
      
      set({
        members: membersRes.data.members || [],
        totalMembers: membersRes.data.total || 0,
        plans: plansRes.data || [],
        stats: statsRes.data || { total: 0, active: 0, pending: 0, expired: 0 },
        fetchState: 'success',
      });
    } catch (e: unknown) {
      set({ fetchState: 'error' });
      throw e; // Let the UI handle toast
    }
  },

  loadMemberProfile: async (memberId: string) => {
    try {
      const pRes = await financeApi.getByMember(memberId);
      set({ payments: pRes.data || [] });
      
      // Mock attendance since Admin doesn't manage attendance module directly
      const realAtt = Array.from({ length: ATTENDANCE_CALENDAR_DAYS }, (_, i) => ({
        day: i + 1,
        status: Math.random() > 0.3 ? 'P' : 'A' // 70% present probability
      }));
      set((state) => ({ attMap: { ...state.attMap, [memberId]: realAtt as {day: number, status: string}[] } }));
    } catch {
      set((state) => ({ payments: [], attMap: { ...state.attMap, [memberId]: [] } }));
    }
  },

  toggleAtt: (memberId: string, day: number) => {
    set((state) => {
      const currentAtt = state.attMap[memberId] || [];
      const updatedAtt = currentAtt.map(a => a.day === day ? { ...a, status: a.status === 'P' ? 'A' : a.status === 'A' ? 'L' : 'P' } : a);
      return { attMap: { ...state.attMap, [memberId]: updatedAtt } };
    });
  },

  saveMember: async (data, editId) => {
    set({ saving: true });
    try {
      if (editId) {
        const res = await membersApi.update(editId, { ...data, planId: data.planId });
        return { success: true, message: res.message || 'Updated successfully' };
      } else {
        const res = await membersApi.create({ ...data, planId: data.planId, joinDate: new Date().toISOString() });
        return { success: true, message: res.message || 'Created successfully' };
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
      return { success: true, message: res.message || 'Deleted successfully' };
    } catch (err: unknown) {
      throw err;
    }
  }
}));
