// RESPONSIBILITY: Zustand store for UI-only client state in the members module.
import { create } from 'zustand';
import type { Member } from '../members_types/members_types';
import type { MemberFormValues } from '../members_utils/MembersSharedConstants';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import type { MessageType, TrainerMessageRecipient } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';

interface TrainerMembersState {
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;

  profileTab: 'overview' | 'fitness' | 'assessment' | 'progress' | 'workout' | 'diet' | 'attendance' | 'notes';
  setProfileTab: (tab: 'overview' | 'fitness' | 'assessment' | 'progress' | 'workout' | 'diet' | 'attendance' | 'notes') => void;

  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;

  editId: string | null;
  editData: MemberFormValues | null;
  setEditState: (id: string | null, data: MemberFormValues | null) => void;

  toast: { message: string; type: ToastType; id?: string } | null;
  showToast: (message: string, type: ToastType, id?: string) => void;
  hideToast: () => void;

  msgModal: { open: boolean; recipient: TrainerMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (recipient: TrainerMessageRecipient, type: MessageType, message: string) => void;
  closeMsg: () => void;
}

export const useTrainerMembersStore = create<TrainerMembersState>((set) => ({
  selectedMemberId: null,
  setSelectedMemberId: (id) => set({ selectedMemberId: id }),
  selectedMember: null,
  setSelectedMember: (member) => set({ selectedMember: member, selectedMemberId: member?.id ?? null }),

  profileTab: 'overview',
  setProfileTab: (tab) => set({ profileTab: tab }),

  showAddModal: false,
  setShowAddModal: (show) => set({ showAddModal: show }),

  editId: null,
  editData: null,
  setEditState: (id, data) => set({ editId: id, editData: data }),

  toast: null,
  showToast: (message, type, id) => set({ toast: { message, type, id } }),
  hideToast: () => set({ toast: null }),

  msgModal: null,
  openMsg: (recipient, type, message) => set({ msgModal: { open: true, recipient, type, message } }),
  closeMsg: () => set({ msgModal: null }),
}));
