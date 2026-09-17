// RESPONSIBILITY: Zustand store for UI-only client state in the members module.
import { create } from 'zustand';
import type { MemberFormValues } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';
import type { MessageType, TrainerMessageRecipient } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';

interface TrainerMembersState {
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
  setSelectedMember: (memberId: string | null) => void;

  profileTab: 'overview' | 'fitness' | 'assessment' | 'progress' | 'workout' | 'diet' | 'attendance' | 'notes';
  setProfileTab: (tab: 'overview' | 'fitness' | 'assessment' | 'progress' | 'workout' | 'diet' | 'attendance' | 'notes') => void;

  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;

  editId: string | null;
  editData: MemberFormValues | null;
  setEditState: (id: string | null, data: MemberFormValues | null) => void;

  msgModal: { open: boolean; recipient: TrainerMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (recipient: TrainerMessageRecipient, type: MessageType, message: string) => void;
  closeMsg: () => void;
}

export const useTrainerMembersStore = create<TrainerMembersState>((set) => ({
  selectedMemberId: null,
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  setSelectedMember: (memberId) => set({ selectedMemberId: memberId }),

  profileTab: 'overview',
  setProfileTab: (tab) => set({ profileTab: tab }),

  showAddModal: false,
  setShowAddModal: (show) => set({ showAddModal: show }),

  editId: null,
  editData: null,
  setEditState: (id, data) => set({ editId: id, editData: data }),


  msgModal: null,
  openMsg: (recipient, type, message) => set({ msgModal: { open: true, recipient, type, message } }),
  closeMsg: () => set({ msgModal: null }),
}));
