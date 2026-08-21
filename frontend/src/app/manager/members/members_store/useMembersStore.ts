/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Members module.
 * DATA FLOW: API -> useMembersStore -> useMembersLogic / UI Components
 */

import { create } from 'zustand';
import { membersApi } from '@/app/manager/members/members_api/members_api';
import { plansApi } from '@/app/manager/plans/plans_api/plans_api';
import { financeApi } from '@/app/manager/finance/finance_api/finance_api';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/attendance_api';
import type { Member, MembersInitialData, FetchState } from '@/app/manager/members/members_types/members_types';
import type { Plan } from '@/app/manager/plans/plans_types/plans_types';
import type { Payment } from '@/app/manager/finance/finance_types/finance_types';
import { MemberFormValues, ATTENDANCE_CALENDAR_DAYS } from '@/app/manager/members/members_utils/MembersSharedConstants';

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
      const mockMembers: Member[] = [
        { id: '1', name: 'John Doe', phone: '9876543210', email: 'john@example.com', planId: 'p1', plan: { id: 'p1', name: 'Pro Plan', tier: 'Pro', price1Month: 100, price3Month: 250, price6Month: 450, price12Month: 800, features: [], isActive: true }, status: 'ACTIVE', billingCycle: '1 Month', paidAmount: 100, pendingAmount: 0, expiryDate: new Date(Date.now() + 30 * 86400000).toISOString(), joinDate: new Date().toISOString() },
        { id: '2', name: 'Jane Smith', phone: '9876543211', email: 'jane@example.com', planId: 'p2', plan: { id: 'p2', name: 'Basic Plan', tier: 'Basic', price1Month: 50, price3Month: 140, price6Month: 250, price12Month: 450, features: [], isActive: true }, status: 'PENDING', billingCycle: '3 Months', paidAmount: 50, pendingAmount: 90, expiryDate: new Date(Date.now() + 90 * 86400000).toISOString(), joinDate: new Date().toISOString() }
      ];
      
      set({
        members: mockMembers,
        totalMembers: mockMembers.length,
        plans: [
          { id: 'p1', name: 'Pro Plan', tier: 'Pro', price1Month: 100, price3Month: 250, price6Month: 450, price12Month: 800, features: [], isActive: true },
          { id: 'p2', name: 'Basic Plan', tier: 'Basic', price1Month: 50, price3Month: 140, price6Month: 250, price12Month: 450, features: [], isActive: true }
        ],
        stats: { total: 2, active: 1, pending: 1, expired: 0 },
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
          const rec = (aRes.data.attendance as Array<{ date: string }>)?.find(a => new Date(a.date).getDate() === d);
          return { day: d, status: rec ? 'P' : 'A' };
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
