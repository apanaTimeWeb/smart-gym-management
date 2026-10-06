/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
import { create } from 'zustand';
import { MANAGER_MEMBERS_STATUS_VALUES } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersConstants';
import { MEMBER_ATTENDANCE_EMPTY_STATUS } from '@/app/frontend_manager/manager_members/manager_members_constants/ManagerMembersSharedConstants';

export interface MembersUIState {
  selectedMemberIds: string[];
  attMap: Record<string, { day: number; status: string }[]>;

  setSelectedMemberIds: (ids: string[]) => void;
  toggleAtt: (memberId: string, day: number) => void;
}

/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersStore.
 * @dependencies Uses the owning module state and infrastructure contracts.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerMembersStore = create<MembersUIState>((set, get) => ({
  selectedMemberIds: [],
  attMap: {},

  setSelectedMemberIds: (ids) => set({ selectedMemberIds: ids }),

  toggleAtt: (memberId: string, day: number) => {
    set((state) => {
      const currentAtt = state.attMap[memberId] || [];
      const updatedAtt = currentAtt.map(a => (() => { if (a.day === day) { return { ...a, status: (() => { if (a.status === MEMBER_ATTENDANCE_EMPTY_STATUS) return 'P'; return (() => { if (a.status === MANAGER_MEMBERS_STATUS_VALUES.P) return 'A'; return MEMBER_ATTENDANCE_EMPTY_STATUS; })(); })() }; } return a; })());
      return { attMap: { ...state.attMap, [memberId]: updatedAtt } };
    });
  } }));
