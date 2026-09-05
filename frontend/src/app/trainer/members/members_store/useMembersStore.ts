// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
import { attendanceApi } from '@/app/trainer/attendance/attendance_api/attendance_api';
/**
 * RESPONSIBILITY: Zustand store that manages all async data for the Members module.
 * DATA FLOW: API -> useMembersStore -> useMembersLogic / UI Components
 */

import { create } from 'zustand';
import { membersApi } from '@/app/trainer/members/members_api/members_api';
import { trainerSharedApi } from '@/app/trainer/trainer_api/trainer_api';
import type { MembersInitialData } from '@/app/trainer/members/members_types/members_types';
import type { Member, FetchState } from '@/app/trainer/trainer_types/trainer_types';
import { MemberFormValues, ATTENDANCE_CALENDAR_DAYS } from '@/app/trainer/members/members_utils/MembersSharedConstants';

interface MembersState {
  members: Member[];
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
  stats: { total: 0, active: 0, pending: 0, expired: 0 },
  fetchState: 'idle',
  saving: false,
  totalMembers: 0,
  attMap: {},

  hydrate: (data: MembersInitialData) => {
    set({
      members: data.members || [],
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

      const [membersRes, statsRes] = await Promise.all([
        membersApi.fetchMembers(apiParams),
        membersApi.fetchMemberStats(),
      ]);
      
      set({
        members: membersRes.data.members || [],
        totalMembers: membersRes.data.total || 0,
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
      
      const aRes = await attendanceApi.fetchAttendanceRecords({ memberId: memberId.toString() });
      
      if (aRes.success) {
        const realAtt = Array.from({ length: ATTENDANCE_CALENDAR_DAYS }, (_, i) => {
          const d = i + 1;
          const rec = (aRes.data.attendance as Array<{ date: string }>)?.find(a => new Date(a.date).getDate() === d);
          return { day: d, status: rec ? 'P' : 'A' };
        });
        set((state) => ({ attMap: { ...state.attMap, [memberId]: realAtt } }));
      }
    } catch {
      set((state) => ({ attMap: { ...state.attMap, [memberId]: [] } }));
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
        const res = await membersApi.updateMember(editId, data);
        const updatedMem = res.data || data;
        set((state) => ({
          members: state.members.map(m => String(m.id) === String(editId) ? { ...m, ...updatedMem } as unknown as Member : m)
        }));
        return { success: true, message: res.message || 'Updated successfully' };
      } else {
        const res = await membersApi.createMember({ ...data, joinDate: new Date().toISOString() });
        const newMember = res.data ? res.data : { ...data, id: Math.random().toString(), status: 'ACTIVE', joinDate: new Date().toISOString(), planName: 'Basic', pendingAmount: 0 } as unknown as Member;
        set((state) => ({
          members: [newMember, ...state.members],
          totalMembers: state.totalMembers + 1
        }));
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
      const res = await membersApi.deleteMember(id);
      set((state) => ({
        members: state.members.filter(m => String(m.id) !== String(id)),
        totalMembers: Math.max(0, state.totalMembers - 1)
      }));
      return { success: true, message: res.message || 'Deleted successfully' };
    } catch (err: unknown) {
      throw err;
    }
  }
}));

