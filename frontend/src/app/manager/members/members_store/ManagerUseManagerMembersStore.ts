/**
 * RESPONSIBILITY: Zustand store that manages UI state for the Members module.
 * DATA FLOW: UI Components -> useManagerMembersStore
 */

import { create } from 'zustand';

export interface MembersUIState {
  selectedMemberIds: string[];
  attMap: Record<string, { day: number; status: string }[]>;

  setSelectedMemberIds: (ids: string[]) => void;
  toggleAtt: (memberId: string, day: number) => void;
}

export const useManagerMembersStore = create<MembersUIState>((set, get) => ({
  selectedMemberIds: [],
  attMap: {},

  setSelectedMemberIds: (ids) => set({ selectedMemberIds: ids }),

  toggleAtt: (memberId: string, day: number) => {
    set((state) => {
      const currentAtt = state.attMap[memberId] || [];
      const updatedAtt = currentAtt.map(a => a.day === day ? { ...a, status: a.status === 'NONE' ? 'P' : a.status === 'P' ? 'A' : 'NONE' } : a);
      return { attMap: { ...state.attMap, [memberId]: updatedAtt } };
    });
  },
}));
