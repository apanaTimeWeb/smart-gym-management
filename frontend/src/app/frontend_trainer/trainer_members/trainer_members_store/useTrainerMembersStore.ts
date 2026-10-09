// RESPONSIBILITY: Zustand store for UI-only client state in the members module.
// DATA FLOW: Members UI interactions → module-scoped Zustand store → selected member/modal/filter UI state.
import { create } from 'zustand';

import type { TrainerMembersState } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersStoreTypes';




/**
 * Stores Members feature UI state shared across the list/trainer_profile/message surfaces.
 * It contains only selection, tab, edit-draft, and message-modal state; member server data stays in TanStack Query.
 */
/**
 * @description Manages TrainerMembersStore state and data flow for the members feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
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
