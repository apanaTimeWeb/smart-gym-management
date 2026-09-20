// RESPONSIBILITY: Zustand store for UI-only client state in the members module.
import { create } from 'zustand';
import type { TrainerMembersState } from '@/app/trainer/members/members_types/TrainerMembersStoreTypes';

export const useTrainerMembersStore = create<TrainerMembersState>((set) => ({
  selectedMemberId: null,
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  setSelectedMember: (memberId) => set({ selectedMemberId: memberId }),

  profileTab: 'overview',
  setProfileTab: (tab) => set({ profileTab: tab }),


  editId: null,
  editData: null,
  setEditState: (id, data) => set({ editId: id, editData: data }),


  msgModal: null,
  openMsg: (recipient, type, message) => set({ msgModal: { open: true, recipient, type, message } }),
  closeMsg: () => set({ msgModal: null }),
}));
